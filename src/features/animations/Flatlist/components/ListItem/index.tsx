import React from "react";
import { ViewToken } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";
import { useIsPreview } from "@/features/browse/hooks";

interface IListItemProps {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
}
const ListItem: React.FC<IListItemProps> = React.memo(
  ({ item, viewableItems }) => {
    const isPreview = useIsPreview()
    const rStyle = useAnimatedStyle(() => {
      const isVisible = viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === item.id);
      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.5),
          },
        ],
      };
    }, []);

    return <Animated.View style={[styles.item, isPreview ? {} : rStyle]} />;
  }
);

export { ListItem };
