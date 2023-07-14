export interface Builder<T> {
    build(): T;
}

export interface Player {
    name: string;
    color: PieceColor;
}

export interface PiecePosition {
    piece: Piece;
    position: [number, number];
}

export type PieceColor = "white" | "black";
export type PieceName =
    | "pawn"
    | "rook"
    | "knight"
    | "bishop"
    | "queen"
    | "king";
export type Board = Array<Array<null | Piece>>;

export class Piece {
    name: PieceName;
    color: PieceColor;

    constructor(name: PieceName, color: PieceColor) {
        this.name = name;
        this.color = color;
    }
}

export class Chess {
    board: Board;
    players: Player[];

    constructor(board: Board, players: Player[]) {
        this.board = board;
        this.players = players;
    }
}

export class ChessBuilder implements Builder<Chess> {
    private players: Player[] = [];
    private boardSize: [number, number] = [8, 8];
    private pieces: PiecePosition[] = [];

    constructor() {}

    addBoard(size: [number, number]) {
        this.boardSize = size;
        return this;
    }

    addPiece(piece: Piece, position: [number, number]) {
        this.pieces.push({ piece, position });
        return this;
    }

    addPlayer(name: string) {
        const color: PieceColor = this.players.length ? "black" : "white";
        this.players.push({
            name,
            color,
        });
        return this;
    }

    build(): Chess {
        const board: Board = Array.from({ length: this.boardSize[0] }, () =>
            Array.from({ length: this.boardSize[1] }, () => null)
        );
        this.pieces.forEach((piece) => {
            board[piece.position[0]][piece.position[1]] = piece.piece;
        });

        const createFallbackPlayer = (color: PieceColor) => ({
            name: "Player" + (color == "white" ? 1 : 2),
            color,
        });
        return new Chess(board, [
            this.players[0] || createFallbackPlayer("white"),
            this.players[1] || createFallbackPlayer("black"),
        ]);
    }
}
