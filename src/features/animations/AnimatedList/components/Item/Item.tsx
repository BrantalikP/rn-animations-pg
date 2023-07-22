import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { OFFSET, SPACING } from "../../styles";
import { useNavigation } from "expo-router";
import { Link } from "expo-router";
import { router } from "expo-router";

export interface IItem {
  item: {
    key: string;
    color: string;
    height: number;
  };
  index: number;
  scrollY: Animated.SharedValue<number>;
  itemY?: Animated.SharedValue<number>;
  itemHeight?: Animated.SharedValue<number>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Item = ({
  item,
  scrollY,
  itemY = { value: 0 },
  itemHeight = { value: 0 },
  index,
}: IItem) => {
  const { navigate } = useNavigation();
  const stylez = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [itemY.value - 1, itemY.value, itemY.value + itemHeight.value],
      [1, 1, 0]
    );

    const translateY = interpolate(
      scrollY.value,
      [
        itemY.value - index * OFFSET - 1,
        itemY.value - index * OFFSET,
        itemY.value - index * OFFSET + 1,
      ],
      [0, 0, 1]
    );

    const scale = interpolate(
      scrollY.value,
      [itemY.value - 1, itemY.value, itemY.value + itemHeight.value],
      [1, 1, 0]
    );

    const perspective = [itemHeight.value ? { perspective: 0 } : undefined];

    return {
      opacity,
      transform: [
        { translateY },
        { scale },
        { perspective: itemHeight.value ? itemHeight.value * 4 : 1 },
      ],
    };
  });

  return (
    <AnimatedPressable
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
      onPress={() => router.push("/anim/bottom-sheet")}
    >
      <Text>{item.color}</Text>
    </AnimatedPressable>
  );
};

export { Item };
