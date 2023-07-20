import { BackButton } from "@/components/BackButton";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        title: "",
        headerTransparent: true,
      }}
    />
  );
}