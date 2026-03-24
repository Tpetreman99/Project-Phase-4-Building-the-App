import { Text, View, StyleSheet, Pressable } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Stats() {
  return (
    <GradientBackground>
      <SafeAreaView>
        <Text>Stats page</Text>
      </SafeAreaView>
    </GradientBackground>
  );
}
