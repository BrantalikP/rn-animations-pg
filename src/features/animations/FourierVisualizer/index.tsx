import { MaterialIcons } from "@expo/vector-icons";
import { Canvas, Path } from "@shopify/react-native-skia";
import { Text, View } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { PressableScale } from "./Components/PressableScale";
import { styles } from "./styles";
import { useDrawing } from "./useDrawing";
export const FourierVisualizer = () => {
  const { rClearButton, isDrawing, ref, drawPath, opacity, panGesture } =
    useDrawing();
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
      <PressableScale
        style={[styles.clearButton, rClearButton]}
        onPress={() => {
          isDrawing.value = false;
          ref.current?.clear();
        }}
      >
        <MaterialIcons name="clear" size={24} color="white" />
      </PressableScale>
    </GestureHandlerRootView>
  );
};
