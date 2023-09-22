import { Canvas, Path } from "@shopify/react-native-skia";
import { Text, View } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { styles } from "./styles";
import { useDrawing } from "./useDrawing";
export const FourierVisualizer = () => {
  const { drawPath, opacity, panGesture } = useDrawing();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={styles.container}>
          <Canvas style={styles.canvas}>
            <Path
              path={drawPath}
              strokeWidth={10}
              style={"stroke"}
              opacity={opacity}
            />
          </Canvas>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
