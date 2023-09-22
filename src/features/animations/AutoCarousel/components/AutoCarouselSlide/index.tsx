import { useMemo } from "react";

import { AutoCarouselSlideContext } from "./context";
import { View } from "react-native";

export const AutoCarouselSlide = ({
  index,
  children,
  total,
  width,
}: {
  index: number;
  children: React.ReactNode;
  total: number;
  width: number;
}) => {
  const contextValue = useMemo(() => ({ index, total }), [index, total]);

  return (
    <AutoCarouselSlideContext.Provider value={contextValue}>
      <View style={{ flex: 1, width }}>{children}</View>
    </AutoCarouselSlideContext.Provider>
  );
};
