import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { match } from "ts-pattern";
import { DataIds } from "../home/screens/presets";
import { BottomSheet } from "../animations/BottomSheet";
import { Animated3DCard } from "../animations/Animated3DCard";
import React, { ComponentType } from "react";
import { ColorPicker } from "../animations/ColorPicker";
import { AnimatedList } from "../animations/AnimatedList";
import { CircularProgressBar } from "../animations/CircularProgressBar";
import { ColorsInterpolate } from "../animations/ColorsInterpolate";
import { DoubleTap } from "../animations/DoubleTap";
import { FlatList } from "../animations/Flatlist";
import { GridMagnification } from "../animations/GridMagnificationSkia";
import { GestureHandler2 } from "../animations/GestureHandler2";
import { Introduction } from "../animations/Introduction";
import { LottieAstrounaut } from "../animations/LottieAstronaut";
import { Metaball } from "../animations/Metaball";
import { PanGestures } from "../animations/PanGestures";
import { PinchGestures } from "../animations/PinchGestures";
import { ScrollPan } from "../animations/Scroll+Pan";
import { ScrollViewInterpolate } from "../animations/ScrollViewInterpolate";
import { ThemeSwitch } from "../animations/ThemeSwitch";
import { ClipBackground } from "../animations/ClipBackground";
import { FourierVisualizer } from "../animations/FourierVisualizer";
import { AutoCarouselExample } from "../animations/AutoCarousel";

export const idToComponentMap: Record<DataIds, ComponentType> = {
  "bottomSheet": BottomSheet,
  "colorPicker": ColorPicker,
  "animated3D": Animated3DCard,
  "circularProgressBar": CircularProgressBar,
  "colorsInterpolate": ColorsInterpolate,
  "doubleTap": DoubleTap,
  "flatList": FlatList,
  "gestureHandler2": GestureHandler2,
  "gridMagnification": GridMagnification,
  "introduction": Introduction,
  "lottieAstronaut": LottieAstrounaut,
  "metaBall": Metaball,
  "panGesture": PanGestures,
  "pinchGesture": PinchGestures,
  "scrollPan": ScrollPan,
  "scrollViewInterpolate": ScrollViewInterpolate,
  "themeSwitch": ThemeSwitch,
  "clipBackground": ClipBackground,
  "fourierVisualizer": FourierVisualizer,
  "autoCarousel": AutoCarouselExample
}

interface IPreview { }

const Preview = ({ }: IPreview) => {
  const { id } = useLocalSearchParams<{ id: [DataIds] }>();
  const extractedId: DataIds | undefined = id?.[0];

  const AnimationComponent = () => {
    if (!extractedId) return (
      <View>
          <Text>Not Found</Text>
        </View>
    );
    const Component = idToComponentMap[extractedId]
    return <Component />
  }

  return (
    <>
      <AnimationComponent />
    </>
  );
};

export { Preview };
