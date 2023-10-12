import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { DataIds, idToComponentMap } from "../../preset";

interface IPreview {}

const Preview = ({}: IPreview) => {
  const { id } = useLocalSearchParams<{ id: [DataIds] }>();
  const extractedId: DataIds | undefined = id?.[0];

  const AnimationComponent = () => {
    if (!extractedId)
      return (
        <View>
          <Text>Not Found</Text>
        </View>
      );
    const Component = idToComponentMap[extractedId];
    return <Component />;
  };

  return (
    <>
      <AnimationComponent />
    </>
  );
};

export { Preview };
