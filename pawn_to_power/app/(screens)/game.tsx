import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../components/GradientBackground";
import GameBoard from "../components/GameBoard";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useState } from "react";
import { useStats } from "../../context/StatsContext";

export default function Game() {
  const [paused, setPaused] = useState(false);
  const { recordGame } = useStats();

  const Blur = BlurView as any;

  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>
        {/* Game board */}
        <View style={s.boardWrapper}>
          <GameBoard setPaused={setPaused} />
        </View>

        {/* Pause overlay */}
        {paused && (
          <View style={s.overlay}>
            <Blur intensity={60} tint="dark" style={s.blurFill} />
            <View style={s.greyWash} />

            <View style={s.pauseMenu}>
              <Text style={s.pauseTitle}>Pause</Text>

              <View style={s.pauseButtons}>
                {/* Resume */}
                <Pressable
                  style={({ pressed }) => [
                    s.pauseMenuButton,
                    pressed && s.pauseMenuButtonPressed,
                  ]}
                  onPress={() => setPaused(false)}
                >
                  <View style={s.pauseGlassInner}>
                    <Text style={s.pauseMenuButtonText}>Resume Game</Text>
                  </View>
                </Pressable>

                {/* Simulate Win */}
                <Pressable
                  style={({ pressed }) => [
                    s.pauseMenuButton,
                    pressed && s.pauseMenuButtonPressed,
                  ]}
                  onPress={() => {
                    recordGame("win", 5);
                    setPaused(false);
                    router.push("/stats");
                  }}
                >
                  <View style={s.pauseGlassInner}>
                    <Text style={s.pauseMenuButtonText}>Simulate Win</Text>
                  </View>
                </Pressable>

                {/* Simulate Loss */}
                <Pressable
                  style={({ pressed }) => [
                    s.pauseMenuButton,
                    pressed && s.pauseMenuButtonPressed,
                  ]}
                  onPress={() => {
                    recordGame("loss", 5);
                    setPaused(false);
                    router.push("/stats");
                  }}
                >
                  <View style={s.pauseGlassInner}>
                    <Text style={s.pauseMenuButtonText}>Simulate Loss</Text>
                  </View>
                </Pressable>

                {/* Exit */}
                <Pressable
                  style={({ pressed }) => [
                    s.pauseMenuButton,
                    pressed && s.pauseMenuButtonPressed,
                  ]}
                  onPress={() => {
                    setPaused(false);
                    router.push("/");
                  }}
                >
                  <View style={s.pauseGlassInner}>
                    <Text style={s.pauseMenuButtonText}>Exit Game</Text>
                  </View>
                </Pressable>

                {/* Settings */}
                <Pressable
                  style={({ pressed }) => [
                    s.pauseMenuButton,
                    pressed && s.pauseMenuButtonPressed,
                  ]}
                  onPress={() => {
                    setPaused(false);
                    router.push("/settings");
                  }}
                >
                  <View style={s.pauseGlassInner}>
                    <Text style={s.pauseMenuButtonText}>Settings</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        )}
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

  boardWrapper: {
    width: "100%",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  blurFill: {
    ...StyleSheet.absoluteFillObject,
  },

  greyWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(30, 30, 30, 0.6)",
  },

  pauseMenu: {
    width: "75%",
    alignItems: "center",
    gap: 32,
  },

  pauseTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#F2F4F8",
  },

  pauseButtons: {
    width: "100%",
    gap: 10,
  },

  pauseMenuButton: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(0,0,0,0.2)",
    overflow: "hidden",
  },

  pauseMenuButtonPressed: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  pauseGlassInner: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  pauseMenuButtonText: {
    color: "#F2F4F8",
    fontSize: 18,
    fontWeight: "600",
  },
});
