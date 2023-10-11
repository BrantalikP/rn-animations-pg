import { theme } from "@/theme";
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
    borderColor: theme.border,
    borderWidth: 1,
  },
  componentWrapper: {
    flex: 1,
    opacity: 0.8,
    width: "100%",
  },
  labelWrapper: {
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    left: 6,
    backgroundColor: theme.accent1,
  },
  transformWrapper: {
    width: width / 2,
    height: height / 2,
    borderWidth: 1,
  },
  itemTransform: {
    transform: [
      { scale: 0.47 },
      { translateX: -width / 4 },
      { translateY: -height / 2 },
    ],
  },
  detailAnimationOrigin: {
    position: "absolute",
    width: 32,
    height: 32,
    zIndex: 1000,
    right: 12,
    top: 32,
    backgroundColor: "transparent",
    borderRadius: 20,
    overflow: "hidden",
  },
  infoIconWrapper: {
    position: "absolute",
    zIndex: 1001,
    right: 12,
    top: 32,
  },
});
