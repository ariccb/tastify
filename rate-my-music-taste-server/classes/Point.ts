import Stone from './Stone'
import Game from './Game'
import {plainToClass, classToPlain} from 'class-transformer'
export default class Point {

    stone: Stone | undefined = undefined
    constructor(){
        // console.log("new point made")
    }

    render():string{
        if (this.stone != undefined) {
            return this.stone.color
        }
        else {
            return 'lightgray'
        }
    }

    playStone(stone:Stone){
        if(this.stone == undefined){
            this.stone = stone
        }
        
    }
    serialize(){

    }

    deserialize(){
        if (this.stone != undefined) {
            this.stone = plainToClass(Stone, this.stone)
            this.stone
        }
    }
}