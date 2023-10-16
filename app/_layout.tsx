import { Provider } from "@/provider";
import { theme } from "@/theme";
import { Stack } from "expo-router";
import Color from "color";
import MaskedView from "@react-native-masked-view/masked-view";
import React, { useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  interpolate,
  Easing,
  Extrapolate,
  FadeInDown,
  useDerivedValue,
} from "react-native-reanimated";
import * as SystemUI from "expo-system-ui";
import Svg, { Path } from "react-native-svg";
import {
  Canvas,
  Circle,
  Fill,
  Group,
  Rect,
  Skia,
  Text as SkiaText,
  useComputedValue,
  useFont,
} from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");

const AnimatedPath = Animated.createAnimatedComponent(Path);

const center = { x: width / 2, y: height / 2 };

SystemUI.setBackgroundColorAsync("black");

const CircleTransitionMask = ({
  onEnd,
  enabled,
  maskedElement,
  children,
  duration = 500,
}: {
  children: React.ReactNode;
  enabled: boolean;
  duration?: number;
  maskedElement?: React.ReactNode;
  onEnd?: () => void;
}) => {
  const radius = useSharedValue(0); // Starting radius

  // const expandedRadius = Math.sqrt(width * width + height * height) / 2 + 35;
  const expandedRadius = height / 2

  useEffect(() => {
    if (!enabled) return;
    // adding some delay otherwise it lags because the main app navigation is displayed
    // at the same time
    radius.value = withDelay(
      1000,
      withTiming(
        expandedRadius,
        {
          duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        () => {
          if (onEnd) runOnJS(onEnd)();
        }
      )
    );
  }, [expandedRadius, enabled, onEnd, radius, duration]);

  const animatedProps = useAnimatedProps(() => {
    // The mask has a rectangle that covers the whole screen, but a circle (centered) is subtracted from it.
    const path = `
      M0,0
      H${width}
      V${height}
      H0
      Z
      M${width / 2},${height / 2}
      m-${radius.value}, 0
      a ${radius.value},${radius.value + radius.value * 0.3} 0 1,0 ${
      radius.value * 2
    },0
      a ${radius.value},${radius.value} 0 1,0 -${radius.value * 2},0
    `;
    return {
      d: path,
    };
  });

  // const r = 22

  // const animatedProps = useAnimatedProps(() => {
  //   // The mask has a rectangle that covers the whole screen, but a circle (centered) is subtracted from it.
  //   const path = `
  //     M0,0
  //     H${width}
  //     V${height}
  //     H0
  //     Z
  //     M${width / 2},${height / 2}
  //     m-${r}, 0
  //     a ${r},${r + r * 0.1} 0 1,0 ${r * 2},0
  //     a ${r},${r + r * 0.1} 0 1,0 -${r * 2},0
  //   `;
  //   return {
  //     d: path,
  //   };
  // });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            radius.value,
            [0, expandedRadius],
            [1, 16],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const textTransform = useDerivedValue(() => {
    return [
      {
        scale: interpolate(
          radius.value,
          [0, expandedRadius],
          [1, 22],
          Extrapolate.CLAMP
        ),
      },
    ]
  })

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            radius.value,
            [0, expandedRadius / 100, expandedRadius / 2, expandedRadius],
            [0, 0.4, 0.8, 1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const size = 256;
  const r = size * 0.33;

  const font = useFont(require("../assets/fonts/Roboto-Bold.ttf"), 100);
  const textWidth = font?.getTextWidth("SHOW") || 0;
  const shWidth = font?.getTextWidth("SH") || 0;
  const oWidth = font?.getTextWidth("O") || 0;
  const textX = center.x - textWidth / 2;
  const oCenter = textX + shWidth + oWidth / 2;
  const offset = oCenter - center.x;

  const clipPath = useDerivedValue(() => {
    const path = Skia.Path.Make();
    const width = radius.value * 2;
    const height = radius.value * 2.9;
    path.addOval({width, height, x: center.x - width / 2, y: center.y - height / 2 - 35});
    return path;
  }, [radius.value]);

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
              origin={{ x: center.x, y: center.y - 35 }}
            >
              <SkiaText
                x={textX - offset}
                y={center.y}
                text="SHOW"
                font={font}
                color={theme.accent1}
              />
              <SkiaText
                x={textX + 50}
                y={center.y + 80}
                text="CASE"
                font={font}
                color={theme.accent1}
              />
            </Group>
          </Group>
        </Canvas>
      </View>
      <Animated.View style={[{ flex: 1 }, animatedStyle2]}>
        {children}
      </Animated.View>
    </>
  );
};

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.Text
        entering={FadeInDown.delay(200)}
        style={{
          fontSize: 100,
          fontWeight: "bold",
          color: theme.accent1,
          left: -20,
          top: 60,
        }}
      >
        SHOW
      </Animated.Text>
      <Animated.Text
        entering={FadeInDown}
        style={{
          fontSize: 100,
          fontWeight: "bold",
          color: theme.accent1,
          left: 30,
        }}
      >
        {" "}
        CASE
      </Animated.Text>
    </View>
  );
};

export default function HomeLayout() {
  return (
    <Provider>
      <CircleTransitionMask
        enabled={true}
        maskedElement={<SplashScreen />}
        duration={1000}
      >
        <Stack
          screenOptions={{
            title: "",
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.primary,
            },
          }}
        />
      </CircleTransitionMask>
    </Provider>
  );
}
