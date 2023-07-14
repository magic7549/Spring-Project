import React, { useState } from 'react'

//MUI UI
import {Card, CardActions, CardContent, Box, TextField, Button, Container} from '@mui/material';

function SignUp() {
    //이메일, 비밀번호, 비밀번호 확인, 이름, 폰번호
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [RePassword, setRePassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');


    //오류메시지 상태저장
    const [nameMessage, setNameMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [RePasswordMessage, setRePasswordMessage] = useState('');
    const [PhoneMessage, setPhoneMessage] = useState('');

    // 유효성 검사
    const [isName, setIsName] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isAvailableEmail, setIsAvailableEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isRePassword, setIsRePassword] = useState(false);
    const [isPhone, setIsPhone] = useState(false);

    //이메일 유효성 검사
    const onChangeEmail = async(e) => {
      e.preventDefault();
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);
  
      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 틀렸어요!');
        setIsEmail(false);
      } else {
        setEmailMessage('올바른 이메일 형식이에요');
        setIsEmail(true);
      }
    };

    //이메일 중복 검사
    const hasEmail = async () => {
      //입력안했거나 띄어쓰기만 했을 경우 제외
      if (email.trim() == '') {
        setIsAvailableEmail(false);
        alert('email을 입력해주세요.');
        return;
      }

      try{
          console.log(email);
          const response = await fetch('http://localhost:8080/signup/email', {
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              body: JSON.stringify({email}),
          });
          const data = await response.json();
          if (data) {
              alert("존재하는 email입니다.");
              setIsAvailableEmail(false);
          } else {
              alert("사용 가능한 email입니다.");
              setIsAvailableEmail(true);
          }
      } catch (error) {
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

    //이름 유효성검사
    const onChangeName = async(e) => {
      e.preventDefault();
      const nameConfirmCurrent = e.target.value;
      setName(nameConfirmCurrent);
      
      if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsName(false);
      } else {
          setNameMessage('올바른 이름 형식입니다.)');
          setIsName(true);
        }
    };

    //폰 유효성검사
    const onChangePhone = async(e) => {
      e.preventDefault();
      const phoneRegex = /^\d{3}\d{3,4}\d{4}$/;
      const phoneCurrent = e.target.value;
      setPhone(phoneCurrent);
      
      if (!phoneRegex.test(phoneCurrent)) {
        setPhoneMessage('핸드폰 번호 형식이 올바르지 않습니다!');
        setIsPhone(false);
      } else {
        setPhoneMessage('올바른 핸드폰 번호 형식입니다.');
        setIsPhone(true);
      }
    };

    //signUpHandler 
    const signUpHandler = async () => {
      try{
          const response = await fetch('http://localhost:8080/signup',{
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              body: JSON.stringify({email, password, name, phone}),
          });
          if(response.status == 200){
              alert("Success!");
              window.location.href = "/login";
          }
          else {
            const data = await response.json();
            switch(data.code){
              case 'PHONE-DUPLICATED':
                alert('이미 등록된 번호입니다.');
                break;
              case 'EMAIL-DUPLICATED':
                alert('이미 등록된 이메일입니다.');
                break;
            }
          }
      } catch (error) {
          console.log(error);
      }
    };

    return (
      <Container style={{display:'flex', justifyContent:'center', marginTop:'100px',alignContent:'center'}}>
      <Card sx={{minWidth:700}} >
        <CardContent>
        <Box>
            {/* email */}
            <div>
              <TextField fullWidth label="이메일 주소" variant="standard" type="email" name="email" value={email} onClick={(e) => setEmail(e.target.value)} onChange={onChangeEmail} disabled={isAvailableEmail} />
              {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`} style={{color: isEmail? 'blue' : 'red'}}>{emailMessage}</span>}
              <br/>
              <CardActions>
                <Button variant='contained' onClick={hasEmail} type="button">중복확인</Button>
              </CardActions>
            </div>
            
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

            <br/>
            {/* name */}
            <div>
              <TextField fullWidth  label="이름" variant="standard" type="text" name="name" value={name} onClick={(e) => setName(e.target.value)}
              onChange={onChangeName} />
              {name.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`} style={{color: isName? 'blue' : 'red'}}>{nameMessage}</span>}
            </div>
            
            <br/>
            {/* phone */}
              <TextField fullWidth  label="휴대전화('-' 없이 번호만 입력해주세요)" variant="standard" type="text" name="phone" value={phone} onClick={(e) => setPhone(e.target.value)}
              onChange={onChangePhone} />
              {phone.length > 0 && (
              <span className={`message ${isPhone ? 'success' : 'error'}`} style={{ color: isPhone? 'blue' : 'red' }}>
              {PhoneMessage}
              </span>
              )}
              <br/><br/>

        </Box>
        </CardContent>
        <CardActions>
          <Button fullWidth variant='contained' onClick={signUpHandler} type="button" disabled={!isName || !isEmail || !isAvailableEmail || !isPassword || !isRePassword || !isPhone}>SignUp</Button>
        </CardActions>
      </Card>
      </Container>
    );
}

export default SignUp;