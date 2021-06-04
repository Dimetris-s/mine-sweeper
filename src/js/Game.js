import {
    rnd
} from './utils'


export default class Game {
    isGameOver = false
    minesLeft = this.mines

    constructor(options) {
        this.mines = options.mines
        this.rows = options.rows
        this.columns = options.columns
        this.difficult = options.difficult

        this.playfield = this.createPlayfield(this.rows, this.columns)
        this.setMines(this.mines, this.rows, this.columns)
        this.fillPlayfield(this.playfield)
    }

    initPlayfield() {
        this.createPlayfield()
        this.setMines()
        this.fillPlayfield()
    }

    setMines(mines, rows, columns) {
        for (let i = 0; i < mines; i++) {
            let y = rnd(0, rows - 1)
            let x = rnd(0, columns - 1)
            while (this.playfield[y][x] === 9) {
                y = rnd(0, rows - 1)
                x = rnd(0, columns - 1)
            }
            this.playfield[y][x] = 9
        }
    }

    createPlayfield(rows, columns) {
        const playfield = []
        for (let i = 0; i < rows; i++) {
            playfield[i] = []
        }
        for (let i = 0; i < playfield.length; i++) {
            for (let j = 0; j < columns; j++) {
                playfield[i][j] = 0
            }
        }

        return playfield
    }

    getMinesAround(x, y, playfield) {
        let counter = 0
        this.getAvaliableCells(x, y, playfield).forEach(({x, y}) => {
            if(playfield[y][x] === 9) counter++
        })
        return counter
    }

    getAvaliableCells(x, y, playfield) {
        const avaliableCells = []
        if(playfield[y - 1] !== undefined && playfield[y - 1][x - 1] !== undefined) avaliableCells.push({x: x - 1, y: y - 1 })
        if(playfield[y - 1] !== undefined && playfield[y - 1][x] !== undefined) avaliableCells.push({x, y: y - 1})
        if(playfield[y - 1] !== undefined && playfield[y - 1][x + 1] !== undefined) avaliableCells.push({x: x + 1, y: y - 1 })
        if(playfield[y] !== undefined && playfield[y][x - 1] !== undefined) avaliableCells.push({x: x - 1, y })
        if(playfield[y] !== undefined && playfield[y][x + 1] !== undefined) avaliableCells.push({x: x + 1, y })
        if(playfield[y + 1] !== undefined && playfield[y + 1][x - 1] !== undefined) avaliableCells.push({x: x - 1, y:y + 1 })
        if(playfield[y + 1] !== undefined && playfield[y + 1][x] !== undefined) avaliableCells.push({x , y: y + 1 })
        if(playfield[y + 1] !== undefined && playfield[y + 1][x + 1] !== undefined) avaliableCells.push({x: x + 1, y: y + 1 })
        return avaliableCells
    }

    fillPlayfield(playfield) {
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                if(playfield[y][x] !== 9) {
                    playfield[y][x] = this.getMinesAround(x, y, playfield)
                }
            }
        }
    }

    openCell(y, x) {
        if(typeof this.playfield[y][x] !== 'string')
        if(this.playfield[y][x] === 0) {
            this.getAvaliableCells(x, y, this.playfield).forEach(({x, y}) => {
                setTimeout(() => {
                    this.openCell(y, x)
                }, 0)
            })
        }
        if(this.playfield[y][x] === 9) this.isGameOver = true
        this.playfield[y][x] = this.playfield[y][x].toString()
    }
    getState() {
        return {
            isGameOver: this.isGameOver,
            playfield: this.playfield
        }
    }
}