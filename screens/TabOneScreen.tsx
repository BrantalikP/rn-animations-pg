import { StyleSheet } from "react-native";

import { RootTabScreenProps } from "../types";
import { CircularProgressBar } from "../features";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return <CircularProgressBar />;
}
