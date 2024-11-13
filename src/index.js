import React from 'react';
import './index.css';
import Home from './Components/Pages/Home';
import Adopt from './Components/Pages/adopt';
import Sell from './Components/Pages/sell';
import Login from './Components/Pages/Login'
import Admin from './Components/Pages/Admin'
import Verify from './Components/Pages/Verify'
import Remove from './Components/Pages/Remove'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";




const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home route */}
        <Route path="/adopt" element={<Adopt />} />  {/* Separate adopt route */}
        <Route path="/sell" element={<Sell />} />  {/* Separate sell route */}
        <Route path="/Login" element={< Login/>} />
        <Route path="/Admin" element={< Admin/>} />
        
        <Route path="/Verify" element={< Verify/>} />
        
        <Route path="/Remove" element={< Remove/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
