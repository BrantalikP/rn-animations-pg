import type { SkiaValue } from "@shopify/react-native-skia";
import {
  runSpring,
  useValue,
  useComputedValue,
  Group,
  RoundedRect,
} from "@shopify/react-native-skia";
import React from "react";
import Touchable, { useGestureHandler } from "react-native-skia-gesture";

interface ISelectableCircle {
  cx: SkiaValue<number>;
  cy: SkiaValue<number>;
  size: number;
  color: string;
  onSelect?: () => void;
  selectedIndex: SkiaValue<number>;
  index: number;
  borderColor?: string;
}

const SelectableCircle = ({
  size,
  cx,
  cy,
  color,
  selectedIndex,
  index,
  borderColor = "white",
  onSelect,
}: ISelectableCircle) => {
  const scale = useValue(1);
  const transform = useComputedValue(() => {
    return [{ scale: scale.current }];
  }, [scale]);

  const origin = useComputedValue(() => {
    return {
      x: cx.current + size / 2,
      y: cy.current + size / 2,
    };
  }, [cx, cy]);

  const animatedColor = useComputedValue(() => {
    return selectedIndex.current === index ? borderColor : color;
  }, [color, borderColor, selectedIndex, index]);

  const touchableHandler = useGestureHandler({
    onStart: () => {
      runSpring(scale, 0.9, {
        damping: 5,
        mass: 1,
      });
    },
    onEnd: () => {
      runSpring(scale, 1, {
        damping: 5,
        mass: 1,
      });
      onSelect?.();
    },
  });

  return (
    <Group origin={origin} transform={transform}>
      <Touchable.RoundedRect
        x={cx}
        y={cy}
        width={size}
        height={size}
        r={100}
        color={color}
        {...touchableHandler}
      />
      <RoundedRect
        x={cx}
        y={cy}
        width={size}
        height={size}
        r={100}
        strokeWidth={2}
        color={animatedColor}
        style={"stroke"}
      />
    </Group>
  );
};

type SelectableCircleContainerProps = Omit<ISelectableCircle, "cx" | "cy"> & {
  coordinates: SkiaValue<{ cx: number; cy: number }[]>;
};

const SelectableCircleContainer: React.FC<SelectableCircleContainerProps> = ({
  coordinates,
  index,
  ...props
}) => {
  const cx = useComputedValue(
    () => coordinates.current[index]?.cx || 0,
    [coordinates, index]
  );
  const cy = useComputedValue(
    () => coordinates.current[index]?.cy || 0,
    [coordinates, index]
  );

  return <SelectableCircle cx={cx} cy={cy} {...props} index={index} />;
};

export { SelectableCircle, SelectableCircleContainer };
