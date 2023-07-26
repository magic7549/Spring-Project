import React, { useState } from 'react';
import Modal_Id from '../components/Modal_Id';
import Modal_Pw from '../components/Modal_Pw';

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

//css
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    try{
      const response = await fetch('http://localhost:8080/login',{
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password}),
      });
      if(response.status == 404){
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
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

  // 아이디찾기 모달폼
  const [ModalIdOn, setModalIdOn] = useState(false);

  //비밀번호찾기 모달폼
  const [ModalPassOn, setModalPassOn] = useState(false);



  return(
    <div className="bg-color">
    <Container className='Container_box' style={{display:'flex', justifyContent:'center',alignContent:'center'}}>
      <Card sx={{ minWidth: 500}}>
        <CardContent>
          <Box onSubmit={handleSubmit}>
          {/* email */}
          <TextField fullWidth  label="이메일 주소" variant="standard" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br/><br/>
          {/* password */}
          <TextField fullWidth  label="비밀번호" variant="standard" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth variant="contained" onClick={() => handleSubmit()}>Login</Button>
          
          {/* 아이디찾기 */}
          <Modal_Id show={ModalIdOn} onHide={()=>setModalIdOn(false)}/>
          <Button fullWidth variant="contained" onClick={()=>setModalIdOn(true)}>아이디 찾기</Button>

          {/* 비밀번호찾기 */}
          <Modal_Pw show={ModalPassOn} onHide={()=>setModalPassOn(false)}/>
          <Button fullWidth variant="contained" onClick={()=>setModalPassOn(true)}>비밀번호 찾기</Button>
        </CardActions>
      </Card>
    </Container>
    </div>
  );
}

export default Login;