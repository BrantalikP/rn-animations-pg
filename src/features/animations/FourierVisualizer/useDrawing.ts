import { Skia } from "@shopify/react-native-skia";
import { useCallback, useRef } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
  withTiming,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const useDrawing = () => {
  // Shared value to represent the drawn path.
  const drawPath = useSharedValue(Skia.Path.Make());

  // Ref for the FourierVisualizer component.
  const ref = useRef<FourierVisualizerRefType>({
    // Usualy it shouldn't be necessary to define the ref type manually.
    // But I was getting this TypeError on Fast Refresh:
    // TypeError: Cannot assign to read-only property 'current', js engine: hermes
    clear: () => {},
    draw: () => {},
  });

  // Opacity value for animation.
  const opacity = useSharedValue(1);

  // Shared value to track if drawing is in progress.
  const isDrawing = useSharedValue(false);

  // Callback to handle the drawing of paths.
  const drawPathWrapper = useCallback(
    (svgString: string) => {
      const newPath = Skia.Path.MakeFromSVGString(svgString)!;
      isDrawing.value = true;
      ref.current?.draw({
        path: newPath,
        onComplete: () => {
          isDrawing.value = false;
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Define the pan gesture for drawing.
  const panGesture = Gesture.Pan()
    .onStart(({ x, y }) => {
      ref.current?.clear();
      isDrawing.value = false;
      drawPath.value.reset();
      opacity.value = withTiming(1);
      drawPath.value.moveTo(x, y);
      drawPath.value.lineTo(x, y);
      drawPath.value = Skia.Path.MakeFromSVGString(
        drawPath.value.toSVGString()
      )!;
    })
    .onChange(({ x, y }) => {
      drawPath.value.lineTo(x, y);
      drawPath.value = Skia.Path.MakeFromSVGString(
        drawPath.value.toSVGString()
      )!;
    })
    .onEnd(() => {
      opacity.value = withTiming(0);
      const svgString = drawPath.value.toSVGString();
      runOnJS(drawPathWrapper)(svgString);
    });

  // Animated style for the clear button.
  const rClearButton = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isDrawing.value ? 1 : 0),
      bottom: withSpring(isDrawing.value ? 65 : 0),
    };
  });
  return {
    panGesture,
    rClearButton,
    opacity,
    ref,
    drawPath,
  };
};
