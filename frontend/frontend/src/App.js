import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Navbar from './NavBar';
import './App.css';
import './NavBar.css';
import Favourites from './pages/Favourites'; 
import "./Favourites.css"
import "./Starting11.css"
import StartingEleven from './pages/Starting11'; 
import Home from './Home';
import NotFound from './pages/NotFound';



function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={
            
            <Home />
            
            
            } />
          <Route path="/favourites" element={
            
            <Favourites />
        
            
            } />
        
          <Route path="/startingeleven" element={
            
            <StartingEleven />
            
            
            } />

          <Route path = "*" element={
              
              <NotFound />
              
              
              } />
        </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
