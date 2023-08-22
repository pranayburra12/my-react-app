import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import SignUp from '../components/Signup/SignUp';

function Registration() {
  const navigate = useNavigate();


  return (
    <div className='w-screen'>
      <div className='layout md:flex flex-col'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      </div>
    </div>
  );
}

export default Registration;
