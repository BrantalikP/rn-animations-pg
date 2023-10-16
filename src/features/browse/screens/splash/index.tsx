import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
  useAnimatedStyle,
  interpolate,
  Easing,
  Extrapolate,
  useDerivedValue,
} from "react-native-reanimated";
import { View, Dimensions, StyleSheet } from "react-native";
import * as SystemUI from "expo-system-ui";
import {
  Canvas,
  Fill,
  Group,
  Skia,
  Text as SkiaText,
  useFont,
} from "@shopify/react-native-skia";
import { theme } from "@/theme";

const { width, height } = Dimensions.get("window");

const center = { x: width / 2, y: height / 2 };

SystemUI.setBackgroundColorAsync("black");

export const SplashScreen = ({
  onEnd,
  enabled,
  children,
  duration,
  delay,
}: {
  children: React.ReactNode;
  enabled: boolean;
  duration: number;
  delay: number;
  onEnd?: () => void;
}) => {
  const radius = useSharedValue(0); // Starting radius

  // this was the original maximum value but the simpler one seems to work better
  // const maximumValue = Math.sqrt(width * width + height * height) / 2;
  const maximumValue = height / 2;

  const estimatedVerticalCenterOffset = 35;

  useEffect(() => {
    if (!enabled) return;
    radius.value = withDelay(
      delay,
      withTiming(
        maximumValue,
        {
          duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        () => {
          if (onEnd) runOnJS(onEnd)();
        }
      )
    );
  }, [maximumValue, enabled, onEnd, radius, duration]);

  const textTransform = useDerivedValue(() => {
    return [
      {
        scale: interpolate(
          radius.value,
          [0, maximumValue],
          [1, 22],
          Extrapolate.CLAMP
        ),
      },
    ];
  });

  const rStyleChildren = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            radius.value,
            [0, maximumValue / 100, maximumValue / 2, maximumValue],
            [0, 0.4, 0.8, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const clipPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    const width = radius.value * 2;
    const height = radius.value * 2.9;
    path.addOval({
      width,
      height,
      x: center.x - width / 2,
      y: center.y - height / 2 - estimatedVerticalCenterOffset,
    });
    return path;
  }, [radius.value]);

  const font = useFont(
    require("../../../../../assets/fonts/Roboto-Bold.ttf"),
    100
  );
  const textWidth = font?.getTextWidth("SHOW") || 0;
  const centeredTextX = center.x - textWidth / 2;

  const getCenteredLetterOPosition = () => {
    const shWidth = font?.getTextWidth("SH") || 0;
    const oWidth = font?.getTextWidth("O") || 0;
    const oCenter = centeredTextX + shWidth + oWidth / 2;
    const offset = oCenter - center.x;
    return centeredTextX - offset;
  };

  if (!enabled) return <>{children}</>;

  return (
    <>
      <View
        style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}
        pointerEvents="none"
      >
        <Canvas style={{ flex: 1 }}>
          <Group clip={clipPath} invertClip>
            <Fill color="#000000" />
            <Group
              transform={textTransform}
              origin={{ x: center.x, y: center.y - estimatedVerticalCenterOffset }}
            >
              <SkiaText
                x={getCenteredLetterOPosition()}
                y={center.y}
                text="SHOW"
                font={font}
                color={theme.accent1}
              />
              <SkiaText
                x={centeredTextX + 50}
                y={center.y + 80}
                text="CASE"
                font={font}
                color={theme.accent1}
              />
            </Group>
          </Group>
        </Canvas>
      </View>
      <Animated.View style={[{ flex: 1 }, rStyleChildren]}>
        {children}
      </Animated.View>
    </>
  );
};
