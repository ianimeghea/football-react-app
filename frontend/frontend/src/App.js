import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Navbar from './NavBar';
import './App.css';
import './NavBar.css';
import Favourites from './Favourites'; 
import "./Favourites.css"
import "./Starting11.css"
import StartingEleven from './Starting11'; 
import Home from './Home';
import NotFound from './NotFound';
import "./Home.css";
import Login from './Login';
import { useState, useEffect } from 'react';



function App() {
  const [user, setUser] = useState(null);
  
  return (
    <>
    <BrowserRouter>
        <Navbar user = {user} setUser = {setUser}/>
        <Routes>
          <Route path="/" element={
            
            <Home user={user}/>
            
            
            } />
          <Route path="/favourites" element={
            
            <Favourites />
        
            
            } />
        
          <Route path="/startingeleven" element={
            
            <StartingEleven />
            
            
            } />

          <Route path="/login" element={
          
          <Login setUser = {setUser} />
          
          
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
