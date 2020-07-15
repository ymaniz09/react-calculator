import React from "react";
import "./Display.css"

interface DisplayProps {
    value: string
}

export const Display: React.FC<DisplayProps> =
    (props => (
        <button className='display'>{props.value}</button>
    ))