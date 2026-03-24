import { Text, View, StyleSheet, Pressable } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <GradientBackground>
      <SafeAreaView>
        <Text>settings page</Text>
      </SafeAreaView>
    </GradientBackground>
  );
}
