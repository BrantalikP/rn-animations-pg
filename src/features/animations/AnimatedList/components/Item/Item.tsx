import { View, Text } from "react-native";
import { styles } from "./styles";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SPACING } from "../../styles";

interface IItem {
  item: {
    key: string;
    color: string;
    height: number;
  };
  index: number;
  scrollY: Animated.SharedValue<number>;
}

const Item = ({ item, scrollY, itemY, itemHeight }: IItem) => {
  console.log({ itemY, itemHeight });
  const stylez = useAnimatedStyle(() => {
    return {};
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor: item.color,
          marginBottom: SPACING,
          height: item.height,
          padding: SPACING,
          borderRadius: 16,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        },
        stylez,
      ]}
    >
      <Text>{item.color}</Text>
    </Animated.View>
  );
};

export { Item };
