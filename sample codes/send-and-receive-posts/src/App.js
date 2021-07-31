import axios from 'axios';

import useInput, {INLINE_BLOCK} from './input';
import Button from './button';
import Line, {LINE_ALIGN_CENTER} from './line';

import Content from './Content'

function App() {
  const [titleValue, titleInput] = useInput("text", "Type the title here ...", 500, 40, 17, INLINE_BLOCK);
  const [contentValue, contentInput] = useInput("text", "Type the content here ...", 500, 40, 17, INLINE_BLOCK);

  const onClickButton = (e)  => {
    let post = {
      title: titleValue,
      author: "Minh Le",
      content: contentValue
    }

    axios.post("/post", post)
        .catch(e => console.log("The error", e))
        .then(response => console.log(response));
  }



  return (
    <div className="App">
        <Line marginTop = "10" width = "80%" alignMode={LINE_ALIGN_CENTER}>
            Title:  {titleInput}
        </Line>
        <Line marginTop = "10" width = "80%" alignMode={LINE_ALIGN_CENTER}>
            Content:  {contentInput}
        </Line>
        <Line marginTop = "10" width = "80%" alignMode={LINE_ALIGN_CENTER}>
            <Button onClick={onClickButton} width="60px"> SUBMIT </Button>
        </Line>

        <Content/> 
    </div>
  );
}



export default App;



