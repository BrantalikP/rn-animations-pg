import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const SPACING = 10;

export const OFFSET = 0;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: SPACING,
  },
});
