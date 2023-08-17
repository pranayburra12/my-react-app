import React, { useState } from "react";
import "./DashBoard.css";
import SideBar from "./SideBar/SideBar";
import Search from "../../assets/Search.svg";
import NotificationBell from "../../assets/notificationbell.svg";
import UserProfile from "../../assets/UserProfile.svg";
const DashBoard = () => {
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
  return (
    <div className="Dashboard__container">
    </div>
  );
};

export default DashBoard;
