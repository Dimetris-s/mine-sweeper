import Game from "./Game"
import Gamebar from "./Gamebar"
import View from "./View"

export default class Controller {
    constructor(element) {
        this.rootElement = element
        
        this.gamebar = new Gamebar(this.rootElement)
        this.game = new Game({columns: 10, rows: 10, mines: 2})
        this.view = new View(this.rootElement, {
            rows: this.game.rows,
            columns: this.game.columns,
            state: this.game.getState(),
            cellSize: 32
        })

        this.intervalId = null
        this.timerId = null
        this.isPlaying = true
        this.gameStarted = false

        this.view.canv.addEventListener('click', this.clickHandler.bind(this))
        this.view.canv.addEventListener('contextmenu', this.contextHandler.bind(this))
    }

    update() {
        const state = this.game.getState()

        this.view.renderTimeAndMinesPanels(state)
        this.view.renderCells(state)

        if(state.gameOver) {
            this.onGameOver()
        }
    }
        
    startGame(x,y) {
        this.game.setMines(x,y)
        this.game.fillPlayfield()
        this.gameStarted = true
        this.startTimer()
        this.game.openCell(y,x)
    }

    startTimer() {
        this.intervalId = setInterval(() => {this.update()}, 0)
        this.timerId = setInterval(() => {
            if(this.game.gameTime === 999) {
                clearInterval(this.timerId)
                return
            }
            this.game.gameTime++
        }, 1000)
    }

    stopTimer() {
        clearInterval(this.timerId)
        clearInterval(this.intervalId)
    }

    onGameOver() {
        this.isPlaying = false
        this.stopTimer()
        console.log(this.view);
        this.view.renderFinalScreen(this.game.getState())
    }

    clickHandler(e)  {
        if(this.isPlaying) {
            const x =  Math.floor(e.offsetX / this.view.cellSize)
            const y =  Math.floor((e.offsetY - this.view.panelHeight) / this.view.cellSize)
            if(y < 0) return
            if(!this.gameStarted) {
                this.startGame(x,y)
                return
            }
            this.game.openCell(y, x)
        }
    }

    contextHandler(e) {
        e.preventDefault()
        if(this.isPlaying) {
            const x =  Math.floor(e.offsetX / this.view.cellSize)
            const y =  Math.floor((e.offsetY - this.view.panelHeight) / this.view.cellSize)
            if(y < 0) return
            this.view.drawFlag(x, y)
        }
    }
}






        // this.canv.addEventListener('mousemove', event => {
        //     const x = Math.floor((event.offsetX + 1) / this.cellSize)
        //     const y = Math.floor((event.offsetY + 1) / this.cellSize)
        //     this.renderCells(this.state)
        //     this.renderCell(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize, this.state.playfield[y][x], true, View.colors[this.state.playfield[y][x]])
        // })