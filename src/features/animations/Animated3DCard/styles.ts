import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export const HEIGHT = 256;
export const WIDTH = SCREEN_WIDTH * 0.9;

export const CARD_HEIGHT = HEIGHT - 5;
export const CARD_WIDTH = WIDTH - 5;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
