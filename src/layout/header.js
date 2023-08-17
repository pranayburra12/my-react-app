import React, { useState } from "react";
import "./header.css";
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
  return (
    <div className="header-component">
         {/* <div className="top-Logo--image-sidebar">
        <img className="logo__sidebar--first" src={Logo} alt="logo" />
        <img className="Logo__Big" src={LogoBig} alt="BigLogo" />
      </div> */}
        <div className="header-left-body">{"hello"}</div>
        <div className="header-right-body"></div>
    </div>
  );
};

export default Header;
