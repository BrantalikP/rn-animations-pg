import { View, Text } from "react-native";
import AutoCarousel from "./components/AutoCarousel";
import { styles } from "./styles";

export const AutoCarouselExample = () => {
  return (
    <View style={{ flex: 1 }}>
    <AutoCarousel interval={5000}>
      <View style={styles.container}>
        <Text style={styles.text}>Slide 1</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Slide 2</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Slide 3</Text>
      </View>
    </AutoCarousel>
    </View>
  );
};
