import { theme } from "@/theme";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 80,
    width: "90%",
    marginTop: 20,
    borderRadius: 15,
    alignSelf: "center",
    backgroundColor: theme.accent2,
  },
});
