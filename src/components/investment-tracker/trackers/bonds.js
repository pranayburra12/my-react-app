import React, { useEffect, useRef, useState } from "react"
import rightarrow from "../../../assets/Group 1260.svg"
import arrow from "../../../assets/arrow.svg"
import { GenerateNewToken } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const baseUrl='http://3.237.3.113:3000'
const Bonds = (props) => {

    const navigate = useNavigate();

    const viewRef=useRef();

    const [addBond, setAddBond] = useState('');
    const [investedAmount,setInvestedAmount] = useState('')
    const [removeBond, setRemoveBind] = useState('');
    const [currentBond,setcurrentBonds] = useState("");
    const [bondType,setBondtype] = useState("")

    const [viewBonds,setViewBonds]=useState(false);
    const [allBonds,setAllBonds] = useState()


    const [validationMessage, setValidationMessage] = useState('');
    const [isAddStockValid, setIsAddStockValid] = useState(true);
    const [isRemoveStockValid, setIsRemoveStockValid] = useState(true);

    const validateInput = (value) => {
        if (/^\d+$/.test(value)) {
            setValidationMessage('Input is valid.');
            return true;
        } else if (value === "") {
            setValidationMessage('');
            return true;
        } else {
            setValidationMessage('Input must contain only numbers.');
            return false;
        }
    };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setAddBond(newValue);
        setIsAddStockValid(validateInput(newValue));
    };

    const handleInputChangevalues = (event) => {
        const newValue = event.target.value;
        setRemoveBind(newValue);
        setIsRemoveStockValid(validateInput(newValue));
    };

    useEffect(()=>{
        totalBonds()
    },[])

    const totalBonds = () =>{
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
    
          fetch(`${baseUrl}/bond/viewBonds`, requestOptions)
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
                    setAllBonds(result?.data)
                    setAddBond("")
                    setInvestedAmount("")
                    setBondtype("")
                    setRemoveBind("")
                  }
            })
            .catch(error => console.log('error', error));
    }


    const addBonds=(value)=>{
          var myHeaders = new Headers();
          myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            bondName: addBond ,
            bondType:  bondType, 
            totalAmount: investedAmount
          });
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          fetch(`${baseUrl}/bond/saveBond`, requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)

                totalBonds()
            })
            .catch(error => console.log('error', error));
      }

    const remove = (value) =>{

        var myHeaders = new Headers();
          myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            removeBond: value,
            savingsAmount:addBond
          });
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          fetch(`${baseUrl}/saving/removeBond`, requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
                totalBonds()
            })
            .catch(error => console.log('error', error));
      }

    const goBack=()=>{
      setViewBonds(false)
    }

    

    return (
      <>
       {  !viewBonds
          ? 
          <><div className=" flex flex-col">
              <div class="text-gray-500 font-manrope text-sm float-left " style={{ color: "#969696" }}>{props.subHEading}</div>
              <div class="text-gray-500  float-left text-4xl  pb-7 pt-7" style={{ color: "#FEC008" }}>{props.heading}</div>
            </div><div className="text-center pt-5 md: p-0">

                <div className='w-full flex flex-col gap-5'>
                  <div className="flex rounded-3xl   border-white rounded-10 h-auto items-baseline  bg-black" style={{ background: "#2B2B2B" }}>
                    <input
                      className=" focus:outline-none w-3/4 rounded-3xl p-6 border-2 border-solid border-white rounded-10 h-15 text-white bg-black"
                      style={{ color: "#ffff", background: "#2B2B2B" }}
                      value={"Bond Value"}
                      disabled={true}
                      onChange={handleInputChange} />
                    <div
                      className="  pl-2.5 text-green-500"
                    >{`₹ ${currentBond}`}</div>
                  </div>

                  <div>
                    <div className='text-slate-200 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B] hover:cursor-pointer rounded-s-xl' onClick={() => { setViewBonds(true); } }><span>View Your Bonds</span><img src={arrow} /></div>
                  </div>

                  <div className="flex justify-between  rounded-3xl  border-2 border-solid border-white rounded-10 h-16  bg-black ">
                    <input
                      className=" focus:outline-none w-3/4 rounded-3xl p-6 border-2 border-solid border-white rounded-10 h-15  bg-black"
                      style={{ color: "#ffff" }}
                      type="text"
                      id="addStockInput"
                      placeholder="Bond Name"
                      value={addBond}
                      onChange={(e) => { setAddBond(e.target.value); } } />
                  </div>
                  <div className="flex justify-between  rounded-3xl  border-2 border-solid border-white rounded-10 h-16  bg-black ">
                    <input
                      className=" focus:outline-none w-3/4 rounded-3xl p-6 border-2 border-solid border-white rounded-10 h-15  bg-black"
                      style={{ color: "#ffff" }}
                      type="text"
                      id="addStockInput"
                      placeholder="Amount Invested"
                      value={investedAmount}
                      onChange={(e) => { setInvestedAmount(e.target.value); } } />
                  </div>
                  {!isAddStockValid &&
                    <span style={{ color: 'red' }}>{validationMessage}</span>}
                  <div className="flex justify-between  rounded-3xl  border-2 border-solid border-white rounded-10 h-16  bg-black">
                    <input
                      className=" focus:outline-none w-3/4 rounded-3xl p-6 border-2 border-solid border-white rounded-10 h-15  bg-black"
                      style={{ color: "#ffff" }}
                      type="text"
                      placeholder="Bond Type"
                      value={bondType}
                      onChange={(e) => { setBondtype(e.target.value); } } />
                  </div>
                  {!isRemoveStockValid &&
                    <span style={{ color: 'red' }}>{validationMessage}</span>}
                  <div><button className="text-xs mt-5 p-3 ml-20 rounded-xl" style={{ backgroundColor: "#00838f", color: "#fff", border: "solid 1px #00838" }} onClick={addBonds}>Add new bond</button></div>
                </div>
              </div></>
          :
          <div className="text-white min-h-screen" ref={viewRef}>
              <Button onClick={goBack} > Go Back</Button>
            <div className='flex flex-col gap-2' >
            {allBonds?.map(each=>{
              return <div className='text-slate-200 flex justify-between w-full rounded-sm h-16 items-center p-3 bg-[#2B2B2B] gap-2 hover:cursor-pointer' onClick={()=>{}}><span>{each.bondName}</span><span className='text-[#0BD19D]'>₹{each.currentTotalValue.toFixed(1)    }</span></div>
            })}
            </div>
            </div>
       }
        </>
    )
}

export default Bonds;
