import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <Login />  
      <AppLayout />
    </Router>
  );
}

export default App;
