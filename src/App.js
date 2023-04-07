import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Delete from './pages/delete/delete';
import Edit from './pages/edit/edit';
import Roteiro from './pages/roteiro/roteiro';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MapContainer from './components/Map/MapContainer';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/roteiro" element={<Roteiro />} />
            <Route
              path="/home"
              element={
                <>
                  <Navbar />
                  <div className="container">
                    <Home />
                    <MapContainer />
                  </div>
                </>
              }
            />
            <Route
              path="/delete"
              element={
                <>
                  <Navbar />
                  <Delete />
                </>
              }
            />
            <Route
              path="/edit"
              element={
                <>
                  <Navbar />
                  <Edit />
                </>
              }
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
