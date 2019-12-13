import {chessBoard} from './chessBoard'

//不能有棋子&&在棋盘范围内&&符合规则
export function isValidMove(board: chessBoard, [x,y]:[number,number]): boolean {
    return (board.getBoard()[x][y] == 0) && (x > 0 && y > 0 && x < board.getSize() && y < board.getSize()) && (true)
}
