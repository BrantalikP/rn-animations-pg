import { View, SafeAreaView } from "react-native";
import AutoCarousel from "./components/AutoCarousel";
import { styles } from "./styles";
import { useAutoCarouselSlideIndex } from "./components/AutoCarouselSlide/context";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { interpolateLooped, interpolateLoopedColor } from "./components/AutoCarouselSlide/utils";
import { useAutoCarouselContext } from "./components/AutoCarousel/context";

const Slide = ({
  headline,
  paragraph,
  color,
}: {
  headline: string;
  paragraph: string;
  color: string;
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
      })
    };
  });

  const headlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolateLooped(scrollValue.value, index, total, {
            incoming: -600,
            inside: 0,
            outgoing: 600,
          }),
        },
      ],
      opacity: interpolateLooped(scrollValue.value, index, total, {
        incoming: 0,
        inside: 1,
        outgoing: 0,
      }),
    };
  });

  const paragraphStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolateLooped(scrollValue.value, index, total, {
            incoming: -550,
            inside: 0,
            outgoing: 550,
          }),

        },
      ],
        opacity: interpolateLooped(scrollValue.value, index, total, {
        incoming: 0,
        inside: 1,
        outgoing: 0,
      }),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.Text style={[styles.headline]}>
        {headline}
      </Animated.Text>
      <Animated.Text style={[styles.text]}>{paragraph}</Animated.Text>
    </Animated.View>
  );
};

export const AutoCarouselExample = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <AutoCarousel interval={5000}>
          <Slide
            headline="First headline"
            paragraph="This is the first slide"
            color="red"
          />
          <Slide
            headline="Second headline"
            paragraph="This is the second slide"
            color="green"
          />
          <Slide
            headline="Third headline"
            paragraph="This is the third slide"
            color="blue"
          />
        </AutoCarousel>
      </View>
    </SafeAreaView>
  );
};
