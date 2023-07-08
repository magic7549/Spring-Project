import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from "./components/Main";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Temp from './components/Temp';
import PrivateRoute from './components/PrivateRoute';


//Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {
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
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;