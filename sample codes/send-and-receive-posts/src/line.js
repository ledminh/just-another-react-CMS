import styled from "styled-components"; 

export const LINE_ALIGN_CENTER = "LineAlign/Center";
export const LINE_ALIGN_LEFT = "LineAlign/Left";
export const LINE_ALIGN_RIGHT = "LineAlign/Right";

function Line ({children, marginTop, width, alignMode = LINE_ALIGN_CENTER}) {

    return <Wrapper marginTop={marginTop} width={width} alignMode={alignMode}>
      {children}
    </Wrapper>
      
}





export default Line;
  
  
const Wrapper = styled.div`
    width: ${(props) => props.width};
    margin: auto;
    margin-top: ${(props) => props.marginTop + "px"};
    text-align: ${props => getLineAlign(props.alignMode)};
    
`


function getLineAlign(mode) {
    if(mode === LINE_ALIGN_RIGHT) return "right";

    if(mode === LINE_ALIGN_LEFT) return "left";

    return "center"
}
  