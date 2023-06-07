import { View, Text, Dimensions } from "react-native";
import React from "react";

import { styles } from "./styles";
import {
  Canvas,
  Group,
  Rect,
  RoundedRect,
  SweepGradient,
  vec,
} from "@shopify/react-native-skia";
import { RoundedItem } from "./rounded-item";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SQUARE_AMOUNT_HORIZONTAL = 10;
const SQUARE_CONTAINER_SIZE = SCREEN_WIDTH / SQUARE_AMOUNT_HORIZONTAL;
const SQUARE_AMOUNT_VERTICAL =
  Math.floor(SCREEN_HEIGHT / SQUARE_CONTAINER_SIZE) - 3;
const PADDING = 10;
const SQUARE_SIZE = SQUARE_CONTAINER_SIZE - PADDING;

const CANVAS_WIDTH = SCREEN_WIDTH;
const CANVAS_HEIGHT = SQUARE_AMOUNT_VERTICAL * SQUARE_CONTAINER_SIZE;

const GridMagnification = () => {
  return (
    <View style={styles.container}>
      <Canvas
        style={{
          height: CANVAS_HEIGHT,
          width: CANVAS_WIDTH,
        }}
      >
        <Group>
          {new Array(SQUARE_AMOUNT_HORIZONTAL).fill(0).map((_, i) => {
            return new Array(SQUARE_AMOUNT_VERTICAL).fill(0).map((_, j) => {
              return (
                <RoundedItem
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
