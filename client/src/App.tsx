// import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css'
import Home from './pages/home'
import Display from './pages/display'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/display/:id" element={<Display/>}/>
      </Routes>
    </Router>
  )
}

export default App
