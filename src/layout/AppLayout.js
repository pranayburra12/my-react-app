import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import "./AppLayout.css"
import Home from '../screens/home';
import SideNav from '../screens/sidenav';
import DashBoard from '../components/DashBoard/DashBoard';
import CibilScore from '../components/CibilScore/CibilScore';
import SideBar from '../components/DashBoard/SideBar/SideBar';
import Dmart from '../components/demart/Dmart';
import ExpenceMangement from '../components/expence-managemnet/ExpenceMangement';
import InverstmentTracker from '../components/investment-tracker/InverstmentTracker';
import Sipcalculater from '../components/sip-calculater/SipCalcuater';
import Header from './header';

function AppLayout() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate('/dmart');
  // }, [navigate]);

  return (
    <div className='w-screen'>
      <div className='layout md:flex flex-col'>
     <SideBar />
      <div className='app-body pt-20 pb-24 md:pt-24'>
      
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sidenav" element={<SideNav />} />
        <Route path="/cibilscore" element={<CibilScore />} />
        <Route path="/demat" element={<Dmart />} />
        <Route path="/expence-mangement" element={<ExpenceMangement />} />
        <Route path="/inverstment-tracker" element={<InverstmentTracker />} />
        <Route path="/sip-calculator" element={<Sipcalculater />} />
      </Routes>
      </div>
    </div>
    </div>
  );
}

export default AppLayout;
