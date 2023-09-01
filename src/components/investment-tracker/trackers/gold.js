import React, { useEffect, useState } from "react"
import rightarrow from "../../../assets/Group 1260.svg"
import { GenerateNewToken } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";
import ModalComponent from "../../../modal/modal";

const Gold = (props) => {

  const navigate = useNavigate();
  const baseUrl='http://3.237.3.113:3000';

  const [addGold, setAddGold] = useState('');
  const [valueofIntrest,setValueOfintgrest] = useState('')

  const [removeGold, setRemoveGold] = useState('');
  const [currentGold, setcurrentGold] = useState("");

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
    setAddGold(newValue);
    setIsAddStockValid(validateInput(newValue));
  };

  const handleInputChangevalues = (event) => {
    const newValue = event.target.value;
    if(newValue>currentGold?.numberOfGrams){

    }else{
      setRemoveGold(newValue);
      setIsRemoveStockValid(validateInput(newValue));
    }
   
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

    fetch("http://3.237.3.113:3000/gold/getTotalGoldInvestmentPrice", requestOptions)
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
          setcurrentGold(result?.data)
          props.getDashboard()
          setLoader(true)
          setAddGold("")
          // setRemoveGold("")
          setValueOfintgrest("")
        }
      })
      .catch(error => console.log('error', error));
  }


  const AddGold = () => {
    setLoader(false)
    setShow(false)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      totalAmount: Number(addGold),
      perGramPrice: Number(valueofIntrest),
      numberOfGrams:(addGold/valueofIntrest)
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://3.237.3.113:3000/gold/addGold", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        totalSavings()
      })
      .catch(error => console.log('error', error));
  }

  const remove = (value) => {
    setLoader(false)
    setRemoveModal(false)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      numberOfGrams: removeGold
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${baseUrl}/gold/removeGold`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        totalSavings()
        setRemoveGold("")
      })
      .catch(error => console.log('error', error));
  }



  return (
    <>
    {
      loader 
      ?
      <><div className="w-96 flex flex-col">
      <div class="text-gray-500 font-manrope text-sm float-left  " style={{ color: "#969696" }}>{props.subHEading}</div>
      <div class="text-gray-500  float-left text-4xl pt-1 pb-7 " style={{ color: "#FEC008" }}>{props.heading}</div>
    </div><div className="text-center  pt-5 md: p-0">
        <div className='w-full flex flex-col gap-5'>
          <div className="text-slate-300 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B]" style={{ background: "#2B2B2B" }}>
           <span>Invested Gold</span>
           <span className='text-[#0BD19D] font-bold text-xl'>₹ {currentGold?.totalAmount ? currentGold?.totalAmount : "0"} <span className="text-sm opacity-70">({currentGold?.numberOfGrams } gm)</span></span> </div>


          {/* <hr className="sm:felx-none" /> */}
          <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]">
            <input
              className="focus:outline-none w-3/4 rounded-2xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
              style={{ color: "#ffff" }}
              type="number"
              min="0"
              id="addStockInput"
              placeholder="Invested Amount"
              value={addGold}
              onChange={(e)=>{setAddGold(e.target.value)}}
              onwheel="return false;" />
               
            {/* <img
              className="mr-8 cursor-pointer pl-2.5"
              src={rightarrow}
              alt="Right Arrow"
              onClick={() => { addSavings(addSaving); } } /> */}
          </div>
          <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]">
            <input
              className="focus:outline-none w-3/4 rounded-2xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
              style={{ color: "#ffff" }}
              type="number"
              min="0"
              id="addStockInput"
              placeholder="Value at the time of investment"
              value={valueofIntrest}
              onChange={(e)=>{setValueOfintgrest(e.target.value)}} />
            {/* <img
              className="mr-8 cursor-pointer pl-2.5"
              src={rightarrow}
              alt="Right Arrow"
              onClick={() => { addSavings(addSaving); } } /> */}
          </div>

          {/* <button className="text-xs mt-5 p-3 ml-20 rounded-xl" style={{ borderColor: "#00838f", color: "#00838f", border: "2px solid" }} onClick={()=>{}} >Add</button> */}

          <Button 
           color='success'
          onClick={()=>{setShow(true)}}
          
          variant='outlined'
          disabled={!addGold ||!valueofIntrest}
        > Add</Button>

          {!isAddStockValid &&
            <span style={{ color: 'red' }}>{validationMessage}</span>}
          <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]">
            <input
              className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
              style={{ color: "#ffff" }}
              type="number"
              placeholder="Remove Gold (in grams)"
              value={removeGold}
              onChange={handleInputChangevalues} />
            <img
              className="mr-8 cursor-pointer pl-2.5"
              src={rightarrow}
              alt="Right Arrow"
              onClick={() => { setRemoveModal(true) } } />
          </div>
          {!isRemoveStockValid &&
            <span style={{ color: 'red' }}>{validationMessage}</span>}
        </div>
      </div>
      {<ModalComponent
              show={show}
              cancel={"cancel"}
              save={"save"}
              onHide={() => setShow(false)}
              onSubmit={() => { AddGold(); }} />}
            {<ModalComponent
              show={removeModal}
              cancel={"cancel"}
              save={"delete"}
              onHide={() => setRemoveModal(false)}
              onSubmit={() => { remove(); }} />}
      </> 
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

export default Gold;
