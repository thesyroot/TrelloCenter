// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

const HEADER_BG = "#0b0d12";      // mismo fondo que la app
const HEADER_BORDER = "#1c2335";  // línea inferior sutil
const HEADER_TEXT = "#e9ecf5";    // texto claro

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: HEADER_BG,
        },
        headerTintColor: HEADER_TEXT,
        headerTitleStyle: {
          color: HEADER_TEXT,
          fontWeight: "600",
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        contentStyle: {
          backgroundColor: HEADER_BG,
        },
      }}
    >
      <Stack.Screen
        name="recent/index"
        options={{
          title: "Recent",
        }}
      />

      <Stack.Screen
        name="capture/index"
        options={{
          title: "New capture",
        }}
      />

      <Stack.Screen
        name="preview/index"
        options={{
          title: "Preview",
        }}
      />

      <Stack.Screen
        name="loading/index"
        options={{
          title: "Sending…",
          headerShown: false,
          presentation: "transparentModal",
        }}
      />

      <Stack.Screen
        name="settings/index"
        options={{
          title: "Settings",
        }}
      />
    </Stack>
  );
}
