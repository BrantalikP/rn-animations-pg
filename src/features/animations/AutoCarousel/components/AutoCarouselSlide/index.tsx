import { useMemo } from "react";
import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { AutoCarouselSlideContext } from "./context";
import { styles } from "./styles";
import { interpolateLooped } from "./utils";

export const AutoCarouselSlide = ({
  index,
  scrollValue,
  children,
  scaleScrolLStartOffset = 0,
  opacityScrollStartOffset = 0.5,
  scaleValue = 0.2,
  total,
  opacityValue = 0.4,
}: {
  index: number;
  scrollValue: SharedValue<number>;
  children: React.ReactNode;
  scaleScrolLStartOffset?: number;
  opacityScrollStartOffset?: number;
  total: number;
  scaleValue?: number;
  opacityValue?: number;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolateLooped(scrollValue.value, index, total, {
            incoming: scaleValue,
            inside: 1,
            outgoing: scaleValue,
            offset: scaleScrolLStartOffset,
          }),
        },
      ],
      opacity: interpolateLooped(scrollValue.value, index, total, {
        incoming: opacityValue,
        inside: 1,
        outgoing: opacityValue,
        offset: opacityScrollStartOffset,
      }),
    };
  });

  const contextValue = useMemo(() => ({ index, total }), [index, total]);

  return (
    <AutoCarouselSlideContext.Provider value={contextValue}>
      <Animated.View style={[styles.slide, animatedStyle]} key={index}>
        {children}
      </Animated.View>
    </AutoCarouselSlideContext.Provider>
  );
};
