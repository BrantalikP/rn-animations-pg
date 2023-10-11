import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headline: {
    color: theme.textPrimary,
    fontSize: 20,
    padding: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  paragraph: {
    fontSize: 16,
    color: theme.textPrimary,
  },
  tag: {
    backgroundColor: theme.accent1,
    color: theme.textPrimary,
    borderRadius: 12,
    padding: 4,
    paddingHorizontal: 12,
    overflow: "hidden",
    fontWeight: "bold",
  },
});
