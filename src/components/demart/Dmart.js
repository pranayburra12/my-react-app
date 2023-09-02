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
import openDemat from '../../assets/open-demat.png'
const Dmart = () => {
    const partners=[{
        name:'upstocks',
        bwLogo:upstock,
        hover:'',
        navigatedUrl:'https://upstox.com/open-demat-account/v2/?f=5RAYEY'
    },
    {
        name:'Kite',
        bwLogo:upstock3,
        hover:'',
        navigatedUrl:'https://zerodha.com/open-account/'
    },
    {
        name:'AngelOne',
        bwLogo:upstock2,
        hover:'',
        navigatedUrl:'https://www.angelone.in/sem/open-demat-account'
    },
    {
        name:'Motilal',
        bwLogo:upstock1,
        hover:'',
        navigatedUrl:'https://www.motilaloswal.com/'
    },
    

]
    return (
        <div className="text-white flex flex-col h-screen mb-36 md:pl-24 md:flex-row md:justify-around md:h-full md:mb-0">
           <div className="flex flex-col justify-around">
            <div className="flex flex-col gap-3 p-0 md:pt-14">
                {/* <span className="">Open your</span> */}
                <img src={openDemat} className="w-[250px] mt-3 "/>
                {/* <img src={dematInstant} className="w-40 mt-3"/> */}
            </div>
            <div className="hidden md:flex w-[500px] h-[400px]">
                <AddS />
            </div>
           </div>
           <div className="flex flex-col justify-end md:w-1/3">
               <div className="flex items-center justify-between  md:pb-12">
                    <span className=" border-b-[1px] pb-2 text-xl" style={{borderColor: "#A5A5A5"}}>Our Partners</span>
                    <span className="text-sm" style={{color: "#A5A5A5"}}>select below</span>
                </div>
            <div className="m-2 flex flex-col justify-around h-[70%]">
            {
                partners.map((each)=>{
                    return (
                        <div className="text-lg p-4 md:pt-2 md:pb-5  border-b-[1px]  flex items-center  justify-between cursor-pointer" style={{borderColor: "#A5A5A5"}}>
                            <span className="w-16 md:w-auto">
                                <a href={each.navigatedUrl} target="_blank">
                                <img src={each.bwLogo} />
                                </a>
                                </span>
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
