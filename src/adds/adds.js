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
        <div className="pb-9 pt-8 block">
            <div className="flex justify-around items-center ">
                <div className="grid gap-4">
                    <div>hbkb</div>
                    <div className="flex flex-col">
                        <span >Learn</span>
                        <span>How To Trade</span>
                    </div>
                </div>
                <div className="flex  items-center">
                    <img src={adds} />
                    <img src={star} />
                </div>
            </div>
            <div className="relative mt-8">

                <div style={{ height: 45 }}>
                    <Lottie
                        options={lottieOptions}
                        label="Learn Now"
                    />
                    <div className="absolute top-2 left-44 text-black font-bold cursor-pointer">Learn Now</div>
                </div>
            </div>
        </div>
    )
}

export default AddS