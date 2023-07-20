import { Dimensions, StyleSheet } from "react-native";

const { width: SIZE } = Dimensions.get("window");
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  heart: {},
  guitar: { fontSize: 40, textAlign: "center", marginTop: 35 },
});
