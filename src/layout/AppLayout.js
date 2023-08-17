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
    <div style={{display:'flex'}}>
      <div className='applayout'>
        <SideBar />
        <DashBoard />
        {/* <Header /> */}
      </div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sidenav" element={<SideNav />} />
        <Route path="/cibilscrore" element={<CibilScore />} />
        <Route path="/dmart" element={<Dmart />} />
        <Route path="/expence-mangement" element={<ExpenceMangement />} />
        <Route path="/inverstment-tracker" element={<InverstmentTracker />} />
        <Route path="/sip-calculater" element={<Sipcalculater />} />
      </Routes>
    </div>
  );
}

export default AppLayout;
