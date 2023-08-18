import React, { useState } from "react";
import "./header.css";
import Search from "../assets/Search.svg"
import NotificationBell from "../assets/notificationbell.svg"
import UserProfile from "../assets/UserProfile.svg"

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

  const data = ["About", "Market", "Personal Finance", "Academy"]

  return (
    <div className="col-md-4">
      <div className="header-component">
        <div className="header-left-body">
          {data.map((item) => {
            return (
              <span className="header-left">{item}</span>
            )
          })}
        </div>
        <div className="header-right-body">
          <div>
          {showInput && (
            <input
              type="text"
              className="Search-box-top-bar "
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              autoFocus />
          )}
          <img src={Search} alt="" onClick={toggleInput} />
          </div>
          <div className="">

          </div>
          <div className="notification-bill">
            <img src={NotificationBell} alt="" />
          <span>Harvey Spectre</span>
            <img src={UserProfile} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
