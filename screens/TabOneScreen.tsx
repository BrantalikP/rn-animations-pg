import { StyleSheet } from "react-native";

import { RootTabScreenProps } from "../types";
import { ColorPicker } from "../features";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return <ColorPicker />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
