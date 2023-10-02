import { createContext, useContext } from "react";
import type { SharedValue } from "react-native-reanimated";

export const AutoCarouselContext = createContext<{
  scrollValue: SharedValue<number>;
} | null>(null);

export const useAutoCarouselContext = () => {
  const context = useContext(AutoCarouselContext);
  if (!context) {
    throw new Error(
      "useAutoCarouselContext must be used within a AutoCarouselProvider"
    );
  }
  return context;
};
