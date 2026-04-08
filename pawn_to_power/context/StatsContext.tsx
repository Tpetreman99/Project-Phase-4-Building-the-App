import React, { createContext, useContext, useMemo, useState } from "react";

type GameResult = "win" | "loss" | "stalemate";

type Stats = {
  gamesPlayed: number;
  wins: number;
  losses: number;
  stalemates: number;
  timePlayedMinutes: number;
};

type StatsContextType = {
  stats: Stats;
  recordGame: (result: GameResult, minutesPlayed: number) => void;
  resetStats: () => void;
};

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<Stats>({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    stalemates: 0,
    timePlayedMinutes: 0,
  });

  const recordGame = (result: GameResult, minutesPlayed: number) => {
    setStats((prev) => ({
      gamesPlayed: prev.gamesPlayed + 1,
      wins: prev.wins + (result === "win" ? 1 : 0),
      losses: prev.losses + (result === "loss" ? 1 : 0),
      stalemates: prev.stalemates + (result === "stalemate" ? 1 : 0),
      timePlayedMinutes: prev.timePlayedMinutes + Math.max(0, minutesPlayed),
    }));
  };

  const resetStats = () => {
    setStats({
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      stalemates: 0,
      timePlayedMinutes: 0,
    });
  };

  const value = useMemo(
    () => ({
      stats,
      recordGame,
      resetStats,
    }),
    [stats],
  );

  return (
    <StatsContext.Provider value={value}>{children}</StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);

  if (!context) {
    throw new Error("useStats must be used inside a StatsProvider");
  }

  return context;
}
