import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { SIZE, styles } from "./styles";

interface AnimatedPosition {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const useFollowAnimatedPosition = ({ x, y }: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: followX.value }, { translateY: followY.value }],
    };
  });

  return { rStyle, followX, followY };
};

export const GestureHandler2 = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const {
    rStyle: rBlueCircleStyle,
    followX: blueFollowX,
    followY: blueFollowY,
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
  });

  const {
    rStyle: rredBlueCircleStyle,
    followX: redFollowX,
    followY: redFollowY,
  } = useFollowAnimatedPosition({
    x: blueFollowX,
    y: blueFollowY,
  });

  const { rStyle: rgreenBlueCircleStyle } = useFollowAnimatedPosition({
    x: redFollowX,
    y: redFollowY,
  });
  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value > SCREEN_WIDTH / 2) {
        translateX.value = SCREEN_WIDTH - SIZE;
      } else {
        translateX.value = 0;
      }
    });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          { backgroundColor: "green" },
          rgreenBlueCircleStyle,
        ]}
      />
      <Animated.View
        style={[styles.circle, { backgroundColor: "red" }, rredBlueCircleStyle]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.circle, rBlueCircleStyle]} />
      </GestureDetector>
    </View>
  );
};
