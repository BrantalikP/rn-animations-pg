import Touchable from "react-native-skia-gesture";
import { ThemeComponent } from "./ThemeComponent";
import { useValue } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const ThemeSwitch = () => {
  const size = useValue({ width, height });
  return (
    <Touchable.Canvas style={{ flex: 1 }} onSize={size}>
      <ThemeComponent size={size} />
    </Touchable.Canvas>
  );
};

export { ThemeSwitch };
