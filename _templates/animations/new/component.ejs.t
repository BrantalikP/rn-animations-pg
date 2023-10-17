---
to: src/features/animations/<%= h.changeCase.pascal(animationName) %>/index.tsx
---
import React, { useEffect } from "react";
import { Text } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";

export const <%= h.changeCase.pascal(animationName) %> = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Text style={styles.text}><%= animationName %></Text>
    </Animated.View>
  );
};
