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
import { NavLink } from "react-router-dom/dist";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };


  const navigateDemart=()=>{
    navigate("./dmart")
  }
  const sidebarmenu=[{
    label:'Demat',
    logo:Dmat,
    navigate:'./demat'
  },
{
  label:'Cibil score',
  logo:Invest,
  navigate:'./cibilscore'
},
{label:'SIP calculator',
logo:Sip,
navigate:'./sip-calculator'
},
{
  label:'Investment Tracker',
  logo:SideRound,
  navigate:'./investment-tracker'
},
{
  label:'Expense Management',
  logo:Wallet,
  navigate:'./expence-management'
}
,{
  label:'Tax Calculator',
  logo:Tax,
  navigate:'./tax-calculator'
}
];
   const [state, setState] = useState(false);
 const toggleDrawer = (anchor, open, event) => {
  if (
    event &&
    event.type === "keydown" &&
    (event.key === "Tab" || event.key === "Shift")
  ) {
    return;
  }

  setState(!state);
};


  return (
    <div >
       <div className="flex flex-row-reverse justify-around h-20 gap-10 w-full fixed bg-[rgb(23,23,23)] md:hidden"> <IconButton
        edge="end"
        aria-label="menu"
        onClick={(event) => toggleDrawer("right", true, event)}
        sx={{
          color: `white`,
          display: { xs: `inline`, md: `inline`, lg: `none` },
          width: "10%",
          textAlign: "end",
        }}
      >
   
        <Menu fontSize="large" />
      
      </IconButton>
      <Drawer
        anchor="left"
        open={state}
        onClose={(event) => toggleDrawer("right", false, event)}
        sx={{
          ".MuiDrawer-paper": {
            bgcolor: "black",
          },
        }}
        color="primary.dark"
        
      >
        <div className="m-2 flex flex-col gap-3"><img src={LogoBig} width='200px'/>
          {sidebarmenu?.map((each)=>{
          return <div className="flex items-center gap-4 p-2 mt-2 cursor-pointer opacity-50 hover:opacity-100" onClick={(event)=>{navigate(each.navigate)
          toggleDrawer("right", false, event)}}><img src={each.logo} width='40px'/><div className={`text-left w-full text-slate-100`}>{each.label}</div></div>
        })}
        </div>
      </Drawer>
    
        <img src={LogoBig} width='200px'/>
      </div>
       {/* <div className=""><img src={LogoBig} width='200px' className="" onClick={toggleSidebar}/></div> */}
      <div className={`sidebar ${isOpen ? "open" : ""} md:block md:w-100 fixed`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center w-20"><img src={Logo} width='50px'/></div>

         {sidebarmenu?.map((each)=>{
          return <div className="flex items-center gap-2 p-2 mt-2 cursor-pointer opacity-50 hover:opacity-100" onClick={()=>navigate(each.navigate)}><img src={each.logo} width='40px'/><div className={`text-center w-full text-slate-100 ${isOpen ? "" : "hidden"} md:text-left`}>{each.label}</div></div>
        })}
      </div>
    {/* <div
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
            <button className="cibil-score" >{"Demat"}</button>
          </a>
        </li>
        <li>
          <a href="" className="inner_li" onClick={handleChange}>
            <img src={Invest} alt="invest" />
          
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
          <img src={Logout} alt="" width="50px"/>
          <h3>Logout</h3>
        </div>
      </div>
    </div> */}
    {/* <hr className="hr-line-dashbord" /> */}
    </div>
  );
};

export default SideBar;
