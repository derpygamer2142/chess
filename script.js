import Pawn from "./Pawn.js"
import Rook from "./Rook.js"
import Knight from "./Knight.js"
import Bishop from "./Bishop.js"
import Queen from "./Queen.js"
import King from "./King.js"

const canv = document.getElementById("canv")
const ctx = canv.getContext("2d")

canv.width = window.innerWidth
canv.height = window.innerHeight

const board = []
let displayText = ""
let swapPiece = null
let turn = true // white = true

for (let rank = 0; rank < 8; rank++) { // y
    let column = []
    for (let file = 0; file < 8; file++) { // x
        let piece = ""
        if (rank == 1 || rank == 6) {
            piece = "p"
        }
        if ((rank == 0 || rank == 7) && (file == 0 || file == 7)) {
            piece = "r"
        }

        if ((rank == 0 || rank == 7) && (file == 1 || file == 6)) {
            piece = "n"
        }

        if ((rank == 0 || rank == 7) && (file == 2 || file == 5)) {
            piece = "b"
        }

        if ((rank == 0 || rank == 7) && (file == 3)) {
            piece = "q"
        }

        if ((rank == 0 || rank == 7) && (file == 4)) {
            piece = "k"
        }
        // else if (rank == 0 || rank == 7)
        const team = rank < 3
        // if (rank > 3) piece = piece.toUpperCase()
        
        switch (piece.toLowerCase()) {
            case "p": {
                piece = new Pawn(team, board, rank, file)
                break;
            }
            case "r": {
                piece = new Rook(team, board, rank, file)
                break;
            }

            case "n": {
                piece = new Knight(team, board, rank, file)
                break;
            }

            case "b": {
                piece = new Bishop(team, board, rank, file)
                break;
            }

            case "q": {
                piece = new Queen(team, board, rank, file)
                break;
            }

            case "k": {
                piece = new King(team, board, rank, file)
                break;
            }

            case "": {
                break
            }
        }
        column.push(piece)
    }
    board.push(column)
}

function piece(name) {
    name = name.toLowerCase()
    switch (name) {
        case "p": return Pawn
        case "r": return Rook
        case "n": return Knight
        case "b": return Bishop
        case "q": return Queen
        case "k": return King
        default: console.error("aaaaa")
    }
}

function lookForCheck(team) {
    for (let ri = 0; ri < board.length; ri++) {
        const r = board[ri]
        for (let fi = 0; fi < r.length; fi++) {
            const f = r[fi]
            if (f !== "") {
                // console.log(f)
                // console.log(piece(f.name).prototype)
                const moves = f.validMoves(false)//piece(f.name).prototype.validMoves.call(f)// f.validList
                for (let mi = 0; mi < moves.length; mi++) {
                    const [x, y] = moves[mi]
                    if (Math.min(Math.max(0, x), 7) == x && Math.min(Math.max(0, y), 7) == y) {
                        if (board[x][y]?.team !== f.team && board[x][y]?.team == team && board[x][y]?.name == "k") {
                            // console.log(board[x][y], f)
                            return true
                        }
                    }

                }
            }
        }
    }

    return false
}

function draw(ctx) {
    ctx.fillStyle = "peach"
    ctx.fillRect(0,0,800,800)

    board.forEach((rank, ri) => {
        rank.forEach((file, fi) => {
            const y = 7-fi
            const x = ri
            if ((x%2 == 1) ^ (y%2 == 1)) {
                ctx.fillStyle = "saddlebrown"
            }
            else ctx.fillStyle = "peachpuff"

            ctx.fillRect(x*100,y*100,100,100) 

            ctx.font = "10px Arial"
            ctx.fillStyle = "black"
            ctx.fillText(`${fi},${ri}`,x*100 + 15,y*100 + 100)
        })
    })

    board.forEach((rank, ri) => {
        rank.forEach((file, fi) => {
            const y = fi
            const x = 7-ri
            if (file != "") {
                ctx.fillStyle = file.team ? "white" : "black"
                ctx.font = "35px Arial"
                ctx.textAlign = "center"
                ctx.fillText(file.team ? file.name : file.name.toUpperCase(),y*100 + 50,x*100 + 50)
            }
            
        })
    })

    if (displayText) {
        ctx.fillStyle = "black"
        ctx.font = "25px Arial"
        ctx.textAlign = "center"
        ctx.fillText(displayText, 400, 400)
    }
}

let mx = 0;
let my = 0
let md = false
let lastmd = false
let movingPiece = null
document.addEventListener("mousedown", () => md = true)
document.addEventListener("mouseup", () => md = false)
document.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY})

function s(board) {
    return board.map((r) => r.map((f) => {
        if (f == "") return ""
        f.update()
        const o = {}
        Object.keys(f).forEach((k) => { o[k] = f[k] })
        console.log(o)
        return o
    }))
}

document.addEventListener("keydown", (e) => {
    if (!swapPiece) return
    if (e.key === "q") board[swapPiece.x][swapPiece.y] = new Queen(swapPiece.team, board, swapPiece.x, swapPiece.y)
    if (e.key === "r") board[swapPiece.x][swapPiece.y] = new Rook(swapPiece.team, board, swapPiece.x, swapPiece.y)
    if (e.key === "b") board[swapPiece.x][swapPiece.y] = new Bishop(swapPiece.team, board, swapPiece.x, swapPiece.y)
    if (e.key === "k") board[swapPiece.x][swapPiece.y] = new Knight(swapPiece.team, board, swapPiece.x, swapPiece.y)

    if (["q", "r", "b", "k"].includes(e.key)) {
        board[swapPiece.x][swapPiece.y].moved = true
        swapPiece = null
        displayText = null
    }
})

function update() {
    if (swapPiece) return
    const mxBoard = Math.floor(mx/100)
    const myBoard = 7 - Math.floor(my/100)
    if (md && !lastmd && !movingPiece && mx <= 800 && my <= 800) {
        movingPiece = board[myBoard][mxBoard]
        if (movingPiece === "" || movingPiece?.team !== turn) movingPiece = null
        //console.log(board, myBoard,mxBoard, movingPiece)
    }
    if (!md && movingPiece && mx <= 800 && my <= 800) {
        //console.log("release", myBoard,mxBoard)
        
        if (movingPiece.isValid(myBoard,mxBoard, true)) {
            const m = movingPiece.move(myBoard,mxBoard, board)
            if (lookForCheck(movingPiece.team)) {
                console.warn("check")
                console.log(m)
                if (m[0] !== "") {
                    m[0].x = m[2]
                    m[0].y = m[3]
                }
                if (m[1] !== "") {
                    m[1].x = m[4]
                    m[1].y = m[5]
                }
                board[m[2]][m[3]] = m[0]
                board[m[4]][m[5]] = m[1]
            }
            else {
                // console.log(movingPiece.x === 7, movingPiece.x === 0, movingPiece.name === "p")
                if ((movingPiece.x === 7 || movingPiece.x === 0) && movingPiece.name === "p") {
                    displayText = "Promote pawn to Queen(q), Rook(r), Bishop(b), Knight(k)"
                    swapPiece = movingPiece
                }
                
                console.log(movingPiece.castling)
                if (movingPiece.name === "k" && movingPiece?.castling?.length > 0) {
                    
                    movingPiece.castling.forEach((c) => {
                        if (movingPiece.x === c[0] && movingPiece.y === c[1]) {
                            board[c[2]][c[3]].move(c[4], c[5])
                        }   
                    })
                    
                }


                turn = !turn
            }
            
            
            //console.log("move")
        }


        if (movingPiece?.castling) movingPiece.castling = []
        movingPiece = null
        

        if (lookForCheck(turn)) {
            const pieces = board.flat(3).filter((v) => v?.team === turn)
            let checkmate = true

            for (let j = 0; j < pieces.length; j++) {
                const p = pieces[j]

                const moves = p.validMoves(false)
                
                for (let i = 0; i < moves.length; i++) {
                    const m = moves[i]
                    console.log(p)
                    console.log(m)
                    const old = board[m[1]][m[0]]
                    const op = {}
                    op.x = p.x
                    op.y = p.y
                    board[p.x][p.y] = ""
                    board[m[1]][m[0]] = p
                    p.x = m[1]
                    p.y = m[0]
    
                    const c = lookForCheck(turn)
                    
                    board[m[1]][m[0]] = old
                    board[op.x][op.y] = p
                    p.x = op.x
                    p.y = op.y
                    op.x = m[1]
                    op.y = m[0]
    
                    if (!c) {
                        checkmate = false
                        break
                    }
                    
                }
    
                if (!checkmate) break
            }

            if (checkmate) {
                displayText = "checkmate"
            }

        }
    }

    //console.log(movingPiece)
    lastmd = md
}

setInterval(() => {
    update()
    draw(ctx) 
    ctx.fillStyle = "rgba(255,0,0,0.2)"
    const mxBoard = Math.floor(mx/100)
    const myBoard = 7 - Math.floor(my/100)
    if (mx <= 800 && my <= 800) ctx.fillRect(mxBoard*100,(7-myBoard)*100,100,100)
}, 20)