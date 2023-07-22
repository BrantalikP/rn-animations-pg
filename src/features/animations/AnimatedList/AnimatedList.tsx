import { View, Text, Animated, FlatList, StatusBar } from "react-native";
import { styles } from "./styles";
import { Item } from "./components/Item";

interface IAnimatedList {
  data: { key: string; color: string; height: number }[];
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedList = ({ data }: IAnimatedList) => {
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
          return <Item />;
        }}
      />
    </View>
  );
};

export { AnimatedList };
