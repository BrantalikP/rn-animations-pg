import { View } from "react-native";
import { CARD_HEIGHT, CARD_WIDTH, HEIGHT, WIDTH, styles } from "./styles";
import { BackgroundGradient } from "./BackgroundGradient";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

interface IAnimated3DCard {}

const Animated3DCard = ({}: IAnimated3DCard) => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const gesture = Gesture.Pan()
    .onBegin((event) => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolate.CLAMP)
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolate.CLAMP)
      );
    })
    .onUpdate((event) => {
      rotateX.value = interpolate(
        event.y,
        [0, CARD_HEIGHT],
        [10, -10],
        Extrapolate.CLAMP
      );
      rotateY.value = interpolate(
        event.x,
        [0, CARD_WIDTH],
        [-10, 10],
        Extrapolate.CLAMP
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 300 },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <BackgroundGradient width={WIDTH} height={HEIGHT} />
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                height: CARD_HEIGHT,
                width: CARD_WIDTH,

                backgroundColor: "black",
                position: "absolute",
                borderRadius: 20,
                zIndex: 9999,
              },
              rStyle,
            ]}
          >
            <View
              style={{
                position: "absolute",
                bottom: "10%",
                left: "10%",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  height: 50,
                  aspectRatio: 1,
                  borderRadius: 25,
                  backgroundColor: "#272F46",
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 10,
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    height: 20,
                    width: 80,
                    borderRadius: 25,
                    backgroundColor: "#272F46",
                  }}
                />
                <View
                  style={{
                    height: 20,
                    width: 80,
                    borderRadius: 25,
                    backgroundColor: "#272F46",
                  }}
                />
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export { Animated3DCard };
