import React ,{useState,useEffect}from "react";
import "./SipCalcuater.css"

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import DoughnutChart from "../charts/DoughnutChart";

import AddS from "../../adds/adds";
import expert from "../../assets/Group 1453.svg"
import sbi from "../../assets/sbi.svg"
import axis from "../../assets/axis.svg"
import bank from "../../assets/bacnk1234.svg"
import bajaj from "../../assets/bajaj.svg"
import bank1 from "../../assets/bank1.svg"
import bank2 from "../../assets/bank23.svg"
import hdfc from "../../assets/hdfc.svg"
import icici from "../../assets/icici.svg"
import invesco from "../../assets/invesco.svg"
import kotak from "../../assets/kotak.svg"
import paytm from "../../assets/paytm.svg"
import sbi1 from "../../assets/sbi1.svg"

import Lottie from "react-lottie";
import ButtonLottieAnimation from "../../utils/Button.json"
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion, { accordionClasses } from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';



const Sipcalculater = () =>{
    
const [data, setData] = useState([]);
const [sip, setSip] = useState(20000);
const [years,setYears]=useState(4)
const [expectedValue,setExpectedValue]=useState(sip)
const [percent,setPercent]=useState(10);


const [index, setIndex] = useState(0);

const images=[
  { a:sbi},
  { a:axis},
  { a:bank},
  { a:kotak},
  { a:bank1},
  { a:bank2},
  { a:hdfc},
  { a:icici},
  { a:invesco},
  { a:kotak},
  { a:paytm},
  { a:sbi1},
  { a:sbi},
  { a:sbi},  
]
  
 
  const SIP = [
    {
      value: 500,
      label: <span style={{color:'white',fontSize:'large'}}>500</span>,
      
    },
    {
      value: 500000,
      label: <span style={{color:'white',fontSize:'large'}}>5 Lacs</span>,
    },
  ];
  const percentage = [
    {
      value: 5,
      label: <span style={{color:'white',fontSize:'large'}}>5%</span>,
    },
    {
      value: 25,
      label: <span style={{color:'white',fontSize:'large'}}>25%</span>,
    },
  ];
  const yearLabels = [
    {
      value: 2,
      label: <span style={{color:'white',fontSize:'large'}}>2 Years</span>,
    },
    {
      value: 3,
      label: <span style={{color:'white',fontSize:'large'}}></span>,
    },
    {
      value: 4,
      label: <span style={{color:'white',fontSize:'large'}}></span>,
    },
    {
      value: 5,
      label: <span style={{color:'white',fontSize:'large'}}></span>,
    }
    ,{
      value: 6,
      label: <span style={{color:'white',fontSize:'large'}}></span>,
    },
    {
      value: 7,
      label: <span style={{color:'white',fontSize:'large'}}></span>,
    },{
      value: 8,
      label: <span style={{color:'white',fontSize:'large'}}></span>,
    },
    {
      value: 9,
      label: <span style={{color:'white',fontSize:'large'}}>10 Years</span>,
    },
  ];
  
  // function calculateSIP(principal, rate, time, frequency) {
  //   console.log(principal,rate,time,frequency)
  //   // Convert rate to monthly interest rate
  //   const monthlyRate = (rate / 100) / 12;
    
  //   // Convert time to months
  //   const totalMonths = time * frequency;
    
  //   // Calculate SIP
  //   const numerator = principal * (Math.pow(1 + monthlyRate, totalMonths) - 1);
  //   const denominator = monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
    
  //   const sipAmount = numerator / denominator;
  //   const totalInvestment = principal * totalMonths;
  //   const totalReturns = sipAmount * totalMonths - totalInvestment;
    
  //   return {
  //     sipAmount: sipAmount.toFixed(2),
  //     totalInvestment: totalInvestment.toFixed(2),
  //     totalReturns: totalReturns.toFixed(2)
  //   };
  // }

  useEffect(()=>{
    let i=Number(percent)/(100*12);
// console.log(i,Number(sip)*((Math.pow(1+i,12*Number(years))-1)/i)*(1+i))

// P × ({[1 + i]^n – 1} / i) × (1 + i)
// M is the amount you receive upon maturity.
// P is the amount you invest at regular intervals.
// n is the number of payments you have made.
// i is the periodic rate of interest.



let m=Number(sip)*((Math.pow(1+i,12*Number(years))-1)/i)*(1+i)
// let m=calculateSIPMaturityAmount(sip,percent,years,12)
// let m=calculateSIP(Number(sip),Number(percent),Number(years),12)
console.log('expected value',m)
setExpectedValue(m)
setDoughnutData(
  {
    // labels:['SIP','expected returns'],
    datasets:[
     { 
      label:'Expected Returns',
      data:[sip*Number(years*12),m],
       cutout:'90%'
      }
      ,
    ]
  }
)

// console.log(expectedValue)
  },[sip,percent,years])
  const textCenter={
    id:'textCenter',
  beforeDatasetsDraw(chart,args,pluginOptions){
  const {ctx,data,width}=chart;
 
  ctx.save();
  
  ctx.font='15px sans-sarif';
  ctx.textBaseline='middle'
  ctx.textAlign='center'
  ctx.fillStyle='white'

 
  ctx.fillText("Your Investment",width/2,80)
  ctx.restore()
  ctx.font='30px sans-sarif';
  ctx.textBaseline='middle'
  ctx.textAlign='center'
  ctx.fillStyle='#FEC008'
  ctx.fillText(`₹ ${data.datasets[0].data[0]} `,width/2,110)
  ctx.restore()
  ctx.font='15px sans-sarif';
  ctx.textBaseline='middle'
  ctx.textAlign='center'
  ctx.fillStyle='white'
  

  ctx.fillText(`Future value of investment`,width/2,150)
  ctx.font='30px sans-sarif';
  ctx.textBaseline='middle'
  ctx.textAlign='center'
  ctx.fillStyle='#0BD19D'
  ctx.fillText(`₹ ${Math.round(data.datasets[0].data[1])}`,width/2,180)  
}
  }

    const [doughnutData,setDoughnutData]=useState({
        // labels:['SIP','expected returns'],
        datasets:[
         { 
          label:'sip',
          data:[sip,expectedValue],
          cutout:'90%'
          }
          ,
          
        ],
        
      })
      const lottieOptions = {
        animationData: ButtonLottieAnimation,
        loop: true,
        autoplay: false,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
  
  const details =[
    {
    heading:"How much can I invest in a SIP?",
    subheading:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      heading:"What is the maximum tenure of a SIP?",
      subheading:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      heading:"Are SIPs similar to mutual funds?",
      subheading:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },

  ]

    return(
        <>
            <div className="sipCalculator md:pl-32 grid-rows-3">
                <div className="sip-section1 row-span-2">
                   <div className="sip-section1-1">
                 
          <span>SIP Amount</span> 
  <Box sx={{ padding:'20px' ,minWidth:'200px' }}>
      <Slider
        defaultValue={20000}
        // getAriaValueText={valuetext}
        value={sip}
        step={500}
        valueLabelDisplay="auto"
        marks={SIP}
        onChange={(e)=>setSip(e.target.value)}
       
          min= {500}
          max= {500000}
         
         
        sx={{
          // zIndex:0,
          color:'#FEC008',
          // backgroundColor:'white'
          '& .MuiSlider-thumb':{
            color:'white'
          },
          '& .MuiSlider-rail':{
            color:'white',
            height:10
          },
          '& .MuiSlider-track': {
            height: 10,
            borderRadius: 2,
        },
        }}
      />
    </Box>
   
                    </div>
                    <div className="sip-section1-2"> 
                    <h4>Expected Return Rate(p.a)</h4>
    <Box sx={{padding:'20px',minWidth:'200px'}}>
      <Slider
        defaultValue={10}
        // getAriaValueText={valuetext}
        step={1}
        value={percent}
        valueLabelDisplay="auto"
        marks={percentage}
        onChange={(e)=>setPercent(e.target.value)}
       
          min= {5}
          max= {25}
         
       
        sx={{
          color:'#F34437',
          // backgroundColor:'white'
          '& .MuiSlider-thumb':{
            color:'white'
          },
          '& .MuiSlider-rail':{
            color:'white',
            height:10
          },
          '& .MuiSlider-track': {
            height: 10,
            borderRadius: 2,
        },
        }}
      />
    </Box>
    </div>
                    <div className="sip-section1-3">
                      <h4>Investment Duration</h4>
    <Box sx={{padding:'30px'}}>
      <Slider
        defaultValue={10}
        // getAriaValueText={valuetext}
        step={1}
        value={years}
        valueLabelDisplay="auto"
        marks={yearLabels}
        onChange={(e)=>setYears(e.target.value)}
       
          min= {2}
          max= {10}
        
        sx={{
          color:'#0BD19D',
          // backgroundColor:'white'
          '& .MuiSlider-thumb':{
            color:'white'
          },
          '& .MuiSlider-rail':{
            color:'white',
            height:10
          },
          '& .MuiSlider-track': {
            height: 10,
            borderRadius: 2,
        },
        }}
      />
    </Box></div>
                    <div className="sip-section1-4">
                    <div style={{width:'16rem'}}>
      <DoughnutChart chartData={doughnutData} textCenter={textCenter} options={
        {backgroundColor: [
          '#0BD19D',
          '#FEC008'   
        ],
        borderColor:'transparent'
      }
      }/>
        </div>
                    </div>
                </div>
                <div className="sip-section2 row-span-2">
                  <div className="p-0 md:pb-20">SIP Calculator - FAQs</div>
                <div className="">
                <AccordionGroup
                  sx={{
                    maxWidth: 400,
                    [`& .${accordionClasses.root}`]: {
                      marginTop: '0.5rem',
                      transition: '0.2s ease',
                      '& button:not([aria-expanded="true"])': {
                        transition: '0.2s ease',
                        paddingBottom: '0.625rem',
                      },
                      '& button:hover': {
                        background: 'transparent',
                      },
                    },
                    [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
                      bgcolor: 'background.level1',
                      borderRadius: 'md',
                      borderBottom: '1px solid',
                      borderColor: 'background.level2',
                    },
                    '& [aria-expanded="true"]': {
                      boxShadow: (theme) => `inset 0 -1px 0 ${theme.vars.palette.divider}`,
                    },
                  }}
                >
                  {
                    details?.map((item)=>{
                      return(
                        <div >
                            <Accordion className="p-0 md:pt-2.5">
                              <AccordionSummary>{item?.heading}</AccordionSummary>
                              <AccordionDetails>{item.subheading}</AccordionDetails>
                            </Accordion>
                        </div>
                      )
                    })
                  }
                  
                </AccordionGroup>
                </div>
                </div>
                <div className="sip-section3 hidden md:block p-3 row-span-3">
                  <div className="flex gap-4">
                    <div>
                        <div className="flex flex-col gap-2">
                          <span className="text-2xl">Zero Commisons</span>
                          <span className="text-sm leading-normal " style={{color:"#fff",fontFamily:"Manrope"}}>Invest in direct Mutual Funds</span>
                        </div>
                        <div className="flex items-center pt-2 gap-5">
                            <div className="flex flex-col">
                              <span className="text-sm" style={{fontFamily:"Manrope"}}>No middlemen,</span>
                              <span className="text-sm"style={{fontFamily:"Manrope"}}>No extra charge.</span>
                            </div>
                          <div className="rounded-lg p-3" style={{background: "#FFCE00"}}>
                            <button className="text-xs" style={{color:"black",background: "#FFCE00"}}>View all</button>
                          </div>
                        </div>
                    </div>
                   
                        <div className="flex w-full md:grid md:grid-cols-4 md:gap-4 ">{
                          images?.map((item)=>{
                            return(
                              <div className="bg-[#2B2B2B] p-2 rounded-sm flex justify-center">
                                <img src={item.a} width='25x'></img>
                              </div>
                            )
                          })
                          }</div>
                    
                  </div>
                </div>
                <div className="hidden md:block sip-section4">
                <div className="block p-5">
                        <div className="flex items-center justify-between ">
                           
                              <span className="text-xl">Talk to Experts</span>
                              <img  src={expert}/>
                        </div> 
                      
                        <div className="relative h-6 " >
                              <Lottie
                                  options={lottieOptions}
                                  label="View"
                              />
                              <div className="absolute text-black font-bold text-xs cursor-pointer top-[20%] left-[45%]">View</div>
                    
                          </div>
                        
                    </div>
                </div>
                <div className="sip-section5 hidden md:block">
                    <AddS />
                </div>

            </div>
        </>
    )
}

export default Sipcalculater;

