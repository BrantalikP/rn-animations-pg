import { ComponentType } from "react";
import { Animated3DCard } from "../animations/Animated3DCard";
import { InfiniteAutoScroll } from "../animations/InfiniteAutoScroll";
import { BottomSheet } from "../animations/BottomSheet";
import { CircularProgressBar } from "../animations/CircularProgressBar";
import { ClipBackground } from "../animations/ClipBackground";
import { ColorPicker } from "../animations/ColorPicker";
import { DarkMode } from "../animations/DarkMode";
import { DoubleTap } from "../animations/DoubleTap";
import { FourierVisualizer } from "../animations/FourierVisualizer";
import { FollowGesture } from "../animations/FollowGesture";
import { GridMagnification } from "../animations/GridMagnificationSkia";
import { Basics } from "../animations/Basics";
import { Lottie } from "../animations/Lottie";
import { FluidBall } from "../animations/FluidBall";
import { Sticky } from "../animations/Sticky";
import { PinchGestures } from "../animations/PinchGestures";
import { ScrollPan } from "../animations/Scroll+Pan";
import { Carousel } from "../animations/Carousel";
import { ThemeSwitch } from "../animations/ThemeSwitch";
import { FlatList } from "../animations/Flatlist";

export const data = [
  {
    id: "basics",
    name: "Basics",
    description:
      "This is a simple animation to show basics of Reanimated how to use animated styles and how to work with shared values using effects.",
    tags: ["Reanimated", "basics"],
  },
  {
    id: "animated3D",
    name: "Animated 3D Card",
    description:
      "In this example you can see how it is possible to easily implement gesture based animations.",
    tags: ["Reanimated", "Gestures", "pan"],
  },
  {
    id: "bottomSheet",
    name: "Bottom Sheet",
    description:
      "Another example of gesture based animation but this time for a more real use case. You can drag this bottom sheet modal either all the way down or it can stick half way. ",
    tags: ["Reanimated", "gestures", "pan"],
  },

  {
    id: "circularProgressBar",
    name: "Circular Progress bar",
    description:
      "A progress bar implemented using reanimated and react-native-svg. On this example you can see how to use reanimated to easily animate SVG elements. \n\nAlso as you can see it is quite easy to animate text values using ReText from react-native-redash.",
    tags: ["Reanimated", "SVG"],
  },

  {
    id: "colorPicker",
    name: "Color Picker",
    description:
      "This demo shows how Reanimated interpolates a color. Using this functionality we can easily implement this color picker component",
    tags: ["Reanimated", "colors"],
  },
  {
    id: "darkMode",
    name: "Dark mode",
    description:
      "Another example of color interpolation. This time we are using it to implement a dark mode switch.",
    tags: ["Reanimated", "colors", "interpolation"],
  },
  {
    id: "doubleTap",
    name: "Double Tap",
    description:
      "A double tap gesture example. When you double tap the image it triggers simple heart animation.",
    tags: ["Reanimated", "gestures", "tap"],
  },
  {
    id: "flatList",
    name: "Flat list",
    description:
      "In this example you can see how to implement scroll based animations. When you scroll the list up or down it will trigger item animation based on if that item is visible or not.",
    tags: ["Reanimated", "gestures", "scroll"],
  },
  {
    id: "followGesture",
    name: "Follow Gesture",
    description:
      "In this example you can see how you can implement animation that are dependent on each other. When you start dragging the blue ball the red and green ones will follow it.",
    tags: ["Reanimated", "Gestures", "drag"],
  },
  {
    id: "gridMagnification",
    name: "Grid Magnification",
    description:
      "A recreation of a Swift UI animation by Philip Davis. You can see how you can create 3D looking effects just by using Skia.",
    tags: ["Skia", "grid", "magnification"],
  },
  {
    id: "lottie",
    name: "Lottie",
    description:
      "You can achieve really cool animations with Lottie and Reanimated. This is a simple example of how to use Lottie. Lottie animations can also be triggered by gestures as you can see on the add button.",
    tags: ["Lottie"],
  },
  {
    id: "fluidBall",
    name: "Fluid Ball",
    description:
      "This is an example of clever use of blur effect to create fluid like animation by distortion of the view. By using a blur effect over a defined layer you can achieve a convincing fluid like effect.",
    tags: ["Skia", "blur"],
  },
  {
    id: "sticky",
    name: "Sticky",
    description:
      "In this example you can see how to make animation sticky. There is a condition if you drag the square outside of the circle it will stay where it is but if you let it go inside of the circle it will return to the initial position.",
    tags: ["Reanimated","sticky"],
  },
  {
    id: "pinchGesture",
    name: "Pinch Gesture",
    description: "A simple example of a pinch gesture in Reanimated.",
    tags: ["Reanimated", "gesture", "pinch"],
  },
  { id: "scrollPan", name: "Scroll Pan", description: "TODO", tags: [] },
  {
    id: "carousel",
    name: "Carousel",
    description:
      "An example how to implement a carousel animations using scroll view and reanimated. By scrolling the carousel you can see how the background color changes and items in the carousel react to the scroll position.",
    tags: ["Reanimated", "scroll", "interpolation"],
  },
  {
    id: "themeSwitch",
    name: "Theme Switch",
    description:
      "Another example of a theme switcher but this time using Skia instead of Reanimated.",
    tags: ["Skia", "colors", "interpolation"],
  },
  {
    id: "clipBackground",
    name: "Clip Background",
    description:
      "An example of how to use clipPath in Skia to achieve interesting effects.",
    tags: ["Skia", "clipPath"],
  },
  // This one is kind of broken and I don't even really know what it is :D
  // {
  //   id: "fourierVisualizer",
  //   name: "Fourier Visualizer",
  //   description: "TODO",
  //   tags: [],
  // },
  {
    id: "autoCarousel",
    name: "Infinite Auto Scroll",
    description:
      "A more complex example of a scroll effect to implement an infinite carousel. By copying the first and last item in the list and using animated reactions to jump between the items we can achieve an effect that seems like the carousel is infinitely scrollable.",
    tags: ["Reanimated", "scroll", "interpolation"],
  },
] as const;

export type DataIds = (typeof data)[number]["id"];

export const idToComponentMap: Record<DataIds, ComponentType> = {
  bottomSheet: BottomSheet,
  colorPicker: ColorPicker,
  animated3D: Animated3DCard,
  circularProgressBar: CircularProgressBar,
  darkMode: DarkMode,
  doubleTap: DoubleTap,
  flatList: FlatList,
  followGesture: FollowGesture,
  gridMagnification: GridMagnification,
  basics: Basics,
  lottie: Lottie,
  fluidBall: FluidBall,
  sticky: Sticky,
  pinchGesture: PinchGestures,
  scrollPan: ScrollPan,
  carousel: Carousel,
  themeSwitch: ThemeSwitch,
  clipBackground: ClipBackground,
  // fourierVisualizer: FourierVisualizer,
  autoCarousel: InfiniteAutoScroll,
};
