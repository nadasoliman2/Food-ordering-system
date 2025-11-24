import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home/home';
import React from 'react';

import Layout from './layout.jsx';
function App() {


  return (
    <>
<React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* عند فتح الموقع مباشرةً سيظهر Home */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
    </>
  )
}

export default App
