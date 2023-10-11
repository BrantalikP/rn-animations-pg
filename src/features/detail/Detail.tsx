import { MaterialIcons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { DataIds, data } from "../home/screens/presets";
import { styles } from "./styles";
import { Headline, Paragraph, Tag } from "@/typography";

export const DetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: [DataIds] }>();
  const extractedId: DataIds | undefined = id?.[0];
  const item = data.find((item) => item.id === extractedId);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          animation: "fade",
        }}
      />
      <Animated.View entering={FadeInDown.delay(400)} style={styles.header}>
        <MaterialIcons
          name="chevron-left"
          onPress={router.back}
          size={32}
          color="white"
        />
        <Headline>{item?.name}</Headline>
      </Animated.View>
      <Animated.View
        sharedTransitionTag={extractedId}
        style={styles.contentCard}
      >
        <Paragraph>
          This is a simple animation to show basics of Reanimated how to use
          animated styles and how to work with shared values using effects.
        </Paragraph>
        <View style={styles.tagWrapper}>
          {["Reanimated", "shared values", "intro"].map((item) => (
            <Tag>{item}</Tag>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};
