import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

//MUI UI
import {TextField} from '@mui/material';

//css
import '../../css/PostEditor.css';



const PostEditor = () => {
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  async function btn_post() {
    try{
      const response = await fetch('http://localhost:8080/post/add', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({title, 'content':draftToHtml(convertToRaw(editorState.getCurrentContent())), accessToken}),
      });
      if(response.ok){
        const data = await response.json();
        alert(data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='postEditor-div'>
      <TextField fullWidth label="제목" variant="standard" type="title" name="title" onChange={(e) => setTitle(e.target.value)} />
      <Editor
        // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName="wrapper-class"
        // 에디터 주변에 적용된 클래스
        editorClassName="editor"
        // 툴바 주위에 적용된 클래스
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          blockType: { className: 'blockType' },
          fontSize: { className: 'fontSize' },
          fontFamily: { className: 'fontFamily' },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }} 
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: 'ko',
        }}
        // 초기값 설정
        editorState={editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={btn_post}>post</button>
    </div>
  );
};

export default PostEditor;