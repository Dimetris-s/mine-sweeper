import smileURL from '../assets/smile.png'
import smileWURL from '../assets/winner.png'
import smileLURL from '../assets/looser.png'
import bombURL from '../assets/bomb.png'
import explosionURL from '../assets/explosion.png'
import flagURL from '../assets/flag.png'

import {getDisplayValue} from './utils'

export default class View {
    
    static colors = {
        '1': 'blue',
        '2': 'darkgreen',
        '3': 'red',
        '4': 'brown',
        '5': 'red',
        '6': 'yellow',
        '7': 'blue',
        '8': 'brown',
    }

    static cellSize = 32

    constructor(element, options) {
        this.element = element
        this.state = options.state
        this.rows = options.rows
        this.columns = options.columns
        this.cellSize = View.cellSize

        this.panelHeight = this.cellSize * 3

        this.width = this.cellSize * this.columns
        this.height = this.cellSize * this.rows + this.panelHeight
        this.panelWidth = this.width

        this.smileImg = new Image()
        this.smileImg.src = smileURL
        this.smileImgSize = 45
        this.smileImgX = this.panelWidth / 2 - this.smileImgSize / 2
        this.smileImgY = this.panelHeight / 2 - this.smileImgSize / 2

        this.bombImg = new Image()
        this.bombImg.src = bombURL

        this.explosionImg = new Image()
        this.explosionImg.src = explosionURL

        this.flagImg = new Image()
        this.flagImg.src = flagURL

        this.padding = 15

        this.minesWidth = 80
        this.minesHeight = this.panelHeight - this.padding * 4

        this.minesPanelX = this.padding
        this.minesPanelY = this.padding * 2
        this.timePanelX = this.panelWidth - this.minesWidth - this.padding
        this.timePanelY = this.padding * 2

        this.playfieldY = this.panelHeight

        
        this.canv = document.createElement('canvas')
        this.canv.width = this.width
        this.canv.height = this.height
        this.ctx = this.canv.getContext('2d')

        this.element.append(this.canv)

        this.render(this.state)

    }

    render(state) {
        this.clearCanv()
        this.renderPanel(state)
        this.renderCells(state)
    }


    clearCanv() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    renderPanel(state) {
        // Background
        this.ctx.fillStyle = '#c1e7ff'
        this.ctx.fillRect(0,0,this.panelWidth, this.panelHeight)

        // Bottom-border
        this.ctx.beginPath()
        this.ctx.moveTo(0, this.panelHeight)
        this.ctx.lineTo(this.panelWidth, this.panelHeight)
        this.ctx.stroke()

        this.renderTimeAndMinesPanels(state)

        //smile
        this.smileImg.onload = () => {
            this.ctx.drawImage(this.smileImg, this.smileImgX, this.smileImgY, this.smileImgSize, this.smileImgSize)
        }
    }

    setDefaultSmile() {
        this.smileImg.src = smileURL
        this.smileImg.onload = () => {
            this.ctx.drawImage(this.smileImg, this.smileImgX, this.smileImgY, this.smileImgSize, this.smileImgSize)
        }
    }

    renderWinnerScreen(playfield) {
        this.smileImg.src = smileWURL
        this.smileImg.onload = () => {
            this.ctx.drawImage(this.smileImg, this.smileImgX, this.smileImgY, this.smileImgSize, this.smileImgSize)
        }
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                if(playfield[y][x].mine) {
                    this.renderCell(
                        this.cellSize * x,
                        this.cellSize * y + this.playfieldY, 
                        this.cellSize, 
                        this.cellSize,
                        playfield[y][x]
                        )
                    this.drawImage(
                        this.bombImg,
                        x * this.cellSize,
                        y * this.cellSize + this.playfieldY,
                        this.cellSize,
                        this.cellSize
                        )
                }
            }
        }
    }

    renderLooserScreen(playfield) {
        this.smileImg.src = smileLURL
        this.smileImg.onload = () => {
            this.ctx.drawImage(this.smileImg, this.smileImgX, this.smileImgY, this.smileImgSize, this.smileImgSize)
        }
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                this.renderCell(
                    this.cellSize * x,
                    this.cellSize * y + this.playfieldY, 
                    this.cellSize, 
                    this.cellSize,
                    playfield[y][x]
                    )
                if(playfield[y][x].opened && playfield[y][x].mine) {
                    this.drawImage(
                        this.explosionImg, 
                        this.cellSize * x, 
                        this.cellSize * y + this.playfieldY, 
                        this.cellSize, 
                        this.cellSize
                    )
                }
                if(!playfield[y][x].opened && playfield[y][x].mine) {
                    this.drawImage(
                        this.bombImg,
                        x * this.cellSize,
                        y * this.cellSize + this.playfieldY,
                        this.cellSize,
                        this.cellSize
                        )
                }
            }
        }
    }

    renderFinalScreen(state) {
        switch(state.gameOver) {
            case 'win':
                this.renderWinnerScreen(state.playfield)
                break
            case 'lose':
                this.renderLooserScreen(state.playfield)
                break
        }
    }

    renderTimeAndMinesPanels(state) {
        //time and mines panels
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.minesPanelX, this.minesPanelY, this.minesWidth, this.minesHeight)
        this.ctx.fillRect(this.timePanelX, this.timePanelY, this.minesWidth, this.minesHeight)

        //mines and time counters
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillStyle = 'red'
        this.ctx.font = '36px serif'
        this.ctx.fillText(getDisplayValue(state.mines) , this.minesPanelX + this.minesWidth / 2, this.minesPanelY + this.minesHeight / 1.8)
        this.ctx.fillText(getDisplayValue(state.time), this.timePanelX + this.minesWidth / 2, this.timePanelY + this.minesHeight / 1.8)
    }

    
    renderCells(state) {
        const playfield = state.playfield
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                this.renderCell(
                    this.cellSize * x,
                    this.cellSize * y + this.playfieldY,
                    this.cellSize,
                    this.cellSize,
                    playfield[y][x]
                    )
                if(playfield[y][x].flaged) {
                    this.drawFlag(x, y)
                }
            }
        }
    }

    renderCell(x, y, width, height, {minesAround, opened}) {
        this.ctx.fillStyle = opened ? '#ccc' : '#5d92ff'
        this.ctx.strokeStyle = '#000'
        this.ctx.lineWidth = 0.25
        this.ctx.fillRect(x, y, width, height)
        this.ctx.strokeRect(x, y, width, height)
        if(opened) {
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            this.ctx.fillStyle = View.colors[minesAround]
            this.ctx.font = '20px bold'
            this.ctx.fillText(minesAround, x + width / 2, y + height / 2)
        }
    }

    drawImage(img, x, y, w, h) {
        this.ctx.drawImage(img, x, y, w, h)
    }

    drawFlag(x, y) {
        this.drawImage(this.flagImg, this.cellSize * x, this.cellSize * y + this.playfieldY, this.cellSize, this.cellSize)
    }

    desrtoyCanv() {
        this.canv.remove()
    }
} 