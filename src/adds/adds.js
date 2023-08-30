import React from "react";
import adds from "../assets/Group1173.svg";
import star from "../assets/Vector.svg";
import Lottie from "react-lottie";
import ButtonLottieAnimation from "../../src/utils/Button.json"


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
        <div className="flex flex-col border border-slate-300 p-5 rounded-lg">
            <div className="flex justify-around items-center gap-10">
               
                    
                    <div className="flex flex-col">
                        <span >Learn</span>
                        <span>How To Trade</span>
                    </div>
               
              
                    <img src={adds}
                    className="w-[30%]"
                    />
                    {/* <img src={star} /> */}
              
            </div>
            <div className="mt-8">

                <div className="relative h-10" >
                    <Lottie
                        options={lottieOptions}
                        label="Learn Now"
                    />
                    <div className="absolute text-black font-bold text-xs cursor-pointer top-2 left-[35%]">Learn Now</div>
         
                </div>
                  </div>
        </div>
    )
}

export default AddS