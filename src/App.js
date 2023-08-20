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
      var payload={
        "email": "likhith2901@gmail.com",
        "password": "on"
      }
      const raw = JSON.stringify(payload);

      console.log("Request Headers:", myHeaders);

  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch(`https://findemybackedcode.onrender.com/auth/login`, requestOptions)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
        console.log(res)
      })
  
      // if (!response.ok) {
      //   throw new Error(`Request failed with status ${response.status}`);
      // }
  
      // const data = await res.json();
      // console.log("Response data:", data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Router>
      {/* <Login
        onsubmit={onsubmit}
      />
      <SignUp /> */}
      <AppLayout />
    </Router>
  );
}  

export default App;
