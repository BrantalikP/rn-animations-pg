import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import { data } from "@/features/home/screens/presets";
import { styles } from "./styles";
import { idToComponentMap } from "@/features/preview/preset";
import { MaterialIcons } from "@expo/vector-icons";
import { Headline } from "@/typography";
import { theme } from "@/theme";

export interface IItem {
  item: (typeof data)[number];
  index: number;
  scrollY: Animated.SharedValue<number>;
  itemY?: Animated.SharedValue<number>;
  itemHeight?: Animated.SharedValue<number>;
}

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Item = ({ item }: IItem) => {
  const Component = idToComponentMap[item.id];

  return (
    <View style={styles.transformWrapper}>
      <View style={styles.labelWrapper}>
        <Headline>{item.name}</Headline>
      </View>
      <Animated.View
        style={styles.detailAnimationOrigin}
        sharedTransitionTag={item.id}
      ></Animated.View>
      <Pressable
        onPress={() => router.push(`/detail/${item.id}`)}
        style={styles.infoIconWrapper}
        hitSlop={30}
      >
        <AnimatedIcon
          name="info"
          size={32}
          onPress={() => router.push(`/detail/${item.id}`)}
          color={theme.border}
        />
      </Pressable>
      <Animated.View style={styles.itemTransform}>
        <AnimatedPressable
          style={styles.container}
          onPress={() => router.push(`/anim/${item.id}`)}
        >
          <View pointerEvents="none" style={styles.componentWrapper}>
            <Component />
          </View>
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
};

export { Item };
