import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Login from './components/Login/Login';
import SignUp from './components/Signup/SignUp';
import { api } from './components/utils/constant';
import Registration from './registration/registration';

function App() {


  return (
    <Router>
      {/* <Registration /> */}
      <AppLayout />
    </Router>
  );
}  

export default App;
