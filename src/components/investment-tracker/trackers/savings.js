import React, { useEffect, useState } from "react"
import rightarrow from "../../../assets/Group 1260.svg"
import { GenerateNewToken } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Savings = (props) => {

    const navigate = useNavigate();

    const [addSaving, setAddSvaings] = useState('');
    const [removesavings, setRemoveSavings] = useState('');
    const [currentSavings,setcurrentSavings] = useState("");


    // const [validationMessage, setValidationMessage] = useState('');
    // const [isAddStockValid, setIsAddStockValid] = useState(true);
    // const [isRemoveStockValid, setIsRemoveStockValid] = useState(true);

    // const validateInput = (value) => {
    //     if (/^\d+$/.test(value)) {
    //         setValidationMessage('Input is valid.');
    //         return true;
    //     } else if (value === "") {
    //         setValidationMessage('');
    //         return true;
    //     } else {
    //         setValidationMessage('Input must contain only numbers.');
    //         return false;
    //     }
    // };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setAddSvaings(newValue);
    };

    const handleInputChangevalues = (event) => {
        const newValue = event.target.value;
        setRemoveSavings(newValue);

    };

    useEffect(()=>{
        totalSavings()
    },[])

    const totalSavings = () =>{
        var myHeaders = new Headers();
          myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            // savingsAmount: value
          });
    
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
    
          fetch("https://findemybackedcode.onrender.com/saving/getTotalSavings", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
                if( result?.message === "Token Invalid/Expired"){
                    let payload = {
                      refreshToken  : localStorage.getItem('refresh_token')
                    }
                    let route = {
                      payload :{ refreshToken  : localStorage.getItem('refresh_token')},
                      route:window.location.pathname,
                      navigate : navigate
                    }
                    GenerateNewToken(route,payload,navigate)
                  }else{
                    setcurrentSavings(result?.data?.savingsAmount)
                    setAddSvaings("")
                    setRemoveSavings("")
                  }
            })
            .catch(error => console.log('error', error));
    }


    const addSavings=(value)=>{
          var myHeaders = new Headers();
          myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            savingsAmount: value
          });
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          fetch("https://findemybackedcode.onrender.com/saving/addSavings", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
                totalSavings()
            })
            .catch(error => console.log('error', error));
      }

    const remove = () =>{

        var myHeaders = new Headers();
          myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            savingsAmount:addSaving
          });
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          fetch("https://findemybackedcode.onrender.com/saving/removeSavings", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
                totalSavings()
            })
            .catch(error => console.log('error', error));
      }

    

    return (
        <div className="text-center pt-5 md: p-0">
            <div className="w-10">
                <div class="text-gray-500 font-manrope text-sm float-left" style={{color: "#969696"}}>{props.subHEading}</div>
                <div class="text-gray-500  font-manrope  float-left text-4xl pt-2.5 pb-7" style={{color: "#FEC008"}}>{props.heading}</div>
            </div>
            <div className='w-full flex flex-col gap-5'>
            <div className='text-slate-300 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B]'><span className=''>Current Savings</span><span className='text-[#0BD19D] font-bold text-xl'>₹ {currentSavings?currentSavings:"0"}</span> </div>


                {/* <hr className="sm:felx-none" /> */}
                <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]" >
                    <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="text"
                        id="addStockInput"
                        placeholder="Add Savings"
                        value={addSaving}
                        onChange={handleInputChange}
                    />
                      <img
                        className="mr-8 cursor-pointer pl-2.5"
                        src={rightarrow}
                        alt="Right Arrow"
                        onClick ={()=>{addSavings(addSaving)}}
                     />
                </div>
                
               <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Remove Savings"
                        value={removesavings}
                        onChange={handleInputChangevalues}
                        
                    />
                    <img
                        className="mr-8 cursor-pointer pl-2.5"
                        src={rightarrow}
                        alt="Right Arrow"
                        onClick = {remove}
                     />
                   </div>
            </div>
        </div>
    )
}

export default Savings;
