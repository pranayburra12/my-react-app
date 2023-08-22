import React, { useState, useRef } from "react";
import SignUpArrow from "../../assets/SignUpArrow.svg";
import "./OtpSection.css";
import { useNavigate } from "react-router-dom";

const OTPSection = (props) => {

  const navigate = useNavigate();


  const [otp, setOTP] = useState(["", "", "", "", "" , ""]); // Array to store OTP digits
  const otpInputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null) ,useRef(null)]; // Refs for input fields

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

  const handleFormSubmit = () => {

    const payload ={
      email:props.email,
      otp:otp.join("")
  }

  onSubmit(payload,"verifyOtp")

  };

  const ResendOtp = () =>{
    const payload ={
      email:props.email,
      otp:props.data.id
  }

  onSubmit(payload,"sendOtp")

  }

  const onSubmit = (values,string) =>{
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify(values);

      console.log("Request Headers:", myHeaders);

  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      let api=`https://findemybackedcode.onrender.com/auth/${string}`
  
      fetch(api, requestOptions)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
        console.log(res)
        if(res){
          navigate("/")
        }
      })
  
      // if (!response.ok) {
      //   throw new Error(`Request failed with status ${response.status}`);
      // }
  
      // const data = await res.json();
      // console.log("Response data:", data);
    } catch (error) {
      console.log("Error:", error);
    }

  }

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
        onClick={handleFormSubmit}
      />
      <button style={{top:"541px",position:"absolute",fontSize:"15px",color:"#bfbfbf",fontFamily:"Manrope"}} 
      onClick={ResendOtp}
      >
        Resend Otp
      </button>
    </div>
  );
};

export default OTPSection;
