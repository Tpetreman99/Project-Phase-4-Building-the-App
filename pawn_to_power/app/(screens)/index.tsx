import { Text, View, StyleSheet, Pressable } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useUser } from "../context/UserContext";

export default function Index() {
  const { username } = useUser();

  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>
        <View style={s.titleBlock}>
          <Text style={s.appName}>Pawn</Text>
          <Text style={s.toText}>to</Text>
          <Text style={s.appName}>Power</Text>
        </View>

        <Text style={s.welcomeText}>
          Welcome back {username ? username : "Player"}!
        </Text>

        <View style={s.buttonSelection}>
          <Pressable onPress={() => router.push('/new-game')} style={({ pressed }) => [s.menuButton, pressed && s.menuButtonPressed]}>
            <View style={s.glassInner}>
              <Text style={s.menuButtonText}>New Game</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push('/game')} style={({ pressed }) => [s.menuButton, pressed && s.menuButtonPressed]}>
            <View style={s.glassInner}>
              <Text style={s.menuButtonText}>Resume Game</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push('/stats')} style={({ pressed }) => [s.menuButton, pressed && s.menuButtonPressed]}>
            <View style={s.glassInner}>
              <Text style={s.menuButtonText}>Stats</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push('/settings')} style={({ pressed }) => [s.menuButton, pressed && s.menuButtonPressed]}>
            <View style={s.glassInner}>
              <Text style={s.menuButtonText}>Settings</Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const s = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },

  titleBlock: {
    alignItems: 'center',
    marginBottom: 80,
  },

  appName: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: '700',
    color: '#F2F4F8',
    lineHeight: 30,
    marginVertical: -2,
  },

  toText: {
    fontSize: 30,
    fontStyle: 'italic',
    color: '#F2F4F8',
    lineHeight: 30,
    marginVertical: -2,
  },

  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(242, 244, 248, 0.75)',
    textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: 40,
  },

  // Outer shell — dark tinted glass base + white border
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

  // Inner layer — top highlight simulates inner glass shine
  glassInner: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.18)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
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

});