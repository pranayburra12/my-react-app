import React, { useState } from "react";
import "./header.css";
import Search from "../assets/Search.svg"
import NotificationBell from "../assets/notificationbell.svg"
import UserProfile from "../assets/UserProfile.svg"
import homeIcon from '../assets/home-icon.svg'
import marketIcon from '../assets/market-icon.svg'
import personalFinance from '../assets/personal-finance.svg';
import academy from '../assets/Academy-icon.svg';
import profileIcon from '../assets/profile-icon.svg'
const Header = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleInput = () => {
    setShowInput(!showInput);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    setShowInput(false);
    // Do something with the inputValue, e.g. submit it or update your state
  };

  const data = [
    {
      label: "About",
      navigation: '/about',
      icon: homeIcon,
    },

    {
      label: "Market",
      navigation: '/market',
      icon: marketIcon,
    },
    {
      label: "Personal Finance",
      navigation: '/personal-finance',
      icon: personalFinance,
    }, {
      label: "Academy",
      navigation: '/academy',
      icon: academy,
    }]

  return (
    <><>
      <div className="items-center p-0 md:pl-32 fixed bottom-0 h-24 w-full flex justify-around bg-[rgb(20,20,20)] items-start border-t-2 border-white gap-4 p-4 md:top-0 z-10 md:border-none md:justify-around md:gap-10">
        <div className="flex md:justify-start justify-between grow md:gap-10 ">
          {data?.map((each) => {
            return <div className="flex flex-col items-center justify-around w-10 md:w-max"><img src={each.icon} className="md:hidden" /><span className="text-[#e5e7eb] text-center text-sm	md:text-lg">{each.label}</span></div>;
          })}
        </div>
        <div className="flex flex-col items-center justify-around w-10 md:w-max hidden md:block">
          <img src={profileIcon} className="md:hidden" />
          <div className="header-right-body">
          <div className="notification-bill">
            {showInput && (
              <input
                type="text"
                className=" "
                style={{color: "black"}}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoFocus />
            )}
            <img src={Search} alt="" onClick={toggleInput} />
            <img src={NotificationBell} alt="" />
            <span>Harvey Spectre</span>
            <img src={UserProfile} alt="" />
          </div>
        </div>
        </div>

      </div>
    </>
      {/* <div className="header-component">

        {data.map((item) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '5rem' }}><img src={item.icon} width='30px' className="bottom-icons" /><span className="header-left">{item.label}</span></div>
          );
        })}

        <div className="header-right-body">
          <div className="notification-bill">
            {showInput && (
              <input
                type="text"
                className=" "
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoFocus />
            )}
            <img src={Search} alt="" onClick={toggleInput} />
            <img src={NotificationBell} alt="" />
            <span>Harvey Spectre</span>
            <img src={UserProfile} alt="" />
          </div>
        </div>
      </div> */}
    </>

  );
};

export default Header;
