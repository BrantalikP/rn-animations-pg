import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { styles } from "./styles";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { theme } from "@/theme";

interface PageProps {
  index: number;
  title: string;
  translateX: Animated.SharedValue<number>;
}

export const { width: PAGE_WIDTH } = Dimensions.get("window");

export const Page: React.FC<PageProps> = ({ title, index, translateX }) => {
  const pageOffset = PAGE_WIDTH * index;
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value + pageOffset }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `rgba(0,0,256,0.${index + 2})`,
          alignItems: "center",
          justifyContent: "center",
        },
        rStyle,
      ]}
    >
      <Text
        style={{
          fontSize: 70,
          fontWeight: "700",
          letterSpacing: 1.5,
          color: theme.textPrimary,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Text>
    </Animated.View>
  );
};
