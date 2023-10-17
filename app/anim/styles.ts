import { theme } from "@/theme";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
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
    left: 16,
  },
  icon: {
    borderRadius: 16,
    overflow: "hidden",
  },
});
