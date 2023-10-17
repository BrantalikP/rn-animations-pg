import { Provider } from "@/provider";
import { theme } from "@/theme";
import { Stack } from "expo-router";
import React from "react";
import * as SystemUI from "expo-system-ui";

SystemUI.setBackgroundColorAsync("black");

export default function HomeLayout() {
  return (
    <Provider>
      <Stack
        screenOptions={{
          title: "",
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.primary,
          },
        }}
      />
    </Provider>
  );
}
