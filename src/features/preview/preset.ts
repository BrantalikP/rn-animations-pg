import { ComponentType } from "react";
import { Animated3DCard } from "../animations/Animated3DCard";
import { AutoCarouselExample } from "../animations/AutoCarousel";
import { BottomSheet } from "../animations/BottomSheet";
import { CircularProgressBar } from "../animations/CircularProgressBar";
import { ClipBackground } from "../animations/ClipBackground";
import { ColorPicker } from "../animations/ColorPicker";
import { ColorsInterpolate } from "../animations/ColorsInterpolate";
import { DoubleTap } from "../animations/DoubleTap";
import { FourierVisualizer } from "../animations/FourierVisualizer";
import { GestureHandler2 } from "../animations/GestureHandler2";
import { GridMagnification } from "../animations/GridMagnificationSkia";
import { Introduction } from "../animations/Introduction";
import { FlatList } from "../animations/Flatlist";
import { LottieAstrounaut } from "../animations/LottieAstronaut";
import { Metaball } from "../animations/Metaball";
import { PanGestures } from "../animations/PanGestures";
import { PinchGestures } from "../animations/PinchGestures";
import { ScrollPan } from "../animations/Scroll+Pan";
import { ScrollViewInterpolate } from "../animations/ScrollViewInterpolate";
import { ThemeSwitch } from "../animations/ThemeSwitch";
import { DataIds } from "../home/screens/presets";

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
