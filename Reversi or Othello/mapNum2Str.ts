export function mapNum2Str(chess: number):string {
    switch (chess) {
        case 1: {
            return 'O'
        }
        case -1: {
            return 'X'
        }
        default: {
            return '.'
        }
    }
}