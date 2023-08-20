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
  


  useEffect(()=>{
    let i=Number(percent)/(100*12*Number(years));
console.log(i,Number(sip)*((Math.pow(1+i,12*Number(years))-1)/i)*(1+i))

// P × ({[1 + i]^n – 1} / i) × (1 + i)
// M is the amount you receive upon maturity.
// P is the amount you invest at regular intervals.
// n is the number of payments you have made.
// i is the periodic rate of interest.



let m=Number(sip)*((Math.pow(1+i,12*Number(years))-1)/i)*(1+i)
setExpectedValue(m)
setDoughnutData(
  {
    labels:['SIP','expected returns'],
    datasets:[
     { 
      label:'Expected Returns',
      data:[sip*Number(years*12),m-sip*Number(years*12)],
       cutout:'90%'
      }
      ,
    ]
  }
)

console.log(expectedValue)
  },[sip,percent,years])
  const textCenter={
    id:'textCenter',
  beforeDatasetsDraw(chart,args,pluginOptions){
  const {ctx,data,width}=chart;
 
  ctx.save();
  ctx.font='20px sans-sarif';
  ctx.textBaseline='middle'
  ctx.textAlign='center'
  ctx.fillStyle='#FEC008'


  ctx.fillText(`SIP ${data.datasets[0].data[0]} `,width/2,100)
  ctx.restore()
  ctx.font='20px sans-sarif';
  ctx.textBaseline='middle'
  ctx.textAlign='center'
  ctx.fillStyle='#FEC008'
  

  ctx.fillText(`Expected amount ${Math.round(data.datasets[0].data[1])}`,width/2,150)
  }
  }

    const [doughnutData,setDoughnutData]=useState({
        labels:['SIP','expected returns'],
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
            <div className="sipCalculator md:pl-32">
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
          color:'#FEC008',

        }}
      />
    </Box>
   
                    </div>
                    <div className="sip-section1-2"> 
                    <h4>Expected Returns</h4>
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
          color:'#F34437'
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
          color:'#0BD19D'
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

