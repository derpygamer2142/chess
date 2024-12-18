import Piece from "./Piece.js";

export default class Queen extends Piece {
    constructor(team, board, x, y) {
        super("q",team, board, x, y)
        this.moved = false
        this.validMoves = () => {
            const m = []
            for (let d = 0; d < Math.PI*2; d+=Math.PI/4) {
                const xc = Math.round(Math.cos(d))
                const yc = Math.round(Math.sin(d))
                // console.log(xc,yc)
                for (let a = 1; a < 8; a++) {
                    if (!((Math.max(0,Math.min(7, this.x + xc*a)) == this.x+xc*a) && (Math.max(0,Math.min(7, this.y + yc*a)) == this.y+yc*a))) break
                    const p = this.board[this.x + xc*a][this.y + yc*a]
                    if (p == "") {
                        m.push([this.x + xc*a,this.y + yc*a])
                    }
                    else if (p.team != this.team) {
                        m.push([this.x + xc*a,this.y + yc*a])
                        break
                    }
                    else break

                }
            }
            return m
        }
    }
}