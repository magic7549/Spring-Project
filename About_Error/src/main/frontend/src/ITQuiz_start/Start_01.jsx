import React from 'react';
import { useParams } from "react-router-dom";

function Start_01() {
  const { num } = useParams();
  return (
    <div>{num}</div>
  );
}


export default Start_01;