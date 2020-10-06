import Stone from './Stone'
import Point from './Point'
import Game from './Game'
export default class Player {
    playerName: string
    stoneColor: string
    activePlayer: boolean = false
    game: Game | undefined
    constructor (playerName: string, stoneColor: string, game: Game) {
        this.playerName = playerName
        this.stoneColor = stoneColor
        this.game = game
    }

    setTurn(){
        this.activePlayer = true
    }

    playStone(point: Point) {
        if (this.activePlayer == true) {
            let stone = new Stone(this.stoneColor)
            point.playStone(stone)
            this.activePlayer = false
            this.game.changeTurn()
            this.game.passCount = 0
        }
    }

    passTurn() {
        if(this.activePlayer == true) {
            this.game.changeTurn()
            this.activePlayer = false
            this.game.passcounter()
            
        }
        
    }

    serialize(){

    }

    deserialize(){
     
    }
}