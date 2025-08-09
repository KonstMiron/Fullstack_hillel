import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <BrowserRouter>
      <nav className='menu'>
        <NavLink to="/" end>Головна</NavLink>
        <hr />
        <NavLink to="/about">Про нас</NavLink>
        <hr />
        <NavLink to="/contact">Контакти</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;