import React, { useState } from "react";
import "./ForgetPassword.css";
import Logo from "../assets/LogoFindemy.svg";
// import GoogleLogo from "../../assets/Google.svg";
// import FacebookLogo from "../../assets/Facebook.svg";
// import LinkedinLogo from "../../assets/Linkedin.svg";
// import Linehori from "../../assets/linehorizontal.svg";

import Lottie from "react-lottie";
import ButtonLottieAnimation from "../utils/Button.json";
import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
 
  Autocomplete, Button,Backdrop,CircularProgress
 
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import {  IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ForgetPassword = (props) => {


  const baseUrl='http://3.237.3.113:3000' 

  const [open, setOpen] = React.useState(false);
  const [meassage,setMessage] = useState("")
  const navigate = useNavigate();
  const [loader,setLoader]=useState(false);
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
    // const  validemail= validateEmail(email)
    // if (!validemail && !validatePassword(password) )  {
    //   setEmailValid(false);
    //   setPasswordValid(false);
    // } 
    //  else {
        let payload = {
          email: email,
          password: password,
        };
    
      // setIsSubmitting(true)
      onsubmit(payload);
    // }
  };

  const onsubmit = async (values) => {
    setLoader(true)
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
  
      fetch(`${baseUrl}/auth/login`, requestOptions)
      .then((res)=>{
        return res.json();
      })
      .then((res)=>{
       if(res.status === 200){
        
        toast.success("Login successful!");
        setDesabled(res);
        localStorage.setItem("access_token", JSON.stringify(res.data.accessToken));
        localStorage.setItem("refresh_token", res.data.refreshToken);
        window.instance=res.data
        setIsSubmitting(false);
        navigate("/sip-calculator")
        window.location.reload()
        console.log(res)
       }else{
        setOpen(true);
        setMessage(res.message)
        setIsSubmitting(false);
       }
       setLoader(false)
      })

    } catch (error) {
      console.log("Error:", error);
      setIsSubmitting(false)
      toast.error("Login failed. Please check your credentials.");
    }
  };


  const validatePassword = (password) => {
    const letterRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/;
    return letterRegex.test(password);
  };


  const validateEmail =(value) =>{
    // setEmail(e.target.value);
    if(!value) {
     return  ("email is required")
    }
    else  if(!new RegExp(/^[^\s@]+@[^\s@]+(\.[^ !."`'#%&,:;<>=@{}~\$\(\)\*\+_\/\\\?\[\]\^\|]{2,4})$/).test(value)) {
     return  ("enter a valid email")
    }
    else {
     return  (undefined)
    };
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )
  

  return (
    <div className="Login__container h-full">
      {loader&& <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
      {/* <div className="Login_first_section"> */}
      <img className="logo-img-top" src={Logo} alt="" />
      {/* </div> */}
      <div className="Login__second__section">
        <h1>Forgot Password</h1>
       
        
       
        <hr />
        <input
          type="email"
          placeholder="New Password"
          className={`input-cred text-cred ${!emailValid ? "invalid" : ""}`}
          value={email}
        //   onChange={(e) => {
        //     const value = e.target.value;
        //     setEmail(value);
        //     if(!value) {
        //       setEmailValid("email is required")
        //      }
        //      else  if(!new RegExp(/^[^\s@]+@[^\s@]+(\.[^ !."`'#%&,:;<>=@{}~\$\(\)\*\+_\/\\\?\[\]\^\|]{2,4})$/).test(value)) {
        //       setEmailValid("enter a valid email")
        //      }
        //      else {
        //       setEmailValid(true)
        //      };
        //   }}
        />
          {/* { emailValid && (
              <p className={"error-message"}>{emailValid}</p>
            )} */}
        <input
          type="password"
          placeholder="Confirm New Password"
          className={`input-cred pass-cred ${!passwordValid ? "invalid" : ""}`}
          value={password}
          // onChange={(e) => {
          //   setPassword(e.target.value);
          //   setPasswordValid(true); 
          // }}
        //   onChange={(e) => {
        //     const value = e.target.value;
        //     setPassword(value);
        //     if(!value) {
        //       setPasswordValid("pasword is required")
        //      }
        //     //  else  if(!new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8}$/).test(value)) {
        //     //   setPasswordValid("enter a valid password")
        //     //  }
        //      else {
        //       setPasswordValid(true)
        //      };
        //   }}
        />
         {/* { passwordValid && (
              <p className={"error-message"}>{passwordValid}</p>
            )} */}

       
        <div className="Button__login">
          <button
          
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            // onClick={handleLogin}
            // disabled={email!== "" && password!=="" && emailValid===true && passwordValid===true ? false : true}
          >
            <div style={{ width: 315, height: 45 }}>
              <Lottie
                options={lottieOptions}
                isPaused={!isHovered}
                isStopped={!isHovered}
              />
             
            </div>
            <h3>Submit</h3>
           
          </button>
        </div>
        <hr />
       
      </div>
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={meassage}
        action={action} /> */}
    </div>
  );
};

export default ForgetPassword;
