import React, { useState } from 'react'
import { Modal, Button, FloatingLabel, Form } from 'react-bootstrap';

const Modal_Id = ({ show, onHide }) => {

  //전달할 값
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  //오류메세지 상태저장
  const [PhoneMessage, setPhoneMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');

  //유효성검사
  const [isPhone, setIsPhone] = useState(false);
  const [isName, setIsName] = useState(false);

  
  const handleSubmit = async (event) => {
    try {
      const response = await fetch('http://localhost:8080/findEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });
      if (response.ok) {
        const result = await response.text();
        if (result == '') {
          alert('아이디가 존재하지 않습니다.');
        }
        else {
          alert('email : ' + result);
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  //폰 유효성검사
  const onChangePhone = async (e) => {
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
    return phoneRegex.test(phone);
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


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          아이디 찾기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingPhone" label="휴대전화('-' 없이 번호만 입력해주세요)" className="mb-3">
          <Form.Control variant="standard" type="text" name="phone" value={phone} onClick={(e) => setPhone(e.target.value)} onChange={onChangePhone} />
          {phone.length > 0 && (<span className={`message ${isPhone ? 'success' : 'error'}`} style={{ color: isPhone ? 'blue' : 'red' }}> {PhoneMessage} </span>)}
        </FloatingLabel>
        <FloatingLabel controlId="floatingName" label="이름" className="mb-3">
          <Form.Control variant="standard" type="text" name="name" value={name} onClick={(e) => setName(e.target.value)} onChange={onChangeName} />
          {name.length > 0 && (<span className={`message ${isName ? 'success' : 'error'}`} style={{ color: isName ? 'blue' : 'red' }}> {nameMessage} </span>)}
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="button" onClick={handleSubmit} disabled={!isPhone || !isName}>
          Click
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Modal_Id;