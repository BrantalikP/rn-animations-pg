import { View, FlatList, StatusBar, Dimensions } from "react-native";
import { styles } from "./styles";
import { Item } from "./components/Item";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { data } from "@/features/home/screens/presets";
import { SafeAreaView } from "react-native-safe-area-context";

interface IAnimatedList {
  data: typeof data;
}

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<IAnimatedList["data"][number]>
);

const AnimatedList = ({ data }: IAnimatedList) => {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((ev) => {
    scrollY.value = ev.contentOffset.y;
  });
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <AnimatedFlatList
        data={data}
        keyExtractor={(item) => item.id}
        onScroll={onScroll}
        numColumns={2}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.itemWrapper}>
              <Animated.View style={styles.itemTransform}>
                <Item item={item} index={index} scrollY={scrollY} />
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export { AnimatedList };
