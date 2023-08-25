import React ,{useState,useEffect}from "react";
import "./SipCalcuater.css"

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import DoughnutChart from "../charts/DoughnutChart";


const Sipcalculater = () =>{
    
const [data, setData] = useState([]);
const [sip, setSip] = useState(20000);
const [years,setYears]=useState(4)
const [expectedValue,setExpectedValue]=useState(sip)
const [percent,setPercent]=useState(10);

  
 
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

    return(
        <>
            <div className="sipCalculator md:pl-32 ">
                <div className="sip-section1">
                   <div className="sip-section1-1">
                 
          <h4>SIP Amount</h4> 
  <Box sx={{ padding:'20px' }}>
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
    <Box sx={{padding:'20px'}}>
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
      <DoughnutChart chartData={doughnutData} textCenter={textCenter}/>
        </div>
                    </div>
                </div>
                <div className="sip-section2">
                    Faqs will come here
                </div>
                <div className="sip-section3">
                    zero commision ad
                </div>
                <div className="sip-section4">
                    talk to expert ad
                </div>
                <div className="sip-section5">
                    learn to trade ad
                </div>

            </div>
        </>
    )
}

export default Sipcalculater;

