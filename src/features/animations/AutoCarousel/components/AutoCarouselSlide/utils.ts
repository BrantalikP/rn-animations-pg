import { Extrapolate, interpolate } from "react-native-reanimated";

// This is required for the interpolation to work properly between "teleport" slides.
// without this there would be jumps in the animations as the two slides that are
// connected, i.e. 4->1 or 0->3 would not be interpolated properly.
export const interpolateLooped = (
  value: number,
  index: number,
  totalLength: number,
  values: {
    incoming: number;
    inside: number;
    outgoing: number;
  }
) => {
  "worklet";
  const { incoming, inside, outgoing } = values;
  let adjustedIndex = index;

  if (index === 0) {
    adjustedIndex = Math.max(totalLength - 2, 0);
  }

  if (index === totalLength - 1) {
    adjustedIndex = 1;
  }

  const inputRange = [
    0,
    Math.min(1, adjustedIndex - 1),
    adjustedIndex - 1,
    adjustedIndex,
    adjustedIndex + 1,
    Math.max(totalLength - 2, adjustedIndex + 1),
    totalLength - 1,
  ];

  const outputValues = [
    inside,
    incoming,
    outgoing,
    inside,
    incoming,
    outgoing,
    inside,
  ];

  return interpolate(value, inputRange, outputValues, Extrapolate.CLAMP);
};
