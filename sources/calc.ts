const buttons = document.querySelectorAll('button.calc__buttons-button')
const input = document.querySelector('input.calc__input') as HTMLInputElement

let value = ''
let dot = false
let action = null

for (let i = 0; i < buttons.length; i += 1) {
    buttons[ i ]?.addEventListener('click', function () {
        const buttonValue = this.innerText.toString()

        switch (buttonValue) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                switch (action) {
                    case 'mod':
                        value = String(Number(value) % Number(buttonValue))
                        break
                    case 'div':
                        value = String(Number(value) / Number(buttonValue))
                        break
                    case 'mul':
                        value = String(Number(value) * Number(buttonValue))
                        break
                    case 'minus':
                        value = String(Number(value) - Number(buttonValue))
                        break
                    case 'plus':
                        value = String(Number(value) + Number(buttonValue))
                        break
                    default:
                        value += buttonValue
                        break
                }
                action = null
                break
            case '.':
                action = null

                if (dot === false) {
                    value += '.'
                    dot = true
                } else if (value[ value.length - 1 ] === '.') {
                    value = value.substring(0, value.length - 1)
                    dot = false
                }
                break
            case '=':
                alert('Бесполезная кнопка :)')
                console.log('this thing is useless')
                break;
            case 'C':
                value = ''
                dot = false
                break
            case 'D':
                value = value.length > 0 ? value.substring(0, value.length - 1) : ''
                break
            case '%':
                action = 'mod'
                break
            case '×':
                action = 'mul'
                break
            case '/':
                action = 'div'
                break
            case '-':
                action = 'minus'
                break
            case '+':
                action = 'plus'
                break
            default:
                break
        }

        if (input) {
            input.value = value
        }
    })
}

/*
    TODO: Типы кнопок - enum
    TODO: Кнопка =
    TODO: strict typing
    TODO: add fabric right there or as a separate method

    until tomorrow
*/
