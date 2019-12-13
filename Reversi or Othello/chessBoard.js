"use strict";
exports.__esModule = true;
var stringfyChessBoard_1 = require("./stringfyChessBoard");
var chessBoard = /** @class */ (function () {
    function chessBoard(size) {
        this.size = size;
        this.board = new Array();
        for (var i = 0; i < size; i++) {
            this.board.push([]);
            for (var j = 0; j < size; j++) {
                this.board[i].push(0);
            }
        }
        this.board[size / 2][size / 2] = this.board[size / 2 - 1][size / 2 - 1] = 1;
        this.board[size / 2 - 1][size / 2] = this.board[size / 2][size / 2 - 1] = -1;
    }
    chessBoard.prototype.print = function () {
        console.log(stringfyChessBoard_1.stringfyChessBoard(this.board));
    };
    return chessBoard;
}());
exports.chessBoard = chessBoard;
