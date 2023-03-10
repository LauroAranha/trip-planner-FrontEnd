import React from 'react';
import './App.css';

// Config react-router on application
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing authenticators

/** 
import { initializeApp } from 'firebase/config';
import 'firebase/auth';
import * as firebaseui from "firebaseui";
*/

// Importing pages
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';

// Importing components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
