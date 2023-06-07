import { RoundedRect } from "@shopify/react-native-skia";
import React from "react";
import { View, Text } from "react-native";

interface IRoundedItem {
  x: number;
  y: number;
  width: number;
  height: number;
  key: string;
}

const RoundedItem = React.memo((props: IRoundedItem) => {
  return <RoundedRect {...props} r={4} />;
});

export { RoundedItem };
