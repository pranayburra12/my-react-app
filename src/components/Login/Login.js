import React, { useState } from "react";
import "./Login.css";
import Logo from "../../assets/LogoFindemy.svg";
import GoogleLogo from "../../assets/Google.svg";
import FacebookLogo from "../../assets/Facebook.svg";
import LinkedinLogo from "../../assets/Linkedin.svg";
import Linehori from "../../assets/linehorizontal.svg";

import Lottie from "react-lottie";
import ButtonLottieAnimation from "../../utils/Button.json";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = (props) => {

  const navigate = useNavigate();

  const [isHovered, setIsHovered] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [emailValid, setEmailValid] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [passwordValid, setPasswordValid] = React.useState(true);

  const [desabled,setDesabled] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const lottieOptions = {
    animationData: ButtonLottieAnimation,
    loop: true,
    autoplay: false,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleLogin = () => {
    if (!validateEmail(email) && !validatePassword(password) )  {
      setEmailValid(false);
      setPasswordValid(false);
    } 
     else {
        let payload = {
          email: email,
          password: password,
        };
    
      setIsSubmitting(true)
      onsubmit(payload);
    }
  };

  const onsubmit = async (values) => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json");
      var payload={
        "email": values.email,
        "password": values.password
      }
      const raw = JSON.stringify(payload);

      console.log("Request Headers:", myHeaders);

  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch(`https://findemybackedcode.onrender.com/auth/login`, requestOptions)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
       if(res.status === 200){
        toast.success("Login successful!");
        setDesabled(res);
        localStorage.setItem("access_token", JSON.stringify(res.data.accessToken));
        localStorage.setItem("refresh_token", JSON.stringify(res.data.accessToken));
        window.instance=res.data
        setIsSubmitting(false);
        navigate("/sip-calculator")
        window.location.reload()
        console.log(res)
       }else{
        setIsSubmitting(false);
       }
      })

    } catch (error) {
      console.log("Error:", error);
      setIsSubmitting(false)
      toast.error("Login failed. Please check your credentials.");
    }
  };
  
  

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const letterRegex = /[a-zA-Z]/;
    return letterRegex.test(password);
  };
  

  return (
    <div className="Login__container">
      {/* <div className="Login_first_section"> */}
      <img className="logo-img-top" src={Logo} alt="" />
      {/* </div> */}
      <div className="Login__second__section">
        <h1>Login</h1>
        <h5>See your growth and get consulting support!</h5>
        <h5>Sign Up With </h5>
        <div className="login__option__logo">
          <a href="https://www.google.com/" target="_blank">
            <img src={GoogleLogo} alt="googleLogo" />
          </a>
          <img src={Linehori} alt="line" />
          <a href="https://facebook.com" target="_blank">
            <img src={FacebookLogo} alt="facebookLogo" />
          </a>
          <img src={Linehori} alt="line" />
          <a href="https://linkedin.com" target="_blank">
            <img src={LinkedinLogo} alt="LinkedinLogo" />
          </a>
        </div>
        <hr />
        <input
          type="email"
          placeholder="Email"
          className={`input-cred text-cred ${!emailValid ? "invalid" : ""}`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailValid(true); // Reset validation when input changes
          }}
        />
        {!emailValid && <p className="error-message">Please enter a valid email address.</p>}
        <input
          type="password"
          placeholder="Password"
          className={`input-cred pass-cred ${!passwordValid ? "invalid" : ""}`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordValid(true); // Reset validation when input changes
          }}
        />
        {!passwordValid && <p className="error-message">Password must contain at least one letter.</p>}

        <div className="input__checkand__forgetpass">
          <input type="checkbox" name="Remember Me" id="Remember-Me" />
          <label htmlFor="Remember-Me"></label>
          <h4>Remember Me</h4>
          <a href="#">Forget Password ?</a>
        </div>
        <div className="Button__login">
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleLogin}
            disabled={emailValid && passwordValid ? false : true}
          >
            <div style={{ width: 315, height: 45 }}>
              <Lottie
                options={lottieOptions}
                isPaused={!isHovered}
                isStopped={!isHovered}
              />
            </div>
            <h3>Login</h3>
          </button>
        </div>
        <hr />
        <a className="create__an_account" href="" onClick={()=>{ navigate("/sign-up") }}>
          Create An Account
        </a>
        <footer className="Login__footer">
          ©2023 Stock Pitch. All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default Login;
