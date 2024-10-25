import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './Mainpage';
import App from './App';
import Login from "./Login"

const RoutesApp = () => {
  return (
    
      <div>
        
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/tasks" element={<App/>} />
          <Route path="/login" element={<Login/>} />
          
        </Routes>
      </div>
    
  );
};

export default RoutesApp;
