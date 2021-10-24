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

enum OperandEnum {
    first,
    second
}

class Operand {
    private _value: string
    private _floatingPoint: boolean

    constructor() {
        this._value = ''
        this._floatingPoint = false
    }

    public get value(): string {
        return this._value
    }

    public set value(v: string) {
        this._value = v
    }

    public get floatingPoint(): boolean {
        return this._floatingPoint
    }

    public set floatingPoint(fp: boolean) {
        this._floatingPoint = fp
    }

    public appendValue(va: string) {
        this._value += va
    }
}

class CalcState {
    private _firstOperand: Operand
    private _secondOperand: Operand
    private _currentOperandEnum: OperandEnum
    private _operation: Operations

    constructor() {
        this._firstOperand = new Operand()
        this._secondOperand = new Operand()
        this._currentOperandEnum = OperandEnum.first
        this._operation = Operations.none
    }

    public get firstOperand(): Operand {
        return this._firstOperand
    }

    /* public set firstOperand(o: Operand) {
        this._firstOperand = o
    } */

    public get secondOperand(): Operand {
        return this._secondOperand
    }

    /* public set secondOperand(o: Operand) {
        this._secondOperand = o
    } */

    public get operation(): Operations {
        return this._operation
    }

    public set operation(o: Operations) {
        this._operation = o
    }

    public get currentOperand(): Operand {
        if (this._currentOperandEnum === OperandEnum.first) {
            return this._firstOperand
        }
        return this._secondOperand
    }

    public set currentOperand(o: Operand) {
        if (this._currentOperandEnum === OperandEnum.first) {
            this._firstOperand = o
        }
        this._secondOperand = o
    }

    public get currentOperandEnum(): OperandEnum {
        return this._currentOperandEnum
    }

    public switchCurrentOperand() {
        if (this._currentOperandEnum === OperandEnum.first) {
            this._currentOperandEnum = OperandEnum.second
            return
        }
        this._currentOperandEnum = OperandEnum.first
    }
}

class Calc {
    private _state: CalcState
    private _init: boolean

    constructor() {
        this._state = new CalcState()
        this._init = false
    }

    public init() {
        if (this._init) { return } else { this._init = true }

        const buttons: NodeList = document.querySelectorAll('button.calc__buttons-button')

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const buttonAction = () => {
                    const buttonValue = (button as HTMLElement)?.innerText.toString()

                    if ('0123456789'.indexOf(buttonValue) !== -1) {
                        this.appendValue(buttonValue)
                        return
                    }

                    if (buttonValue === Operations.clear) {
                        // TODO: clear - screen, fp, both first and second, current and currentEnum
                        return
                    }

                    if (buttonValue === Operations.delete) {
                        // TODO: delete
                        return
                    }

                    if (buttonValue === Operations.pointToggle) {
                        this.toggleFloatingPoint()
                        return
                    }

                    if (buttonValue in [
                        Operations.substract,
                        Operations.add,
                        Operations.multiply,
                        Operations.divide,
                        Operations.remainder
                    ]) {
                        if (this.getEnum() === OperandEnum.first) {
                            // TODO: switch and start gathering second one
                            return
                        }
                        // TODO: change the current operation?V or just no-op?X
                        return
                    }

                    if (buttonValue === Operations.evaluate) {
                        // TODO: evaluate
                        // if just one -> return itself
                        // if two -> evaluate, place the result in the first one and clear the second one
                        return
                    }

                    alert('Easter Egg found! Not a bug, but a feature!')
                }

                buttonAction()

                const input: HTMLInputElement | null = document.querySelector('input.calc__input')
                if (input) { input.value = this.getValue() }
            })
        })
    }

    private interruptOperations() {
        this._state.operation = Operations.none
    }

    private clearAll() {
        this.interruptOperations()
        // UNDONE
    }

    private deleteLast() {
        //...
    }

    private evaluate() {
        //...
    }

    private switchOperation() {
        // left, //switch to second, if not already
    }

    // private

    private getEnum(): OperandEnum {
        return this._state.currentOperandEnum
    }

    private getValue(): string {
        return this._state.currentOperand.value
    }

    private setValue(v: string) {
        this._state.currentOperand.value = v
    }

    private appendValue(value: string) {
        this._state.currentOperand.appendValue(value)
    }

    private getFloatingPoint(): boolean {
        return this._state.currentOperand.floatingPoint
    }

    private setFloatingPoint(fp: boolean) {
        this._state.currentOperand.floatingPoint = fp
    }

    private toggleFloatingPoint() {
        this.interruptOperations()
        let value = this.getValue()

        if (value.indexOf('.') === -1) {
            this.setFloatingPoint(true)
            this.appendValue('.')
            return
        }

        if (value.lastIndexOf('.') === value.length - 1) {
            this.setValue(value.length > 0 ? value.substring(0, value.length - 1) : '')
            this.setFloatingPoint(false)
        }
    }

    /* switch (buttonValue) {
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
            switch (this._state.operation) {
                case Operations.remainder:
                    this._state.value = String(Number(this._state.value) % Number(buttonValue))
                    break
                case Operations.divide:
                    this._state.value = String(Number(this._state.value) / Number(buttonValue))
                    break
                case Operations.substract:
                    this._state.value = String(Number(this._state.value) - Number(buttonValue))
                    break
                case Operations.multiply:
                    this._state.value = String(Number(this._state.value) * Number(buttonValue))
                    break
                case Operations.add:
                    this._state.value = String(Number(this._state.value) + Number(buttonValue))
                    break
                default:
                    this._state.value += buttonValue
                    break
            }
            operation = Operations.none
            break

        case Operations.evaluate:
            operation = Operations.none
            alert('Бесполезная кнопка :)')
            console.log('this thing is useless')
            break

        case Operations.clear:
            operation = Operations.none
            value = ''
            state.point = false
            break

        case Operations.delete:
            operation = Operations.none

            if (value.lastIndexOf('.') === value.length - 1) {
                state.point = false
            }

            value = value.length > 0 ? value.substring(0, value.length - 1) : ''
            break

        case Operations.substract:
        case Operations.remainder:
        case Operations.multiply:
        case Operations.divide:
        case Operations.add:
        default:
            operation = buttonValue as Operations
            break
    } */

    /* if (input !== null) {
        input.value = value
    } */
}

const calc = new Calc()
calc.init()
