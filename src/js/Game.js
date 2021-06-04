import {rnd} from './utils'


export default class Game {
    isGameOver = false

    constructor(options) {
        this.mines = options.mines,
        this.rows = options.rows,
        this.columns = options.columns
        this.difficult = options.difficult

        this.playfield = this.createPlayfield()
    }

    createPlayfield() {
        return new Array(this.rows).fill(new Array(this.columns).fill(0))
    }
}