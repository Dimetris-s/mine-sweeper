import Popup from "./Popup"

export default class Gamebar {
    constructor(element) {
        this.element = element
        this.gamebar = this.createGamebar()
        this.btns = null
        this.popup = new Popup()
        
        this.init()
    }

    createGamebar() {
        const gamebar = document.createElement('div')
        gamebar.classList.add('gamebar')

        gamebar.insertAdjacentHTML('afterbegin', `
                <button data-difficult="new" class="btn active">Новичок</button>
                <button data-difficult="mid" class="btn">Любитель</button>
                <button data-difficult="pro" class="btn">Профессионал</button>
                <button data-difficult="custom" class="btn">Особый</button>
        `)

        return gamebar
    }

    init() {
        this.element.append(this.gamebar)
        this.btns = this.gamebar.querySelectorAll('.btn')
        this.btns.forEach(btn => btn.addEventListener('click', this.listener))
    }

    listener = (e) => {
        this.btns.forEach(btn => btn.classList.remove('active'))
        e.target.classList.add('active')
        if(e.target.dataset.difficult === 'custom') {
            this.popup.open()
        }
    } 

    destroy() {
        this.btns.forEach(btn => btn.removeEventListener('click', this.listener))
        this.gamebar.remove()
    }
}