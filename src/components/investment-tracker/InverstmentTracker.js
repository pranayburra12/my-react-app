import React, { useEffect, useState } from "react"
import "./InverstmentTracker.css"
import group from "../../assets/Group.svg"
import add from "../../assets/add.svg"
import Lottie from "react-lottie";
import ButtonLottieAnimation from "../../utils/Button.json"
import gold from "../../assets/Gold.svg"
import savings from "../../assets/saings.svg"
import mutualfunds from "../../assets/mutual-funds.svg"
import bonds from '../../assets/bonds.svg'
// import mutualfunds from '../../assets/market-icon.svg'
import pff from "../../assets/pff.svg"
import stocks from "../../assets/stocks.svg"
import arrow from "../../assets/arrow.svg"
import Savings from "./trackers/savings";
import Stocks from "./trackers/Stocks";
import CustomTracker from "./trackers/CustomTracker";
import NewTracker from "./trackers/newTracker";
import PPF from "./trackers/ppf";
import Gold from "./trackers/gold";
import Bonds from "./trackers/bonds";
import MutualFunds from "./trackers/MutualFunds";
import { useNavigate } from "react-router-dom";
import { GenerateNewToken } from "../utils/api";
import AddS from "../../adds/adds";
import { Backdrop, CircularProgress } from "@mui/material";
const baseUrl='http://3.237.3.113:3000'

const InverstmentTracker = () => {

    const navigate = useNavigate();

    const [changeTracker, setChangeTracket] = useState();
    const [addTracker, setAddTracker] = useState(false)

    const [loader,setLoader]=useState(false);
    const [classnameValue,setclassnameValue] = useState(false)
    const [total,setTotal]=useState(0);
    const [currentTotal,setCurrentTotal]=useState(0);

    const [listOfTrackersData, setListOfTrackers] = useState()

    useEffect(() => {
        getAllTrackers();
    }, [addTracker])

    const getAllTrackers = () => {
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
        myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({ });

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            //   body: raw,
            redirect: 'follow'
        };
    
        fetch(`${baseUrl}/dashboard/getDetails`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
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
                setListOfTrackers(result.data)
                console.log(result.data)
                let t=0;
                let c=0;
                result.data?.forEach(element => {
                    c=c+Number(element.currentValues)
                    t=t+Number(element.values)
                });
                console.log(t)
                setTotal(t)
                let p=((c-t)/t)*100;
                setCurrentTotal(p)
                setLoader(false)
              }
          })
          .catch(error => console.log('error', error));
    }



    const renderTrackerDetail = (tracker) => {
        // setAddTracker(false)
        switch (tracker?.label) {
            case 'Stocks': return <Stocks  tracker={changeTracker}
            getDashboard = {()=>{getAllTrackers()}}
            />
            case 'Bonds': return <Bonds
                subHEading={"Edit/Manage"}
                heading={"Bonds"}
                getDashboard = {()=>{getAllTrackers()}}
            />
            case 'Gold': return <Gold
                subHEading={"Edit/Manage"}
                heading={"Gold"}
                currentValue={"Current Saving"}
                addSaving={"Add Saving"}
                removeSaving={"Remove Saving"}
                getDashboard = {()=>{getAllTrackers()}}
            />
            case 'Savings': return <Savings
                subHEading={"Edit/Manage"}
                heading={"Saving"}
                currentValue={"Current Saving"}
                addSaving={"Add Saving"}
                removeSaving={"Remove Saving"}
                getDashboard = {()=>{getAllTrackers()}}
            />
            case 'PPF': return <PPF
                subHEading={"Edit/Manage"}
                heading={"PPF"}
                currentValue={"PPF Value"}
                addSaving={"Invested Amount"}
                removeSaving={"Remove Founds"}
                getDashboard = {()=>{getAllTrackers()}}
            />

            case 'Mutual Funds': return <MutualFunds  tracker={changeTracker}
            getDashboard = {()=>{getAllTrackers()}}/>
            case `${tracker?.label}`: return <CustomTracker
                subHEading={"Edit/Manage"}
                heading={"Custom Tracker Name"}
                currentValue={"Current Saving"}
                addSaving={"Value at the time of investment"}
                removeSaving={"Current Value"}
                changeTracker={tracker}
                navugateToOldView={()=>{changeTooldView()}}
                getDashboard = {()=>{getAllTrackers()}}
                
            />
            // case "newTracker":
            default:
                return (
                    <div className="flex flex-col justify-between row-span-2 text-white h-full items-center md:pt-5 gap-10">
                        <div className="border border-[#F1CA00] p-5 rounded-2xl md:w-[450px] w-full flex flex-col items-center	cursor-pointer md:h-[250px] justify-center gap-3" onClick={() => { setAddTracker(true) }}>
                            <div className="heading"  >Add a tracker</div>
                            <img src={add} />
                        </div>
                        <div className="flex flex-col items-center rounded-xl md:w-[450px] md:h-[350px]">
                            <AddS />
                        </div>
                    </div>)
        }
    }
    const lottieOptions = {
        animationData: ButtonLottieAnimation,
        loop: false,
        autoplay: false,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const onChangeTracker = (values) => {
        setclassnameValue(true)
        console.log(`Clicked on item at index `);
        setChangeTracket(values)
        setAddTracker(false)
        console.log(changeTracker)
    };

    const changeTooldView = () => {
        setAddTracker(false)
    }
    const getImage=(each)=>{
        switch(each.name){
            case 'Gold':return <img src={gold} alt={each.name} className="w-2/5" />
            case 'PPF': return <img src={pff} alt={each.name} className="w-2/5" />;
            case 'Savings':return <img src={savings} alt={each.name} className="w-2/5" />;
            case 'Mutual Funds': return <img src={mutualfunds} alt={each.name} className="w-2/5" />;
            case 'Stocks':return <img src={stocks} alt={each.name} className="w-2/5" />
            case 'Bonds' : return <img src={bonds} alt={each.name} className="w-2/5" />
            default : return <img src={savings} alt={each.name} className="w-2/5" />;
        }
    }

    return (    
        <>
        
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 p-4 md:p-1 md:pl-52 md:pt-4 items-start justify-center">
            {  loader 
           &&
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
                // className="loader"
                >
                    <CircularProgress color="inherit" />
                </Backdrop>}
            <div className="flex flex-col md:col-span-3 gap-5 md:gap-10">
            <div className="text-2xl md:text-3xl leading-normal font-bold" style={{color: "#FFF",fontFamily:'Manrope'}}>Investment Tracker</div>
                <div className=" text-white border border-[#707070] items-center justify-between p-8 rounded-xl md:h-50 bg-[#2B2B2B]">
                    <div className=""> 
                    <div className="float-right">Net Worth</div>
                        <div className="flex gap-3 items-center ">
                            <div className="text-2xl md:text-7xl font-inter font-bold p-0 md:pt-8">₹ {total?.toFixed(1)}</div>
                            <div className={currentTotal>=0?"bg-green-700 text-green-200 rounded-sm p-0.5 flex m-0 md:mt-6":"bg-red-700 text-red-200 rounded-sm p-0.5 flex m-0 md:mt-6"}>
                                <div className="inline text-xs md:text-sm">{currentTotal?.toFixed(2)}%</div>
                                <img className="inline" src={group} />
                            </div>
                        </div>
                    </div>
                    <div className={!classnameValue ?`block md:flex justify-between pt-4 md:pt-8 pr-8 md:pr-0`:` md:flex justify-between hidden pt-4 md:pt-8`}>
                        {/* <div className="leading-normal font-normal text-sm" style={{fontFamily: "Inter"}}>Your net worth increase by ₹12,000than last month</div> */}
                        <div className="leading-normal font-normal text-xs" style={{color: "#A5A5A5",fontFamily:"Manrope"}}>Last Updated </div>
                    </div>
                </div>
                <div className="pb-10 md:pb-12 flex overflow-scroll w-full md:grid md:grid-rows-2 md:grid-flow-col md:gap-4 md:p-4 Flipped mt-4 pt-4 p-4 ">
                    {
                 listOfTrackersData?.map((item) => {
                            return (
                                <div className={item.name !== changeTracker?.name ? "flex m-2 min-w-[300px] bg-[#2B2B2B] rounded-2xl	md:w-44 hover:cursor-pointer Content h-[150px]" : "flex m-2 min-w-[300px] bg-[#2B2B2B] rounded-2xl	md:w-44 border border-[#F1CA00] Content h-[150px]"} onClick={() => { onChangeTracker(item) }}>

                                    {getImage(item)}
                                    <div className="text-white pt-2 pb-2 flex flex-col  justify-around">
                                        <div className="break-all">
                                            <div className="text-[#707070]">{item.name}</div>
                                            <div className="text-2xl">{Number(item?.currentValues)?.toFixed(1)}</div>
                                        </div>
                                        <div className={item?.percentage?.toFixed(1)>=0?"flex bg-green-700 rounded p-0.5 break-all mr-8":"flex bg-red-700 rounded p-0.5 break-all mr-8"}>
                                            <span className={item?.percentage?.toFixed(1)>=0?"text-green-200 text-xs":"text-red-200 text-xs"}>{(item?.percentage)?.toFixed(1)}</span>
                                            <img src={group} />
                                        </div>
                                     </div>
                                     </div>
                                    )})
                    }

                </div>
            </div>
            <div className="md:col-span-2 md:p-10 h-full flex items-center md:justify-center md:border-l md:border-white">
                {
                    addTracker ? <NewTracker navugateToOldView={()=>{changeTooldView()}} /> : renderTrackerDetail(changeTracker)
                }
            </div>
        </div>
          
            
              
          
        
        </>
        
    )
}

export default InverstmentTracker;