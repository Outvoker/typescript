class chessBoard{
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

    print(){
        console.log(this.board.map())
    }

}