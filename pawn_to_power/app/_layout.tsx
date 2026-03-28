import { Stack } from "expo-router";
import { UserProvider } from "./context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack
        initialRouteName="(screens)/index"
        screenOptions={{
          headerShown: false,
        }}
      />
    </UserProvider>
  );
}
