import Piece from "./Piece.js";

export default class King extends Piece {
    constructor(team, board, x, y) {
        super("k",team, board, x, y)
        this.castling = []
        this.moved = false
        this.validMoves = (safe) => {
            const m = []
            for (let d = 0; d < Math.PI*2; d+=Math.PI/4) {
                const xc = Math.round(Math.cos(d))
                const yc = Math.round(Math.sin(d))
                // console.log(xc,yc)
                for (let a = 1; a < 2; a++) {
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
            if (this.moved) return m
            const rooks = board.flat(3).filter((v) => (v.team === this.team) && (v.name === "r") && !v.moved)
            rooks.forEach((r) => {
                
                if (r.y === 0) {
                    if (board[r.x][2] === "" && board[r.x][3] === "") {
                        m.push([r.x, 2])
                        if (safe) this.castling.push([r.x, 2, r.x, r.y, r.x, 3])
                        // console.log("a")
                    }
                }
                else {
                    if (board[r.x][6] === "" && board[r.x][5] === "") {
                        m.push([r.x, 6])
                        if (safe) this.castling.push([r.x, 6, r.x, r.y, r.x, 5])
                        // console.log("b")
                    }
                }
                // console.log(this.castling)
            })

            return m
        }
    }
}