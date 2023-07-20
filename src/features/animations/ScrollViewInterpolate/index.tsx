import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { styles } from "./styles";
import { Page } from "./components/Page";
const WORDS = ["Hello", "World", "Reanimated", "2.0"];

export const ScrollViewInterpolate = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      pagingEnabled
      style={styles.container}
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {WORDS.map((word, index) => {
        return (
          <Page
            key={index.toString()}
            title={word}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};
