import Popup from "./Popup"

export default class Gamebar {
    constructor(element) {
        this.element = element
        this.gamebar = this.createGamebar()
        this.difficult = 1
        this.popup = new Popup()


        this.popup.init(this.popupCb)
    }

    popupCb() {
        this.difficult = this.popup.formData
    }

    createGamebar() {
        const gamebar = document.createElement('div')
        gamebar.classList.add('gamebar')

        gamebar.insertAdjacentHTML('afterbegin', `
                <button data-difficult="1" class="btn active">Новичок</button>
                <button data-difficult="2" class="btn">Любитель</button>
                <button data-difficult="3" class="btn">Профессионал</button>
        `)

        return gamebar
    }

    clearActiveClass() {
        [...this.gamebar.children].forEach(child => child.classList.remove('active'))
    }

    init(callback) {
        this.element.append(this.gamebar)
        this.gamebar.addEventListener('click', event => {
            if(event.target.dataset.difficult === 'custom') {
                this.popup.open()
            } else if(event.target.classList.contains('btn')) {
                this.clearActiveClass()
                event.target.classList.add('active')
                this.difficult = +event.target.dataset.difficult
                callback()
            }
        })
    }



    destroy() {
        this.gamebar.remove()
    }
}


{/* <button data-difficult="custom" class="btn">Особый</button> */}