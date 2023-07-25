import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { match } from "ts-pattern";
import { DataIds } from "../home/screens/presets";
import { BottomSheet } from "../animations/BottomSheet";
import { Animated3DCard } from "../animations/Animated3DCard";

interface IPreview {}

const Preview = ({}: IPreview) => {
  const { id } = useLocalSearchParams<{ id: [DataIds] }>();
  console.log({ id });
  const extractedId: DataIds | undefined = id?.[0];

  const AnimationComponent = () =>
    match<DataIds | undefined, JSX.Element>(extractedId)
      .with("bottomSheet", () => <BottomSheet />)
      .with("colorPicker", () => (
        <View>
          <Text>Color Picker</Text>
        </View>
      ))
      .with("animated3D", () => <Animated3DCard />)
      .otherwise(() => (
        <View>
          <Text>Not Found</Text>
        </View>
      ));
  console.log({ AnimationComponent });

  return (
    <>
      <AnimationComponent />
    </>
  );
};

export { Preview };
