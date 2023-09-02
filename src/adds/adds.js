import React from "react";
import adds from "../assets/Group1173.svg";
import star from "../assets/Vector.svg";
import Lottie from "react-lottie";
import ButtonLottieAnimation from "../../src/utils/Button.json"
import learntrade from '../assets/learn to trade.png'

const AddS = () => {

    const lottieOptions = {
        animationData: ButtonLottieAnimation,
        loop: true,
        autoplay: false,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };



    return (
        <div className="h-full w-full flex flex-col border border-slate-300 rounded-lg items-center justify-around p-4 mr-2">
            {/* <div className="flex justify-around items-center gap-10">
               
                    
                    <div className="flex flex-col">
                        <span >Learn</span>
                        <span>How To Trade</span>
                    </div>
               
              
                    <img src={adds}
                    className="w-[35%]"
                    />
                  
            </div> */}
            {/* <div className="flex flex-col justify-around items-center p-2"> */}
            <img src={learntrade} width='80%'/>
            

            <div className="w-[80%] relative h-10" >
                <Lottie
                    options={lottieOptions}
                    label="Learn Now"
                />
                <div className="absolute text-black font-bold text-xs cursor-pointer top-2 left-[36%]">Learn Now</div>
     
              </div>
            {/* </div> */}
            
        </div>
    )
}

export default AddS