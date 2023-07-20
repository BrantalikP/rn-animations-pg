import { Pressable, Text } from "react-native";

interface IBackButton {}

import { styles } from "./styles";

const BackButton = ({}: IBackButton) => {
  return (
    <Pressable style={styles.container}>
      <Text>BackButton</Text>
    </Pressable>
  );
};

export { BackButton };
