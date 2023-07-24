import React from 'react';
import { useParams } from "react-router-dom";

function ItQuiz_01() {
  const { num } = useParams();
  return (
    <div>{num}</div>
  );
}


export default ItQuiz_01;