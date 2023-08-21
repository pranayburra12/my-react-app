import React from "react";
import "./Dmart.css";
import dmat from '../../assets/dmat.svg'
import dematInstant from '../../assets/demat-instant.svg'
const Dmart = () => {
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
           <div className="m-5">
            <div className="flex flex-col m-10 gap-3">
                <span className="ml-2">Open your</span>
                <img src={dmat} className="w-40 mt-3 "/>
                {/* <span>Account</span> */}
                <img src={dematInstant} className="w-40 mt-5"/>
            </div>
           </div>
           <div className="m-5 md:w-1/3">
               <div><span className="border-white border-b-[1px] pb-2">Our Partners</span></div>
            <div className="m-2 flex flex-col gap-5">
            {
                partners.map((each)=>{
                    return <div className="text-lg pl-10 border-white border-b-[1px] p-10">{each.name}</div>
                })
               } 
                </div>   
           </div>
        </div>
    );
};

export default Dmart;
