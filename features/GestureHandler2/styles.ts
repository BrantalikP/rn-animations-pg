import { StyleSheet } from "react-native";

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
  },
});
