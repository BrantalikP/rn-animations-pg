import { Provider } from "@/provider";
import { theme } from "@/theme";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Provider>
      <Stack
        screenOptions={{
          title: "",
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.primary,
          }
        }}
      />
    </Provider>
  );
}
