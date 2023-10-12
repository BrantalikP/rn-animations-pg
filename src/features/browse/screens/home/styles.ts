import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const SPACING = 10;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: SPACING,
  },
});
