import { View, Text, FlatList, StatusBar } from "react-native";
import { styles } from "./styles";
import { Item } from "./components/Item";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { CustomCellRendererComponent } from "./components/CustomCellRendererComponent";
import { DataIds, data } from "@/features/home/screens/presets";

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
    <View style={styles.container}>
      <StatusBar hidden />
      <AnimatedFlatList
        data={data}
        keyExtractor={(item) => item.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
        CellRendererComponent={CustomCellRendererComponent}
        renderItem={({ item, index }) => {
          return <Item item={item} index={index} scrollY={scrollY} />;
        }}
      />
    </View>
  );
};

export { AnimatedList };
