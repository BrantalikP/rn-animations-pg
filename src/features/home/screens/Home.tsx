import { Link } from "expo-router";
import { View, Text } from "react-native";
import { styles } from "./styles";

interface IHome {}

const Home = ({}: IHome) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link href="anim/bottom-sheet">Bottom Sheet</Link>
    </View>
  );
};

export { Home };
