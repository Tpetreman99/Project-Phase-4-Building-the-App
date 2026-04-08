import { Stack } from "expo-router";
import { UserProvider } from ".././context/UserContext";
import { AudioProvider } from "@/context/AudioContext";
import { StatsProvider } from "@/context/StatsContext";

export default function RootLayout() {
  return (
    <AudioProvider>
    <UserProvider>
      <StatsProvider>
      <Stack
        initialRouteName="(screens)/index"
        screenOptions={{
          headerShown: false,
        }}
      />
      </StatsProvider>
    </UserProvider>
    </AudioProvider>
  );
}
