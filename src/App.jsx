import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EditUser from './pages/EditUser';



const App = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/home" element={<Home />} />

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminDashboard/>}/>

        <Route path="/admin/users/edit/:id" element={<EditUser />}/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;