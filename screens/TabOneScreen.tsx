import { StyleSheet } from "react-native";

import { RootTabScreenProps } from "../types";
import { CircularProgressBar } from "../features";
import { FlatList } from "../features/Flatlist";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return <FlatList />;
}
