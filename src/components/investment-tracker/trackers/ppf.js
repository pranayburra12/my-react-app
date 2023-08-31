import React, { useEffect, useState } from "react"
import rightarrow from "../../../assets/Group 1260.svg"
import { GenerateNewToken } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import ModalComponent from "../../../modal/modal";

const PPF = (props) => {

  const navigate = useNavigate();

  const [addSaving, setAddSvaings] = useState('');
  const [removesavings, setRemoveSavings] = useState('');
  const [currentSavings, setcurrentSavings] = useState("");

  const [loader,setLoader]=useState(false);
  const [removeModal,setRemoveModal] = useState(false)
  const [show,setShow] = useState(false)

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
    setAddSvaings(newValue);
    // setRemoveSavings(newValue)
    setIsAddStockValid(validateInput(newValue));
  };

  const handleInputChangevalues = (event) => {
    const newValue = event.target.value;
    setRemoveSavings(newValue);
    setIsRemoveStockValid(validateInput(newValue));
  };

  useEffect(() => {
    totalSavings()
  }, [])

  const totalSavings = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      // savingsAmount: value
    });

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://3.237.3.113:3000/ppf/getTotalPPF", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result?.message === "Token Invalid/Expired") {
          let payload = {
            refreshToken: localStorage.getItem('refresh_token')
          }
          let route = {
            payload: { refreshToken: localStorage.getItem('refresh_token') },
            route: window.location.pathname,
            navigate: navigate
          }
          GenerateNewToken(route, payload, navigate)
        } else {
          setcurrentSavings(result?.data?.ppfAmount)
          props.getDashboard()
          setLoader(true)
          setAddSvaings("")
          setRemoveSavings("")
        }
      })
      .catch(error => console.log('error', error));
  }


  const addSavings = (value) => {
    setShow(false)
    setLoader(false)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ppfAmount: addSaving
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://3.237.3.113:3000/ppf/addPPF", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        totalSavings()
      })
      .catch(error => console.log('error', error));
  }

  const remove = (value) => {
    setRemoveModal(false)
    setLoader(false)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      ppfAmount: removesavings
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://3.237.3.113:3000/ppf/removePPF", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)

        totalSavings()
      })
      .catch(error => console.log('error', error));
  }



  return (

    <>   
    {
     loader ?
       <div className="text-center pt-5 md: p-0">
           <div className="w-10">
             <div class="font-manrope text-sm float-left" style={{ color: "#969696" }}>{props.subHEading}</div>
             <div class=" font-manrope  text-2xl pb-7" style={{ color: "#FEC008" }}>{props.heading}</div>
           </div>
           <div className='w-full flex flex-col gap-5'>
             <div className='text-slate-300 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B]'><span className=''>Current Funds</span><span className='text-[#0BD19D] font-bold text-xl'>₹ {currentSavings ? currentSavings : "0"}</span> </div>


             {/* <hr className="sm:felx-none" /> */}
             <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]">
               <input
                 className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                 style={{ color: "#ffff" }}
                 type="number"
                 id="addStockInput"
                 placeholder="Invested Amount"
                 value={addSaving}
                 onChange={handleInputChange} />
               <img
                 className="mr-8 cursor-pointer pl-2.5"
                 src={rightarrow}
                 alt="Right Arrow"
                 onClick={() => { setShow(true); } } />
             </div>

             <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]">
               <input
                 className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                 style={{ color: "#ffff" }}
                 type="number"
                 placeholder="Remove Funds"
                 value={removesavings}
                 onChange={handleInputChangevalues} />
               <img
                 className="mr-8 cursor-pointer pl-2.5"
                 src={rightarrow}
                 alt="Right Arrow"
                 onClick={() => { setRemoveModal(true); } } />
             </div>
           </div>
           {<ModalComponent
             show={show}
             cancel={"cancel"}
             save={"save"}
             onHide={() => setShow(false)}
             onSubmit={() => { addSavings(); } } />}
           {<ModalComponent
             show={removeModal}
             cancel={"cancel"}
             save={"delete"}
             onHide={() => setRemoveModal(false)}
             onSubmit={() => { remove(); } } />}
         </div>
         :
         <div >
         <Backdrop
       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
       open={loader}
       className="loader"
       >
         <CircularProgress color="inherit" />
       </Backdrop>
       </div>
       }
   </>
  )
}

export default PPF;
