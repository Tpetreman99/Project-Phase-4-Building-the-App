import { Text, View, StyleSheet, Pressable } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useStats } from "../context/StatsContext";

export default function Stats() {
  const { stats } = useStats();

  const hoursPlayed = `${(stats.timePlayedMinutes / 60).toFixed(1)} hrs`;
  const winRate =
    stats.gamesPlayed > 0
      ? `${((stats.wins / stats.gamesPlayed) * 100).toFixed(1)}%`
      : "0.0%";

  return (
    <GradientBackground>
      <SafeAreaView style={s.container}>
        <View>
          <Pressable onPress={() => router.back()} style={s.backButton}>
            <Entypo name="chevron-left" size={30} color="white" />
          </Pressable>
        </View>

        <View style={s.header}>
          <Text style={s.title}>Stats</Text>
        </View>

        <View style={s.grid}>
          <View style={s.row}>
            <StatCard label="Games Played" value={String(stats.gamesPlayed)} />
            <StatCard label="Time Played" value={hoursPlayed} />
          </View>

          <View style={s.row}>
            <StatCard label="Losses" value={String(stats.losses)} />
            <StatCard label="Wins" value={String(stats.wins)} />
          </View>

          <View style={s.row}>
            <StatCard label="Stalemate" value={String(stats.stalemates)} />
            <StatCard label="Win Rate" value={winRate} highlight />
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  backButton: {
    padding: 4,
    alignSelf: "flex-start",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#F2F4F8",
    letterSpacing: 0.4,
    textAlign: "center",
  },

  grid: {
    width: "100%",
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
    borderColor: "rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    elevation: 5,
  },

  cardInner: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.18)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },

  cardLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(0, 220, 130, 0.9)",
    letterSpacing: 0.3,
    textAlign: "center",
  },

  cardLabelHighlight: {
    color: "rgba(100, 200, 255, 0.9)",
  },

  cardValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F2F4F8",
    letterSpacing: 0.2,
  },
});
