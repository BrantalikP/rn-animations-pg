import { Provider } from "@/provider";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Provider>
      <Stack
        screenOptions={{
          title: "",
          headerShown: false,
          contentStyle: {
            backgroundColor: "black",
          }
        }}
      />
    </Provider>
  );
}
