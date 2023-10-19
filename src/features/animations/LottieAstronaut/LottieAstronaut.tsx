import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { AnimatedWrapper } from "./components/AnimatedWrapper";
import LottieView from "lottie-react-native";
export const LottieAstronaut = () => {
  const buttonRef = useRef<LottieView>(null);

  const onAdd = useCallback(() => {
    buttonRef.current?.reset();
    buttonRef.current?.play(0, 75);
    // logic for adding an item goes here
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <AnimatedWrapper
        showAnimation={true}
        title="Add new item ➕"
        source={require("./assets/astronaut.json")}
        loop
        autoPlay
      >
      </AnimatedWrapper>
      <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
        <LottieView
          source={require("./assets/add.json")}
          style={{ flex: 1 }}
          ref={buttonRef}
          speed={3}
          autoPlay={false}
          loop={false}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
