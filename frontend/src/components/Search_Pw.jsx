import React, { useState } from 'react';
import Modal_Id from '../components/Modal_Id';
import Modal_Pw from '../components/Modal_Pw';
import { useNavigate } from 'react-router-dom';

//MUI UI
import {
  Card, 
  CardActions, 
  CardContent,
  Box,
  TextField,
  Button,
  Container
} from '@mui/material';

function Search_Pw() {

  //비밀번호, 비밀번호 확인
  const [password, setPassword] = useState('');
  const [RePassword, setRePassword] = useState('');

  //오류메시지 상태저장
  const [passwordMessage, setPasswordMessage] = useState('');
  const [RePasswordMessage, setRePasswordMessage] = useState('');

  // 유효성 검사
  const [isPassword, setIsPassword] = useState(false);
  const [isRePassword, setIsRePassword] = useState(false);

  const handleClick = async (event) => {
    try{
      const response = await fetch('http://localhost:8080/member/update',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({password}),
      });
      if(response.status == 404){
        alert("비밀번호가 일치하지 않습니다.");
      }
      else if (response.ok) {
        const data = await response.json();
        const access = JSON.parse(JSON.stringify(data)).accessToken;
        localStorage.setItem('accessToken', access);
        window.location.href = "/";
      }
    }catch (error){
      console.log(error);
    }
  };


      //비밀번호
      const onChangePassword = async(e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        const passwordCurrent = e.target.value;
        setPassword(passwordCurrent);
    
        if (!passwordRegex.test(passwordCurrent)) {
          setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
          setIsPassword(false);
        } else {
          setPasswordMessage('안전!');
          setIsPassword(true);
        }
      };
  
    
      //비밀번호 확인
      const onChangeRePassword = async(e) => {
        e.preventDefault();
        const passwordConfirmCurrent = e.target.value;
        setRePassword(passwordConfirmCurrent);
    
        if (password === passwordConfirmCurrent) {
          setRePasswordMessage('비밀번호 일치!');
          setIsRePassword(true);
        } else {
          setRePasswordMessage('비밀번호가 틀렸습니다. 다시 확인해주세요.');
          setIsRePassword(false);
        }
      };

    //로그인 페이지로 이동하려면 경로를 수정하세요.
    const navigate = useNavigate();

    const handleCk = () => {
      navigate('/login');
    };

      // 아이디찾기 모달폼
      const [ModalIdOn, setModalIdOn] = useState(false);

      //비밀번호찾기 모달폼
      const [ModalPassOn, setModalPassOn] = useState(false);

      return (
        <Container style={{display:'flex', justifyContent:'center', marginTop:'100px',alignContent:'center'}}>
        <Card sx={{minWidth:700}} >
          <CardContent>
          <Box onSubmit={handleClick}>
              <br/>
              {/* password */}
              <div>
                <TextField fullWidth  label="비밀번호" variant="standard" type="password" name="password" value={password} onClick={(e) => setPassword(e.target.value)} onChange={onChangePassword}/>
                {password.length > 0 && (
                  <span className={`message ${isPassword ? 'success' : 'error'}`} style={{color: isPassword? 'blue' : 'red'}}>{passwordMessage}</span>
                )}
              </div>
              
              <br/>
              {/* RePassword */}
              <div>
                <TextField fullWidth  label="비밀번호 확인" variant="standard" type="password" name="RePassword" value={RePassword} onClick={(e) => setRePassword(e.target.value)} 
                onChange={onChangeRePassword}/>
                {RePassword.length > 0 && (
                <span className={`message ${isRePassword ? 'success' : 'error'}`} style={{color: isRePassword ? 'blue' : 'red'}}>{RePasswordMessage}</span>
                )}
              </div>
              <br/><br/>
  
          </Box>
          </CardContent>
        <CardActions>
          <Button fullWidth variant="contained"
          onClick={handleCk}>확인</Button>
          
          {/* 아이디찾기 */}
          <Modal_Id show={ModalIdOn} onHide={()=>setModalIdOn(false)}/>
          <Button fullWidth variant="contained" onClick={()=>setModalIdOn(true)}>아이디 찾기</Button>

          {/* 비밀번호찾기 */}
          <Modal_Pw show={ModalPassOn} onHide={()=>setModalPassOn(false)}/>
          <Button fullWidth variant="contained" onClick={()=>setModalPassOn(true)}>비밀번호 찾기</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Search_Pw;