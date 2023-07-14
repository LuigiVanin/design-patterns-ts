import { Chess, ChessBuilder, Piece } from "../../src/creational/builder";

describe("Creational Patterns --Builder--", () => {
    describe("builder Patterns", () => {
        it("should correctly return the instances types of Chess with default property", () => {
            const builder = new ChessBuilder();

            const chess = builder.build();

            expect(chess).toBeInstanceOf(Chess);

            expect(chess.board.length).toBe(8);
            expect(chess.board[0].length).toBe(8);

            expect(chess.board[0][0]).toBeNull();
            chess.board.forEach((row) => {
                row.forEach((col) => {
                    expect(col).toBeNull();
                });
            });

            expect(chess.players.length).toBe(2);
            expect(chess.players[0].name).toBe("Player1");
            expect(chess.players[0].color).toBe("white");
            expect(chess.players[1].name).toBe("Player2");
            expect(chess.players[1].color).toBe("black");
        });

        it("should correctly return the instances types of Chess with board size", () => {
            const builder = new ChessBuilder();

            const chess = builder.addBoard([10, 10]).build();

            expect(chess).toBeInstanceOf(Chess);

            expect(chess.board.length).toBe(10);
            expect(chess.board[0].length).toBe(10);

            expect(chess.board[0][0]).toBeNull();
            chess.board.forEach((row) => {
                row.forEach((col) => {
                    expect(col).toBeNull();
                });
            });

            const chess2 = builder.addBoard([5, 5]).build();

            expect(chess2).toBeInstanceOf(Chess);

            expect(chess2.board.length).toBe(5);
            expect(chess2.board[0].length).toBe(5);
        });

        it("should correctly return the instances types of Chess with pieces", () => {
            const builder = new ChessBuilder();

            const chess = builder
                .addPiece(new Piece("pawn", "white"), [0, 0])
                .addPiece(new Piece("pawn", "white"), [0, 1])
                .build();

            expect(chess).toBeInstanceOf(Chess);

            expect(chess.board.length).toBe(8);
            expect(chess.board[0].length).toBe(8);

            expect(chess.board[0][0]).toBeInstanceOf(Piece);
            expect(chess.board[0][0]?.name).toBe("pawn");
            expect(chess.board[0][0]?.color).toBe("white");

            expect(chess.board[0][1]).toBeInstanceOf(Piece);
            expect(chess.board[0][1]?.name).toBe("pawn");
            expect(chess.board[0][1]?.color).toBe("white");
        });

        it("should correctly return the instances types of Chess with players", () => {
            const builder = new ChessBuilder();
            const name1 = "Jonh";
            const name2 = "Maria";
            const chess = builder.addPlayer(name1).addPlayer(name2).build();

            expect(chess).toBeInstanceOf(Chess);

            expect(chess.board.length).toBe(8);
            expect(chess.board[0].length).toBe(8);

            expect(chess.board[0][0]).toBeNull();
            chess.board.forEach((row) => {
                row.forEach((col) => {
                    expect(col).toBeNull();
                });
            });

            expect(chess.players.length).toBe(2);
            expect(chess.players[0].name).toBe(name1);
            expect(chess.players[0].color).toBe("white");
            expect(chess.players[1].name).toBe(name2);
            expect(chess.players[1].color).toBe("black");
        });

        it("should correctly return the instances types of Chess with players and pieces", () => {
            const builder = new ChessBuilder();
            const name1 = "Jonh";
            const name2 = "Maria";
            const chess = builder
                .addPlayer(name1)
                .addPlayer(name2)
                .addPiece(new Piece("pawn", "white"), [0, 0])
                .addPiece(new Piece("pawn", "white"), [0, 1])
                .build();

            expect(chess).toBeInstanceOf(Chess);

            expect(chess.board.length).toBe(8);
            expect(chess.board[0].length).toBe(8);

            expect(chess.board[0][0]).toBeInstanceOf(Piece);
            expect(chess.board[0][0]?.name).toBe("pawn");
            expect(chess.board[0][0]?.color).toBe("white");

            expect(chess.board[0][1]).toBeInstanceOf(Piece);
            expect(chess.board[0][1]?.name).toBe("pawn");
            expect(chess.board[0][1]?.color).toBe("white");

            expect(chess.players.length).toBe(2);
            expect(chess.players[0].name).toBe(name1);
            expect(chess.players[0].color).toBe("white");
            expect(chess.players[1].name).toBe(name2);
            expect(chess.players[1].color).toBe("black");
        });
    });
});
