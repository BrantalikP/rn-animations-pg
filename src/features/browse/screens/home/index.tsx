import { Link } from "expo-router";
import { View, Text, Animated, FlatList } from "react-native";
import { styles } from "./styles";
import chroma from "chroma-js";
import { AnimatedList } from "@/features/animations/AnimatedList";
import { faker } from "@faker-js/faker";
import { data } from "../../preset";

// const colors = chroma.scale(["#fafa6e", "#2A4858"]).mode("lch").colors(30);

// const _spacing = 10;

// faker.seed(10);
// const _data = colors.map((color) => {
//   return {
//     key: faker.string.uuid(),
//     color,
//     height: faker.number.int(200) + 70,
//   };
// });

interface IHome {}

const Home = ({}: IHome) => {
  return <AnimatedList data={data} />;
};

export { Home };
