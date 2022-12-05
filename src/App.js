import React from 'react';
import Main from './pages/Main';
import Stats from './pages/Stats';
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/stats' element={<Stats />} />
    </Routes>
  );
}
