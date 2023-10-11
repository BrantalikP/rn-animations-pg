export const data = [
  {
    id: "introduction",
    name: "Introduction",
    description:
      "This is a simple animation to show basics of Reanimated how to use animated styles and how to work with shared values using effects.",
    tags: ["Reanimated", "basics", "sharedValues"],
  },
  { id: "animated3D", name: "Animated 3D Card", description: "TODO", tags: [] },
  { id: "bottomSheet", name: "Bottom Sheet", description: "TODO", tags: [] },

  {
    id: "circularProgressBar",
    name: "Circular Progress bar",
    description: "TODO",
    tags: [],
  },

  { id: "colorPicker", name: "Color Picker", description: "TODO", tags: [] },
  {
    id: "colorsInterpolate",
    name: "Colors Interpolate",
    description: "TODO",
    tags: [],
  },
  { id: "doubleTap", name: "Double Tap", description: "TODO", tags: [] },
  { id: "flatList", name: "Flat list", description: "TODO", tags: [] },
  {
    id: "gestureHandler2",
    name: "Gesture Handler 2",
    description: "TODO",
    tags: [],
  },
  {
    id: "gridMagnification",
    name: "Grid Magnification",
    description: "TODO",
    tags: [],
  },
  {
    id: "lottieAstronaut",
    name: "Lottie Astronaut",
    description: "TODO",
    tags: [],
  },
  { id: "metaBall", name: "Meta Ball", description: "TODO", tags: [] },
  { id: "panGesture", name: "Pan Gesture", description: "TODO", tags: [] },
  { id: "pinchGesture", name: "Pinch Gesture", description: "TODO", tags: [] },
  { id: "scrollPan", name: "Scroll Pan", description: "TODO", tags: [] },
  {
    id: "scrollViewInterpolate",
    name: "Scroll View Interpolate",
    description: "TODO",
    tags: [],
  },
  { id: "themeSwitch", name: "Theme Switch", description: "TODO", tags: [] },
  {
    id: "clipBackground",
    name: "Clip Background",
    description: "TODO",
    tags: [],
  },
  {
    id: "fourierVisualizer",
    name: "Fourier Visualizer",
    description: "TODO",
    tags: [],
  },
  {
    id: "autoCarousel",
    name: "Infinite Auto Scroll",
    description: "TODO",
    tags: [],
  },
] as const;

export type DataIds = (typeof data)[number]["id"];
