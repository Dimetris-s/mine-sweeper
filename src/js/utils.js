export function rnd(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

export function getDisplayValue(num) {
    const number = Math.abs(num)
    let sign = ''
    if(num < 0) sign = '-'
    switch(number.toString().length) {
        case 1:
            return `${sign}00${number}`
        case 2:
            return `${sign}0${number}`
        case 3:
            return `${sign}${number}`
    }
}

export function checkObjectClick(event, objX, objY, objW, objH) {
    if(
        (event.offsetX >= objX && event.offsetX <= objX + objW) &&
        (event.offsetY >= objY && event.offsetY <= objY + objH) 
      ) {
          return true
      }

      return false
}