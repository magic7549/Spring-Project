import { BrowserRouter, Routes, Route } from 'react-router-dom';

//page import 
import Layout from './layouts/Layout';
import Main from "./pages/Main";
import Login from "./pages/Login";
import Logout from './components/Logout';
import SignUp from "./pages/SignUp";
import Temp from './components/Temp';
import PrivateRoute from './components/PrivateRoute';
import Search_Pw from './components/Search_Pw';

//react-responsive
import { useMediaQuery } from 'react-responsive';

//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {
  const isDesktop = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({ query: "(min-width:768px) and (max-width:1023px)" });
  const isMobile = useMediaQuery({ query: "(max-width:767px)" });


  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/temp" element={<Temp />} />
          </Route>
          <Route>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={isDesktop? <Logout /> : null} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search_pw" element={<Search_Pw />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;