import { MaterialIcons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { styles } from "./styles";
import { Headline, Paragraph, Tag } from "@/typography";
import { DataIds, data } from "../../preset";

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
        <Paragraph>{item?.description}</Paragraph>
        <View style={styles.tagWrapper}>
          {item?.tags.map((item) => (
            <Tag>{item}</Tag>
          ))}
        </View>
      </Animated.View>
    </View>
  );
};
