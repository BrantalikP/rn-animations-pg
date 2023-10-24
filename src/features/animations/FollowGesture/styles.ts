import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const SIZE = 80;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    height: SIZE,
    aspectRatio: 1,
    borderRadius: SIZE / 1,
    opacity: 0.8,
    backgroundColor: "blue",
    position: "absolute",
    top: height / 2 - SIZE / 2,
    left: width / 2 - SIZE / 2,
  },
});
