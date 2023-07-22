import { View, Text, Animated, FlatList, StatusBar } from "react-native";
import { styles } from "./styles";
import { Item } from "./components/Item";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

interface IAnimatedList {
  data: { key: string; color: string; height: number }[];
}

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<IAnimatedList["data"][number]>
);

const AnimatedList = ({ data }: IAnimatedList) => {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    "worklet";
    // Update the scrollY value with the current scroll offset
    scrollY.value = event.contentOffset.y;
  });
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AnimatedFlatList
        data={data}
        keyExtractor={(item) => item.key}
        // onScroll={onScroll}
        scrollEventThrottle={16}
        // CellRendererComponent={CustomCellRendererComponent}
        renderItem={({ item, index }) => {
          return <Item item={item} index={index} scrollY={scrollY} />;
        }}
      />
    </View>
  );
};

export { AnimatedList };
