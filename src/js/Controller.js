export default class Controller {
    constructor(game, view) {
        this.game = game
        this.view = view
    }

            // this.canv.addEventListener('click', event => {
        //     const x = Math.floor((event.offsetX + 1) / this.cellSize)
        //     const y = Math.floor((event.offsetY + 1) / this.cellSize)
        //     console.log(`x: ${x}, y: ${y}, cell: ${this.state.playfield[y][x]}`)
        // })
        // this.canv.addEventListener('mousemove', event => {
        //     const x = Math.floor((event.offsetX + 1) / this.cellSize)
        //     const y = Math.floor((event.offsetY + 1) / this.cellSize)
        //     this.renderCells(this.state)
        //     this.renderCell(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize, this.state.playfield[y][x], true, View.colors[this.state.playfield[y][x]])
        // })
}