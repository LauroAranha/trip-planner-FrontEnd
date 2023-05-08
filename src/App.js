import React from 'react';
import './App.css';
import axios from 'axios';

import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import EditUserProfile from './pages/user/edit-user-profile/editUserProfile';
import Roadmap from './pages/roadmap/roadmap';
import AddRoadmap from './pages/roadmap/add-roadmap/addRoadmap';
import RoadmapDetails from './pages/roadmap/roadmaps-details/roadmap-details';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MapContainer from './components/Map/MapContainer';
import AgencyRegister from './pages/agency/AgencyRegister';
import AgencyLogin from './pages/agency/AgencyLogin';

axios.defaults.baseURL = 'http://localhost:3001/';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login-agency" element={<AgencyLogin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register-agency" element={<AgencyRegister />} />
                    <Route
                        path="/roadmap/add"
                        element={
                            <>
                                <Navbar />
                                <div className="container">
                                    <AddRoadmap />
                                </div>
                            </>
                        }
                    />
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
                        path="/roadmap"
                        element={
                            <>
                                <Navbar />
                                <div className="container">
                                    <Roadmap />
                                </div>
                            </>
                        }
                    />
                    <Route
                        path="/edit"
                        element={
                            <>
                                <Navbar />
                                <EditUserProfile />
                            </>
                        }
                    />
                    <Route
                        path="/roadmap/:roadmapId"
                        element={
                            <>
                                <Navbar />
                                <div className="container">
                                    <RoadmapDetails />
                                </div>
                            </>
                        }
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                    crossOrigin="anonymous"
                />
            </Helmet>
        </div>
    );
};

export default App;
