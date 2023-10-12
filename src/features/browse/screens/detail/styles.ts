import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    padding: 6,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  contentCard: {
    backgroundColor: "#2E2E2E",
    padding: 12,
    gap: 18,
    borderRadius: 6,
    flex: 1,
    marginTop: 50,
    overflow: "hidden",
    marginBottom: 50,
  },
  tagWrapper: {
    flexDirection: "row",
    gap: 12,
  },
  description: {
    fontSize: 16,
    color: "white",
  },
  tag: {
    backgroundColor: "#ed0c32",
    color: "white",
    borderRadius: 12,
    padding: 4,
    paddingHorizontal: 12,
    overflow: "hidden",
    fontWeight: "bold",
  },
});
