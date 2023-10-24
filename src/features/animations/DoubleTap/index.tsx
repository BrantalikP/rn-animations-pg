import { useCallback, useRef } from "react";
import { View, Image, ImageBackground, Text } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";

export const DoubleTap = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const doubleTapRef = useRef();

  const rStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: Math.max(scale.value, 0) }] };
  });
  const rTextStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const onDoubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, (isFInished) => {
      if (isFInished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const onSingleTap = useCallback(() => {
    opacity.value = withTiming(0, undefined, (isFInished) => {
      if (isFInished) {
        opacity.value = withDelay(500, withSpring(1));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}
        >
          <Animated.View>
            <ImageBackground
              source={require("./assets/image.webp")}
              style={styles.image}
            >
              <AnimatedImage
                source={require("./assets/heart.png")}
                style={[
                  styles.image,
                  {
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.3,
                    shadowRadius: 35,
                  },
                  rStyle,
                ]}
                resizeMode="center"
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};
