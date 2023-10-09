import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import { data } from "@/features/home/screens/presets";
import { styles } from "./styles";
import { idToComponentMap } from "@/features/preview/preset";

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
    <View style={styles.transformWrapper}>
      <Animated.View style={styles.itemTransform}>
        <AnimatedPressable
          style={styles.container}
          onPress={() => router.push(`/anim/${item.id}`)}
        >
          <View pointerEvents="none" style={styles.componentWrapper}>
            <Component />
            <Text style={styles.label}>{item.name}</Text>
          </View>
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
};

export { Item };
