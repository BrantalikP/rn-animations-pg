import { View, Text } from "react-native";
import AutoCarousel from "./components/AutoCarousel";
import { styles } from "./styles";
import { useAutoCarouselSlideIndex } from "./components/AutoCarouselSlide/context";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { interpolateLooped } from "./components/AutoCarouselSlide/utils";
import { useAutoCarouselContext } from "./components/AutoCarousel/context";

const Slide = ({
  scaleValue = 0.4,
  scaleScrollStartOffset = 0,
  opacityStartOffset = 0.5,
  opacityValue = 0.4,
}: {
  scaleValue?: number;
  scaleScrollStartOffset?: number;
  opacityStartOffset?: number;
  opacityValue?: number;
}) => {
  const { index, total } = useAutoCarouselSlideIndex();
  const { scrollValue } = useAutoCarouselContext();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolateLooped(scrollValue.value, index, total, {
            incoming: scaleValue,
            inside: 1,
            outgoing: scaleValue,
            offset: scaleScrollStartOffset,
          }),
        },
      ],
      opacity: interpolateLooped(scrollValue.value, index, total, {
        incoming: opacityValue,
        inside: 1,
        outgoing: opacityValue,
        offset: opacityStartOffset,
      }),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>Slide {index}</Text>
    </Animated.View>
  );
};

export const AutoCarouselExample = () => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <AutoCarousel interval={5000}>
        <Slide />
        <Slide />
        <Slide />
      </AutoCarousel>
    </View>
  );
};
