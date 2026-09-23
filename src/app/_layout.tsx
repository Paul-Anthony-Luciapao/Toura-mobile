import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="navigation"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="resort/[id]"
        options={{
          title: "Resort",
        }}
      />
    </Stack>
  );
}