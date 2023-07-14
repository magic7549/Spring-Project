import { useState, useEffect } from 'react';

//scroll effect
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";

//bootstrap import 
import {Button, Card} from 'react-bootstrap';
//css import
import '../css/main.css'


function Main() {

  //scroll effect 
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());

  //typing effect
  const txt = 'Hi, Welcome to the ITe.';
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  //typing
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
  <body>
  <div className="bg-color">
  <ScrollContainer>

  {/* page_text01 */}
  <ScrollPage>
    <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
      <span style={{ fontSize: "70px", color:'white' }}>{text}</span>
    </Animator>
  </ScrollPage>

  {/* page_text02 */}
  <ScrollPage>
    <Animator animation={ZoomInScrollOut}>
      <span style={{ fontSize: "70px" }}>I'm ITe's Unique Learning Approach Revealed!</span>
    </Animator>
  </ScrollPage>

  {/* page_text03 */}
  <ScrollPage>
    <Animator animation={FadeUp}>
      <span style={{ fontSize: "60px", color:'white'}}>I'm As someone who wants to stay informed about IT trends, join ITe right away!</span>
    </Animator>
  </ScrollPage>

  {/* page_text04 */}
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

  {/* page_text05 */}
  <ScrollPage>
    <Animator className='page_txt05' animation={batch(Fade(), Sticky())}>
      <div style={{paddingBottom:'50px'}}>
        <span style={{ fontSize: "35px" }}>ITe.</span>
        <br/>
        <span style={{ fontSize: "20px" }}>
        Learning through IT terminology quizzes, staying updated with the latest trends, 
        <br/>
        and collaborating on error code resolutions can greatly enhance our IT knowledge and skills.
        <br/>
        It will be instrumental in improving our expertise and fostering personal growth.
        <br/> 
        Embrace the opportunity to learn more and expand your horizons!
        </span>
      </div>

      {/* Card */}
      <div style={{display:'flex', justifyContent:'center'}}>
      <div className='card_gap'>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      </Card >
      </div>
      <div className='card_gap'>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      </Card>
      </div>
      <div className='card_gap'>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      </Card>
      </div>
      </div>

    </Animator>
  </ScrollPage>
</ScrollContainer>

</div>
</body>
  );
}

export default Main;