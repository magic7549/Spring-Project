import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

//css
import '../../css/PostView.css';

function PostView(){
    const { num } = useParams();
    const [post, setPost] = useState([]);
  
  
    // DB에서 게시글 불러오기
    useEffect(() => {
      const loadData = async () => {
        try {
          const response = await fetch('http://localhost:8080/post/' + num, {
            method: 'GET'
          });
          if (response.ok) {
            const result = await response.json();
            setPost(result);
          }
          
        } catch (error) {
          console.log(error);
        }
      };
      loadData();
    },[]);
  
    return (
        <div>
            <div>제목 : {post.title}</div><br />
            <div>작성자 : {post.writer}</div><br />
            <div>작성일 : {post.postDate}</div><br />
            <div dangerouslySetInnerHTML={{__html: post.content}} className='post_content'/>
        </div>
    )
  }
  
  export default PostView;