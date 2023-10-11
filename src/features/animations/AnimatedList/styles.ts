import { Dimensions, StyleSheet } from "react-native";

export const SPACING = 10;

export const OFFSET = 0;

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  itemWrapper: {
    width: width / 2,
    height: height / 2,
  },
  itemTransform: {
    transform: [
      { scale: 0.47 },
      { translateX: -width / 4 },
      { translateY: -height / 2 },
    ],
  },
});
