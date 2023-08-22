import React, { useState, useEffect } from "react";
import Logo from "../../assets/LogoFindemy.svg";
import SignUpArrow from "../../assets/SignUpArrow.svg";
import "./SignUp.css";
import OTPSection from "./OtpSection";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

  const navigate = useNavigate();

  const [formSubmit, setFormSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [data,setData]=useState()

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    phoneNumber: false,
  });

  useEffect(() => {
    const errors = {};

    // Check if email is valid
    if (!email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Check if password is valid
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    // Check if confirm password matches
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Check if phone number is valid (contains only numbers)
    if (!/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number should contain only numbers.";
    }

    // Update the formErrors state
    setFormErrors(errors);
  }, [email, password, confirmPassword, phoneNumber]);

  const handleFormSubmit = () => {
    const errors = {};

    // Check if email is valid
    if (!email) {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Check if password is valid
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    // Check if confirm password matches
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Check if phone number is valid (contains only numbers)
    if (!/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number should contain only numbers.";
    }

    // Update the formErrors state
    setFormErrors(errors);

    // If there are no errors, proceed to OTP section
    if (Object.keys(errors).length === 0) {
      setFormSubmit(true);
    }

    const payload ={
      email:email,
      fullName:"Pranay Burra",
      password:password,
      confirmPassword:confirmPassword,
      phoneNumber:phoneNumber
  }

  setIsSubmitting(true)
  onSubmit(payload)

  };

  const onSubmit = (values) =>{
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
  
      fetch(`https://findemybackedcode.onrender.com/auth/register`, requestOptions)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
        console.log(res)
        if(res?.data?.id){
          let payload={
            email:res.data.email,
            id:res.data.id
          }
          sendOtp(payload)
        }else{
          console.log("aaaaaaaa")
        }
        setData(res)
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

  const sendOtp = (values) =>{
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

      let api=`https://findemybackedcode.onrender.com/auth/sendOtp`
  
      fetch(api, requestOptions)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
        console.log(res)
        setIsSubmitting(false)
      })
    } catch (error) {
      console.log("Error:", error);
      setIsSubmitting(false)
    }
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputBlur = (field) => {
    setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
  };

  return (
    <div className="SignUp__container">
      <img className="logo-img-top" src={Logo} alt="logo" />

      <div className="SignUp__second__section">
        <h1>Sign up!</h1>
        <h5>See your growth and get consulting support!</h5>

        <hr />
        {formSubmit ? (
          <OTPSection 
            email={email}
            data={data}
          />
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              className="signup-input-cred signup-text-cred"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleInputBlur("email")}
            />
            {touched.email && formErrors.email && (
              <p className="error-message">{formErrors.email}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              className="signup-input-cred"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleInputBlur("password")}
            />
            {touched.password && formErrors.password && (
              <p className="error-message">{formErrors.password}</p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              className="signup-input-cred"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleInputBlur("confirmPassword")}
            />
            {touched.confirmPassword && formErrors.confirmPassword && (
              <p className="error-message">{formErrors.confirmPassword}</p>
            )}

            <input
              type="tel"
              placeholder="Phone Number"
              className="signup-input-cred signup-pass-cred"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onBlur={() => handleInputBlur("phoneNumber")}
            />
            {touched.phoneNumber && formErrors.phoneNumber && (
              <p className="error-message">{formErrors.phoneNumber}</p>
            )}

            <img
              className={isSubmitting ? "enabled" : "desabled"}
              src={SignUpArrow}
              alt="Signup-arrow"
              onClick={handleFormSubmit}
            />
          </>
        )}
        

        <a className="create__an_account" href="/">
          Back to Login
        </a>
        <footer className="SignUp__footer">
          ©2023 Stock Pitch. All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
