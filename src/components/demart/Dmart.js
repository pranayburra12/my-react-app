import React from "react";
import "./Dmart.css";
import dmat from '../../assets/dmat.svg'
import dematInstant from '../../assets/demat-instant.svg'
import AddS from "../../adds/adds";
import upstock from "../../assets/upstock.svg"
import upstock1 from "../../assets/upstock1.svg"
import upstock2 from "../../assets/upstock2.svg"
import upstock3 from "../../assets/upstock4.svg"
import upstock4 from "../../assets/ups6.svg"
import rightarrow from "../../assets/Group 1260.svg"
const Dmart = () => {
    const partners=[{
        name:'upstocks',
        bwLogo:upstock,
        hover:''
    },
    {
        name:'Kite',
        bwLogo:upstock1,
        hover:''
    },
    {
        name:'AngelOne',
        bwLogo:upstock2,
        hover:''
    },
    {
        name:'Motilal',
        bwLogo:upstock3,
        hover:''
    }

]
    return (
        <div className="text-white flex flex-col h-screen mb-36 md:pl-24 md:flex-row md:justify-around md:h-full md:mb-0">
           <div className="m-5 ">
            <div className="flex flex-col gap-3 pb-14">
                <span className="">Open your</span>
                <img src={dmat} className="w-40 mt-3 "/>
                <img src={dematInstant} className="w-40 mt-3"/>
            </div>
            <div className="hidden md:contents ">
                <AddS />
            </div>
           </div>
           <div className="m-5 md:w-1/3">
               <div className="flex items-center justify-between  demart-navigate pb-8 md:pb-28">
                    <span className=" border-b-[1px] pb-2 text-xl" style={{borderColor: "#A5A5A5"}}>Our Partners</span>
                    <span className="text-sm" style={{color: "#A5A5A5"}}>select below</span>
                </div>
            <div className="m-2 flex flex-col gap-5">
            {
                partners.map((each)=>{
                    return (
                        <div className="text-lg p-4 md:pt-6 md:pb-11  border-b-[1px]  flex items-center  justify-between cursor-pointer md:pb-14 " style={{borderColor: "#A5A5A5"}}>
                            <span className="w-16 md:w-auto"><img src={each.bwLogo} /></span>
                            <span><img src={rightarrow} /></span>
                        </div>
                    )
                })
               } 
                </div>   
           </div>
        </div>
    );
};

export default Dmart;
