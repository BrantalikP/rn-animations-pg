import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import { styles } from "./styles";
import LottieView, { AnimatedLottieViewProps } from "lottie-react-native";

interface IAnimatedWrapper extends AnimatedLottieViewProps {
  children: React.ReactNode;
  showAnimation: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  title?: string;
}

const AnimatedWrapper = ({
  children,
  showAnimation,
  containerStyle,
  textStyle,
  style,
  title,
  ...lottieProps
}: IAnimatedWrapper) => {
  if (!showAnimation) return <>{children}</>;
  return (
    <View style={[styles.astronautContainer, containerStyle]}>
      <LottieView
        style={[{ width: "80%", aspectRatio: 1 }, style]}
        {...lottieProps}
      />
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  );
};

export { AnimatedWrapper };
