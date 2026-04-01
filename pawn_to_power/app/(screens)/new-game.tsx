import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
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
            <Entypo name="chevron-left" size={28} color="white" />
          </Pressable>

          <Text style={s.title}>New Game</Text>

          <View style={s.headerSpacer} />
        </View>

        <View style={s.content}>
          <Text style={s.playAs}>Play as</Text>

          <TouchableOpacity
            onPress={() => handleSelectSide("white")}
            style={s.menuButton}
            activeOpacity={0.8}
          >
            <Text style={s.menuButtonText}>White</Text>
            <FontAwesome5 name="chess-pawn" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSelectSide("black")}
            style={s.menuButton}
            activeOpacity={0.8}
          >
            <Text style={s.menuButtonText}>Black</Text>
            <FontAwesome5 name="chess-pawn" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 40,
  },

  backButton: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerSpacer: {
    width: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#F2F4F8",
    textAlign: "center",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  playAs: {
    fontSize: 24,
    marginBottom: 28,
    color: "white",
    textAlign: "center",
    fontWeight: "300",
  },

  menuButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "78%",
    paddingHorizontal: 28,
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 20,
  },

  menuButtonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
});
