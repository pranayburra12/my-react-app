import React from "react";
import "./Login.css";
import Logo from "../../assets/LogoFindemy.svg";
import GoogleLogo from "../../assets/Google.svg";
import FacebookLogo from "../../assets/Facebook.svg";
import LinkedinLogo from "../../assets/Linkedin.svg";
import Linehori from "../../assets/linehorizontal.svg";

import Lottie from "react-lottie";
import ButtonLottieAnimation from "../../utils/Button.json";

const Login = () => {
  const [isHovered, setIsHovered] = React.useState(false);

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
          className="input-cred text-cred"
        />
        <input
          type="password"
          placeholder="Password"
          className="input-cred pass-cred"
        />
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
        <a className="create__an_account" href="">
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
