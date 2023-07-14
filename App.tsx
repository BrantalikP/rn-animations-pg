import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import TabOneScreen from "./screens/TabOneScreen";
import { GridMagnification } from "./features/GridMagnificationSkia";
import { BottomSheet } from "./features/BottomSheet";
import { Metaball } from "./features/Metaball";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Metaball />
      </SafeAreaProvider>
    );
  }
}
