import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { styles } from "./styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetRefProps,
  BottomSheetView,
} from "./components/BottomSheetView";
import { useCallback, useRef } from "react";
import { theme } from "@/theme";

interface IBottomSheet {}

const BottomSheet = ({}: IBottomSheet) => {
  const ref = useRef<BottomSheetRefProps>(null);
  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-100);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar />
        <TouchableOpacity style={styles.button} onPress={onPress} />
        <BottomSheetView ref={ref}>
          <View style={{ flex: 1, backgroundColor: theme.secondary }} />
        </BottomSheetView>
      </View>
    </GestureHandlerRootView>
  );
};

export { BottomSheet };
