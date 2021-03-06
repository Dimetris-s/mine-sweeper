import {
    rnd
} from './utils'


export default class Game {
    static difficults = {
        '1': {columns: 10, rows: 10, mines: 10},
        '2': {columns: 16, rows: 16, mines: 40},
        '3': {columns: 36, rows: 16, mines: 99}
    }
    

    isGameOver = null
    gameTime = 0
    
    constructor(difficult) {
        this.difficult = typeof difficult === 'number' ? Game.difficults[difficult] : difficult
        this.mines = this.difficult.mines
        this.rows = this.difficult.rows
        this.columns = this.difficult.columns
        this.minesLeft = this.mines

        this.playfield = this.createPlayfield()
    }



    setMines(px, py) {
        for (let i = 0; i < this.mines; i++) {
            let y = rnd(0, this.rows - 1)
            let x = rnd(0, this.columns - 1)
            while (this.playfield[y][x].mine || (px === x && py === y)) {
                y = rnd(0, this.rows - 1)
                x = rnd(0, this.columns - 1)
            }
            this.playfield[y][x].mine = true
        }
    }

    createPlayfield() {
        const playfield = []
        for (let i = 0; i < this.rows; i++) {
            playfield[i] = []
        }
        for (let i = 0; i < playfield.length; i++) {
            for (let j = 0; j < this.columns; j++) {
                playfield[i][j] = {opened: false, mine: false, flaged: false, minesAround: 0}
            }
        }

        return playfield
    }

    getMinesAround(x, y, playfield) {
        let counter = 0
        this.getAvaliableCells(x, y, playfield).forEach(({x, y}) => {
            if(playfield[y][x].mine) counter++
        })
        return counter
    }

    getAvaliableCells(x, y, playfield) {
        const avaliableCells = []
        if(playfield[y - 1] !== undefined && playfield[y - 1][x - 1] !== undefined) avaliableCells.push({x: x - 1, y: y - 1 })
        if(playfield[y - 1] !== undefined && playfield[y - 1][x]     !== undefined) avaliableCells.push({x, y: y - 1})
        if(playfield[y - 1] !== undefined && playfield[y - 1][x + 1] !== undefined) avaliableCells.push({x: x + 1, y: y - 1 })
        if(playfield[y]     !== undefined && playfield[y][x - 1]     !== undefined) avaliableCells.push({x: x - 1, y })
        if(playfield[y]     !== undefined && playfield[y][x + 1]     !== undefined) avaliableCells.push({x: x + 1, y })
        if(playfield[y + 1] !== undefined && playfield[y + 1][x - 1] !== undefined) avaliableCells.push({x: x - 1, y:y + 1 })
        if(playfield[y + 1] !== undefined && playfield[y + 1][x]     !== undefined) avaliableCells.push({x , y: y + 1 })
        if(playfield[y + 1] !== undefined && playfield[y + 1][x + 1] !== undefined) avaliableCells.push({x: x + 1, y: y + 1 })
        return avaliableCells
    }

    fillPlayfield() {
        for (let y = 0; y < this.playfield.length; y++) {
            for (let x = 0; x < this.playfield[y].length; x++) {
                if(!this.playfield[y][x].mine) {
                    this.playfield[y][x].minesAround = this.getMinesAround(x, y, this.playfield)
                }
            }
        }
    }

    openCell(y, x) {
        if(this.playfield[y][x].opened || this.playfield[y][x].flaged) return
        if(this.playfield[y][x].minesAround === 0) {
            this.getAvaliableCells(x, y, this.playfield).forEach(({x, y}) => {
                setTimeout(() => {
                    this.openCell(y, x)
                }, 0)
            })
        }
        if(this.playfield[y][x].mine) {
            this.isGameOver = 'lose'
            for (let y = 0; y < this.playfield.length; y++) {
                for (let x = 0; x < this.playfield[y].length; x++) {
                    if(!this.playfield[y][x].mine) {
                        this.playfield[y][x].opened = true
                        this.playfield[y][x].flaged = false
                    }
                }
            }
        }
        this.playfield[y][x].opened = true

        if(this.checkWinnning() && this.isGameOver !== 'lose') this.isGameOver = 'win'
            
        
    }
    
    toggleFlag(y,x) {
        if(this.playfield[y][x].opened) return

        if(this.playfield[y][x].flaged) {
            this.playfield[y][x].flaged = false
            this.minesLeft++
        } else {
            this.playfield[y][x].flaged = true
            this.minesLeft--
        }
    }

    checkWinnning() {
        let win = true
        for (let y = 0; y < this.playfield.length; y++) {
            for (let x = 0; x < this.playfield[y].length; x++) {
                if(!this.playfield[y][x].opened && !this.playfield[y][x].mine) {
                    win = false
                }
            }
        }
        return win
    }

    getState() {
        return {
            gameOver: this.isGameOver,
            playfield: this.playfield,
            mines: this.minesLeft,
            time: this.gameTime
        }
    }
}