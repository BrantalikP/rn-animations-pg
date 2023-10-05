import { View, Text, FlatList, StatusBar, Dimensions } from "react-native";
import { styles } from "./styles";
import { Item } from "./components/Item";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { CustomCellRendererComponent } from "./components/CustomCellRendererComponent";
import { DataIds, data } from "@/features/home/screens/presets";
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
        style={{ marginLeft: -width / 8.5, marginTop: -height / 4 }}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: height / 4 }}
        getItemLayout={(data, index) => {
          return {
            length: height / 2,
            offset: height / 2 * index,
            index,
          };
        }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: width / 2, height: height / 2 }}>
              <View style={{ transform: [{ scale: 0.47 }] }}>
                <Item item={item} index={index} scrollY={scrollY} />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export { AnimatedList };
