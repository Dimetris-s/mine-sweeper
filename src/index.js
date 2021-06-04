import Game from './js/Game'
import View from './js/View'

import "./scss/main.scss"

const ROOT_ELEMENT = document.getElementById('root')

const game = new Game({
    mines: 10,
    rows: 10,
    columns: 10
})

const view = new View(ROOT_ELEMENT, {
    rows: game.rows,
    columns: game.columns,
    state: game.getState(),
    cellSize: 32
})

window.game = game
window.view = view

console.log(game.playfield);
console.log(view);
