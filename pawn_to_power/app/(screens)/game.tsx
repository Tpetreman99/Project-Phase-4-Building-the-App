import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../components/GradientBackground";
import GameBoard from "../components/GameBoard";

export default function Game() {
  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>
        <GameBoard />
      </SafeAreaView>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
