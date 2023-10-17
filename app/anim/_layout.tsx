import { Slot, router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";
import { DataIds } from "@/features/browse/preset";

export default function DetailLayout() {
  const opacity = useSharedValue(1);

  const { id } = useLocalSearchParams<{ id: [DataIds] }>();
  const extractedId: DataIds | undefined = id?.[0];

  useEffect(() => {
    opacity.value = withDelay(2000, withTiming(0.2, { duration: 1000 }));
  }, []);

  const commonIconProps = {
    onPressIn: () => (opacity.value = 1),
    onPressOut: () => (opacity.value = 0.2),
    size: 32,
    style: styles.icon,
    color: "white",
  };

  return (
    <>
      {router.canGoBack() && (
        <Animated.View style={[styles.container, { opacity }]}>
          <MaterialIcons
            name="chevron-left"
            onPress={router.back}
            {...commonIconProps}
          />
        </Animated.View>
      )}
      <Animated.View style={[styles.rightContainer, { opacity }]}>
        <Animated.View
          style={styles.animationOrigin}
          sharedTransitionTag={extractedId ?? "none"}
        ></Animated.View>
        <MaterialIcons
          name="info-outline"
          onPress={() => router.push(`/detail/${extractedId}`)}
          {...commonIconProps}
        />
      </Animated.View>
      <Slot />
    </>
  );
}
