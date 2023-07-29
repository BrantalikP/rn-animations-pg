import {
  Skia,
  SkiaMutableValue,
  runTiming,
  useComputedValue,
  useFont,
  useValue,
} from "@shopify/react-native-skia";
import { APP_TEXT, SQUARE_SIZE, colors } from "../presets";
import { useCallback } from "react";

interface Props {
  size: SkiaMutableValue<{
    width: number;
    height: number;
  }>;
}

export const useTheme = ({ size }: Props) => {
  const selectedIndex = useValue(0);
  const previousSelectedIndex = useValue(0);
  const radius = useValue(0);

  const font = useFont(require("../assets/Outfit.ttf"), 40);

  const canvasWidth = useComputedValue(() => size.current.width, [size]);
  const canvasHeight = useComputedValue(() => size.current.height, [size]);

  const selectedBackgroundColor = useComputedValue(() => {
    return colors[selectedIndex.current]?.background || "black";
  }, [colors, selectedIndex]);

  const previousSelectedBackgroundColor = useComputedValue(() => {
    return colors[previousSelectedIndex.current]?.background || "black";
  }, [colors, previousSelectedIndex]);

  const selectedTextColor = useComputedValue(() => {
    return colors[selectedIndex.current]?.text || "black";
  }, [colors, selectedIndex]);

  const previousSelectedTextColor = useComputedValue(() => {
    return colors[previousSelectedIndex.current]?.text || "black";
  }, [colors, previousSelectedIndex]);

  const coordinates = useComputedValue(() => {
    const squares = [
      { offsetX: -1, offsetY: 0 },
      { offsetX: 0, offsetY: 0 },
      { offsetX: 1, offsetY: 0 },
      { offsetX: 0, offsetY: 1 },
      { offsetX: -1, offsetY: 1 },
      { offsetX: 1, offsetY: 1 },
    ];
    return squares.map(({ offsetX, offsetY }) => ({
      cx: canvasWidth.current / 2 - SQUARE_SIZE / 2 + offsetX * SQUARE_SIZE * 2,
      cy:
        canvasHeight.current / 2 - SQUARE_SIZE / 2 + offsetY * SQUARE_SIZE * 2,
    }));
  }, [canvasWidth, canvasHeight]);

  const clipPath = useComputedValue(() => {
    const path = Skia.Path.Make();

    const x = coordinates.current[selectedIndex.current]?.cx ?? 0;
    const y = coordinates.current[selectedIndex.current]?.cy ?? 0;
    path.addCircle(x + SQUARE_SIZE / 2, y + SQUARE_SIZE / 2, radius.current);
    return path;
  }, [selectedIndex, coordinates, radius]);

  const textY = useComputedValue(() => {
    return canvasHeight.current / 2 - 65;
  }, [canvasHeight]);

  const textX = useComputedValue(() => {
    return canvasWidth.current / 2 - (font?.getTextWidth(APP_TEXT) || 0) / 2;
  }, [canvasWidth, font]);

  const onSelectSquare = useCallback(
    (index: number) => {
      if (index === selectedIndex.current) return;

      radius.current = 0;
      runTiming(
        radius,
        canvasHeight.current,
        {
          duration: 500,
        },
        (endValue) => {
          const isFinished = endValue === canvasHeight.current;
          if (isFinished) {
            previousSelectedIndex.current = index;
            radius.current = 0;
          }
        }
      );
      previousSelectedIndex.current = selectedIndex.current;
      selectedIndex.current = index;
    },
    [selectedIndex, previousSelectedIndex, canvasHeight, radius]
  );

  return {
    previousSelectedBackgroundColor,
    selectedBackgroundColor,
    selectedIndex,
    previousSelectedIndex,
    selectedTextColor,
    previousSelectedTextColor,
    coordinates,
    radius,
    textX,
    textY,
    canvasWidth,
    canvasHeight,
    font,
    clipPath,
    onSelectSquare,
  };
};
