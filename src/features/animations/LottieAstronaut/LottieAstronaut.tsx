import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, TouchableOpacity, ScrollView, View } from "react-native";
import { styles } from "./styles";
import { AnimatedWrapper } from "./components/AnimatedWrapper";
import LottieView, { AnimatedLottieViewProps } from "lottie-react-native";
export const LottieAstrounaut = () => {
  const [items, setItems] = useState<number[]>([]);
  const buttonRef = useRef<LottieView>(null);
  const onDelete = useCallback((index: number) => {
    setItems((currentItems) =>
      currentItems.filter((_, currentItemIndex) => currentItemIndex !== index)
    );
  }, []);

  const onAdd = useCallback(() => {
    buttonRef.current?.reset();
    buttonRef.current?.play(0, 75);
    setItems((currentItems) => [...currentItems, 0]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <AnimatedWrapper
        showAnimation={items.length === 0}
        title="Add new item ➕"
        source={require("./assets/astronaut.json")}
        loop
        autoPlay
      >
        <ScrollView style={styles.scrollView}>
          {items.map((_, index) => (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => onDelete(index)}
              style={styles.itemContainer}
            >
              <View style={styles.item} />
            </TouchableOpacity>
          ))}
        </ScrollView>
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
