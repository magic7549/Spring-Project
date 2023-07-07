import React, { useState } from 'react';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      const data = await response.json();
      console.log(data);
    }catch (error){
      console.log(error);
    }
  };

  return(
    <Card sx={{ minWidth: 275, maxWidth: "50vw" }}>
      <CardContent>
        <Box onSubmit={handleSubmit}>
        <TextField fullWidth  label="이메일 주소" variant="standard" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth  label="비밀번호" variant="standard" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Box>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" onClick={() => handleSubmit()}>Sign up</Button>
      </CardActions>
    </Card>

  );
}

export default Login;