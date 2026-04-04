import { Stack } from "expo-router";
import { UserProvider } from ".././context/UserContext";
import { AudioProvider } from "@/context/AudioContext";

export default function RootLayout() {
  return (
    <AudioProvider>
    <UserProvider>
      <Stack
        initialRouteName="(screens)/index"
        screenOptions={{
          headerShown: false,
        }}
      />
    </UserProvider>
    </AudioProvider>
  );
}
