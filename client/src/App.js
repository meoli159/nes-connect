import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// components
import Navigation from './components/Navigation';

// pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

  return (
    <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
       
       
   
  );
}

export default App;
