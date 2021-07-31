import {useState} from 'react';

import styled from "styled-components"

export const INLINE_BLOCK = "InputInlineBlock";
export const INLINE = "InputInline";

function useInput(type, placeholder, width = 400, height = 30, fontSize = 14, displayMode) {
    const [value, setValue] = useState("")

    const input = <Input type={type}                    
                    placeholder={placeholder}
                    value = {value}
                    onChange = {e => setValue(e.target.value)}
                    width = {width}
                    height = {height}
                    fontSize = {fontSize} 
                    displayMode = {displayMode}/>

    return [value, input];     
}




export default useInput;



const Input = styled.input`
    display: ${props => getDisplayMode(props.displayMode)};
    box-sizing: border-box;
    width: ${props => props.width + "px"};
    height: ${props => props.height + "px"};
    font-size: ${props => props.fontSize + "px"}
`

function getDisplayMode(displayMode) {
    if(displayMode === INLINE_BLOCK) return "inline-block"
    
    if(displayMode === INLINE) return "inline"

    return "block";
}