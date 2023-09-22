import React, { useRef, useState, useEffect, useCallback } from "react";
import type { LayoutChangeEvent, ScrollViewProps } from "react-native";
import { View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useAnimatedReaction,
  withDelay,
  Easing,
} from "react-native-reanimated";

import { AutoCarouselContext } from "./context";
import { AutoCarouselSlide } from "../AutoCarouselSlide";
import { styles } from "./styles";
import { width } from "@/features/animations/ScrollViewInterpolate/components/Page/styles";

type AutoCarouselProps = {
  interval: number;
  children: JSX.Element | JSX.Element[];
};

const NOT_INITIALIZED = -1;

const AutoCarousel = ({ interval, children }: AutoCarouselProps) => {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const offset = useSharedValue(NOT_INITIALIZED);
  const [init, setInit] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  const childrenArray = React.Children.toArray(children);

  // need to clone first and last element to have infinite scrolling both ways
  // if it gets to the end we switch back to the start without animation and vice versa
  const paddedChildrenArray = [
    childrenArray[childrenArray.length - 1],
    ...childrenArray,
    childrenArray[0],
  ];

  const goToPage = useCallback(
    (page: number, animated = false) => {
      "worklet";
      const to = page * slideWidth;
      if (animated) {
        offset.value = withTiming(to, { duration: 1000 });
      } else {
        offset.value = to;
      }
    },
    [slideWidth]
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAutoScroll = (offset: number) => {
    const autoScroll = () => {
      const activeIndex = Math.round((offset / slideWidth) * 10000) / 10000;
      const nextIndex = (activeIndex + 1) % paddedChildrenArray.length;
      goToPage(nextIndex, true);
    };
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(autoScroll, interval);
  };

  useEffect(() => {
    if (!autoScrollEnabled && timeoutRef.current) clearTimeout(timeoutRef.current);
  }, [autoScrollEnabled]);

  useAnimatedReaction(
    () => offset.value,
    (offset) => {
      if (!init) return;
      if (slideWidth === 0) return;
      if (offset % 1 !== 0) return;
      if (!autoScrollEnabled) return;
      runOnJS(handleAutoScroll)(offset);
    },
    [offset.value, slideWidth, init]
  );

  useAnimatedReaction(
    () => offset.value,
    (offset) => {
      if (!init) return;
      const activeIndex = Math.round((offset / slideWidth) * 10000) / 10000;
      // if we are at the last index we need to switch to the second one without animation
      // second one because the first one is a clone of the last one
      if (activeIndex === paddedChildrenArray.length - 1) {
        goToPage(1);
      }
      // if we are at the first index we need to switch to the next to last one without animation
      // next to last one because the last one is a clone of the first one
      if (activeIndex === 0) {
        goToPage(paddedChildrenArray.length - 2);
      }
    },
    [childrenArray.length, goToPage, paddedChildrenArray.length, slideWidth, init]
  );

  const scrollValue = useSharedValue(0);

  useEffect(() => {
    if (slideWidth) goToPage(1, false);
  }, [slideWidth]);

  const scrollHandler = useAnimatedScrollHandler(
    (event) => {
      if (!init) return;
      scrollValue.value = event.contentOffset.x / slideWidth;
      if (!autoScrollEnabled) {
        offset.value = event.contentOffset.x;
      }
    },
    [slideWidth, autoScrollEnabled, init]
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSlideWidth(width);
  }, []);

  const animatedProps = useAnimatedProps<ScrollViewProps>(() => {
    return {
      contentOffset: {
        x: offset.value,
        y: 0,
      },
    };
  });

  useEffect(() => {
    scrollValue.value = withDelay(
      200,
      withTiming(1, { duration: 1000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }, () =>
        runOnJS(setInit)(true),
      ),
    )
  }, [scrollValue])

  return (
    <AutoCarouselContext.Provider value={{ scrollValue }}>
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          key={width}
          onLayout={onLayout}
          style={{ overflow: "visible" }}
          scrollToOverflowEnabled
          animatedProps={animatedProps}
          onScrollBeginDrag={() => setAutoScrollEnabled(false)}
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {React.Children.map(paddedChildrenArray, (child, index) => (
            <AutoCarouselSlide
              key={index}
              index={index}
              width={slideWidth}
              total={paddedChildrenArray.length}
            >
              {child}
            </AutoCarouselSlide>
          ))}
        </Animated.ScrollView>
      </View>
    </AutoCarouselContext.Provider>
  );
};

export default AutoCarousel;
