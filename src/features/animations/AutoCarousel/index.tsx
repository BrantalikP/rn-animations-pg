import { View, SafeAreaView } from "react-native";
import AutoCarousel from "./components/AutoCarousel";
import { styles } from "./styles";
import { useAutoCarouselSlideIndex } from "./components/AutoCarouselSlide/context";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { interpolateLooped } from "./components/AutoCarouselSlide/utils";
import { useAutoCarouselContext } from "./components/AutoCarousel/context";

const Slide = ({
  headline,
  paragraph,
}: {
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
            incoming: 0.4,
            inside: 1,
            outgoing: 0.4,
          }),
        },
      ],
      opacity: interpolateLooped(scrollValue.value, index, total, {
        incoming: 0.4,
        inside: 1,
        outgoing: 0.4,
      }),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.Text style={[styles.headline]}>{headline}</Animated.Text>
      <Animated.Text style={[styles.text]}>{paragraph}</Animated.Text>
    </Animated.View>
  );
};

export const AutoCarouselExample = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
        <AutoCarousel interval={5000}>
          <Slide
            headline="First headline"
            paragraph="This is the first slide"
          />
          <Slide
            headline="Second headline"
            paragraph="This is the second slide"
          />
          <Slide
            headline="Third headline"
            paragraph="This is the third slide"
          />
        </AutoCarousel>
    </SafeAreaView>
  );
};
