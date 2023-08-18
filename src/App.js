import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import { api } from './components/utils/constant';

function App() {

  const onsubmit = async (values) => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({
        "email": "likhith1234@gmail.com",
        "password": "Test@12345"
      });

      console.log("Request Headers:", myHeaders);

  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      const response = await fetch(`https://findemybackedcode.onrender.com/auth/login`, requestOptions);
  
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Response data:", data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Router>
      {/* <Login
        onsubmit={onsubmit}
      /> */}
      {/* <SignUp /> */}
      <AppLayout />
    </Router>
  );
}

export default App;
