import { SplashScreenProvider } from "@/features/browse/screens/splash/context";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import React, { FC } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider value={DarkTheme}>
      <SafeAreaProvider>
        <SplashScreenProvider>{children}</SplashScreenProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};
