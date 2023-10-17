import { Slot, router } from "expo-router";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";

export default function DetailLayout() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(2000, withTiming(0.2, { duration: 1000 }));
  }, []);

  return (
    <>
      {router.canGoBack() && (
        <Animated.View style={[styles.container, { opacity }]}>
          <MaterialIcons
            name="chevron-left"
            onPress={router.back}
            onPressIn={() => (opacity.value = 1)}
            onPressOut={() => (opacity.value = 0.2)}
            size={32}
            style={styles.icon}
            color="white"
          />
        </Animated.View>
      )}
      <Slot />
    </>
  );
}
