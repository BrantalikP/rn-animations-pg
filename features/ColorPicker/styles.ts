import { Dimensions, StyleSheet } from "react-native";

const BACKGROUND_COLOR = "rgba(0,0,0,0.9)";
const { width } = Dimensions.get("window");
const CIRCLE = width * 0.8;
export const PICKER_WIDTH = width * 0.9;

export const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  gradient: { height: 40, width: PICKER_WIDTH, borderRadius: 20 },
  circle: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
  },
});
