import { useEffect } from "react";
import { Dimensions, Image } from "react-native";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { styles } from "./styles";

const imageUri =
  "https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const { width, height } = Dimensions.get("screen");
export const PinchGestures = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pitchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd(event, context) {
        scale.value = withTiming(1);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: +width / 2 },
        { translateY: +height / 2 },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });
  return (
    <PinchGestureHandler onGestureEvent={pitchHandler}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage
          style={[{ flex: 1 }, rStyle]}
          source={{ uri: imageUri }}
        />
        <Animated.View style={[styles.focalPoint, focalPointStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
};
