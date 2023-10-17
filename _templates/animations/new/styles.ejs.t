---
to: src/features/animations/<%= h.changeCase.pascal(animationName) %>/styles.ts
---
import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  text: {
    color: theme.textPrimary,
    fontSize: 40,
    textTransform: "uppercase",
    fontWeight: "bold",
    width: "80%",
    textAlign: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1, 
    justifyContent: "center"
  }
});