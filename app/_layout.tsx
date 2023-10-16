import { Provider } from "@/provider";
import { theme } from "@/theme";
import { Stack } from "expo-router";
import React from "react";
import * as SystemUI from "expo-system-ui";
import { SplashScreen } from "@/features/browse/screens/splash";

SystemUI.setBackgroundColorAsync("black");

export default function HomeLayout() {
  return (
    <Provider>
      <SplashScreen
        enabled={true}
        duration={1000}
        delay={1000}
      >
        <Stack
          screenOptions={{
            title: "",
            headerShown: false,
            contentStyle: {
              backgroundColor: theme.primary,
            },
          }}
        />
      </SplashScreen>
    </Provider>
  );
}
