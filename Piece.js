export default class Piece {
    constructor(name, team, board, x, y){
        this.name = name
        this.team = team
        this.x = x
        this.y = y
        /**
         * @type {Array}
         */
        this.board = board

        this.validMoves = () => {
            return []
        }

        this.isValid = (x, y, safe) => { // check if king is in check
            const valid = this.validMoves(safe)
            // console.log(valid, x, y)
            return valid.some((v, i) => v[0] == x && v[1] == y)
        }
    }

    move(x,y) {
        let old = ["", "",0,0,0,0]
        const coords = this.getPosition()
        old[0] = this
        old[2] = this.x
        old[3] = this.y
        this.board[coords[0]][coords[1]] = ""
        this.x = x
        this.y = y

        old[1] = this.board[x][y]
        old[4] = x
        old[5] = y
        this.board[x][y] = this
        this.moved = true

        return old
    }

    getPosition() {
        const p = this
        const rank = this.board.findIndex((v) => { return v.includes(p) })
        return [
            rank,

            this.board[rank]
            .findIndex( (v) => { return v == p } )
            
        ]
        
    }

    update() {
        this.validList = this.validMoves()
    }
}