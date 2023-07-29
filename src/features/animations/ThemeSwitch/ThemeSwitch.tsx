import Touchable from "react-native-skia-gesture";
import { ThemeComponent } from "./ThemeComponent";
import { useValue } from "@shopify/react-native-skia";

const ThemeSwitch = () => {
  const size = useValue({ width: 0, height: 0 });
  return (
    <Touchable.Canvas style={{ flex: 1 }} onSize={size}>
      <ThemeComponent size={size} />
    </Touchable.Canvas>
  );
};

export { ThemeSwitch };
