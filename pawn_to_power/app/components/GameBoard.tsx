import React, { useMemo, useState } from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { Chess, Square } from "chess.js";
import { router } from "expo-router";

type MoveSquare = {
  from: Square;
  to: Square;
};

type VerboseMove = {
  after: string;
  before: string;
  color: "w" | "b";
  flags: string;
  from: Square;
  to: Square;
  piece: string;
  san: string;
  lan: string;
  captured?: string;
  promotion?: string;
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const PIECE_SYMBOLS: Record<string, string> = {
  wp: require("../../assets/pieces/wp.png"),
  wn: require("../../assets/pieces/wn.png"),
  wb: require("../../assets/pieces/wb.png"),
  wr: require("../../assets/pieces/wr.png"),
  wq: require("../../assets/pieces/wq.png"),
  wk: require("../../assets/pieces/wk.png"),
  bp: require("../../assets/pieces/bp.png"),
  bn: require("../../assets/pieces/bn.png"),
  bb: require("../../assets/pieces/bb.png"),
  br: require("../../assets/pieces/br.png"),
  bq: require("../../assets/pieces/bq.png"),
  bk: require("../../assets/pieces/bk.png"),
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
  piece?: import("react-native").ImageSourcePropType;
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
      {piece ? <Image source={piece} style={styles.boardPiece} /> : null}
    </Pressable>
  );
}

export default function GameBoard() {
  const [game, setGame] = useState(() => new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [moveHistory, setMoveHistory] = useState<VerboseMove[]>([]);
  const [isPaused, setIsPaused] = useState(true);

  // Initial config ov moves
  const initialFen = new Chess().fen();

  const displayGame = useMemo(() => {
    const fen =
      currentMoveIndex === 0
        ? initialFen
        : moveHistory[currentMoveIndex - 1].after;

    return new Chess(fen);
  }, [currentMoveIndex, moveHistory, initialFen]);

  const visibleMoves = useMemo(() => {
    return moveHistory.slice(0, currentMoveIndex);
  }, [moveHistory, currentMoveIndex]);

  const { capturedByWhite, capturedByBlack } = useMemo(() => {
    const white: string[] = [];
    const black: string[] = [];

    for (const move of visibleMoves) {
      if (!move.captured) continue;

      if (move.color === "w") {
        white.push(`b${move.captured}`);
      } else {
        black.push(`w${move.captured}`);
      }
    }

    return {
      capturedByWhite: white,
      capturedByBlack: black,
    };
  }, [visibleMoves]);

  const legalMoves = useMemo(() => {
    if (!selectedSquare) return [] as MoveSquare[];

    return displayGame
      .moves({ square: selectedSquare, verbose: true })
      .map((move) => ({
        from: move.from,
        to: move.to,
      }));
  }, [displayGame, selectedSquare]);

  const suggestedMove = useMemo(() => {
    const moves = displayGame.moves({ verbose: true });
    if (moves.length === 0) return null;

    const captureMove = moves.find((move) => move.captured);
    const candidate = captureMove ?? moves[0];

    return {
      from: candidate.from,
      to: candidate.to,
    };
  }, [displayGame]);

  // Handles tile select
  const handleSquarePress = (square: Square) => {
    const board = game.board();
    const rankIndex = 8 - Number(square[1]);
    const fileIndex = FILES.indexOf(square[0] as (typeof FILES)[number]);
    const pieceOnSquare = board[rankIndex][fileIndex];
    const currentTurn = game.turn();
    const isOwnPiece = !!pieceOnSquare && pieceOnSquare.color === currentTurn;

    if (currentMoveIndex !== moveHistory.length) {
      return;
    }

    if (!selectedSquare) {
      if (isOwnPiece) {
        setSelectedSquare(square);
      }
      return;
    }

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    if (isOwnPiece) {
      setSelectedSquare(square);
      return;
    }

    const nextGame = new Chess(game.fen());

    try {
      const moveAttempt = nextGame.move({
        from: selectedSquare,
        to: square,
        promotion: "q",
      });

      if (moveAttempt) {
        setGame(nextGame);
        const nextHistory = [...moveHistory, moveAttempt];
        setMoveHistory(nextHistory);
        setCurrentMoveIndex(nextHistory.length);
        setSelectedSquare(null);
        return;
      }
    } catch {
      // ignore
    }

    setSelectedSquare(null);
  };

  // Toggle to prev move
  const handlePrevious = () => {
    setSelectedSquare(null);
    setCurrentMoveIndex((prev) => Math.max(prev - 1, 0));
  };

  // Toggle to next move
  const handleNext = () => {
    setSelectedSquare(null);
    setCurrentMoveIndex((prev) => Math.min(prev + 1, moveHistory.length));
  };

  const resetGame = () => {
    setGame(new Chess());
    setSelectedSquare(null);
    setCurrentMoveIndex(0);
    setMoveHistory([]);
    setIsPaused(true);
  };

  const isGameOver = game.isGameOver();
  const isCheckmate = game.isCheckmate();
  const turn = game.turn();
  const inCheck = game.isCheck();
  const winner = turn === "w" ? "Black" : "White";

  return (
    <View style={styles.container}>
      {/* Turn tracker */}
      {!isGameOver && (
        <Text style={styles.statusText}>
          Turn: {displayGame.turn() === "w" ? "White" : "Black"}
        </Text>
      )}

      {/* In check warning */}
      {inCheck && !isGameOver && (
        <Text>{turn === "b" ? "Black" : "White"} is in check</Text>
      )}

      {/* Captured row white */}
      <View style={styles.capturedRow}>
        <View style={styles.capturedPieces}>
          {capturedByBlack.map((pieceKey, index) => (
            <Image
              key={`${pieceKey}-${index}`}
              source={PIECE_SYMBOLS[pieceKey]}
              style={styles.capturedPiece}
            />
          ))}
        </View>
      </View>

      {/* Gameboard */}
      <View style={styles.board}>
        {RANKS.map((rank, rowIndex) => (
          <View key={rank} style={styles.row}>
            {FILES.map((file, colIndex) => {
              const square = `${file}${rank}` as Square;
              const isDark = (rowIndex + colIndex) % 2 === 1;
              const piece = displayGame.get(square);
              const pieceKey = piece
                ? `${piece.color}${piece.type}`
                : undefined;
              const isLegalTarget = legalMoves.some(
                (move) => move.to === square,
              );
              const isSelected = selectedSquare === square;
              const isSuggested =
                !!selectedSquare &&
                suggestedMove?.from === selectedSquare &&
                suggestedMove?.to === square;

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

      {/* Captured row black */}
      <View style={styles.capturedRow}>
        <View style={styles.capturedPieces}>
          {capturedByWhite.map((pieceKey, index) => (
            <Image
              key={`${pieceKey}-${index}`}
              source={PIECE_SYMBOLS[pieceKey]}
              style={styles.capturedPiece}
            />
          ))}
        </View>
      </View>

      {/* Move controls */}
      <View style={styles.controls}>
        <Pressable style={styles.arrowButton} onPress={handlePrevious}>
          <Text style={styles.arrow}>‹</Text>
        </Pressable>

        <Pressable
          style={styles.pauseButton}
          onPress={() => setIsPaused((prev) => !prev)}
        >
          <Text>{isPaused ? "❚❚" : "▶"}</Text>
        </Pressable>

        <Pressable style={styles.arrowButton} onPress={handleNext}>
          <Text style={styles.arrow}>›</Text>
        </Pressable>
      </View>

      {/* End game overlay */}
      {isCheckmate && (
        <View style={styles.overlay}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitle}>Checkmate</Text>
            <Text style={styles.overlaySubtitle}>{winner} wins</Text>

            <Pressable style={styles.primaryButton} onPress={resetGame}>
              <Text style={styles.primaryButtonText}>Start New Game</Text>
            </Pressable>

            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.push("/(screens)")}
            >
              <Text style={styles.secondaryButtonText}>Back to Menu</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
  },
  board: {
    width: "95%",
    aspectRatio: 1,
    backgroundColor: "#393939",
    padding: 6,
  },
  // Bottom controls bar
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 10,
  },

  arrowButton: {
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    color: "#fff",
    alignSelf: "center"
  },

  pauseButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#2ecc8a",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2ecc8a",
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    elevation: 6,
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
    borderColor: "#2F9D94",
  },
  suggestedTile: {
    borderWidth: 3,
    borderColor: "#e92a27",
  },
  legalMoveDot: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  pieceText: {
    fontSize: 28,
  },
  statusText: {
    fontSize: 30,
    fontWeight: "600",
  },
  win: {
    fontSize: 30,
  },
  helperText: {
    fontSize: 12,
    textAlign: "center",
    maxWidth: 340,
    color: "#444",
  },

  boardPiece: {
    width: "80%",
    height: "80%",
  },

  // Capatured section:

  capturedSection: {
    width: "95%",
    gap: 8,
  },

  capturedRow: {
    minHeight: 36,
    flexDirection: "row",
  },

  capturedLabel: {
    fontSize: 16,
    fontWeight: "600",
  },

  capturedPieces: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 4,
    marginLeft: 12,
  },

  capturedPiece: {
    width: 22,
    height: 22,
  },

  // Game over Overlay

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  overlayCard: {
    width: "82%",
    backgroundColor: "#191919",
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 14,
  },
  overlayTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
  },
  overlaySubtitle: {
    fontSize: 20,
    color: "#d5d5d5",
    marginBottom: 8,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#2ecc8a",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "#373737",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#efefef",
  },
});
