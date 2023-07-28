import React from 'react'
import Login from './components/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './components/Signup'
import { toast, ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>

      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </Router>

    </div>
  )
}

export default App