var chessBoard1 = /** @class */ (function () {
    function chessBoard1(size) {
        this.size = size;
        this.board = new Array();
        this.board.length = this.size;
        var row = new Array();
        row.length = this.size;
        row.fill(0, 0, this.size);
        this.board.fill(row, 0, this.size);
    }
    return chessBoard1;
}());
var test = new chessBoard1(8);
console.log(test.board);
