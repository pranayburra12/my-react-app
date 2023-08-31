import React from "react";

import dmat from '../../assets/CIBIL Score.svg'
// import dematInstant from '../../assets/demat-instant.svg'
import AddS from "../../adds/adds";
import credit from "../../assets/credeit.svg"
import bajaj from "../../assets/bajaj.svg"
import bb from "../../assets/bb.svg"
import rightarrow from "../../assets/Group 1260.svg"


const CibilScore = () => {
    const partners=[{
        name:'Credit Mantri',
        bwLogo:credit,
        hover:'',
        navigatedUrl:'https://www.creditmantri.com/credit-score/'
    },
    {
        name:'Bajaj Finserv',
        bwLogo:bajaj,
        hover:'',
        navigatedUrl:'https://www.bajajfinserv.in/check-free-cibil-score'
    },
    {
        name:'bankbazaar',
        bwLogo:bb,
        hover:'',
        navigatedUrl:'https://www.bankbazaar.com/cibil/cibil-credit-report.html'
    },

]
    return (
        <div className="text-white flex flex-col h-screen mb-36 md:pl-24 md:flex-row md:justify-around md:h-full md:mb-0">
           <div className="m-5">
            <div className="flex flex-col gap-3 p-0  md:pb-14">
                <span className="text-xl md:text-3xl leading-normal" style={{color:"#ffff",fontFamily: "Inter"}}>Check your </span>
                <span className="text-3xl md:text-7xl  leading-normal" style={{color:"#ffff",fontFamily: "Inter"}}>CIBIL Score </span>
            </div>
            <div className="hidden md:contents ">
                <AddS />
            </div>
           </div>
           <div className="m-5 md:w-1/3">
           <div className="flex items-center justify-between p-0 md:pb-14 ">
                    <span className=" border-b-[1px] pb-2 text-xl" style={{borderColor: "#A5A5A5"}}>Our Partners</span>
                    <span className="text-sm" style={{color: "#A5A5A5"}}>select below</span>
                </div>
            <div className="m-2 flex flex-col gap-5">
            {
                partners.map((each)=>{
                    return (
                            <div className="text-lg p-4 md:pt-2 md:pb-5 border-b-[1px]  flex items-center  justify-between cursor-pointer" style={{borderColor: "#A5A5A5"}}>
                                <span className="w-16 md:w-auto" >
                                    <a href={each.navigatedUrl} target="_blank">
                                        <img src={each.bwLogo} />
                                    </a>
                                </span>
                                <span ><img  src={rightarrow} /></span>
                            </div>
                    )
                })
               } 
                </div>   
           </div>
        </div>
    );
};

export default CibilScore;
