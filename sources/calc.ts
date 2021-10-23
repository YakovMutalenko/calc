const buttons: NodeList = document.querySelectorAll('button.calc__buttons-button')
const input: HTMLInputElement | null = document.querySelector('input.calc__input')

enum Operations {
    none = '',
    clear = 'C',
    delete = 'D',
    remainder = '%',
    divide = '/',
    multiply = '×',
    substract = '-',
    add = '+',
    pointToggle = '.',
    evaluate = '=',
}

enum Values {
    zero = '0',
    one = '1',
    two = '2',
    three = '3',
    four = '4',
    five = '5',
    six = '6',
    seven = '7',
    eight = '8',
    nine = '9'
}

let state = {
    sign: false,
    point: false,
}
let value: string = ''
let action: Operations = Operations.none

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = (button as HTMLElement)?.innerText.toString()

        switch (buttonValue) {
            case Values.zero:
            case Values.one:
            case Values.two:
            case Values.three:
            case Values.four:
            case Values.five:
            case Values.six:
            case Values.seven:
            case Values.eight:
            case Values.nine:
                switch (action) {
                    case Operations.remainder:
                        value = String(Number(value) % Number(buttonValue))
                        break
                    case Operations.divide:
                        value = String(Number(value) / Number(buttonValue))
                        break
                    case Operations.substract:
                        value = String(Number(value) - Number(buttonValue))
                        break
                    case Operations.multiply:
                        value = String(Number(value) * Number(buttonValue))
                        break
                    case Operations.add:
                        value = String(Number(value) + Number(buttonValue))
                        break
                    default:
                        value += buttonValue
                        break
                }
                action = Operations.none
                break

            case Operations.pointToggle:
                action = Operations.none

                if (value.indexOf('.') === -1) {
                    state.point = true
                    value += '.'
                    break
                }

                if (value.lastIndexOf('.') === value.length - 1) {
                    value = value.length > 0 ? value.substring(0, value.length - 1) : ''
                    state.point = false
                }

                break

            case Operations.evaluate:
                action = Operations.none
                alert('Бесполезная кнопка :)')
                console.log('this thing is useless')
                break

            case Operations.clear:
                action = Operations.none
                value = ''
                state.point = false
                state.sign = false
                break

            case Operations.delete:
                action = Operations.none

                if (value.lastIndexOf('.') === value.length - 1) {
                    state.point = false
                }

                if (value.lastIndexOf('-') === value.length - 1) {
                    state.sign = false
                }

                value = value.length > 0 ? value.substring(0, value.length - 1) : ''
                break

            case Operations.substract:
            case Operations.remainder:
            case Operations.multiply:
            case Operations.divide:
            case Operations.add:
            default:
                action = buttonValue as Operations
                break
        }

        if (input !== null) {
            input.value = value
        }
    })
})
