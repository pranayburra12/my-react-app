import React, { useState } from "react"
import "./InverstmentTracker.css"
import group from "../../assets/Group.svg"
import add from "../../assets/add.svg"
import Lottie from "react-lottie";
import ButtonLottieAnimation from "../../utils/Button.json"
import gold from "../../assets/Gold.svg"
import savings from "../../assets/saings.svg"
// import mutualfunds from "../../assets/mutual-funds.svg"
import pff from "../../assets/pff.svg"
import stocks from "../../assets/stocks.svg"
import arrow from "../../assets/arrow.svg"
import Savings from "./trackers/savings";
import Stocks from "./trackers/Stocks";
import CustomTracker from "./trackers/CustomTracker";
import NewTracker from "./trackers/newTracker";
import PPF from "./trackers/ppf";
import Gold from "./trackers/goid";
import Bonds from "./trackers/bonds";
import MutualFunds from "./trackers/MutualFunds";

const InverstmentTracker = () => {

    const [changeTracker,setChangeTracket] = useState();
    const [addTracker,setAddTracker] = useState(false)



    const listOfTrackers=[
        {
            img: savings,
            name: "stocks",
            label:'Stocks',
            values: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
        img: savings,
        name: "savings",
        label:'Savings',
        values: "₹ 21.9K",
        persentage: "11.5%",
        },
        {
            img: stocks,
            name: "bonds",
            label:'Bonds',
            values: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            name: "gold",
            label:'Gold',
            values: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            name: "ppf",
            label:'PPF',
            values: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            name: "mutual-funds",
            label:'Mutual Funds',
            values: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            name: "lands",
            label:'Custom',
            values: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            name: "fix deposit",
            label:'Custom',
            values: "₹ 21.9K",
            persentage: "11.5%",
        },
    ]
   
    const renderTrackerDetail=(tracker)=>{
        // setAddTracker(false)
        switch(tracker?.label){
            case 'Stocks':return <Stocks/>
            case 'Bonds':return   <Bonds 
                                    subHEading = {"Edit/Manage"}
                                    heading = {"Bonds"}
                                    />
                case 'Gold':return <Gold 
                                    subHEading = {"Edit/Manage"}
                                    heading = {"Gold"}
                                    currentValue = {"Current Saving"}
                                    addSaving = {"Add Saving"}
                                    removeSaving = {"Remove Saving"}   
                                />
            case 'Savings':return <Savings 
                                        subHEading = {"Edit/Manage"}
                                        heading = {"Saving"}
                                        currentValue = {"Current Saving"}
                                        addSaving = {"Add Saving"}
                                        removeSaving = {"Remove Saving"}
                                    /> 
            case 'PPF':return   <PPF 
                                    subHEading = {"Edit/Manage"}
                                    heading = {"Public Provide Fund"}
                                    currentValue = {"PPF Value"}
                                    addSaving = {"Invested Amount"}
                                    removeSaving = {"Remove Founds"}
                                />

            case 'Mutual Funds':return <MutualFunds/>
            case 'Custom':return <CustomTracker 
                                    subHEading = {"Edit/Manage"}
                                    heading = {"Custom Tracker Name"}
                                    currentValue = {"Current Saving"}
                                    addSaving = {"Value at the time of investment"}
                                    removeSaving = {"Current Value"}
                                    />
            case "newTracker" : 
            default:return <div className="flex flex-col items-center text-white gap-5">
            <div className="border border-[#F1CA00] p-5 rounded-2xl w-[50%] flex flex-col items-center	cursor-pointer" onClick={()=>{setAddTracker(true)}}>
                <div className="heading"  >Add a tracker</div>
                <img  src={add} />
            </div>
            <div className="flex flex-col items-center border border-white rounded-3xl">
                
                    <span className="">Learn</span><br />
                    <span className="">How to choose</span><br />
                    <span className="">right investment</span><br />
                   
                    <div className="relative">
                        
                            <div style={{ width: 258, height: 45 }}>
                            <Lottie
                                options={lottieOptions}
                                label="Learn Now"
                            />
                            </div>
                            <h3 className="absolute top-2 left-[35%] text-black font-bold">Learn Now</h3>
                       
                        </div>
                
            </div>
    </div>
        }
    }
    const lottieOptions = {
        animationData: ButtonLottieAnimation,
        loop: true,
        autoplay: false,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

      const onChangeTracker = (values) => {
        console.log(`Clicked on item at index `);
        setChangeTracket(values)
        setAddTracker(false)
        console.log(changeTracker)
      };   
      
      const changeTooldView=()=>{
        setAddTracker(false)
      }
      
    
    return (
        // <div className="it-grid">
            
        //      <div className="it-left-body">
        //         <div className="it-body-data">
        //             <div className="net-worth">Net Worth</div>
        //             <div className="data">
        //                 <div className="investment">₹ 41.9K</div>
        //                 <div className="group">
        //                     <div className="persentage">11.5%</div>
        //                     <img className="group-img" src={group} />
        //                 </div>
                        
        //             </div>
        //             <div className={ !isMobileResolution && changeTracker?.name? "remove" : `it-amount`}>
        //                 <div className="net-amount">Your net worth increase by ₹12,000 than last month</div>
        //                 <div className="updated">Last Updated Mar 29,2023</div>
        //               </div>
        //         </div>
        //         <div className="scroll-container">
        //             {/* <hr  className="hr-tag"></hr> */}
        //         <div className="it-left-body-footer">   
        //             {
        //                 listOfTrackers?.map((item)=>{
        //                     return(
        //                         <>
        //                             <a className={item.name !== changeTracker?.name ? "it-data" : `it-data selected`} onClick={() => {onChangeTracker(item)}}>
        //                                 <div><img src={item.img} /></div>
        //                                 <div className="stocks">
        //                                     <div className="name">{item.name}</div>
        //                                     <div className="value">{item.values}</div>
        //                                     <div className="value-1">{item.persentage} <img src={group} /></div>
        //                                 </div>
        //                                 <div className="navigation">
        //                                     <button className="navigate-button"><img src={arrow} /></button>
        //                                 </div>
        //                             </a>
        //                         </>
        //                     )
        //                 })
        //             }

        //         </div>
        //         </div>
        //     </div>  
        //     <div className="side-bar" > <div style={{background:"#141414",zIndex:"20",transition:"width 0.4s ease-out",borderRight:"2px solid #e2e2e2"}}></div></div>
        //      {
        //     //    !changeTracker?.name ?
        //     //     <div className="it-right-body">
        //     //         <div className="add-tracker">
        //     //             <div className="heading">Add a tracker</div>
        //     //             <button className="add"><img  src={add}/></button>
        //     //         </div>
        //     //         <div className="learn-investment">
        //     //             <div>
        //     //                 <div>
        //     //                 <span className="data" >Learn</span><br />
        //     //                 <span className="data">How to choose</span><br />
        //     //                 <span className="data">right investment</span><br />
        //     //                 </div>
                            
        //     //                 <div className="Button__login learn">
        //     //                     <button
        //     //                     >
        //     //                         <div style={{ width: 258, height: 45 }}>
        //     //                         <Lottie
        //     //                             options={lottieOptions}
        //     //                         />
        //     //                         </div>
        //     //                         <h3 className="learn-more">Learn Now</h3>
        //     //                     </button>
        //     //                     </div>
        //     //             </div>
        //     //         </div>
        //     // </div>    
        //     // : 
        //     // changeTracker?.name === "savings" && 
        //     //     <div className="it-right-body"> 
        //     //         <CustomTracker 
        //     //             subHEading = {"Edit/Manage"}
        //     //             heading = {"Saving"}
        //     //             currentValue = {"Current Saving"}
        //     //             addSaving = {"Add Saving"}
        //     //             removeSaving = {"Remove Saving"}
        //     //         /> 
        //     //     </div>
        //     }     
        //     {
        //         renderTrackerDetail(changeTracker)
        //     }

        // </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 p-4 md:p-1 md:pl-40  items-start justify-center">
            
             <div className="flex flex-col md:col-span-3">
                <div className="flex flex-row-reverse text-white border border-slate-200 items-center justify-between p-8 rounded-xl ">
                    <div className="">Net Worth</div>
                    <div className="flex gap-2 items-center">
                        <div className="text-3xl font-semibold">₹ 41.9K</div>
                        <div className="bg-green-700 rounded-sm p-0.25">
                            <div className="inline text-green-200 text-sm">11.5%</div>
                            <img className="inline" src={group} />
                        </div>
                        
                    </div>
                    {/* <div className={ !isMobileResolution && changeTracker?.name? "remove" : `it-amount`}>
                        <div className="net-amount">Your net worth increase by ₹12,000 than last month</div>
                        <div className="updated">Last Updated Mar 29,2023</div>
                      </div> */}
                </div>
                {/* <div className="flex"> */}
                    {/* <hr  className="hr-tag"></hr> */}
                <div className="flex overflow-scroll w-full md:grid md:grid-rows-2 md:grid-flow-col md:gap-4">   
                    {
                        listOfTrackers?.map((item)=>{
                            return(
                                <div className={item.name !== changeTracker?.name ? "flex m-2 min-w-[80%] bg-slate-700 rounded-2xl	md:w-44" : "flex m-2 min-w-[80%] bg-slate-700 rounded-2xl	md:w-44 border border-[#F1CA00]"} onClick={() => {onChangeTracker(item)}}>
                                
                                       <img src={item.img} alt={item.name} className="w-2/5"/>
                                        <div className="text-white pt-2 pb-2 flex flex-col items-end justify-around">
                                           <div>
                                                <div className="text-slate-300">{item.name}</div>
                                                <div className="text-2xl">{item.values}</div>
                                            </div>
                                            <div className="flex bg-green-700 rounded p-0.25"><span className="text-green-200">{item.persentage}</span><img src={group} /></div>
                                            {/* <button className=""><img src={arrow} /></button> */}

                                        </div>
                                        
                                   
                                </div>
                            )
                        })
                    }

                </div>
                {/* </div> */}
            </div>  
            {/* <div className="side-bar" >
                 <div style={{background:"#141414",zIndex:"20",transition:"width 0.4s ease-out",borderRight:"2px solid #e2e2e2"}}></div></div> */}
  
            {
               addTracker ? <NewTracker navugateToOldView={changeTooldView} /> : renderTrackerDetail(changeTracker)
            }
        </div>
    )
}

export default InverstmentTracker;