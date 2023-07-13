import React from 'react'
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Cart from './components/Cart';
import Logout from './components/Logout';

const App = () => {
  return (
    <>
    <Navbar>
    <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
    </Routes>
    </Navbar>
  </>
  )
}

export default App
