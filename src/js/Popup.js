export default class Popup {
    constructor() {
        this.popup = document.createElement('div')
        this.popupForm = null


        this.init()
    }

    init() {
        this.popup.classList.add('popup')
        this.createPopup()
        this.popup.addEventListener('click', this.listener)
        document.body.append(this.popup)
        this.popupForm = this.popup.querySelector('.form')
        this.popupForm.addEventListener('submit', this.submitHandler)
    }
    createPopup() {
        this.popup.insertAdjacentHTML('afterbegin', 
        `   <div class="popup__backdrop"></div>
            <div class="popup__body">
                <span class="popup__close">&times;</span>
                <form class="form">
                    <div class="form__item">
                        <label for="columns" class="input__label">Количество столбцов:</label>
                        <input type="number" min="1" value="10" name="columns" id="columns" class="popup__input">
                    </div>
                    <div class="form__item">
                        <label for="rows" class="input__label">Количество строк:</label>
                        <input type="number" min="1" value="10" name="rows" id="rows" class="popup__input">
                    </div>
                    <div class="form__item">
                        <label for="mines" class="input__label">Мины:</label>
                        <input type="number" min="1" value="10" name="mines" id="mines" class="popup__input">
                    </div>
                    <div class="form__actions">
                        <button  class="btn--ok btn form__btn">OK</button>
                    </div>
                </form>
            </div>
        `)
    }

    close() {
        this.popup.classList.remove('active')
    }

    open() {
        this.popup.classList.add('active')
    }

    destroy() {
        this.popup.removeEventListener('click', this.listener)
        this.popup.remove()
    }

    listener = e => {
        if(e.target.classList.contains('popup__close') || e.target.classList.contains('popup__backdrop')) this.close()
    }

    submitHandler = e => {
        e.preventDefault()
        this.close()
    }
}