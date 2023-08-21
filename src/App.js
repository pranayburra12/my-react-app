import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import { api } from './components/utils/constant';
import Registration from './registration/registration';

function App() {

  const tokenData = localStorage.getItem("access_token"); 

  console.log("aaaaaaaaaaaaaaa",tokenData)


  return (
    <Router>
      {
        tokenData ?  <AppLayout /> : <Registration />
      }
    </Router>
  );
}  

export default App;
