export type PieceType =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "queen"
  | "king";

export type PieceColor = "white" | "black";

export type ChessPiece = {
  id: string;
  type: PieceType;
  color: PieceColor;
  row: number;
  col: number;
  hasMoved: boolean;
  isCaptured: boolean;
  symbol?: string;
  image?: string;
};
