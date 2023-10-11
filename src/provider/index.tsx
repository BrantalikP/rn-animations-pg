import React, { FC } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};
