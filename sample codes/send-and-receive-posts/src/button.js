import styled from "styled-components"

function Button({children, width, onClick}) {
    
    return <StyledButton onClick={onClick} width={width}>
        {children}
    </StyledButton>
}


export default Button;

const StyledButton = styled.div`
    background-color: #d1bd86;
    padding: 5px;
    width: ${props => props.width};
    margin: auto;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;

    :hover {
        background-color: #ebd394;
    }
`