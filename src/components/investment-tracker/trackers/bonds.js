import React, { useEffect, useRef, useState } from "react"
import rightarrow from "../../../assets/Group 1260.svg"
import arrow from "../../../assets/arrow.svg"
import { GenerateNewToken } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ModalComponent from "../../../modal/modal";
import { Backdrop, CircularProgress } from "@mui/material";


const Bonds = (props) => {
  
  const baseUrl='http://3.237.3.113:3000';

    const navigate = useNavigate();
    const [show,setShow] = useState(false)
    const [loader,setLoader]=useState(false);
    


    const viewRef=useRef();

    const [addBond, setAddBond] = useState('');
    const [investedAmount,setInvestedAmount] = useState('')
    const [removeBond, setRemoveBind] = useState('');
    const [currentBond,setcurrentBonds] = useState("");
    const [bondType,setBondtype] = useState("")

    const [viewBonds,setViewBonds]=useState(false);
    const [allBonds,setAllBonds] = useState()

    const [editFlow,setEditFlow] = useState()

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
      setLoader(true)
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
                    props.getDashboard()
                    setLoader(false)
                    setAddBond("")
                    setInvestedAmount("")
                    setBondtype("")
                    setRemoveBind("")
                    let total=0;
                    result?.data?.map(each=>{
                      total=total+each?.currentTotalValue
                    })
                    setcurrentBonds(total)
                  }
            })
            .catch(error => console.log('error', error));
    }


    const addBonds=(value)=>{
      if(!investedAmount||!addBond||!bondType){

      }else{

        if(editFlow){
          EditBond()
          
        }else{      
        setShow(false)
    
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
              setViewBonds(true)
                totalBonds()
            })
            .catch(error => console.log('error', error));
      }
      }
    }

    const EditBond = () =>{
    
        setShow(false)
        var myHeaders = new Headers();
          myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            bondName: addBond,
            bondType:bondType,
            totalAmount: investedAmount
          });
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          fetch(`${baseUrl}/bond/editBond`, requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
              setViewBonds(false)
            
             
              setAddBond("")
              setInvestedAmount("")
              setBondtype("")
              setRemoveBind("")
              totalBonds()
            })
            .catch(error => console.log('error', error));
      }

    const goBack=()=>{
      setViewBonds(false)
      setAddBond("")
      setInvestedAmount("")
      setBondtype("")
      setEditFlow(false)
    }

    

    return (
      <>
      {
        
        <>
        {  !viewBonds
           ? 
           <><div className="w-[360px] flex flex-col h-full gap-5">
 {
  loader &&   <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loader}

  >
    <CircularProgress color="inherit" />
  </Backdrop>
 }
                 <div className='flex flex-col'>
                
               <div class="font-manrope text-sm " style={{ color: "#969696" }}>{props.subHEading}</div>
               <div className='font-manrope text-[#FEC008] font-bold text-2xl'>Bonds</div>
          </div>
             <div className='text-slate-300 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B]'><span className=''>Current Bonds</span><span className='text-[#0BD19D] font-bold text-xl'>₹{currentBond ? currentBond : "0"}</span> </div>

 
                   <div>
                     <div className='text-slate-200 flex justify-between items-center rounded-lg p-3 bg-[#2B2B2B] hover:cursor-pointer h-16' onClick={() => { setViewBonds(true); } }><span>View Your Bonds</span><img src={arrow} width='25px'/></div>
                   </div>
 
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]">
                     <input
                       className="focus:outline-none w-3/4 rounded-2xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                       style={{ color: "#ffff" }}
                       type="text"
                       id="addStockInput"
                       placeholder="Bond Name"
                       disabled={editFlow}
                       value={addBond}
                       onChange={(e) => { setAddBond(e.target.value); } } />
                   </div>
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]">
                     <input
                       className="focus:outline-none w-3/4 rounded-2xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                       style={{ color: "#ffff" }}
                      
                       id="addStockInput"
                       type='number'
                       placeholder="Amount Invested"
                       value={investedAmount}
                       onChange={(e) => { setInvestedAmount(e.target.value); } } />
                   </div>
                   {!isAddStockValid &&
                     <span style={{ color: 'red' }}>{validationMessage}</span>}
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]">
                     <input
                       className="focus:outline-none w-3/4 rounded-2xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                       style={{ color: "#ffff" }}
                       type="text"
                       placeholder="Bond Type"
                       disabled={editFlow}
                       value={bondType}
                       onChange={(e) => { setBondtype(e.target.value); } } />
                   </div>
                   {!isRemoveStockValid &&
                     <span style={{ color: 'red' }}>{validationMessage}</span>}
                   <div><Button color='success' variant="outlined" onClick={()=>{setShow(true)}}>{ editFlow? "save changes" : "Add new bond" }</Button></div>
                 
               </div></>
           :
           <div className="text-white min-h-screen w-full" ref={viewRef}>
               <Button onClick={goBack} > Go Back</Button>
             {allBonds.length!==0?<div className='flex flex-col gap-2' >
             {allBonds?.map(each=>{
               return <div className='text-slate-200 flex justify-between w-full rounded-sm h-16 items-center p-3 bg-[#2B2B2B] gap-2 hover:cursor-pointer' onClick={()=>{setAddBond(each?.bondName)
                setInvestedAmount(each?.totalInvestedAmount)
                setBondtype(each.bondType)
                setViewBonds(false)
                setEditFlow(true)
              }              
              }><span>{each.bondName}</span><span className='text-[#0BD19D]'>₹{each.currentTotalValue.toFixed(1)    }</span></div>
             })}
             </div>:
             <div className='text-slate-200 flex justify-between w-full rounded-sm h-16 items-center p-3 bg-[#2B2B2B] gap-2 hover:cursor-pointer'><span>NO RECORDS FOUND</span><span className='text-[#0BD19D]'></span></div>}
             </div>
        }
        {
         <ModalComponent
         show={show}
         cancel={"cancel"}
         save={"save"}
         onHide={() => setShow(false)}
         onSubmit={()=>{addBonds()}}
         />
        }
         </>
      
      }
      </>
    ) 
}

export default Bonds;
