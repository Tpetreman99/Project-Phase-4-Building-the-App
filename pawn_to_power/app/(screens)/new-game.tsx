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
  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <Pressable onPress={() => router.back()}>
            <Entypo name="chevron-left" size={30} color="white" />
          </Pressable>
          <Text style={s.title}>New Game</Text>
        </View>

        <View style={s.buttonBox}>
          <Text style={s.playAs}>Play as</Text>
          <TouchableOpacity
            onPress={() => router.push("/game")}
            style={s.menuButton}
          >
            <Text style={s.menuButtonText}>White</Text>
            <FontAwesome5 name="chess-pawn" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/game")}
            style={s.menuButton}
          >
            <Text style={s.menuButtonText}>Black</Text>
            <FontAwesome5 name="chess-pawn" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: "center",
    alignSelf: "flex-start",
    gap: "20%",
  },

  title: {
    fontSize: 30,
    fontWeight: 700,
    color: "#F2F4F8",
    textAlign: "center",
  },

  playAs: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
    textAlign: "center",
    fontWeight: 100,
  },

  //Navigation options styling
  buttonBox: {
    flex: 1,
    justifyContent: "center",
  },
  menuButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
    height: 60,
    width: "60%",
    borderRadius: 30,
    borderColor: "rgba(255, 255, 255, 0.14)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    alignItems: "center",
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    marginBottom: 40,
  },

  menuButtonText: {
    fontSize: 20,
    color: "white",
    paddingVertical: 20,
  },
});
