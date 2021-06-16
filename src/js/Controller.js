import Game from "./Game"
import Gamebar from "./Gamebar"
import View from "./View"
import Popup from "./Popup"
import { checkObjectClick } from "./utils"

export default class Controller {
    constructor(element) {
        this.rootElement = element
        
        this.popup = new Popup()
        this.gamebar = new Gamebar(this.rootElement)

        this.init()
        this.gamebar.init(this.restartGame.bind(this))
    }


    update() {
        const state = this.game.getState()

        this.view.renderTimeAndMinesPanels(state)
        this.view.renderCells(state)

        if(state.gameOver) {
            this.onGameOver()
        }
    }
    restartGame() {
        this.stopTimer()
        this.view.desrtoyCanv()
        this.init()
        this.update()
        this.view.setDefaultSmile()
    }

    init() {
        this.game = new Game(this.gamebar.difficult)
        this.view = new View(this.rootElement, {
            rows: this.game.rows,
            columns: this.game.columns,
            state: this.game.getState()
        })

        this.intervalId = null
        this.timerId = null
        this.isPlaying = true
        this.gameStarted = false

        this.view.canv.addEventListener('click', this.clickHandler.bind(this))
        this.view.canv.addEventListener('contextmenu', this.contextHandler.bind(this))
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
        this.view.renderFinalScreen(this.game.getState())
    }

    clickHandler(e)  {
        if(checkObjectClick(e, this.view.smileImgX, this.view.smileImgY, this.view.smileImgSize, this.view.smileImgSize)) this.restartGame()
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
        if(this.isPlaying && this.gameStarted) {
            const x =  Math.floor(e.offsetX / this.view.cellSize)
            const y =  Math.floor((e.offsetY - this.view.panelHeight) / this.view.cellSize)
            if(y < 0) return
            this.game.toggleFlag(y, x)
        }
    }
}