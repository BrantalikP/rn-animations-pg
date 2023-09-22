import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { match } from "ts-pattern";
import { DataIds } from "../home/screens/presets";
import { BottomSheet } from "../animations/BottomSheet";
import { Animated3DCard } from "../animations/Animated3DCard";
import React from "react";
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

interface IPreview { }

const Preview = ({ }: IPreview) => {
  const { id } = useLocalSearchParams<{ id: [DataIds] }>();
  const extractedId: DataIds | undefined = id?.[0];

  const AnimationComponent = () =>
    match<DataIds | undefined, JSX.Element>(extractedId)
      .with("bottomSheet", () => <BottomSheet />)
      .with("colorPicker", () => <ColorPicker />)
      .with("animated3D", () => <Animated3DCard />)
      .with("circularProgressBar", () => <CircularProgressBar />)
      .with("colorsInterpolate", () => <ColorsInterpolate />)
      .with("doubleTap", () => <DoubleTap />)
      .with("flatList", () => <FlatList />)
      .with("gestureHandler2", () => <GestureHandler2 />)
      .with("gridMagnification", () => <GridMagnification />)
      .with("introduction", () => <Introduction />)
      .with("lottieAstronaut", () => <LottieAstrounaut />)
      .with("metaBall", () => <Metaball />)
      .with("panGesture", () => <PanGestures />)
      .with("pinchGesture", () => <PinchGestures />)
      .with("scrollPan", () => <ScrollPan />)
      .with("scrollViewInterpolate", () => <ScrollViewInterpolate />)
      .with("themeSwitch", () => <ThemeSwitch />)
      .with("clipBackground", () => <ClipBackground />)
      .with("fourierVisualizer", () => <FourierVisualizer />)
      .with("autoCarousel", () => <AutoCarouselExample />)

      .otherwise(() => (
        <View>
          <Text>Not Found</Text>
        </View>
      ));

  return (
    <>
      <AnimationComponent />
    </>
  );
};

export { Preview };
