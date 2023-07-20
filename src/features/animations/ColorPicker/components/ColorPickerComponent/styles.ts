import { StyleSheet } from "react-native";

export const CIRCLE_PICKER_SIZE = 45;
export const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;
export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  picker: {
    position: "absolute",
    backgroundColor: "#fff",
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  internalPicker: {
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
  },
});
