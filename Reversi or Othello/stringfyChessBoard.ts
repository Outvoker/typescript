import {mapNum2Str} from './mapnum2str'

function *range(a: number, b?: number, step: number = 1) {
    if(b == undefined) {
      [a, b] = [0, a]
    }
    for(let i = a; i < b; i += step) {
      yield i
    }
  }
  
export function stringfyChessBoard(board:Array<Array<number>>){
    let result = new Array<string>()
    result.push(['\u0020'].concat(Array.from(range(0, board.length)).map(n => n.toString())).join('\u0020'))
    board.forEach((value,index)=>{
        result.push([`${index}`].concat(value.map(mapNum2Str)).join('\u0020'))
    })
    return result.join('\n');
}

