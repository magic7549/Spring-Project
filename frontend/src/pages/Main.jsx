import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//scroll effect
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";

//bootstrap import 
import {Button, Card, Container, Row, Col, Stack} from 'react-bootstrap';

//css 
import '../css/main.css'



function Main() {

  //페이지 이동
  const movePage = useNavigate();

  function ItQuizPage(){
    movePage('/ItQuiz');
  }

  function ErrorPage(){
    movePage('/error')
  }

  function PostPage(){
    movePage('/post')
  }

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
    <Animator animation={FadeUp}>
      <span style={{ fontSize: "60px", color:'white'}}>I'm As someone who wants to stay informed about IT trends, join ITe right away!</span>
    </Animator>
  </ScrollPage>

    {/* page_text03 */}
    <ScrollPage>
    <Animator animation={ZoomInScrollOut}>
      <span style={{ fontSize: "70px", color:'white' }}>I'm ITe's Unique Learning Approach Revealed!</span>
    </Animator>
  </ScrollPage>

  {/* page_text04 */}
  <ScrollPage>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color:'white' }} >
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
      <div style={{paddingBottom:'50px', color:'white'}}>
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
        <Row>
          <Col sm={4}>
            <Card Card style={{ width: '100%', height: '305px'}}>
              <Card.Img variant="top" src="https://media2.giphy.com/media/cM1YT07nEkoU7nt6PJ/giphy.gif?cid=ecf05e47glyjb8t91uqhwabs1pcisu65ujby9c9bf30e3f6d&ep=v1_gifs_search&rid=giphy.gif&ct=g"/>
              <Card.Body>
              <Card.Title>ItQuiz</Card.Title>
              <Card.Text>
              You can gain a wide range of knowledge by solving IT quizzes!
              </Card.Text>
              <Button className='main-btn' onClick={ItQuizPage}>Click</Button>
              </Card.Body>
            </Card >
          </Col>

          <Col sm={4}>
            <Card style={{  width: '100%', height: '305px' }}>
              <Card.Img variant="top" src="https://media0.giphy.com/media/RbDKaczqWovIugyJmW/giphy.gif?cid=ecf05e47riid8vp16xp83zddua3o6x7j6sw5vqu2k9bxz1u6&ep=v1_gifs_related&rid=giphy.gif&ct=g" />
              <Card.Body>
              <Card.Title>Error</Card.Title>
              <Card.Text>
              If you encounter an error, solve it with your colleagues!
              </Card.Text>
              <Button className='btn' onClick={ErrorPage}>Click</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={4}>
            <Card style={{  width: '100%', height: '305px' }}>
              <Card.Img variant="top" src="https://media3.giphy.com/media/xTiTnxpQ3ghPiB2Hp6/giphy.gif?cid=ecf05e4707mlgehm3zopz2fz6w68uv5hdzhoc9uryaupq47s&ep=v1_gifs_search&rid=giphy.gif&ct=g"/>
              <Card.Body>
              <Card.Title>Post</Card.Title>
              <Card.Text>
              Communicate with colleagues, share good information!
              </Card.Text>
              <Button className='btn' onClick={PostPage}>Click</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

    </Animator>
  </ScrollPage>
</ScrollContainer>
</div>
  );
}

export default Main;