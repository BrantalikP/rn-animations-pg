import { RootTabScreenProps } from "../types";
import { GestureHandler2 } from "../features/GestureHandler2";
import { ColorPicker } from "../features";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return <ColorPicker />;
}
