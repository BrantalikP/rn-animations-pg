import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: width,
    height: height,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  componentWrapper: {
    flex: 1,
    width: "100%",
  },
  label: {
    position: "absolute",
    bottom: 0,
    color: "white",
    fontSize: 40,
    padding: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  transformWrapper: {
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
