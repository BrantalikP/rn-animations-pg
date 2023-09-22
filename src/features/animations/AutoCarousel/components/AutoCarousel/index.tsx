import React, { useRef, useState, useEffect, useCallback } from 'react'
import type { NativeScrollEvent } from 'react-native'
import { Dimensions, View } from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
  Easing,
  withTiming,
  withDelay,
} from 'react-native-reanimated'

import { AutoCarouselContext } from './context'
import { AutoCarouselSlide } from '../AutoCarouselSlide'
import { styles } from './styles'

type AutoCarouselProps = {
  interval: number
  children: JSX.Element | JSX.Element[]
}

const width = Dimensions.get('window').width

const AutoCarousel = ({ interval, children }: AutoCarouselProps) => {
  const scrollViewRef = useRef<Animated.ScrollView>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [userInteracted, setUserInteracted] = useState(false)
  const [init, setInit] = useState(false)

  const childrenArray = React.Children.toArray(children)

  // need to clone first and last element to have infinite scrolling both ways
  // if it gets to the end we switch back to the start without animation and vice versa
  const paddedChildrenArray = [
    childrenArray[childrenArray.length - 1],
    ...childrenArray,
    childrenArray[0],
  ]

  const goToPage = useCallback((page: number, animated = false) => {
    const to = page * width
    scrollViewRef.current?.scrollTo({ x: to, y: 0, animated })
  }, [])

  useEffect(() => {
    if (!init) return
    if (userInteracted) return

    const autoScroll = () => {
      const nextIndex = (activeIndex + 1) % paddedChildrenArray.length
      goToPage(nextIndex, true)
    }
    const intervalId = setTimeout(autoScroll, interval)

    if (userInteracted) clearTimeout(intervalId)

    return () => clearTimeout(intervalId)
  }, [interval, activeIndex, userInteracted, goToPage, paddedChildrenArray.length, init])

  useEffect(() => {
    // if we are at the last index we need to switch to the second one without animation
    // second one because the first one is a clone of the last one
    if (activeIndex === paddedChildrenArray.length - 1) {
      goToPage(1)
      setActiveIndex(1)
    }
    // if we are at the first index we need to switch to the next to last one without animation
    // next to last one because the last one is a clone of the first one
    if (activeIndex === 0) {
      goToPage(paddedChildrenArray.length - 2)
      setActiveIndex(paddedChildrenArray.length - 2)
    }
  }, [activeIndex, childrenArray.length, goToPage, paddedChildrenArray.length])

  const previousOffset = useRef(0)

  const onScroll = (event: NativeScrollEvent) => {
    const { contentOffset } = event

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = 0
    if (previousOffset.current <= contentOffset.x) {
      pageNum = Math.floor(contentOffset.x / width)
    } else if (previousOffset.current > contentOffset.x) {
      pageNum = Math.ceil(contentOffset.x / width)
    }
    previousOffset.current = contentOffset.x
    setActiveIndex(pageNum)
  }

  const scrollValue = useSharedValue(0)

  useEffect(() => {
    // adding some delay to compensate for the circle splash animation delayed start
    scrollValue.value = withDelay(
      200,
      withTiming(1, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }, () =>
        runOnJS(setInit)(true),
      ),
    )
  }, [scrollValue])

  const scrollHandler = useAnimatedScrollHandler(
    (event) => {
      if (!init) return
      runOnJS(onScroll)(event)
      scrollValue.value = event.contentOffset.x / width
    },
    [width, init],
  )

  return (
    <AutoCarouselContext.Provider value={{ scrollValue }}>
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollToOverflowEnabled
          contentOffset={{ x: width, y: 0 }}
          onScrollBeginDrag={() => setUserInteracted(true)}
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {React.Children.map(paddedChildrenArray, (child, index) => (
            <AutoCarouselSlide
              scrollValue={scrollValue}
              key={index}
              index={index}
              total={paddedChildrenArray.length}
            >
              {child}
            </AutoCarouselSlide>
          ))}
        </Animated.ScrollView>
      </View>
    </AutoCarouselContext.Provider>
  )
}

export default AutoCarousel
