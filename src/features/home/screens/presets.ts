export const data = [
  { id: "introduction", name: "Introduction" },
  { id: "animated3D", name: "Animated 3D Card" },
  { id: "bottomSheet", name: "Bottom Sheet" },

  { id: "circularProgressBar", name: "Circular Progress bar" },

  { id: "colorPicker", name: "Color Picker" },
  { id: "colorsInterpolate", name: "Colors Interpolate" },
  { id: "doubleTap", name: "Double Tap" },
  { id: "flatList", name: "Flat list" },
  { id: "gestureHandler2", name: "Gesture Handler 2" },
  { id: "gridMagnification", name: "Grid Magnification" },
  { id: "lottieAstronaut", name: "Lottie Astronaut" },
  { id: "metaBall", name: "Meta Ball" },
  { id: "panGesture", name: "Pan Gesture" },
  { id: "pinchGesture", name: "Pinch Gesture" },
  { id: "scrollPan", name: "Scroll Pan" },
  { id: "scrollViewInterpolate", name: "Scroll View Interpolate" },
  { id: "themeSwitch", name: "Theme Switch" },
  { id: "clipBackground", name: "Clip Background" },
  { id: "fourierVisualizer", name: "Fourier Visualizer" },
  { id: "autoCarousel", name: "Infinite Auto Scroll" },
] as const;

export type DataIds = (typeof data)[number]["id"];
