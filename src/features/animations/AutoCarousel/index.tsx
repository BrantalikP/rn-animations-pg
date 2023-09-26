import { View, SafeAreaView } from "react-native";
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
  headline,
  paragraph
}: {
  scaleValue?: number;
  scaleScrollStartOffset?: number;
  opacityStartOffset?: number;
  opacityValue?: number;
  headline: string;
  paragraph: string;
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
      <Animated.Text style={styles.headline}>{headline}</Animated.Text>
      <Animated.Text style={styles.text}>{paragraph}</Animated.Text>
    </Animated.View>
  );
};

export const AutoCarouselExample = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <AutoCarousel interval={5000}>
          <Slide headline="First headline" paragraph="This is the first slide"/>
          <Slide headline="Second headline" paragraph="This is the second slide"/>
          <Slide headline="Third headline" paragraph="This is the third slide" />
        </AutoCarousel>
      </View>
    </SafeAreaView>
  );
};
