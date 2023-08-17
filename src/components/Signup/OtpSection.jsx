import React, { useState, useRef } from "react";
import SignUpArrow from "../../assets/SignUpArrow.svg";
import "./OtpSection.css";

const OTPSection = () => {
  const [otp, setOTP] = useState(["", "", "", ""]); // Array to store OTP digits
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]; // Refs for input fields

  const handleOTPChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numeric input
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Automatically focus on the next input field
    if (index < otp.length - 1 && value !== "") {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);
      otpInputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="otp-main">
      <h2> OTP</h2>
      <div className="otp-container">
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <input
              ref={otpInputRefs[index]}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
            />
            {/* {index < otp.length - 1 && <div className="horizontal-line"></div>} */}
          </React.Fragment>
        ))}
      </div>

      <img
        src={SignUpArrow}
        alt="Signup-arrow"
        onClick={() => console.log("Submitting OTP:", otp.join(""))}
      />
    </div>
  );
};

export default OTPSection;
