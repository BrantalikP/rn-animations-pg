import { View, Text, Pressable, Dimensions } from "react-native";
import { HEIGHT, styles } from "./styles";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { OFFSET, SPACING } from "../../styles";
import { useNavigation } from "expo-router";
import { Link } from "expo-router";
import { router } from "expo-router";
import { data } from "@/features/home/screens/presets";
import { config } from "@/features/preview";
import { transform } from "@babel/core";

export interface IItem {
  item: (typeof data)[number];
  index: number;
  scrollY: Animated.SharedValue<number>;
  itemY?: Animated.SharedValue<number>;
  itemHeight?: Animated.SharedValue<number>;
}

const { width, height } = Dimensions.get("window");

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

  const Component = config[item.id];

  return (
    <AnimatedPressable
      style={[
        {
          backgroundColor: "black",
          width: width,
          height: height,
          borderRadius: 16,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      onPress={() => router.push(`/anim/${item.id}`)}
    >
      <View pointerEvents="none" style={{ flex: 1, width: "100%" }}>
        <Component />
        <Text
          style={{
            position: "absolute",
            bottom: 0,
            color: "white",
            fontSize: 40,
            padding: 6,
            fontWeight: "bold",
            textTransform: "uppercase",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          {item.name}
        </Text>
      </View>
    </AnimatedPressable>
  );
};

export { Item };
