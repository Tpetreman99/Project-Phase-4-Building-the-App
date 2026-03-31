import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../components/GradientBackground";
import GameBoard from "../components/GameBoard";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useState } from "react";
import { Entypo, AntDesign } from "@expo/vector-icons";

export default function Game() {
  const [paused, setPaused] = useState(false);
  const Blur = BlurView as any;

  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>

        {/* Game board */}
        <View style={s.boardWrapper}>
          <GameBoard />
        </View>

        {/* Bottom controls */}
        <Text style={s.frameLabel}>Frame</Text>
        <View style={s.controls}>
          <Pressable style={s.arrowButton}>
            <Entypo name="chevron-left" size={22} color="#F2F4F8" />
          </Pressable>

          <Pressable style={s.pauseButton} onPress={() => setPaused(true)}>
            <AntDesign name="pause" size={24} color="#F2F4F8" />
          </Pressable>

          <Pressable style={s.arrowButton}>
            <Entypo name="chevron-right" size={22} color="#F2F4F8" />
          </Pressable>
        </View>

        {/* Pause overlay */}
        {paused && (
          <View style={s.overlay}>
            <Blur intensity={60} tint="dark" style={s.blurFill} />
            {/* grey desaturation layer */}
            <View style={s.greyWash} />

            <View style={s.pauseMenu}>
              <Text style={s.pauseTitle}>Pause</Text>

              <View style={s.pauseButtons}>
                <Pressable
                  style={({ pressed }) => [s.pauseMenuButton, pressed && s.pauseMenuButtonPressed]}
                  onPress={() => setPaused(false)}>
                  <View style={s.pauseGlassInner}>
                    <Text style={s.pauseMenuButtonText}>Resume Game</Text>
                  </View>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [s.pauseMenuButton, pressed && s.pauseMenuButtonPressed]}>
                  <View style={s.pauseGlassInner}>
                    <Text style={s.pauseMenuButtonText}>Tips</Text>
                  </View>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [s.pauseMenuButton, pressed && s.pauseMenuButtonPressed]}
                  onPress={() => { setPaused(false); router.push('/settings'); }}>
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
    width: '100%',
    alignItems: 'center',
  },

  frameLabel: {
    color: 'rgba(242, 244, 248, 0.5)',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  // Bottom controls bar
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 10,
  },

  arrowButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pauseButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#2ecc8a',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2ecc8a',
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 6,
  },

  // Pause overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },

  blurFill: {
    ...StyleSheet.absoluteFillObject,
  },

  greyWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 30, 30, 0.6)',
  },
  pauseMenu: {
    width: '75%',
    alignItems: 'center',
    gap: 32,
  },

  pauseTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F2F4F8',
    letterSpacing: 0.5,
  },

  pauseButtons: {
    width: '100%',
    gap: 10,
  },

  pauseMenuButton: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 5,
  },

  pauseMenuButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },

  pauseGlassInner: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },

  pauseMenuButtonText: {
    color: '#F2F4F8',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});