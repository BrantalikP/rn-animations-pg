import { theme } from "@/theme";
import { Dimensions, StyleSheet } from "react-native";
export const BACKGROUND_COLOR = theme.primary;
export const BACKGROUND_STROKE_COLOR = theme.primary;
export const STROKE_COLOR = theme.accent2;

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },

  progressText: {
    fontSize: 80,
    color: "rgba(256, 256, 256, 0.7)",
  },
  button: {
    borderRadius: 25,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 80,
  },
  buttonText: {
    fontSize: 40,
    color: "white",
  },
});
