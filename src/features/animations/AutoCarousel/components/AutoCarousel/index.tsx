import React, { useRef, useState, useEffect, useCallback } from "react";
import type { ScrollViewProps } from "react-native";
import { Dimensions, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useAnimatedReaction,
} from "react-native-reanimated";

import { AutoCarouselContext } from "./context";
import { AutoCarouselSlide } from "../AutoCarouselSlide";
import { styles } from "./styles";

type AutoCarouselProps = {
  interval: number;
  children: JSX.Element | JSX.Element[];
};

// Sometimes the calculation between slide width and scroll offset is not precise
const customRound = (number: number, precision = 0.002) => {
  "worklet";
  // Find the difference between the number and its nearest integer value
  const rounded = Math.round(number);
  const difference = Math.abs(number - rounded);

  // If the difference is less than or equal to the precision, round the number to the nearest integer
  if (difference <= precision) {
    return Math.round(number);
  }

  // If the difference is greater than the precision, return the original number
  return number;
};

const { width: slideWidth } = Dimensions.get("window");

const AutoCarousel = ({ interval, children }: AutoCarouselProps) => {
  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const offset = useSharedValue({ value: slideWidth });
  const scrollValue = useSharedValue(1);

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
        // this is animation triggered for auto scrolling
        offset.value = withTiming<{ value: number }>(
          { value: to },
          { duration: 1000 }
        );
      } else {
        offset.value = { value: to };
      }
    },
    [slideWidth]
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAutoScroll = () => {
    const autoScroll = () => {
      const offset = scrollValue.value;
      const nextIndex = offset + 1;
      goToPage(nextIndex, true);
    };
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(autoScroll, interval);
  };

  useEffect(() => {
    if (!autoScrollEnabled && timeoutRef.current)
      clearTimeout(timeoutRef.current);
    return () => {
      if (!timeoutRef.current) return;
      clearTimeout(timeoutRef.current);
    };
  }, [autoScrollEnabled]);

  useAnimatedReaction(
    () => scrollValue.value,
    (offset) => {
      if (slideWidth === 0) return;
      if (offset % 1 !== 0) return;
      if (!autoScrollEnabled) return;
      runOnJS(handleAutoScroll)();
    },
    [scrollValue.value, slideWidth, autoScrollEnabled]
  );

  // This handles the infinite scrolling
  useAnimatedReaction(
    () => scrollValue.value,
    (offset) => {
      const activeIndex = offset;
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
    [
      childrenArray.length,
      goToPage,
      paddedChildrenArray.length,
      slideWidth,
      scrollValue.value,
    ]
  );

  const scrollHandler = useAnimatedScrollHandler(
    (event) => {
      const activeIndex = customRound(event.contentOffset.x / slideWidth);
      if (event.contentOffset.x === 0) return;
      scrollValue.value = activeIndex;
    },
    [slideWidth, autoScrollEnabled]
  );

  const animatedProps = useAnimatedProps<ScrollViewProps>(() => {
    return {
      contentOffset: {
        x: offset.value.value,
        y: 0,
      },
    };
  }, [offset.value]);

  return (
    <AutoCarouselContext.Provider value={{ scrollValue }}>
      <View style={styles.container}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollToOverflowEnabled
          animatedProps={animatedProps}
          onScrollBeginDrag={() => {
            setAutoScrollEnabled(false);
          }}
          onScroll={scrollHandler}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {React.Children.map(paddedChildrenArray, (child, index) => (
            <View key={index}>
              <AutoCarouselSlide
                index={index}
                total={paddedChildrenArray.length}
                width={slideWidth}
              >
                {child}
              </AutoCarouselSlide>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </AutoCarouselContext.Provider>
  );
};

export default AutoCarousel;
