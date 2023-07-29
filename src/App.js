import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoutes from './utils/PrivateRoutes';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';



function App() {
  return (
    <Router>
      <ToastContainer />

      <div className='  overflow-hidden'>
        <Routes>

          <Route element={<PrivateRoutes />}>

            <Route element={<Home />} path='/' />


          </Route>
          <Route element={<Login />} path='/login' />
          <Route element={<Signup />} path='/signup' />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
