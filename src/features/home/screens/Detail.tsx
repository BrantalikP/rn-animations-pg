import { MaterialIcons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  SlideInDown,
  SlideInUp,
} from "react-native-reanimated";
import { DataIds, data } from "./presets";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcons);

export const DetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: [DataIds] }>();
  const extractedId: DataIds | undefined = id?.[0];
  const insets = useSafeAreaInsets();
  console.log(insets);
  const item = data.find((item) => item.id === extractedId);

  return (
    <View style={{ backgroundColor: "black", flex: 1, marginTop: insets.top }}>
      <Stack.Screen
        options={{
          animation: "fade",
        }}
      />
      <Animated.View
        entering={FadeInDown.delay(400)}
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          position: "absolute",
          top: 0,
        }}
      >
        <MaterialIcons
          name="chevron-left"
          onPress={router.back}
          size={32}
          color="white"
        />
        <Animated.Text
          style={{
            color: "white",
            fontSize: 20,
            padding: 6,
            fontWeight: "bold",
            textTransform: "uppercase",
            backgroundColor: "rgba(0, 0, 0, 1)",
          }}
        >
          {item?.name}
        </Animated.Text>
      </Animated.View>
      <Animated.View
        sharedTransitionTag={extractedId}
        style={{
          backgroundColor: "#2E2E2E",
          padding: 12,
          gap: 18,
          borderRadius: 6,
          flex: 1,
          marginTop: 50,
          overflow: "hidden",
          marginBottom: 40,
        }}
      >
        <Animated.Text
          style={{
            fontSize: 16,
            color: "white",
          }}
        >
          This is a simple animation to show basics of Reanimated how to use
          animated styles and how to work with shared values using effects.
        </Animated.Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          {["Reanimated", "shared values", "intro"].map((item) => (
            <Text
              style={{
                backgroundColor: "#ed0c32",
                color: "white",
                borderRadius: 12,
                padding: 4,
                paddingHorizontal: 12,
                overflow: "hidden",
                fontWeight: "bold",
              }}
            >
              {item}
            </Text>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};
