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
        this.isPlaying = false

        this.view.canv.addEventListener('click', this.clickHandler.bind(this))
        setInterval(() => {
            this.view.renderCells(this.game.getState())
        })
    }

        
    startGame(x,y) {
        this.game.setMines(x,y)
        this.game.fillPlayfield()
        this.isPlaying = true
        this.game.openCell(y,x)
    }


    clickHandler(e)  {
        const x =  Math.floor(e.offsetX / this.view.cellSize)
        const y =  Math.floor((e.offsetY - this.view.panelHeight) / this.view.cellSize)
        if(y < 0) return
        if(!this.isPlaying) {
            this.startGame(x,y)
            return
        }
        this.game.openCell(y, x)
    }
}






        // this.canv.addEventListener('mousemove', event => {
        //     const x = Math.floor((event.offsetX + 1) / this.cellSize)
        //     const y = Math.floor((event.offsetY + 1) / this.cellSize)
        //     this.renderCells(this.state)
        //     this.renderCell(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize, this.state.playfield[y][x], true, View.colors[this.state.playfield[y][x]])
        // })