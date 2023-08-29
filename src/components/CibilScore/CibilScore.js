import React from "react";

import dmat from '../../assets/CIBIL Score.svg'
// import dematInstant from '../../assets/demat-instant.svg'
import AddS from "../../adds/adds";
const CibilScore = () => {
    const partners=[{
        name:'upstocks',
        bwLogo:'',
        hover:''
    },
    {
        name:'Kite',
        bwLogo:'',
        hover:''
    },
    {
        name:'AngelOne',
        bwLogo:'',
        hover:''
    },
    {
        name:'Motilal',
        bwLogo:'',
        hover:''
    }

]
    return (
        <div className="text-white flex flex-col h-screen mb-36 md:pl-24 md:flex-row md:justify-around md:h-full md:mb-0">
           <div className="flex flex-col gap-10 m-5">
            <div className="flex flex-col gap-3">
                <span className="ml">Check your</span>
                <img src={dmat} className="w-40 mt-3 "/>
                {/* <span>Account</span> */}
                {/* <img src={dematInstant} className="w-40 mt-5"/> */}
            </div>
            <>
                <AddS />
            </>
           </div>
           <div className="m-5 md:w-1/3">
               <div><span className="border-white border-b-[1px] pb-2">Our Partners</span></div>
            <div className="m-2 flex flex-col gap-5">
            {
                partners.map((each)=>{
                    return <div className="text-lg pl-5 border-white border-b-[1px] p-5">{each.name}</div>
                })
               } 
                </div>   
           </div>
        </div>
    );
};

export default CibilScore;
