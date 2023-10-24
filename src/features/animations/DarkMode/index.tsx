import { useState } from "react";
import { Switch } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";
import { theme as colorTheme } from "@/theme";

const Colors = {
  dark: {
    background: "#1E1E1E",
    circle: "#252525",
    text: "#f8f8f8",
  },
  light: {
    background: "#F8F8F8",
    circle: "#FFF",
    text: "#1E1E1E",
  },
};

const SWITCH_TRACK_COLOR = {
  true: colorTheme.primary,
  false: "rgba(0,0,0,0.1)",
};

export const DarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const progress = useDerivedValue(() => {
    return theme === "dark" ? withTiming(1) : withTiming(0);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return { backgroundColor };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    );
    return { backgroundColor };
  });
  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return { color };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>Theme</Animated.Text>
      <Animated.View style={[styles.circle, rCircleStyle]}>
        <Switch
          value={theme === "dark"}
          onValueChange={(toggled) => setTheme(toggled ? "dark" : "light")}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor={colorTheme.accent1}
        />
      </Animated.View>
    </Animated.View>
  );
};
