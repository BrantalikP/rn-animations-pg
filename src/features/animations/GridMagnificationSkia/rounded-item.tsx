import {
  Extrapolate,
  Group,
  RoundedRect,
  SkiaMutableValue,
  interpolate,
  useComputedValue,
  useValue,
} from "@shopify/react-native-skia";
import React from "react";
import { View, Text } from "react-native";
import { CANVAS_HEIGHT, CANVAS_WIDTH, MAX_DISTANCE } from "./constants";

interface IRoundedItem {
  x: number;
  y: number;
  width: number;
  height: number;
  key: string;
  point: SkiaMutableValue<{ x: number; y: number } | null>;
  progress: SkiaMutableValue<number>;
}

const RoundedItem = React.memo(
  ({ point, progress, ...squarePoint }: IRoundedItem) => {
    const { x, y, width, height } = squarePoint;
    const previousDistance = useValue(0);
    const previousTouchPoint = useValue({
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
    });
    const distance = useComputedValue(() => {
      if (point.current === null) return previousDistance.current;
      previousDistance.current = Math.sqrt(
        (point.current.x - x) ** 2 + (point.current.y - y) ** 2
      );
      return previousDistance.current;
    }, [point]);

    const scale = useComputedValue(() => {
      return interpolate(
        distance.current * progress.current,
        [0, MAX_DISTANCE / 2],
        [1, 0],
        {
          extrapolateLeft: Extrapolate.CLAMP,
          extrapolateRight: Extrapolate.CLAMP,
        }
      );
    }, [distance, progress]);

    const scaledWidth = useComputedValue(() => {
      return scale.current * width;
    }, [scale]);

    const scaledHeight = useComputedValue(() => {
      return scale.current * height;
    }, [scale]);

    const transform = useComputedValue(() => {
      return [{ scale: scale.current }];
    }, [scale]);

    const origin = useComputedValue(() => {
      if (point.current === null) {
        return previousTouchPoint.current;
      }
      previousTouchPoint.current = point.current;
      return previousTouchPoint.current;
    }, [point]);

    return (
      <Group origin={origin} transform={transform}>
        <RoundedRect {...squarePoint} r={4} />
      </Group>
    );
  }
);

export { RoundedItem };
