export default class Popup {
    constructor() {
        this.popup = this.createPopup()
        this.popupForm = this.popup.querySelector('.form')

        this.formData = null
    }

    init(callback) {
        this.popupForm.addEventListener('submit', this.submitHandler)
        this.popup.addEventListener('click', event => {this.listener(event, callback)})
        document.body.append(this.popup)
    }
    createPopup() {
        const popup = document.createElement('div')
        popup.classList.add('popup')
        popup.insertAdjacentHTML('afterbegin', 
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
                        <input type="number" max="999" min="1" value="10" name="mines" id="mines" class="popup__input">
                    </div>
                    <div class="form__actions">
                        <button type="submit" class="btn--ok btn form__btn">OK</button>
                    </div>
                </form>
            </div>
        `)

        return popup
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

    listener(e, callback) {
        if(e.target.classList.contains('popup__close') || e.target.classList.contains('popup__backdrop')) {
            this.close()
            console.log('closed');
        } else if(e.target.classList.contains('form__btn')) {
            const {columns, rows, mines} = this.popupForm
            this.formData = {
                columns: columns.value,
                rows: rows.value,
                mines: mines.value,
            }
            this.close()
            callback()
        }
    }

    submitHandler = e => {
        e.preventDefault()
    }
}