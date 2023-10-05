import { useEffect } from "react";
import { View, FlatList as RNFlatList, ViewToken } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from "react-native-reanimated";
import { ListItem } from "./components/ListItem";
import { styles } from "./styles";

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));

export const FlatList = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <View style={styles.container}>
      <RNFlatList
        data={data}
        renderItem={({ item }) => {
          return <ListItem item={item} viewableItems={viewableItems} />;
        }}
        // onViewableItemsChanged={({ viewableItems: vItems, changed }) => {
        //   viewableItems.value = vItems;
        // }}
        contentContainerStyle={{ paddingTop: 40 }}
      />
    </View>
  );
};
