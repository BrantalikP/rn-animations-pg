import type { SkPath } from "@shopify/react-native-skia";
import { Path } from "@shopify/react-native-skia";
import React from "react";
import { useVisualizer } from "./useVisualizer";

// Define the ref type for external interaction with the FourierVisualizerComp component
export type FourierVisualizerRefType = {
  draw: ({
    path,
    onComplete,
  }: {
    path: SkPath;
    onComplete?: () => void;
  }) => void;
  clear: () => void;
};

const FourierVisualizerComp = React.forwardRef<
  FourierVisualizerRefType,
  {
    strokeWidth?: number;
  }
>(({ strokeWidth = 2.5 }, ref) => {
  const { opacity, drawPath, resultPath, circlesPath } = useVisualizer({ ref });
  return (
    // Render the visualization paths
    <>
      <Path
        opacity={opacity}
        path={drawPath}
        strokeWidth={2.5}
        color="rgba(0, 0, 0, 0.2)"
        style="stroke"
      />

      <Path
        opacity={opacity}
        path={circlesPath}
        strokeWidth={0.8}
        color="rgba(0, 0, 0, 0.2)"
        style="stroke"
      />
      <Path
        opacity={opacity}
        path={resultPath}
        strokeWidth={strokeWidth}
        color="black"
        style="stroke"
      />
    </>
  );
});

export { FourierVisualizerComp };
