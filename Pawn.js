import Piece from "./Piece.js";

export default class Pawn extends Piece {
    constructor(team, board, x, y) {
        super("p",team, board, x, y)
        // this.moveValid = (x, y) => {
        //     console.log(y, +team)
        //     return ((y == this.y - ((team*2)-1)) || (y == this.y - ((team*2)-1)*2))
        // }
        this.moved = false

        this.validMoves = () => {
            const m = []
            if (this.x >= 7 || this.x <= 0) return m
            if (board[this.x - ((!team*2)-1)][this.y] == "") m.push([this.x - ((!team*2)-1), this.y])
            if (!this.moved && this.board[this.x - ((!team*2)-1)][this.y] == "" && this.board[this.x - ((!team*2)-1)*2][this.y] == "") m.push([this.x - ((!team*2)-1)*2, this.y])
            const a = this.board[this.x - ((!team*2)-1)][this.y-1]
            // console.log(a)
            if (a?.team != team && a) m.push([this.x - ((!team*2)-1),this.y-1])
            const b = this.board[this.x - ((!team*2)-1)][this.y+1]
            if (b?.team != team && b) m.push([this.x - ((!team*2)-1),this.y+1])


            return m
        }
    }
}