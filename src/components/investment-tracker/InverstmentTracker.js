import React from "react"
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

const InverstmentTracker = () => {


    const data=[
        {
        img: savings,
        name: "savings",
        values: "₹ 21.9K",
        persentage: "11.5%",
        },
        // {
        //     img: mutualfunds,
        //     name: "savings",
        //     values: "₹ 21.9K",
        //     persentage: "11.5%",
        //     },
    ]
    const lottieOptions = {
        animationData: ButtonLottieAnimation,
        loop: true,
        autoplay: false,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

      const handleDivClick = () => {
        console.log(`Clicked on item at index `);
        // You can perform any actions you want here when the div is clicked
      };
    
    return (
        <div className="it-grid">
            
             <div className="it-left-body">
                <div className="it-body-data">
                    <div className="net-worth">Net Worth</div>
                    <div className="data">
                        <div className="investment">₹ 41.9K</div>
                        <div className="group">
                            <div className="persentage">11.5%</div>
                            <img className="group-img" src={group} />
                        </div>
                        
                    </div>
                    <div className="it-amount">
                        <div className="net-amount">Your net worth increase by ₹12,000than last month</div>
                        <div className="updated">Last Updated Mar 29,2023</div>
                      </div>
                </div>
                <div className="it-left-body-footer">   
                    {
                        data.map((item)=>{
                            return(
                                <>
                                    <a className="it-data" onClick={() => handleDivClick()}>
                                        <div><img src={item.img} /></div>
                                        <div className="stocks">
                                            <div className="name">{item.name}</div>
                                            <div className="value">{item.values}</div>
                                            <div className="value-1">{item.persentage} <img src={group} /></div>
                                        </div>
                                        <div className="navigation">
                                            <button className="navigate-button"><img src={arrow} /></button>
                                        </div>
                                    </a>
                                </>
                            )
                        })
                    }

                </div>
            </div>  
            <div className="side-bar" > <hr /> </div>
             <div className="it-right-body">
                    <div className="add-tracker">
                        <div className="heading">Add a tracker</div>
                        <button className="add"><img  src={add}/></button>
                    </div>
                    <div className="learn-investment">
                        <div>
                            <div>
                            <span className="data" >Learn</span><br />
                            <span className="data">How to choose</span><br />
                            <span className="data">right investment</span><br />
                            </div>
                            
                            <div className="Button__login learn">
                                <button
                                >
                                    <div style={{ width: 258, height: 45 }}>
                                    <Lottie
                                        options={lottieOptions}
                                    />
                                    </div>
                                    <h3 className="learn-more">Learn Now</h3>
                                </button>
                                </div>
                        </div>
                    </div>
            </div>         

        </div>
    )
}

export default InverstmentTracker;