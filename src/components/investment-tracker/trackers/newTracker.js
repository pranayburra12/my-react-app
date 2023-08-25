
import React, { useState } from "react";

const NewTracker = (props) => {

    const [trackerName,setTrackerName] =useState("")
    const [investedAmount,setInvestedAmount] =useState("")
    const [valueTimeofInvestment,setvalueTimeofInvestment] =useState("")
    const [currentValue,setcurrentValue] =useState("")

    const [isvalid,setisValid] = useState(Boolean)


    const submitValues =() =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
            trackerName: trackerName,
            investedAmount:investedAmount,
            valueTimeofInvestment:valueTimeofInvestment,
            currentValue:currentValue
        });
  
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
  
        fetch("https://findemybackedcode.onrender.com/customTracker/addTracker", requestOptions)
          .then(response => response.json())
          .then(result => {console.log(result)
            props.navugateToOldView();
          })
          .catch(error => console.log('error', error));
    }


    const renderTrackerDetail=(tracker)=>{
        switch(tracker?.label){
            case 'Tracker name':return <div>
            {console.log("aaaaaaaaaaaaaaaaaaaaaa")}
            </div>
            case 'Invested amount':return <><div >   </div></>
            case 'Value time of investment':return <div > 
            <h1>Gold</h1>
                        </div>
            case 'Current value':return 
            default:return  <div></div>
        }
    }


    return (
        <div className="text-center pl-40 pr-40 pt-5 md: p-0">
            <div className="pt-5 flex flex-col items-start gap-2">
                <div className="" style={{ color: "#ffff" }}>Tracker name</div>
                <input
                    className=" focus:outline-none w-3/4 rounded-3xl border-none p-6 border-2 border-solid border-white rounded-10 h-15 text-white bg-black"
                    style={{ color: "#ffff", background: "#2B2B2B" }}
                    placeholder="Tracker name"
                    onChange={(e) => {
                        setTrackerName(e.target.value);
                        renderTrackerDetail("Tracker name");
                    }}
                />
            </div>


            <div className="pt-5 flex flex-col items-start gap-2">
            <div className="" style={{ color: "#ffff" }}>Invested Amount</div>
                <input
                    className=" focus:outline-none w-3/4 rounded-3xl border-none p-6 border-2 border-solid border-white rounded-10 h-15 text-white bg-black"
                    style={{ color: "#ffff", background: "#2B2B2B" }}
                    placeholder="Invested amount"
                    onChange={(e)=>{setInvestedAmount(e.target.value)}}
                />
            </div>


            <div  className="pt-5 flex flex-col items-start gap-2">
            <div className="" style={{ color: "#ffff" }}>Value Time of Investment</div>
                <input
                    className=" focus:outline-none w-3/4 rounded-3xl border-none p-6 border-2 border-solid border-white rounded-10 h-15 text-white bg-black"
                    style={{ color: "#ffff", background: "#2B2B2B" }}
                    placeholder="Value time of investment"
                    onChange={(e)=>{setvalueTimeofInvestment(e.target.value)}}
                />
            </div>


            <div className="pt-5 flex flex-col items-start gap-2">
            <div className="" style={{ color: "#ffff" }}>Current Value</div>
                <input
                    className=" focus:outline-none w-3/4 rounded-3xl border-none p-6 border-2 border-solid border-white rounded-10 h-15 text-white bg-black"
                    style={{ color: "#ffff", background: "#2B2B2B" }}
                    placeholder="Current value"
                    onChange={(e)=>{setcurrentValue(e.target.value)}}
                />
            </div>
            <div><button className="text-xs mt-5 p-3 ml-20 rounded-xl" style={{    backgroundColor: "#00838f",color: "#fff", border: "solid 1px #00838"}} onClick={submitValues} >Add new Tracker</button></div>
        </div>
    )

}

export default NewTracker;