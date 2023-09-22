import type { StyleProp, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useGestures } from "./useGestures";

interface PressableScaleProps {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
export const PressableScale = ({
  children,
  onPress,
  style,
}: PressableScaleProps) => {
  const { gesture, rStyle } = useGestures({ onPress });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, rStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
};
