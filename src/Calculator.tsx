import React, {Component} from "react";
import './Calculator.css'
import {Button} from "./components/button/Button";
import {Display} from "./components/display/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component<{}> {

    state = {...initialState}

    constructor() {
        super({});
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({...initialState})
    }

    setOperation(operation: string) {
        if (this.state.current === 0) {
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(digit: string) {
        if (digit === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + digit
        this.setState({displayValue, clearDisplay: false})

        if (digit !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
    }

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label={"AC"} handleClick={this.clearMemory} triple/>
                <Button label={"/"} handleClick={this.setOperation} operation/>
                <Button label={"7"} handleClick={this.addDigit}/>
                <Button label={"8"} handleClick={this.addDigit}/>
                <Button label={"9"} handleClick={this.addDigit}/>
                <Button label={"*"} handleClick={this.setOperation} operation/>
                <Button label={"4"} handleClick={this.addDigit}/>
                <Button label={"5"} handleClick={this.addDigit}/>
                <Button label={"6"} handleClick={this.addDigit}/>
                <Button label={"-"} handleClick={this.setOperation} operation/>
                <Button label={"1"} handleClick={this.addDigit}/>
                <Button label={"2"} handleClick={this.addDigit}/>
                <Button label={"3"} handleClick={this.addDigit}/>
                <Button label={"+"} handleClick={this.setOperation} operation/>
                <Button label={"0"} double handleClick={this.addDigit}/>
                <Button label={"."} handleClick={this.addDigit}/>
                <Button label={"="} handleClick={this.setOperation} operation/>
            </div>
        )
    }
}