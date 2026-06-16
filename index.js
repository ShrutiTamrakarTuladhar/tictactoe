import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

class TicTacToe {
    constructor (n = 3, playerOne = 'X', playerTwo = 'O') {
        this.len = n
        this.board = Array(n).fill(null).map(() => Array(n).fill('*'));
        this.curPlayer = playerOne
        this.playerOne = playerOne
        this.playerTwo = playerTwo
        this.isActive = true
        this.moveCount = 0
    }

    displayBoard() {
        for(let r = 0; r < this.len; r++) {
            let row = " "
            for(let c = 0; c < this.len; c++) {
                row += this.board[r][c] + " "
            }
            console.log(row)
        }
        console.log(" ")
    }

    makeMove(row, col) {

    if(row >= 0 && row < this.len && col >= 0 && col < this.len && this.board[row][col] == '*') {
         this.board[row][col] = this.curPlayer;
         this.moveCount += 1;
        return true; 
    }
    return false; 
       
}

    isEndState(row, col) {
        const curRow = this.board[row].every(cell => cell === this.curPlayer);

        const curCol = this.board.every(row => row[col] === this.curPlayer)

        let isPrimeDiagonal = true; 

        for(let i = 0; i < this.len; i++) {
            if(this.board[i][i] !== this.curPlayer) {
                isPrimeDiagonal = false; 
            }
        }

        let isSecDiagonal = true; 

        for(let i = 0; i < this.len; i++) {
            if(this.board[i][(this.len-1)-i] !== this.curPlayer) {
                isSecDiagonal = false; 
            }
        }

        if(curRow || curCol || isPrimeDiagonal || isSecDiagonal || this.moveCount == this.len * this.len){
            return true
        } else {
            return false
        }
    }

}


async function startGame() {
    console.log("WELCOME TO TIC-TAC-TOE!")
    const rl = readline.createInterface({ input, output });

    const createGame = await rl.question(`To start game, enter board size: `)
    const size = createGame.split(',')

    const currentGame = new TicTacToe(parseInt(size, 10)); 
    
        while(currentGame.isActive) {
        currentGame.displayBoard()

        const input = await rl.question(`Player ${currentGame.curPlayer}, enter move "row,col" (e.g., 3,3): `);
        const pos = input.split(',');
        const row = parseInt(pos[0], 10)-1;
        const col = parseInt(pos[1], 10)-1;

        if(currentGame.makeMove(row, col)) {
            if(currentGame.isEndState(row,col)) {
                currentGame.displayBoard()
                let endMsg = currentGame.moveCount == currentGame.len * currentGame.len ? `Game Tied!` : `Game Over ${currentGame.curPlayer} Wins!`
                console.log(endMsg)
                currentGame.isActive = false
        } else {
            currentGame.curPlayer = currentGame.curPlayer == currentGame.playerOne ? currentGame.playerTwo : currentGame.playerOne
        }
    } else {
        console.log("Invalid input, try again with valid position")
    }
}
    rl.close()
}

startGame()