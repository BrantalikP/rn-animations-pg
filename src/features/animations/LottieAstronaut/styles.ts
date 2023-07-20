import { StyleSheet } from "react-native";
export const FLOATING_ACTION_BUTTON_SIZE = 70;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  scrollView: {
    flex: 1,
  },
  itemContainer: {
    height: 100,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  item: {
    flex: 1,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5,
  },
  floatingButton: {
    height: FLOATING_ACTION_BUTTON_SIZE,
    width: FLOATING_ACTION_BUTTON_SIZE,
    backgroundColor: "black",
    borderRadius: FLOATING_ACTION_BUTTON_SIZE / 2,
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5,
    position: "absolute",
    bottom: 64,
    right: 32,
  },
});
