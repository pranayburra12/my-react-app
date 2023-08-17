import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate();

    const handleClick=()=>{
        navigate("/sidenav")
    }

  return (
    <div className="tls-home">
        {"uhcds"}
        <button onClick={handleClick}>{"asdjvdhfbvdhfbkdjsfbvksdfbvkdsfvbksd"}</button>
    </div> //end of file
  );
};

export default Home;
