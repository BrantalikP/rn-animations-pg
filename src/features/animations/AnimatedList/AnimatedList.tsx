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

const { width, height } = Dimensions.get("window");

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
            <View style={{ width: width / 2, height: height / 2}}>
              <Animated.View style={{ transform: [{ scale: 0.47 }, { translateX: -width / 4}, { translateY: -height / 2 }] }}>
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
