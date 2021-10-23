const buttons: NodeList = document.querySelectorAll('button.calc__buttons-button')
const input: HTMLInputElement | null = document.querySelector('input.calc__input')

enum EOperation {
    none           = '',
    multiplication = '×',
    division       = '/',
    remainder      = '%',
    substraction   = '-',
    addition       = '+',
}

enum EValue {
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

let dot: boolean = false // or state { point/dot: false }
let value: string = ''
let action: EOperation = EOperation.none

// TODO: minus before the number should make a number negative

for (let i = 0; i < buttons.length; i += 1) {
    buttons[i]?.addEventListener('click', () => {
        const buttonValue = (buttons[i] as HTMLElement)?.innerText.toString()

        switch (buttonValue) {
            case EValue.zero:
            case EValue.one:
            case EValue.two:
            case EValue.three:
            case EValue.four:
            case EValue.five:
            case EValue.six:
            case EValue.seven:
            case EValue.eight:
            case EValue.nine:
                switch (action) {
                    case EOperation.remainder:
                        value = String(Number(value) % Number(buttonValue))
                        break
                    case EOperation.division:
                        value = String(Number(value) / Number(buttonValue))
                        break
                    case EOperation.multiplication:
                        value = String(Number(value) * Number(buttonValue))
                        break
                    case EOperation.substraction:
                        value = String(Number(value) - Number(buttonValue))
                        break
                    case EOperation.addition:
                        value = String(Number(value) + Number(buttonValue))
                        break
                    default:
                        value += buttonValue
                        break
                }
                action = EOperation.none
                break
            case '.':
                action = EOperation.none

                if (dot === false) {
                    value += '.'
                    dot = true
                } else if (value[value.length - 1] === '.') {
                    value = value.substring(0, value.length - 1)
                    dot = false
                }
                break
            case '=':
                alert('Бесполезная кнопка :)')
                console.log('this thing is useless')
                break
            case 'C':
                value = ''
                dot = false
                break
            case 'D':
                value = value.length > 0 ? value.substring(0, value.length - 1) : ''
                break
            case EOperation.remainder:
            case EOperation.multiplication:
            case EOperation.division:
            case EOperation.substraction:
            case EOperation.addition:
            default:
                action = buttonValue as EOperation
                break
        }

        if (input !== null) {
            input.value = value
        }
    })
}
