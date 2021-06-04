import Game from './js/Game'

import "./scss/main.scss"


const game = new Game({
    mines: 10,
    rows: 10,
    columns: 10
})

window.game = game

console.log(game.playfield);
