import { Extrapolate, interpolate, interpolateColor } from "react-native-reanimated";

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


export const interpolateLoopedColor = (
  value: number,
  index: number,
  totalLength: number,
  values: {
    incoming: string;
    inside: string;
    outgoing: string;
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

  return interpolateColor(value, inputRange, outputValues);
};
