import React from 'react';
import './App.css';

// Config react-router on application
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

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
import Delete from './pages/delete/delete';
import Edit from './pages/edit/edit';
// Importing components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Navbar />} exact={true} />
            <Route path="/delete" element={<Navbar />} exact={true} />
            <Route path="/edit" element={<Navbar />} exact={true} />
            <Route path="/home" element={<Home />} />
            <Route path="/delete" element={<Delete />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
