import React, { useState } from "react";
import "./SideBar.css";
import Logo from "../../../assets/LogoSidebar.svg";
import LogoBig from "../../../assets/LogoFindemy.svg";
import Dmat from "../../../assets/dmatlogo.svg";
import Invest from "../../../assets/InvestmentTraker.svg";
import Sip from "../../../assets/Sip.svg";
import SideRound from "../../../assets/SideBar round.svg";
import Wallet from "../../../assets/wallet.svg";
import Tax from "../../../assets/Tax.svg";
import discord from "../../../assets/discord.svg";
import Logout from "../../../assets/Logout.svg";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleChange= () =>{
    navigate("/cibilscrore")
  }

  const navigettoSip=() =>{
    navigate("/sip-calculater")
  }

  const navigettoInvestmeTracker = () =>{
    navigate("/inverstment-tracker")
  } 

  const navigateDemart=()=>{
    navigate("./dmart")
  }

  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="top-Logo--image-sidebar">
        <img className="logo__sidebar--first" src={Logo} alt="logo" />
        <img className="Logo__Big" src={LogoBig} alt="BigLogo" />
        <ul class="navigation">
        <li>
          <a href="# " className="inner_li" onClick={navigateDemart}>
            <img src={Dmat} alt="dmat" />
            <button className="cibil-score" >{"DMart"}</button>
          </a>
        </li>
        <li>
          <a href="" className="inner_li" onClick={handleChange}>
            <img src={Invest} alt="invest" />
            {/* <h3>CBIL Score</h3> */}
            <button className="cibil-score" >{"CBIL Score"}</button>
          </a>
        </li>
        <li>
          <a href="" className="inner_li" onClick={navigettoSip}>
            <img src={Sip} alt="" />
            <button className="cibil-score" >{"SIP Calculator"}</button>
          </a>
        </li>
        <li>
          <a href="" className="inner_li" onClick={navigettoInvestmeTracker}>
            <img src={SideRound} alt="SideRound" />
            <button className="cibil-score" >{"Investment Tracker"}</button>
          </a>
        </li>
        <li>
          <a href="" className="inner_li" onClick={navigettoInvestmeTracker}>
            <img src={Wallet} alt="wallet" />
            <button className="cibil-score" >{"Expense Management"}</button >
          </a>
        </li>
        <li>
          <a href="" className="inner_li">
            <img src={Tax} alt="Tax" />
            <h3>Tax Calculator</h3>
          </a>
        </li>
      </ul>
      </div>
      
      <div className="sidebar-botton">
        <div className="sidebarr-botton-discord">
          <img src={discord} alt="" />
          <h3>Join The Community</h3>
        </div>
        <hr />
        <div className="sidebarr-botton-logout">
          <img src={Logout} alt="" />
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
