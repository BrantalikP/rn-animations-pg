import { StyleSheet, Dimensions } from "react-native";

export const { height, width } = Dimensions.get("window");

export const SIZE = width * 0.7;

export const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0,0,256,0.4)",
  },
  text: {
    fontSize: 40,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
