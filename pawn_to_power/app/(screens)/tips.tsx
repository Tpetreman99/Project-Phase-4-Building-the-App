// PLEASE NOTE THE TEXT DESCRIPTIONS USED ON THIS PAGE WHERE AI GENERATED, ALL CODE AND STYLING WHERE DONE BY REAL PEOPLE

import { View, Text, StyleSheet, ScrollView, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBackground from "../components/GradientBackground";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";


export default function Tips() {

  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Pressable onPress={() => router.back()} style={s.backButton}>
            <Entypo name="chevron-left" size={30} color="white" />
          </Pressable>
        </View>
        <View>
          <Text style={s.sectionLabel}>Opening Principles</Text>

          <View style={s.card}>
            <Text style={s.title}>Control the center</Text>
            <Text style={s.cardDescription}>Place pawns and pieces on or near e4, d4, e5, d5. Central control gives your pieces more mobility and limits your opponent's options.</Text>
          </View>

          <View style={s.card}>
            <Text style={s.title}>Develop your pieces early</Text>
            <Text style={s.cardDescription}>Move knights and bishops out before rooks or your queen. Aim to have all minor pieces active within the first 6-8 moves.</Text>
          </View>

          <View style={s.card}>
            <Text style={s.title}>Castle early</Text>
            <Text style={s.cardDescription}>Get your king to safety by castling in the first 10 moves. A king left in the center is a constant target for your opponent.</Text>
          </View>
        </View>

        <View>
          <Text style={s.sectionLabel}>Middle game Strategy</Text>

          <View style={s.card}>
            <Text style={s.title}>Create a plan</Text>
            <Text style={s.cardDescription}>Don't just react — ask yourself "what is my opponent's threat?" then form your own plan. Even a flawed plan beats no plan at all.</Text>
          </View>

          <View style={s.card}>
            <Text style={s.title}>Rooks belong on open files</Text>
            <Text style={s.cardDescription}>Place rooks on files with no pawns blocking them. Double your rooks on an open file to maximize their pressure on the 7th rank.</Text>
          </View>

          <View style={s.card}>
            <Text style={s.title}>Knights vs. bishops</Text>
            <Text style={s.cardDescription}>Knights shine in closed positions with lots of pawns. Bishops dominate in open positions with long diagonals. Know when to trade one for the other.</Text>
          </View>

        </View>

        <View>
          <Text style={s.sectionLabel}>Endgame Essentials</Text>

          <View style={s.card}>
            <Text style={s.title}>Activate your king</Text>
            <Text style={s.cardDescription}>In the endgame, the king becomes a powerful piece. March it toward the center or toward passed pawns, it's no longer just hiding.</Text>
          </View>

          <View style={s.card}>
            <Text style={s.title}>Passed pawns must be pushed</Text>
            <Text style={s.cardDescription}>A passed pawn, one with no opposing pawns in its path is a major winning advantage. Support it with your king and push it to promote.</Text>
          </View>

          <View style={s.card}>
            <Text style={s.title}>The opposition</Text>
            <Text style={s.cardDescription}>When kings face each other with one square between them, the player who doesn't have to move holds "the opposition" — a key endgame technique.</Text>
          </View>

        </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  )
}

const s = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 40,
  },

  card: {
    padding: 10,
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    
  },

  sectionLabel: {
    color: '2cc295',
    fontSize: 20,
    padding: 10,
    
  },

  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    paddingBottom: 3.5,
  },

  cardDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
  },

  backButton: {
    padding: 4,
    marginBottom: 10,
  },
})

