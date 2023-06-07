import { RootTabScreenProps } from "../types";

import { GridMagnification } from "../features/GridMagnificationSkia";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return <GridMagnification />;
}
