import type { SkiaMutableValue, SkiaValue } from "@shopify/react-native-skia";
import { Group, Rect, Text } from "@shopify/react-native-skia";
import { useCallback } from "react";

import { APP_TEXT, SQUARE_SIZE, colors } from "./presets";
import { useTheme } from "./hooks/useTheme";
import { SelectableCircleContainer } from "./components/SelectableCircle";

interface IThemeComponent {
  size: SkiaMutableValue<{
    width: number;
    height: number;
  }>;
}

interface IBackground {
  backgroundColor: SkiaValue<string>;
  textColor: SkiaValue<string>;
}

const ThemeComponent = ({ size }: IThemeComponent) => {
  const {
    previousSelectedBackgroundColor,
    previousSelectedTextColor,
    selectedBackgroundColor,
    selectedTextColor,
    canvasWidth,
    canvasHeight,
    font,
    textX,
    textY,
    coordinates,
    clipPath,
    selectedIndex,
    onSelectSquare,
  } = useTheme({ size });

  const BackgroundComponent = useCallback(
    ({ backgroundColor, textColor }: IBackground) => {
      return (
        <>
          <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            color={backgroundColor}
          />
          {font && (
            <Text
              font={font}
              text={APP_TEXT}
              color={textColor}
              x={textX}
              y={textY}
            />
          )}
        </>
      );
    },
    [canvasHeight, canvasWidth, font, textX, textY]
  );
  return (
    <Group>
      {BackgroundComponent({
        backgroundColor: previousSelectedBackgroundColor,
        textColor: previousSelectedTextColor,
      })}
      <Group clip={clipPath}>
        {BackgroundComponent({
          backgroundColor: selectedBackgroundColor,
          textColor: selectedTextColor,
        })}
      </Group>
      {coordinates.current.map((_, index) => (
        <SelectableCircleContainer
          color={colors[index]?.background || "black"}
          key={index}
          size={SQUARE_SIZE}
          coordinates={coordinates}
          selectedIndex={selectedIndex}
          borderColor={colors[index]?.text || "white"}
          index={index}
          onSelect={() => {
            onSelectSquare(index);
          }}
        />
      ))}
    </Group>
  );
};

export { ThemeComponent };
