import Player from './Player'
import Board from './Board'
import {plainToClass, classToPlain} from 'class-transformer'
export default class Game {
    turn: number
    playerBlack: Player
    playerWhite: Player
    board: Board
    end: boolean
    passCount: number
    loser: Player | undefined = undefined
    
    constructor(){
        this.board = new Board(9)
        this.playerWhite = new Player('Player 1', 'white', this)
        this.playerBlack = new Player('Player 2', 'black', this)
        this.turn = 1
        this.playerBlack.setTurn()
        this.end = false
        this.passCount = 0
    }

    changeTurn(){
        this.turn += 1
        if(this.turn % 2 == 0) {
            this.playerWhite.setTurn()
        } else {
            this.playerBlack.setTurn()
        }
    }
    endGame(){
        this.end = true
        this.playerBlack.activePlayer = false
        this.playerWhite.activePlayer = false
        console.log("game ended")
    }
    passcounter(){
        this.passCount += 1
        if (this.passCount == 3) {
            this.endGame()
        } 
    }

    serialize(){
        let self = this
        self.playerWhite.game = undefined
        self.playerBlack.game = undefined
        return JSON.stringify(self)
    }

    deserialize(){
        this.playerWhite = plainToClass(Player, this.playerWhite)
        this.playerBlack = plainToClass(Player, this.playerBlack)
        this.board = plainToClass(Board, this.board)
        this.playerWhite.game = this
        this.playerBlack.game = this
        this.board.deserialize()
        this.playerWhite.deserialize()
        this.playerBlack.deserialize()
    }

}