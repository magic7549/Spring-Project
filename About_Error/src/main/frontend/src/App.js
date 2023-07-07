import {Container} from "react-bootstrap";
import Layout from './layouts/Layout';

//Bootstrap import
//Card
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {
    return (
        <Layout>
            <Container style={{minHeight:"75vh", paddingTop: 50}}>
            <Card style={{margin:50}}>
                  <Card.Header as="h5">주목해야 할 IT 트렌드</Card.Header>
                  <Card.Body>
                    <Card.Title>IT 트렌드</Card.Title>
                    <Card.Text>
                      엔터프라이즈 소프트웨어 및 서비스는 새로운 기능을 추가하며 진화하고 있다.<br/>
                      엔터프라이즈 업계에서 최근 성장하는 기술 및 트랜드를 알아보자.
                    </Card.Text>
                    <Button variant="primary">Click</Button>
                  </Card.Body>
                </Card>

            </Container>
        </Layout>
    );
}

export default App;