import { Text, View, StyleSheet, Pressable } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useStats } from "../../context/StatsContext";

export default function Stats() {
  const { stats } = useStats();
  const { recordGame } = useStats();

  const winRate =
    stats.gamesPlayed > 0
      ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(1) + "%"
      : "0%";

  const timePlayed = (stats.timePlayedMinutes / 60).toFixed(1) + " hrs";

  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>

        <Pressable onPress={() => router.back()} style={s.backButton}>
          <Entypo name="chevron-left" size={30} color="white" />
        </Pressable>

        <View style={s.header}>
          <Text style={s.title}>Stats</Text>
        </View>

        <View style={s.grid}>
          <View style={s.row}>
            <StatCard label="Games Played" value={String(stats.gamesPlayed)} />
            <StatCard label="Time Played" value={timePlayed} />
          </View>

          <View style={s.row}>
            <StatCard label="Wins" value={String(stats.wins)} />
            <StatCard label="Losses" value={String(stats.losses)} />
          </View>

          <View style={s.row}>
            <StatCard label="Stalemates" value={String(stats.stalemates)} />
            <StatCard label="Win Rate" value={winRate} highlight />
          </View>
        </View>
        {/* Simulate Win */}
        <Pressable onPress={() => { recordGame("win", 5); }}>
          <View>
            <Text>Simulate Win</Text>
          </View>
        </Pressable>

        {/* Simulate Loss */}
        <Pressable onPress={() => { recordGame("loss", 5); }}>
          <View>
            <Text>Simulate Loss</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    </GradientBackground>
  );
}

function StatCard({ label, value, highlight = false }: any) {
  return (
    <View style={s.card}>
      <View style={s.cardInner}>
        <Text style={[s.cardLabel, highlight && s.cardLabelHighlight]}>
          {label}
        </Text>
        <Text style={s.cardValue}>{value}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 200,
    paddingHorizontal: 40,
    justifyContent: "space-between",
  },

  header: {
    alignItems: "center",
  },

  backButton: {
    alignSelf: "flex-start",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F2F4F8",
  },

  grid: {
    gap: 14,
  },

  row: {
    flexDirection: "row",
    gap: 14,
  },

  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  cardInner: {
    padding: 16,
    alignItems: "center",
  },

  cardLabel: {
    fontSize: 13,
    color: "rgba(0,220,130,0.9)",
  },

  cardLabelHighlight: {
    color: "rgba(100,200,255,0.9)",
  },

  cardValue: {
    fontSize: 24,
    color: "#F2F4F8",
    fontWeight: "700",
  },
});
