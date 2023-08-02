import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

//css
import '../css/Modal_Learn.css';

const Modal_Id = ({ show, onHide }) => {

    // DB에서 퀴즈 내용 로드
    // useEffect(() => {
    //   const loadData = async () => {
    //     try {
    //       const response = await fetch('http://localhost:8080/quizList/learn' + num, {
    //         method: 'GET'
    //       });
    //       if (response.ok) {
    //         const result = await response.json();
    //         setQuizList(result);
    //       }
          
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    //   loadData();
    // },[]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="example-modal-sizes-title-lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>...</Modal.Body>
      <Modal.Footer>
        <Button className='learn-btn' type="button">
          Click
        </Button>
        <Button className='learn-btn' onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Modal_Id;