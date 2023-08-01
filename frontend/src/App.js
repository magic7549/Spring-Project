import React, {Suspense} from 'react';

import { BrowserRouter, Routes, Route} from 'react-router-dom';

//page import 
import Layout from './layouts/Layout';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Logout from './components/Logout';
import SignUp from "./pages/SignUp";
import Temp from './components/Temp';
import PrivateRoute from './components/PrivateRoute';
import Search_Pw from './components/Search_Pw';
import ItQuiz from './pages/ItQuiz';
import Error from './pages/Error';
import Post from './pages/Post/Post';
import PostEditor from './pages/Post/PostEditor';
import ItQuiz_01 from './ITQuiz_learn/ItQuiz_01';
import Start_01 from './ITQuiz_start/Start_01';

//react-responsive
import { useMediaQuery } from 'react-responsive';

//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {
  const isDesktop = useMediaQuery({ query: "(min-width:1024px)" });
  // const isTablet = useMediaQuery({ query: "(min-width:768px) and (max-width:1023px)" });
  // const isMobile = useMediaQuery({ query: "(max-width:767px)" });


  return (
<Layout>
      <BrowserRouter>
        <Suspense fallback={<div>Loading..</div>}> 
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/temp" element={<Temp />} />
            </Route>
            <Route>
              <Route path="/" element={<Main />} />
              <Route path='/ItQuiz'>
                <Route index element={<ItQuiz />} />
                <Route path=":num" element={<ItQuiz_01 />} />
                <Route path=":num" element={<Start_01 />} />
              </Route>
              <Route path="/error" element={<Error />} />
              <Route path='/post'>
                <Route index element={<Post />} />
                <Route path=':add' element={<PostEditor />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={isDesktop? <Logout /> : null} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/search_pw" element={<Search_Pw />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Layout>
  );
}

export default App;