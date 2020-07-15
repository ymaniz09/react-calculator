import React from "react"
import './Button.css'

interface ButtonProps {
    label: string
    operation?: boolean
    double?: boolean
    triple?: boolean
    handleClick: (arg0: string) => void
}

export const Button: React.FC<ButtonProps> =
    (props => (
        <button className={`
        button
        ${props.operation ? 'operation' : ''}
        ${props.double ? 'double' : ''}
        ${props.triple ? 'triple' : ''}
        `}
                onClick={() => props.handleClick(props.label)}>
            {props.label}
        </button>
    ))

