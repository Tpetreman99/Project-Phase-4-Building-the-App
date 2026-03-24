import React from "react";
import { View, StyleSheet } from "react-native";

function Tile({ isDark }: { isDark: boolean }) {
  return (
    <View
      style={[styles.tile, { backgroundColor: isDark ? "#2C8750" : "#F1F7F6" }]}
    />
  );
}

export default function GameBoard() {
  const boardArray = [
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 1, 2, 3, 4, 5, 6, 7],
  ];

  return (
    <View style={styles.board}>
      {boardArray.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((col, colIndex) => {
            const isDark = (rowIndex + colIndex) % 2 === 1;

            return <Tile key={colIndex} isDark={isDark} />;
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    width: 340,
    height: 340,
    backgroundColor: "#393939",
    padding: 6
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  tile: {
    flex: 1,
  },
});
