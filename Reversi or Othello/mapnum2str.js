"use strict";
exports.__esModule = true;
function mapNum2Str(chess) {
    switch (chess) {
        case 1: {
            return 'O';
        }
        case -1: {
            return 'X';
        }
        default: {
            return '.';
        }
    }
}
exports.mapNum2Str = mapNum2Str;
