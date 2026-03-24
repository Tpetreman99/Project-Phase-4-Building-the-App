import { Text, View, StyleSheet, Pressable } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";

export default function Index() {
  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>
        <View style={s.titleBlock}>
          <Text style={s.appName}>Pawn</Text>
          <Text style={s.toText}>to</Text>
          <Text style={s.appName}>Power</Text>
        </View>

        <View style={s.buttonSelection}>
          <Pressable 
          style={s.menuButton}
          onPress={() => router.push('/new-game')}>
            <Text style={s.menuButtonText}>New Game</Text>
          </Pressable>

          {/* This button shoudl return to last played state */}
          <Pressable 
          style={s.menuButton}
          onPress={() => router.push('/game')}>
            <Text style={s.menuButtonText}>Resume Game</Text>
          </Pressable>

          <Pressable 
          style={s.menuButton}
          onPress={() => router.push('/stats')}>
            <Text style={s.menuButtonText}>Stats</Text>
          </Pressable>

          <Pressable 
          style={s.menuButton}
          onPress={() => router.push('/settings')}>
            <Text style={s.menuButtonText}>Settings</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </GradientBackground>
  )
}


const s = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  // App name styling
  titleBlock: {
    alignItems: 'center',
    marginBottom: 100
  },

  appName: {
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 700,
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

//Navigation options styling
  menuButton: {
    width: '100%',
    minHeight: 54,
    borderRadius: 30,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 4
  },

  menuButtonText: {
    color: '#F2F4F8',
    fontSize: 30,
    fontWeight: 700,
    letterSpacing: 0.2,
  },

  buttonSelection: {
    width: '100%',
    gap: 15
  }

})