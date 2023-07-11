import { useState, useEffect } from 'react';

import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";

import '../css/main.css'


function Main() {

  //scroll effect 
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());

  //typing effect01
  const txt = 'Hi, Welcome to the ITe.';
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setText(currentText => currentText + txt[count]);
      setCount(currentCount => currentCount + 1);
    }, 100);
  
    if (count === txt.length) {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  });


  return (
  <div className="bg-color">
  <ScrollContainer>
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
      <span style={{ fontSize: "70px", color:'white' }}>{text}</span>
    </Animator>
  </ScrollPage>

  <ScrollPage>
    <Animator animation={ZoomInScrollOut}>
      <span style={{ fontSize: "70px" }}>I'm ITe's Unique Learning Approach Revealed!</span>
    </Animator>
  </ScrollPage>

  <ScrollPage>
    <Animator animation={FadeUp}>
      <span style={{ fontSize: "60px", color:'white'}}>I'm As someone who wants to stay informed about IT trends, join ITe right away!</span>
    </Animator>
  </ScrollPage>

  <ScrollPage>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} >
      <span style={{ fontSize: "40px" }}>
        <Animator animation={MoveIn(-1000, 0)}>-ITe Quiz- </Animator>
        <Animator animation={MoveIn(1000, 0)}>IT Trends, IT Technical Terms </Animator>
        <br/>
        <Animator animation={MoveIn(-1000, 0)}>-Resolving Error Codes-</Animator>
        <Animator animation={MoveIn(1000, 0)}>with Colleagues</Animator>
        <br/>
        <Animator animation={MoveIn(-1000, 0)}>-Communication-</Animator>
        <Animator animation={MoveIn(1000, 0)}>Share tips with colleagues</Animator>
        <br/>
        <Animator animation={MoveOut(1000, 0)}>I'm waiting for you guys!💛</Animator>
        <Animator animation={MoveOut(-1000, 0)}>Be with your colleagues!💛</Animator>
      </span>
    </div>
  </ScrollPage>

  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky())}>
      <span style={{ fontSize: "35px" }}>ITe.</span>
      <br/>
      <span style={{ fontSize: "20px" }}>
      Learning through IT terminology quizzes, staying updated with the latest trends, and collaborating on error code resolutions can greatly enhance our IT knowledge and skills. It will be instrumental in improving our expertise and fostering personal growth. Embrace the opportunity to learn more and expand your horizons!
      </span>
    </Animator>
  </ScrollPage>
</ScrollContainer>


</div>
  );
}

export default Main;