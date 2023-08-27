
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
const NewTracker = (props) => {

  const [trackerName, setTrackerName] = useState("")
  const [investedAmount, setInvestedAmount] = useState("")
  const [valueTimeofInvestment, setvalueTimeofInvestment] = useState("")
  const [currentValue, setcurrentValue] = useState("")

  const [isvalid, setisValid] = useState(Boolean)


  const submitValues = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      trackerName: trackerName,
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

    fetch("https://findemybackedcode.onrender.com/customTracker/addTracker", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        props.navugateToOldView();
      })
      .catch(error => console.log('error', error));
  }


  const renderTrackerDetail = (tracker) => {
    switch (tracker?.label) {
      case 'Tracker name': return <div>
        {console.log("aaaaaaaaaaaaaaaaaaaaaa")}
      </div>
      case 'Invested amount': return <><div >   </div></>
      case 'Value time of investment': return <div >
        <h1>Gold</h1>
      </div>
      case 'Current value': return
      default: return <div></div>
    }
  }


  return (
    <div className="flex flex-col items-center pt-5 md:p-0">
      <div className="flex flex-col pb-4">
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

          onChange={(e) => setTrackerName(e.target.value)}
        />
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

          onChange={(e) => setInvestedAmount(e.target.value)}
        />
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

          onChange={(e) => setvalueTimeofInvestment(e.target.value)}
        />
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

          onChange={(e) => setcurrentValue(e.target.value)}
        />
      </div>
      <div>
        <button style={{color: "#00838f"}} onClick={props.navugateToOldView}>Back</button>
        <button className="text-xs mt-5 p-3 ml-20 rounded-xl" style={{ borderColor: "#00838f", color: "#00838f", border: "2px solid" }} onClick={submitValues} >Add new Tracker</button></div>
    </div>
  )

}

export default NewTracker;