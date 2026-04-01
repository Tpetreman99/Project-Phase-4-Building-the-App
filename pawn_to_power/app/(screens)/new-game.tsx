import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../components/GradientBackground";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

export default function NewGame() {
  const handleSelectSide = (side: "white" | "black") => {
    router.push({
      pathname: "/game",
      params: { side },
    });
  };

  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <Pressable onPress={() => router.back()} style={s.backButton}>
            <Entypo name="chevron-left" size={30} color="white" />
          </Pressable>
        </View>

        <View style={s.titleBlock}>
          <Text style={s.title}>New Game</Text>
          <Text style={s.playAs}>Play as</Text>
        </View>

        <View style={s.buttonBox}>
          <Pressable
            onPress={() => handleSelectSide("white")}
            style={({ pressed }) => [
              s.menuButton,
              pressed && s.menuButtonPressed,
            ]}
          >
            <View style={s.glassInner}>
              <View style={s.buttonRow}>
                <Text style={s.menuButtonText}>White</Text>
                <FontAwesome5 name="chess-pawn" size={28} color="white" />
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => handleSelectSide("black")}
            style={({ pressed }) => [
              s.menuButton,
              pressed && s.menuButtonPressed,
            ]}
          >
            <View style={s.glassInner}>
              <View style={s.buttonRow}>
                <Text style={s.menuButtonText}>Black</Text>
                <FontAwesome5 name="chess-pawn" size={28} color="black" />
              </View>
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
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
    justifyContent: "space-between",
  },

  header: {
    alignSelf: "flex-start",
  },

  backButton: {
    padding: 4,
  },

  titleBlock: {
    alignItems: "center",
    marginTop: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#F2F4F8",
    marginBottom: 20,
  },

  playAs: {
    fontSize: 22,
    fontWeight: "400",
    color: "rgba(242, 244, 248, 0.75)",
    letterSpacing: 0.3,
  },

  buttonBox: {
    width: "100%",
    gap: 20,
    marginBottom: 180,
  },

  menuButton: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    elevation: 5,
  },

  menuButtonPressed: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.5)",
  },

  glassInner: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.18)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  menuButtonText: {
    color: "#F2F4F8",
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
});
