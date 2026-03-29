import { Text, View, StyleSheet, Pressable } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { router } from "expo-router";
import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function Settings() {
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [hapticEnabled, setHapticEnabled] = useState(false);
  const { username } = useUser();

  return (
    <GradientBackground>
      <View style={s.container}>

        <View style={s.titleBlock}>
          <Text style={s.TitleScreen}>Settings</Text>
        </View>

        {/* Username section */}
        <View style={s.section}>
          <Text style={s.usernameLabel}>Username:</Text>
          <Text style={s.usernameValue}>[{username ? username : "Player"}]</Text>
          <Pressable
            onPress={() => router.push('/change-username')}
            style={({ pressed }) => [s.menuButton, pressed && s.menuButtonPressed]}>
            <View style={s.glassInner}>
              <Text style={s.menuButtonText}>Change Username</Text>
            </View>
          </Pressable>
        </View>

        {/* Preferences section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>Preferences</Text>
          <View style={s.buttonSelection}>
            <Pressable
              onPress={() => setHapticEnabled((prev) => !prev)}
              style={({ pressed }) => [
                s.menuButton,
                { borderColor: hapticEnabled ? 'rgba(0, 200, 100, 0.5)' : 'rgba(255, 80, 80, 0.5)' },
                pressed && s.menuButtonPressed
              ]}>
              <View style={[
                s.glassInner,
                { backgroundColor: hapticEnabled ? 'rgba(0, 200, 100, 0.08)' : 'rgba(255, 80, 80, 0.08)' }
              ]}>
                <View style={s.buttonRow}>
                  <Text style={s.menuButtonText}>Haptic</Text>
                  <View style={[s.dot, { backgroundColor: hapticEnabled ? "#00c864" : "#ff5050" }]} />
                  <Text style={s.menuButtonText}>{hapticEnabled ? "ON" : "OFF"}</Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setMusicEnabled((prev) => !prev)}
              style={({ pressed }) => [
                s.menuButton,
                { borderColor: musicEnabled ? 'rgba(0, 200, 100, 0.5)' : 'rgba(255, 80, 80, 0.5)' },
                pressed && s.menuButtonPressed
              ]}>
              <View style={[
                s.glassInner,
                { backgroundColor: musicEnabled ? 'rgba(0, 200, 100, 0.08)' : 'rgba(255, 80, 80, 0.08)' }
              ]}>
                <View style={s.buttonRow}>
                  <Text style={s.menuButtonText}>Music</Text>
                  <View style={[s.dot, { backgroundColor: musicEnabled ? "#00c864" : "#ff5050" }]} />
                  <Text style={s.menuButtonText}>{musicEnabled ? "ON" : "OFF"}</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Reset Stats */}
        <Pressable
          style={({ pressed }) => [s.menuButton, s.resetButton, pressed && s.menuButtonPressed]}>
          <View style={s.glassInner}>
            <Text style={s.resetButtonText}>Reset Stats</Text>
          </View>
        </Pressable>

      </View>
    </GradientBackground>
  );
}

const s = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 150,
    paddingBottom: 60,
    paddingHorizontal: 40,
  },

  titleBlock: {
    alignItems: 'center',
  },

  TitleScreen: {
    fontSize: 30,
    fontWeight: '700',
    color: '#F2F4F8',
  },

  section: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(242, 244, 248, 0.75)',
    marginBottom: 4,
    letterSpacing: 0.3,
  },

  usernameLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(242, 244, 248, 0.75)',
    letterSpacing: 0.3,
  },

  usernameValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F2F4F8',
    letterSpacing: 0.4,
  },

  menuButton: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    elevation: 5,
  },

  menuButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },

  glassInner: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  menuButtonText: {
    color: '#F2F4F8',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.4,
  },

  buttonSelection: {
    width: '100%',
    gap: 10,
  },

  resetButton: {
    borderColor: 'rgba(255, 80, 80, 0.3)',
  },

  resetButtonText: {
    color: 'rgba(255, 100, 100, 0.9)',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.4,
  },

});