import axios from 'axios';

import styled from 'styled-components';

import {useState, useEffect} from 'react';

import Button from './button';
import Line, {LINE_ALIGN_CENTER} from './line';

function Content () {
    
    const [posts, getAndSetAllPosts] = usePosts();
     

    useEffect(getAndSetAllPosts, []);


    return ( <ContentWrapper>
        <ContentHeader>ALL POSTS HERE:</ContentHeader>
        <Line marginTop = "10" width = "100%" alignMode={LINE_ALIGN_CENTER}>
            <Button onClick={getAndSetAllPosts} width="80px"> REFRESH </Button>
        </Line>
        <ContentBody>
            {posts.map((p,i) => <Post title={p.title} author = {p.author} content = {p.content}/>)}
        </ContentBody>
    </ContentWrapper>
    )
}


function usePosts() {
    const [posts, setPosts] = useState([]);

    const getAndSetAllPosts = () => axios.get("/all-posts")
                                        .catch(e => console.log("The error", e))
                                        .then(response => setPosts(response.data));


    return [posts, getAndSetAllPosts];


} 

  
const ContentWrapper = styled.div`
    box-sizing: border-box;
    width: 70%;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 15px;
    padding: 5px;
  
    border: 1px solid black;
`
  
const ContentHeader = styled.div`
    box-sizing: border-box;
    background-color: #520d05;
    color: white;
    padding: 5px;
    font-weight: bold;
    font-size: 20px;
`
  
const ContentBody = styled.div`
    box-sizing: border-box;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px;

`


export default Content;  


/******************************
 * POST COMPONENT
 */

function Post ({title, author, content}) {
    return (
        <PostWrapper>
            <PostHeader> {title}</PostHeader>
            <PostAuthor>{author}</PostAuthor>
            <PostContent>{content}</PostContent>
        </PostWrapper>
    );
}


const PostWrapper = styled.div`
    box-sizing: border-box;
    border: 1px solid black;
    margin-top: 10px;
    padding: 7px;
`

const PostHeader = styled.div`
    font-size: 20px;
    border-bottom: 2px solid #282e29;
    padding-bottom: 2px;
    text-transform: uppercase;

`

const PostAuthor = styled.div`
    font-family: monospace;
    font-style: italic;
    font-weight: bold;
    font-size: 15px;
    padding-left: 5px;
    padding-top: 10px;
`

const PostContent = styled.div`
    margin-top: 10px;
`