import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  onPress?: () => void;
}
export const useGestures = ({ onPress }: Props) => {
  const isActive = useSharedValue(false);

  const gesture = Gesture.Tap()
    .onTouchesDown(() => {
      isActive.value = true;
    })
    .onTouchesUp(() => {
      if (onPress) {
        runOnJS(onPress)();
      }
      isActive.value = false;
    })
    .onFinalize(() => {
      isActive.value = false;
    })
    .maxDuration(10000);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isActive.value ? 0.95 : 1),
        },
      ],
    };
  });
  return {
    gesture,
    rStyle,
  };
};
