import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BACKGROUND_STROKE_COLOR, STROKE_COLOR, styles } from "./styles";
import Svg, { Circle } from "react-native-svg";
import { useCallback, useRef, useState } from "react";
import { ReText } from "react-native-redash";

const { width, height } = Dimensions.get("window");

const CIRCLE_LENGTH = 1000; // 2 * MATH.PI * Radius
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgressBar = () => {
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.round(progress.value * 100)}`;
  });

  const buttonText = useSharedValue("Start");

  useAnimatedReaction(
    () => progress.value,
    (value, prevValue) => {
      if (!prevValue) return
      if (value > prevValue) {
        buttonText.value = "Decrease";
      } else if (value < prevValue) {
        buttonText.value = "Increase";
      }
    }
  );

  const direction = useRef(1);

  const onPress = useCallback(() => {
    progress.value = withTiming(direction.current > 0 ? 1 : 0, {
      duration: 2000,
    });
    direction.current = direction.current * -1;
  }, []);

  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressText} />
      <Svg style={{ position: "absolute" }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
          fill="transparent"
        ></Circle>
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          fill="transparent"
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <ReText style={styles.buttonText} text={buttonText} pointerEvents="box-none" />
      </TouchableOpacity>
    </View>
  );
};
