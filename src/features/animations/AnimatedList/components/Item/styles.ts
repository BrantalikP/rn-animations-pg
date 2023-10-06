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
});
