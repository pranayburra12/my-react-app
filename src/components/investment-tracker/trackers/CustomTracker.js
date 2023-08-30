
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { useNavigate  } from "react-router-dom";
import { GenerateNewToken } from "../../utils/api";
import ModalComponent from "../../../modal/modal";
import { Backdrop, CircularProgress } from "@mui/material";

const CustomTracker = (props) => {
  const baseUrl='http://3.237.3.113:3000'

  const navigate = useNavigate();
  const [show,setShow] = useState(false)
  const [develete,setDelete] = useState(false)

  const [trackerName, setTrackerName] = useState("")
  const [investedAmount, setInvestedAmount] = useState("")
  const [valueTimeofInvestment, setvalueTimeofInvestment] = useState("")
  const [currentValue, setcurrentValue] = useState("")
  const [loader,setLoader]=useState(false);
  

  const [isvalid, setisValid] = useState(Boolean)

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

      fetch(`http://3.237.3.113:3000/customTracker/getTrackerData/${props?.changeTracker?.id}`, requestOptions)
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
                setLoader(true)
                setTrackerName(result?.data?.trackerName)
                setInvestedAmount(result?.data?.investedAmount)
                setvalueTimeofInvestment(result?.data?.valueTimeofInvestment)
                setcurrentValue(result?.data?.currentValue)
              }
        })
        .catch(error => console.log('error', error));
}


  const submitValues = () => {
    setShow(false)
    setLoader(false)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id:props?.changeTracker?.id,
      // trackerName: trackerName,
      investedAmount: investedAmount,
      valueTimeofInvestment: valueTimeofInvestment,
      currentValue: currentValue
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://3.237.3.113:3000/customTracker/editTrackerData", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        // props.navugateToOldView();
        totalSavings()
      })
      .catch(error => console.log('error', error));
  }

  const updateName =() =>{
    setLoader(false)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id:props?.changeTracker?.id,
      trackerName: trackerName,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://3.237.3.113:3000/customTracker/editTrackerName", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        // props.navugateToOldView();
        totalSavings()
      })
      .catch(error => console.log('error', error));
  }

  const deleteTracker =()=>{
    setDelete(false)
    setLoader(false)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id:props?.changeTracker?.id,
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://3.237.3.113:3000/customTracker/deleteTracker", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        props.navugateToOldView();
        // totalSavings()
        window.location.reload()
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>
      {
          loader ? 
          <>
          <div className="flex flex-col items-center pt-5 md:p-0">
      <div className="flex flex-col">
        <span className="text-slate-300 pb-2 text-xs">Tracker Name</span>

        <TextField
          value={trackerName}
          placeholder="Tracker Name"
          disabled={false}

          variant='outlined'

          sx={{
            color: 'white',
            "& input": {
              color: 'white',
            },
            "& fieldset": {
              border: "1px solid white",
            }, '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0BD19D',
              },
            },
          }}

          onChange={(e) => setTrackerName(e.target.value)} />
      </div>
      
      <div className="pb-4"><button className="text-xs mt-5 p-3 ml-20 rounded-xl" style={{ borderColor: "#00838f", color: "#00838f", border: "2px solid" }} onClick={updateName} >Update name</button>
</div>

      
      <div className="flex flex-col pb-4">
        <span className="text-slate-300 pb-2 text-xs">Invested Amount</span>
        <TextField
          value={investedAmount}
          placeholder="Invested Amount"
          disabled={false}

          variant='outlined'

          sx={{
            color: 'white',
            "& input": {
              color: 'white',
            },
            "& fieldset": {
              border: "1px solid white",
            }, '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0BD19D',
              },
            },
          }}

          onChange={(e) => setInvestedAmount(e.target.value)} />
      </div>


      <div className="flex flex-col pb-4">
        <span className="text-slate-300 pb-2 text-xs">Value Time of Investment</span>
        <TextField
          value={valueTimeofInvestment}
          placeholder="Value Time of Investment"
          disabled={false}

          variant='outlined'

          sx={{
            color: 'white',
            "& input": {
              color: 'white',
            },
            "& fieldset": {
              border: "1px solid white",
            }, '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0BD19D',
              },
            },
          }}

          onChange={(e) => setvalueTimeofInvestment(e.target.value)} />
      </div>


      <div className="flex flex-col pb-4">
        <span className="text-slate-300 pb-2 text-xs">Current Value</span>
        <TextField
          value={currentValue}
          placeholder="Current Value"
          disabled={false}

          variant='outlined'

          sx={{
            color: 'white',
            "& input": {
              color: 'white',
            },
            "& fieldset": {
              border: "1px solid white",
            }, '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0BD19D',
              },
            },
          }}

          onChange={(e) => setcurrentValue(e.target.value)} />
      </div>
      <div>
        <button style={{ color: "#00838f" }} onClick={props.navugateToOldView}>Back</button>
        <button className="text-xs mt-5 p-3 ml-20 rounded-xl" style={{ borderColor: "#00838f", color: "#00838f", border: "2px solid" }} onClick={()=>{setShow(true)}}>Update Tracker</button></div>
        <button className="text-xs mt-10 p-3  " style={{ borderColor: "#00838f", color: "#00838f"}} onClick={()=>{setDelete(true)}}>Delete Tracker</button>
    </div>
    
    {
        <ModalComponent
        show={show}
        cancel={"cancel"}
        save={"Submit"}
        onHide={() => setShow(false)}
        onSubmit={()=>{submitValues()}}
        />
    }
    {
        <ModalComponent
        show={develete}
        cancel={"cancel"}
        save={"Delete"}
        onHide={() => setShow(false)}
        onSubmit={()=>{deleteTracker()}}
        />
    }
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

export default CustomTracker;