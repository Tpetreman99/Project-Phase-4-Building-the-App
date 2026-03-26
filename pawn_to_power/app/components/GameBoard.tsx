import React, { useMemo, useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Chess, Square } from "chess.js";

type MoveSquare = {
  from: Square;
  to: Square;
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const PIECE_SYMBOLS: Record<string, string> = {
  wp: "♙",
  wn: "♘",
  wb: "♗",
  wr: "♖",
  wq: "♕",
  wk: "♔",
  bp: "♟",
  bn: "♞",
  bb: "♝",
  br: "♜",
  bq: "♛",
  bk: "♚",
};

function Tile({
  isDark,
  piece,
  isSelected,
  isLegalTarget,
  isSuggested,
  onPress,
}: {
  isDark: boolean;
  piece?: string;
  isSelected: boolean;
  isLegalTarget: boolean;
  isSuggested: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.tile,
        { backgroundColor: isDark ? "#2C8750" : "#F1F7F6" },
        isSelected && styles.selectedTile,
        isSuggested && styles.suggestedTile,
      ]}
    >
      {isLegalTarget ? <View style={styles.legalMoveDot} /> : null}
      {piece ? <Text style={styles.pieceText}>{piece}</Text> : null}
    </Pressable>
  );
}

export default function GameBoard() {
  const [game, setGame] = useState(() => new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);

  const legalMoves = useMemo(() => {
    if (!selectedSquare) return [] as MoveSquare[];

    return game.moves({ square: selectedSquare, verbose: true }).map((move) => ({
      from: move.from,
      to: move.to,
    }));
  }, [game, selectedSquare]);

  const suggestedMove = useMemo(() => {
    const moves = game.moves({ verbose: true });
    if (moves.length === 0) return null;

    const captureMove = moves.find((move) => move.captured);
    const candidate = captureMove ?? moves[0];

    return {
      from: candidate.from,
      to: candidate.to,
    };
  }, [game]);

  const handleSquarePress = (square: Square) => {
    const board = game.board();
    const rankIndex = 8 - Number(square[1]);
    const fileIndex = FILES.indexOf(square[0] as (typeof FILES)[number]);
    const pieceOnSquare = board[rankIndex][fileIndex];
    const currentTurn = game.turn();

    if (!selectedSquare) {
      if (pieceOnSquare && pieceOnSquare.color === currentTurn) {
        setSelectedSquare(square);
      }
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    const moveAttempt = game.move({
      from: selectedSquare,
      to: square,
      promotion: "q",
    });

    if (moveAttempt) {
      setGame(new Chess(game.fen()));
      setSelectedSquare(null);
      return;
    }

    if (pieceOnSquare && pieceOnSquare.color === currentTurn) {
      setSelectedSquare(square);
      return;
    }

    setSelectedSquare(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {RANKS.map((rank, rowIndex) => (
          <View key={rank} style={styles.row}>
            {FILES.map((file, colIndex) => {
              const square = `${file}${rank}` as Square;
              const isDark = (rowIndex + colIndex) % 2 === 1;
              const piece = game.get(square);
              const pieceKey = piece ? `${piece.color}${piece.type}` : undefined;
              const isLegalTarget = legalMoves.some((move) => move.to === square);
              const isSelected = selectedSquare === square;
              const isSuggested =
                suggestedMove?.from === square || suggestedMove?.to === square;

              return (
                <Tile
                  key={square}
                  isDark={isDark}
                  piece={pieceKey ? PIECE_SYMBOLS[pieceKey] : undefined}
                  isSelected={isSelected}
                  isLegalTarget={isLegalTarget}
                  isSuggested={!!isSuggested}
                  onPress={() => handleSquarePress(square)}
                />
              );
            })}
          </View>
        ))}
      </View>

      <Text style={styles.statusText}>Turn: {game.turn() === "w" ? "White" : "Black"}</Text>
      <Text style={styles.statusText}>FEN: {game.fen()}</Text>
      <Text style={styles.helperText}>
        Tap one of your pieces to see legal moves. Tap a highlighted square to move.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
  },
  board: {
    width: 330,
    height: 330,
    backgroundColor: "#393939",
    padding: 6,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  tile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  selectedTile: {
    borderWidth: 3,
    borderColor: "#FFD166",
  },
  suggestedTile: {
    borderWidth: 2,
    borderColor: "#5DA9E9",
  },
  legalMoveDot: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  pieceText: {
    fontSize: 28,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  helperText: {
    fontSize: 12,
    textAlign: "center",
    maxWidth: 340,
    color: "#444",
  },
});
