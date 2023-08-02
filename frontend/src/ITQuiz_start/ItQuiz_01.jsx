import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ItQuizResult from './Data/ItQuizResult';
//css
import '../css/ItQuiz-style.css';

function ItQuiz_01() {
  const { num } = useParams();

  const [currentQuestion,setCurrentQuestion]=useState(0);
  const [score,setScore] = useState(0);
  const [clickedOption,setClickedOption]=useState(0);
  const [showResult,setShowResult]=useState(false);

  const [quizList, setQuizList] = useState([]);



  // DB에서 퀴즈 목록 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('http://localhost:8080/quizList/' + num, {
          method: 'GET'
        });
        if (response.ok) {
          const result = await response.json();
          setQuizList(result);
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  },[]);
  
  const changeQuestion = ()=>{
      updateScore();
      if(currentQuestion< quizList.length-1){
          setCurrentQuestion(currentQuestion+1);
          setClickedOption(0);
      }else{
          setShowResult(true)
      }
  }
  const updateScore=()=>{
      if(clickedOption===quizList[currentQuestion].answer){
          setScore(score+1);
      }
  }
  const resetAll=()=>{
      setShowResult(false);
      setCurrentQuestion(0);
      setClickedOption(0);
      setScore(0);
  }

  return (
    <div>
      {quizList.length > 0 ? ( // quizList가 비어있지 않을 때 렌더링
        <div>
          <div className="heading-img">
          <img src="https://31.media.tumblr.com/f4052ec68516abe096317253967e9cd5/tumblr_inline_msvvrdr0xZ1qz4rgp.gif" alt="" />
        </div>
        <div className="container">
            {showResult ? (
                <ItQuizResult score={score} totalScore={quizList.length} tryAgain={resetAll}/>
            ):(
            <>
            <div className="question">
                <span id="question-number">{currentQuestion+1}. </span>
                <span id="question-txt">{quizList[currentQuestion].question}</span>
            </div>
            <div className="option-container">
                <button className={`option-btn ${clickedOption == 1?"checked":null}`} key={1} onClick={()=>setClickedOption(1)}>1. {quizList[currentQuestion].option1}</button>
                <button className={`option-btn ${clickedOption == 2?"checked":null}`} key={2} onClick={()=>setClickedOption(2)}>2. {quizList[currentQuestion].option2}</button>
                <button className={`option-btn ${clickedOption == 3?"checked":null}`} key={3} onClick={()=>setClickedOption(3)}>3. {quizList[currentQuestion].option3}</button>
                <button className={`option-btn ${clickedOption == 4?"checked":null}`} key={4} onClick={()=>setClickedOption(4)}>4. {quizList[currentQuestion].option4}</button>       
            </div>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion}/>
            </>)}
        </div>
        </div>
      ) : (
        <div>Loading...</div> // 데이터가 불러와질 때까지 로딩 메시지를 보여줌
      )}
    </div>
  );
}


export default ItQuiz_01;