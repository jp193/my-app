import React from 'react';
import Main from './Components/Main';
import NavBar from './Components/NavBar';
// import './Components/style.css'
// import './Components/NavBar.module.css'
// import './Components/Main.module.css'
// import Pricing from './Components/Pricing'
import Random from './Components/Random'
import Memory from './Components/Memory'
import Home from './Components/Home'
import Pick from './Components/Pick'
import { Route, Routes } from "react-router-dom"


function App() {
  return (
    <>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pokedex' element={<Main/>} />
          <Route path='/pick' element={<Pick />} />
          <Route path='/quick' element={<Random />} />
          <Route path='/memory' element={<Memory />} />
        </Routes>
      </div>
      
    </>
  );
}

export default App;
