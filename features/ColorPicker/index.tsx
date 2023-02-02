import { useCallback, useEffect } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { ColorPickerComponent } from "./components/ColorPickerComponent";
import { styles } from "./styles";

const COLORS = [
  "red",
  "purple",
  "blue",
  "cyan",
  "green",
  "yellow",
  "orange",
  "black",
  "white",
];

export const ColorPicker = () => {
  const pickedColor = useSharedValue<string | number>(COLORS[0]);
  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickedColor.value,
    };
  });

  const onColorChange = useCallback((color: string | number) => {
    "worklet";
    pickedColor.value = color;
  }, []);
  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPickerComponent
          colors={COLORS}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
          onColorChange={onColorChange}
        />
      </View>
    </>
  );
};
