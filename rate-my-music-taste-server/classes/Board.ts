import {plainToClass, classToPlain} from 'class-transformer'
import Point from './Point'
export default class Board {
    
    points: Array<Array<Point>>
    
    constructor(boardSize:Number) {
        this.points = []
        
        for (let i = 0; i < boardSize; i++) {
            this.points.push([])
            for (let k = 0; k < boardSize; k++) {
                this.points[i].push(new Point())
           }
        }        
    }
    serialize(){

    }

    deserialize(){
        for (let i = 0; i < this.points.length; i++){
            for (let k = 0; k < this.points.length; k++){
                this.points[i][k] = plainToClass(Point, this.points[i][k])
                this.points[i][k].deserialize()
            }
        }
    }
}