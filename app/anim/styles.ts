import { theme } from "@/theme";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const iconStyles = {
  position: "absolute",
  height: 50,
  width: 50,
  backgroundColor: theme.secondary,
  zIndex: 1000,
  borderRadius: 25,
  top: Constants.statusBarHeight,
  alignItems: "center",
  justifyContent: "center",
  padding: 5,
} as const;

export const styles = StyleSheet.create({
  container: {
    ...iconStyles,
    left: 16,
  },
  rightContainer: {
    ...iconStyles,
    right: 16,
  },
  icon: {
    borderRadius: 16,
    overflow: "hidden",
  },
  animationOrigin: {
    position: "absolute",
    width: 50,
    height: 50,
  },
});
