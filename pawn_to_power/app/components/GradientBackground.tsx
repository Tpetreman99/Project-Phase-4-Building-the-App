import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GradientBackground({ children }: PropsWithChildren) {
  return (
    <LinearGradient
      style={s.container}
      colors={[
        // colour gradient changing
        "#2CC295",
        "#03524C",
        "#051824",
      ]}
      // colour gradient position
      locations={[0, 0.3, 0.84]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 2.5 }}
    >
      {children}
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
