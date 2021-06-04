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

    constructor(element, options) {
        this.element = element
        this.rows = options.rows
        this.columns = options.columns
        this.cellSize = options.cellSize
        this.width = this.cellSize * this.columns
        this.height = this.cellSize * this.rows
        
        this.state = options.state
        
        this.canv = document.createElement('canvas')
        this.canv.width = this.width
        this.canv.height = this.height
        this.canv.style.width = this.width
        this.canv.style.height = this.height
        this.ctx = this.canv.getContext('2d')

        this.element.append(this.canv)

        this.playfieldBorderWidth = 4

        this.playfieldWidth = this.width
        this.playfieldHeight = this.height
        this.playfieldX = this.playfieldBorderWidth
        this.playfieldY = this.playfieldBorderWidth
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2

        this.renderPlayfield()
        this.renderCells(this.state)
    }

    renderPlayfield() {
        this.ctx.lineWidth = this.playfieldBorderWidth
        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = 'black'
        this.ctx.fillRect(this.playfieldX, this.playfieldY  , this.playfieldWidth, this.playfieldHeight)
        this.ctx.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight)
    }

    renderCells(state) {
        const playfield = state.playfield
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                if(typeof playfield[y][x] === 'string') {
                    if(playfield[y][x] === '0' || playfield[y][x] === '9') {
                        this.renderCell(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize, playfield[y][x], true)
                    } else {
                        this.renderCell(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize, playfield[y][x], true, View.colors[playfield[y][x]])
                    }
                } else {
                    this.renderCell(this.cellSize * x, this.cellSize * y, this.cellSize, this.cellSize)
                }
            }
        }
        
    }

    renderCell(x, y, width, height, content = null, isOpen = false, color = 'red') {
        this.ctx.fillStyle = isOpen ? '#ccc' : 'rgb(0, 204, 255)'
        this.ctx.strokeStyle = '#000'
        this.ctx.lineWidth = 0.25
        this.ctx.fillRect(x, y, width, height)
        this.ctx.strokeRect(x, y, width, height)
        if(isOpen) {
            this.ctx.textAlign = 'center'
            this.ctx.textBaseline = 'middle'
            this.ctx.fillStyle = color
            this.ctx.font = '20px bold'
            this.ctx.fillText(content, x + width / 2, y + height / 2)
        }
    }


    render(state) {
        const playfield = state.playfield
        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                
            }
        }

    }
} 