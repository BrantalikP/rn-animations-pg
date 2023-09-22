import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1 },
  canvas: { flex: 1, backgroundColor: "#D4D4D4" },
  clearButton: {
    position: "absolute",
    bottom: 100,
    height: 64,
    aspectRatio: 1,
    backgroundColor: "#111",
    right: 30,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
