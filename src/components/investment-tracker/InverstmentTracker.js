import React, { useEffect, useState } from "react"
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



    const listOfTrackers = [
        {
            img: savings,
            trackerName: "stocks",
            label: 'Stocks',
            investedAmount: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: savings,
            trackerName: "savings",
            label: 'Savings',
            investedAmount: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            trackerName: "bonds",
            label: 'Bonds',
            investedAmount: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            trackerName: "gold",
            label: 'Gold',
            investedAmount: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            trackerName: "ppf",
            label: 'PPF',
            investedAmount: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            trackerName: "mutual-funds",
            label: 'Mutual Funds',
            investedAmount: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            trackerName: "lands",
            label: 'Custom',
            investedAmount: "₹ 21.9K",
            persentage: "11.5%",
        },
        {
            img: stocks,
            trackerName: "fix deposit",
            label: 'Custom',
            investedAmount: "₹ 21.9K",
            persentage: "11.5%",
        },
    ]

    const [listOfTrackersData, setListOfTrackers] = useState()

    useEffect(() => {
        getAllTrackers();
    }, [addTracker])

    const getAllTrackers = () => {
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
                setLoader(true)
              }
          })
          .catch(error => console.log('error', error));
    }



    const renderTrackerDetail = (tracker) => {
        // setAddTracker(false)
        switch (tracker?.label) {
            case 'Stocks': return <Stocks  tracker={changeTracker}/>
            case 'Bonds': return <Bonds
                subHEading={"Edit/Manage"}
                heading={"Bonds"}
            />
            case 'Gold': return <Gold
                subHEading={"Edit/Manage"}
                heading={"Gold"}
                currentValue={"Current Saving"}
                addSaving={"Add Saving"}
                removeSaving={"Remove Saving"}
            />
            case 'Savings': return <Savings
                subHEading={"Edit/Manage"}
                heading={"Saving"}
                currentValue={"Current Saving"}
                addSaving={"Add Saving"}
                removeSaving={"Remove Saving"}
            />
            case 'PPF': return <PPF
                subHEading={"Edit/Manage"}
                heading={"Public Provide Fund"}
                currentValue={"PPF Value"}
                addSaving={"Invested Amount"}
                removeSaving={"Remove Founds"}
            />

            case 'Mutual Funds': return <MutualFunds  tracker={changeTracker}/>
            case `${tracker?.label}`: return <CustomTracker
                subHEading={"Edit/Manage"}
                heading={"Custom Tracker Name"}
                currentValue={"Current Saving"}
                addSaving={"Value at the time of investment"}
                removeSaving={"Current Value"}
                changeTracker={tracker}
                navugateToOldView={changeTooldView}
            />
            case "newTracker":
            default:
                return (
                    <div className="flex flex-col items-center text-white gap-5">
                        <div className="border border-[#F1CA00] p-5 rounded-2xl w-[50%] flex flex-col items-center	cursor-pointer" onClick={() => { setAddTracker(true) }}>
                            <div className="heading"  >Add a tracker</div>
                            <img src={add} />
                        </div>
                        <div className="flex flex-col items-center border border-white rounded-3xl">
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


    return (    
        <>
        {
            loader 
            ? 
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 p-4 md:p-1 md:pl-40 items-start justify-center">
            <div className="flex flex-col md:col-span-3 gap-0 md:gap-14">
            <div className="text-2xl md:text-6xl leading-normal font-bold" style={{color: "#FFF",fontFamily:"Manrope"}}>Investment Tracker</div>
                <div className=" text-white border border-slate-200 items-center justify-between p-8 rounded-xl md:h-50">
                    <div className=""> 
                    <div className="float-right">Net Worth</div>
                        <div className="flex gap-3 items-center ">
                            <div className="text-sm md:text-3xl md:text-6xl font-semibold p-0 md:pt-8">₹ 41.9K</div>
                            <div className="bg-green-700 rounded-sm p-0.25 flex m-0 md:mt-6">
                                <div className="inline text-green-200 text-xs md:text-sm">11.5%</div>
                                <img className="inline" src={group} />
                            </div>
                        </div>
                    </div>
                    <div className={!classnameValue ?`block md:flex justify-between pt-4 md:pt-8 pr-8 md:pr-0`:`block md:flex justify-between hidden md:blockpt-4 md:pt-8`}>
                        <div className="leading-normal font-normal text-sm" style={{fontFamily: "Inter"}}>Your net worth increase by ₹12,000than last month</div>
                        <div className="leading-normal font-normal text-xs" style={{color: "#A5A5A5",fontFamily:"Manrope"}}>Last Updated Mar 29,2023</div>
                    </div>
                </div>
                <div className="pb-0 md:pb-12 flex overflow-scroll w-full md:grid md:grid-rows-2 md:grid-flow-col md:gap-4 md:p-4 Flipped mt-4 pt-4 p-4 ">
                    {
                 listOfTrackersData?.map((item) => {
                            return (
                                <div className={item.name !== changeTracker?.name ? "flex m-2 min-w-[100%] bg-[#2B2B2B] rounded-2xl	md:w-44 hover:cursor-pointer Content" : "flex m-2 min-w-[100%] bg-[#2B2B2B] rounded-2xl	md:w-44 border border-[#F1CA00] Content"} onClick={() => { onChangeTracker(item) }}>

                                    <img src={savings} alt={item.name} className="w-2/5" />
                                    <div className="text-white pt-2 pb-2 flex flex-col  justify-around">
                                        <div className="break-all">
                                            <div className="text-[#707070]">{item.name}</div>
                                            <div className="text-2xl">{Number(item?.currentValues)?.toFixed(1)}</div>
                                        </div>
                                        <div className="flex bg-green-700 rounded p-0.25 break-all mr-8">
                                            <span className="text-green-200 text-xs">{Math.abs(item?.percentage)?.toFixed(1)}</span>
                                            {item?.percentage && <img src={group} />}
                                        </div>
                                     </div>
                                     </div>
                                    )})
                    }

                </div>
            </div>
            <div className="col-span-2">
                {
                    addTracker ? <NewTracker navugateToOldView={changeTooldView} /> : renderTrackerDetail(changeTracker)
                }
            </div>
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

export default InverstmentTracker;