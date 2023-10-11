import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    borderRadius: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#737373",
    borderWidth: 1,
  },
  componentWrapper: {
    flex: 1,
    opacity: 0.8,
    width: "100%",
  },
  label: {
    position: "absolute",
    bottom: 0,
    color: "white",
    fontSize: 20,
    zIndex: 100,
    padding: 6,
    left: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: "#ed0c32",
  },
  transformWrapper: {
    width: width / 2,
    height: height / 2,
    borderWidth: 1
  },
  itemTransform: {
    transform: [
      { scale: 0.47 },
      { translateX: -width / 4 },
      { translateY: -height / 2 },
    ],
  },
});
