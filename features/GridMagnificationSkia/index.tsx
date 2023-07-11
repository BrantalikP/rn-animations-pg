import { View } from "react-native";
import React from "react";

import { styles } from "./styles";
import {
  Canvas,
  Group,
  Rect,
  RoundedRect,
  SweepGradient,
  runTiming,
  useTouchHandler,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { RoundedItem } from "./rounded-item";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PADDING,
  SQUARE_AMOUNT_HORIZONTAL,
  SQUARE_AMOUNT_VERTICAL,
  SQUARE_CONTAINER_SIZE,
  SQUARE_SIZE,
} from "./constants";

const GridMagnification = () => {
  const touchedPoint = useValue<{ x: number; y: number } | null>(null);

  const progress = useValue(0);

  const touchHandler = useTouchHandler({
    onStart: (event) => {
      runTiming(progress, 1, { duration: 300 });
      touchedPoint.current = { x: event.x, y: event.y };
    },
    onActive: (event) => {
      touchedPoint.current = { x: event.x, y: event.y };
    },
    onEnd: (event) => {
      runTiming(progress, 0, { duration: 300 });
      touchedPoint.current = null;
    },
  });

  return (
    <View style={styles.container}>
      <Canvas
        style={{
          height: CANVAS_HEIGHT,
          width: CANVAS_WIDTH,
        }}
        onTouch={touchHandler}
      >
        <Group>
          {new Array(SQUARE_AMOUNT_HORIZONTAL).fill(0).map((_, i) => {
            return new Array(SQUARE_AMOUNT_VERTICAL).fill(0).map((_, j) => {
              return (
                <RoundedItem
                  progress={progress}
                  point={touchedPoint}
                  key={`${i + j}`}
                  x={i * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  y={j * SQUARE_CONTAINER_SIZE + PADDING / 2}
                  width={SQUARE_SIZE}
                  height={SQUARE_SIZE}
                />
              );
            });
          })}
          <SweepGradient
            c={vec(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)}
            colors={["cyan", "magenta", "yellow", "cyan"]}
          />
        </Group>
      </Canvas>
    </View>
  );
};

export { GridMagnification };
