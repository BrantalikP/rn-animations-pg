import { View, Text, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import { data } from "@/features/home/screens/presets";
import { styles } from "./styles";
import { idToComponentMap } from "@/features/preview/preset";
import { MaterialIcons } from "@expo/vector-icons";

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
      <Animated.Text style={styles.label}>{item.name}</Animated.Text>
      <Animated.View
        style={{
          position: "absolute",
          width: 32,
          height: 32,
          zIndex: 1000,
          right: 12,
          top: 32,
          backgroundColor: "transparent",
          borderRadius: 20,
          overflow: "hidden",
        }}
        sharedTransitionTag={item.id}
      ></Animated.View>
      <Pressable
        onPress={() => router.push(`/detail/${item.id}`)}
        style={{ position: "absolute", zIndex: 1001, right: 12, top: 32 }}
        hitSlop={30}
      >
        <AnimatedIcon
          name="info"
          size={32}
          onPress={() => router.push(`/detail/${item.id}`)}
          color="#737373"
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
