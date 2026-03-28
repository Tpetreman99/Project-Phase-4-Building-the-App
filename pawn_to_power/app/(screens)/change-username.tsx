import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { router } from "expo-router";
import { useState } from "react";
import { useUser } from "../context/UserContext";

export default function ChangeUsername() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { setUsername: saveUsername } = useUser();

  const handleSubmit = () => {
    if (username.trim().length === 0) return;
    saveUsername(username.trim());
    setSubmitted(true);
  };

  return (
    <GradientBackground>
      <View style={s.container}>

        <View style={s.titleBlock}>
          <Text style={s.TitleScreen}>Change Username</Text>
        </View>

        <View style={s.content}>
          {!submitted ? (
            <>
              <Text style={s.question}>What's your new username going to be?</Text>

              <TextInput
                style={s.input}
                placeholder="Type your username..."
                placeholderTextColor="rgba(242, 244, 248, 0.4)"
                value={username}
                onChangeText={setUsername}
                autoFocus
                maxLength={20}
              />

              <Pressable
                style={[s.confirmButton, username.trim().length === 0 && s.disabledButton]}
                onPress={handleSubmit}>
                <Text style={s.confirmButtonText}>Confirm</Text>
              </Pressable>
            </>
          ) : (
            <Text style={s.successText}>Username updated!</Text>
          )}
        </View>

        <Pressable style={s.backButton} onPress={() => router.back()}>
          <Text style={s.backButtonText}>← Back</Text>
        </Pressable>

      </View>
    </GradientBackground>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 150,
    paddingBottom: 180,
    paddingHorizontal: 30,
  },

  titleBlock: {
    alignItems: "center",
    marginTop: 12,
  },

  TitleScreen: {
    fontSize: 30,
    fontWeight: "700",
    color: "#F2F4F8",
  },

  content: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },

  question: {
    fontSize: 22,
    fontWeight: "600",
    color: "#F2F4F8",
    textAlign: "center",
    marginBottom: 10,
  },

  input: {
    width: "100%",
    minHeight: 54,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    paddingHorizontal: 20,
    color: "#F2F4F8",
    fontSize: 20,
    textAlign: "center",
  },

  confirmButton: {
    width: "100%",
    minHeight: 54,
    borderRadius: 30,
    backgroundColor: "rgba(0, 200, 100, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(0, 200, 100, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.4,
  },

  confirmButtonText: {
    color: "#F2F4F8",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  successText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#F2F4F8",
    textAlign: "center",
  },

  backButton: {
    alignSelf: "flex-start",
  },

  backButtonText: {
    color: "rgba(242, 244, 248, 0.6)",
    fontSize: 18,
    fontWeight: "600",
  },
});