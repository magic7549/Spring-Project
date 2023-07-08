import React, { useState } from 'react';

//MUI UI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


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
      }
    }catch (error){
      console.log(error);
    }
  };



  return(
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, maxWidth: "55vw" }}>
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
          <Button fullWidth variant="contained" >아이디 찾기</Button>
          <Button fullWidth variant="contained" >비밀번호 찾기</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Login;