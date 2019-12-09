class chessBoard1{
    size:number
    board:Array<Array<number>>
    constructor(size:number){
        this.size = size
        this.board = new Array<Array<number>>()
        this.board.length = this.size
        let row = new Array<number>()
        row.length = this.size
        row.fill(0,0,this.size)
        this.board.fill(row,0,this.size)
    }
}
const test = new chessBoard1(8)
console.log(test.board)