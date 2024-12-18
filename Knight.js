import Piece from "./Piece.js";

export default class Knight extends Piece {
    constructor(team, board, x, y) {
        super("n",team, board, x, y)
        this.moved = false
        this.validMoves = () => {
            const m = []
            for (let d = 0; d < Math.PI*2; d+=Math.PI/2) {
                let xc = Math.round(Math.sin(d))*2
                let yc = Math.round(Math.cos(d))*2
                for (let j = Math.PI/-2; j < 3; j+=Math.PI) {
                    const cx = Math.round(xc+Math.sin(d+j)+this.x)
                    const cy = Math.round(yc+Math.cos(d+j)+this.y)
                    if (Math.max(Math.min(7,cx),0) == cx && Math.max(Math.min(7,cy),0) == cy) {
                        if (this.board[cx][cy]?.team != this.team) {
                            m.push([cx,cy])
                        }
                    }
                }
            }
            return m
        }
    }
}