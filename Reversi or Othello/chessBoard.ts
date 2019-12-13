import {stringfyChessBoard} from './stringfyChessBoard'

export class chessBoard{
    size:number
    board:Array<Array<number>>


    constructor(size:number){
        this.size = size
        this.board = new Array<Array<number>>()
        for (let i = 0; i < size; i++){
            this.board.push([])
            for(let j = 0; j < size; j++){
                this.board[i].push(0)
            }
        }
        //初始化为0且中间四子摆好
        this.board[size/2][size/2] = this.board[size/2 - 1][size/2 - 1] = 1
        this.board[size/2 - 1][size/2] = this.board[size/2][size/2 - 1] = -1
    }

    getSize():number{
        return this.size
    }

    getBoard():Array<Array<number>>{
        return this.board
    }

    setChessBoard([x,y]:[number,number],chess:1|-1){
        this.board[x][y] = chess
    }

    print(){
        console.log(stringfyChessBoard(this.board))
    }

}