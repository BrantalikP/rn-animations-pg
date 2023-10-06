import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import { data } from "@/features/home/screens/presets";
import { idToComponentMap } from "@/features/preview";
import { styles } from "./styles";

export interface IItem {
  item: (typeof data)[number];
  index: number;
  scrollY: Animated.SharedValue<number>;
  itemY?: Animated.SharedValue<number>;
  itemHeight?: Animated.SharedValue<number>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Item = ({ item }: IItem) => {
  const Component = idToComponentMap[item.id];

  return (
    <AnimatedPressable
      style={styles.container}
      onPress={() => router.push(`/anim/${item.id}`)}
    >
      <View pointerEvents="none" style={{ flex: 1, width: "100%" }}>
        <Component />
        <Text style={styles.label}>{item.name}</Text>
      </View>
    </AnimatedPressable>
  );
};

export { Item };
