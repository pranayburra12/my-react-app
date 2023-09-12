import "./ExpenceMangement.css"
import React,{useState,useRef, useEffect} from "react"
import group from "../../assets/Group.svg"
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import dateUp from '../../assets/dateUP.svg'
import dateDown from '../../assets/dateDown.svg'
import { TextField } from "@mui/material";
import rightarrow from "../../assets/Group 1260.svg"
import AddS from "../../adds/adds";
import BarChart from "../charts/BarChart";
import DoughnutChart from '../charts/DoughnutChart'
import { useNavigate } from "react-router-dom";
import { GenerateNewToken } from "../utils/api";
import {api} from '../utils/constant'

import {
 
  Autocomplete, Button,Backdrop,CircularProgress
 
} from "@mui/material";
import calender from '../../assets/calender.svg'
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const baseUrl=api.baseUrl;

const today = dayjs();

const ExpenceMangement =()=>{

  const navigate = useNavigate();
  const [ExpenceData,setExpenceData]=useState();
  const [IncomeData,setIncomeData]=useState();
  const [loader,setLoader]=useState(false);
  const [monthlyExpensePercentage,setMonthlyExpencePercentage]=useState(
    
  );
  const [doughnutData,setDoughutData]=useState(
    {
      labels:['Food','Shopping','Payments','Others'],
      datasets:[
       { 
        label:['Expence'],
        data:[2000,4000,2500,3000],
         cutout:'70%'
        }
        ,
      ]
    }
  )
  const [bargraph,setBarGraph]=useState('monthly_income');
  const [ExpenceBarData,setExpenceBarData]=useState({
    labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets:[
     { 
      label:['Loadings'],
      // data:[monthlyData?.jan,monthlyData?.feb,monthlyData?.mar,monthlyData?.apr ,monthlyData?.may,monthlyData?.jun,monthlyData?.jul,monthlyData?.aug],
      // cutout:'90%'
      backgroundColor:'#0BD19D',
      barThickness:12  ,
      borderRadius:12,
      borderSkipped:false
        }
      ,
      
    ],
    
  })
  const [IncomeBarData,setIncomeBarData]=useState({
    labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets:[
     { 
      label:['Loading'],
      // data:[monthlyData?.jan,monthlyData?.feb,monthlyData?.mar,monthlyData?.apr ,monthlyData?.may,monthlyData?.jun,monthlyData?.jul,monthlyData?.aug],
      // cutout:'90%'
      backgroundColor:'#0BD19D',
      barThickness:12  ,
      borderRadius:12,
      borderSkipped:false
        }
      ,
      
    ],
    
  })
    const [selectedSections, setSelectedSections] = useState(null);
    const inputRef = useRef(null);
    const [selectedDate,setSelectedDates]=useState(today)
    const [data,setData]=useState({
      I:'',
      S:'',
      F:'',
      P:'',
      O:''
    })
    const handleDate=(current,DMY,change)=>{
        var d = new Date(current);
        if(DMY==='date'){
        d.setDate(d.getDate() + change);
    }else if(DMY=='month'){
        d.setMonth(d.getMonth() + change);
        // console.log(d.getMonth())
    }
    else if(DMY==='year'){
        d.setFullYear(d.getFullYear() + change);
    }
        return dayjs(d);
    }
    const setSelectedSectionType = (selectedSectionType) => {
        console.log(selectedSectionType)
      inputRef.current?.focus();
      setSelectedSections(selectedSectionType.split('_')[0]);
      
      switch(selectedSectionType){
        case 'day_up': setSelectedDates(prev=>handleDate(prev,'date',1))
        break;
        case 'day_down':setSelectedDates(prev=>handleDate(prev,'date',-1))
        break;
        case 'month_up': setSelectedDates(prev=>handleDate(prev,'month',1))
        break;
        case 'month_down':setSelectedDates(prev=>handleDate(prev,'month',-1))
        break;
        case 'year_up': setSelectedDates(prev=>handleDate(prev,'year',1))
        break;
        case 'year_down':setSelectedDates(prev=>handleDate(prev,'year',-1))
        break;
      }
    };
    const renderBar=(key)=>{
      switch(key){
        case 'monthly_income':return <BarChart chartData={IncomeBarData}/>;
        case 'monthly_expence':return <BarChart chartData={ExpenceBarData}/> ;
        default:return <BarChart chartData={IncomeBarData}/>;
      }
    }
    const getIncomeAndExpence=()=>{
      setLoader(true)
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
  myHeaders.append("Content-Type", "application/json");
    
  var requestOptions = {
    method: 'Post',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`${baseUrl}/finance/getTotalWholeExpenseData`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if( result?.message === "Token Invalid/Expired"){
          let payload = {
            refreshToken  : localStorage.getItem('refresh_token')
          }
          let route = {
            payload :{ refreshToken  : localStorage.getItem('refresh_token')},
            route:window.location.pathname,
            navigate : navigate
          }
          GenerateNewToken(route,payload,navigate)
        }else{
          console.log(result.data[0])
          setExpenceData(result.data[0])
          setMonthlyExpencePercentage(result.data[0]?.monthlyPercentageSumArray)
          setDoughutData(
            {
              labels:['Shopping','Payments','Food','Others'],
              datasets:[
               { 
                label:['Expense'],
                data:[ 
                Number(result?.data[0]?.totalPercentageSumArray?.shopping_total_percentage || 0.00),
               Number(result?.data[0]?.totalPercentageSumArray?.payment_total_percentage || 0.00),
               Number(result?.data[0]?.totalPercentageSumArray?.food_total_percentage || 0.00),
                Number(result?.data[0]?.totalPercentageSumArray?.others_total_percentage || 0.00)],
                 cutout:'80%'
                }
                ,
              ]
            }
          )
          setExpenceBarData({
            labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            datasets:[
             { 
              label:'Shopping',
              data:[
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==1)[0]?.shopping_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==2)[0]?.shopping_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==3)[0]?.shopping_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==4)[0]?.shopping_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==5)[0]?.shopping_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==6)[0]?.shopping_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==7)[0]?.shopping_monthly_expense || 0,
                Number(result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==8)[0]?.shopping_monthly_expense || 0),
                Number(result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==9)[0]?.shopping_monthly_expense || 0),
                Number(result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==10)[0]?.shopping_monthly_expense || 0),
                Number(result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==11)[0]?.shopping_monthly_expense || 0),
                Number(result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==12)[0]?.shopping_monthly_expense || 0)
              ],cutout:'80%',
              // cutout:'90%'
              // barPercentage: 0.25,
              // categoryPercentage: 0.5,
              backgroundColor:'#FF426F',
              barThickness:window?.innerWidth>600?12:5,
        
              borderRadius:12,
              borderSkipped:false,
              
          }
              ,
              { 
                label:['Payments'],
                data:[
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==1)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==2)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==3)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==4)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==5)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==6)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==7)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==8)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==9)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==10)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==11)[0]?.payment_monthly_expense || 0,
                  result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==12)[0]?.payment_monthly_expense || 0
                ],
                cutout:'80%',
                backgroundColor:'#FEC008',
                barThickness:window?.innerWidth>600?12:5,
                borderRadius:12,
                borderSkipped:false
            },
            { 
              label:['Food'],
              data:[
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==1)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==2)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==3)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==4)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==5)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==6)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==7)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==8)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==9)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==10)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==11)[0]?.food_monthly_expense || 0,
                result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==12)[0]?.food_monthly_expense || 0
              ],
              cutout:'80%',
              backgroundColor:'#3F6FD9',
              barThickness:window?.innerWidth>600?12:5 ,
              borderRadius:12,
              borderSkipped:false
          },
          { 
            label:['Others'],
            data:[
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==1)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==2)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==3)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==4)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==5)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==6)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==7)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==8)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==9)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==10)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==11)[0]?.others_monthly_expense || 0,
              result.data[0]?.monthlyExpenseArray?.filter(each=>each.month==12)[0]?.others_monthly_expense || 0
            ],
            cutout:'80%',
            backgroundColor:'#9772FF',
            barThickness:window?.innerWidth>600?12:5 ,
            borderRadius:12,
            borderSkipped:false
        }
              
            ],
            
          

            
          }
            
          )
        }
        setLoader(false)
    })
    .catch(error => {console.log('error', error)
  });
   
    fetch(`${baseUrl}/finance/getTotalWholeIncomeData`, requestOptions)
    .then(response => response.json())
    .then(result => {
      // console.log(result)
      if( result?.message === "Token Invalid/Expired"){
          let payload = {
            refreshToken  : localStorage.getItem('refresh_token')
          }
          let route = {
            payload :{ refreshToken  : localStorage.getItem('refresh_token')},
            route:window.location.pathname,
            navigate : navigate
          }
          GenerateNewToken(route,payload,navigate)
        }else{
          console.log(result.data[0])
          setIncomeData(result.data[0].totalIncomeArray?.total_income)
           setIncomeBarData(
           {
              labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
              datasets:[
               { 
                label:['Income'],
                data:[
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==1)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==2)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==3)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==4)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==5)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==6)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==7)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==8)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==9)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==10)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==11)[0]?.monthly_income || 0,
                  result.data[0]?.monthlyIncomeArray?.filter(each=>each.month==12)[0]?.monthly_income || 0
                ],
                // cutout:'90%'
                backgroundColor:'#0BD19D',
                barThickness:12  ,
                borderRadius:12,
                borderSkipped:false
                  }
                ,
                
              ],
              
            })
          
        }
        setLoader(false)
    })
    .catch(error => {console.log('error', error)
    setLoader(false)
  });

    }
useEffect(()=>{
  getIncomeAndExpence()   
},[])
const getKey=(key)=>{
  switch(key){
    case 'I':return 'incomeValue'
    case 'S':return 'shoppingValue'
    case 'P':return 'paymentValue'
    case 'F':return 'foodValue'
    case 'O':return 'othersValue'
  }
}
const operations=(event)=>{
  setLoader(true)
  // console.log(data[event.target.name])
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  date: selectedDate.toISOString().split('T')[0],
  modeOfOperation:event.target.name,
  [getKey(event.target.name)]:data[event.target.name]
}
);
// console.log(raw)
setData({...data,[event.target.name]:''})

var requestOptions = {
  method: 'Post',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${baseUrl}/finance/addFinance`, requestOptions)
  .then(response => response.json())
  .then(result => {
    // console.log(result)
    if( result?.message === "Token Invalid/Expired"){
        let payload = {
          refreshToken  : localStorage.getItem('refresh_token')
        }
        let route = {
          payload :{ refreshToken  : localStorage.getItem('refresh_token')},
          route:window.location.pathname,
          navigate : navigate
        }
        GenerateNewToken(route,payload,navigate)
      }else{
        // console.log(result)
        getIncomeAndExpence()
      }
      setLoader(false)
  })
  .catch(error => {console.log('error', error)
  setLoader(false)
});

}
const setValues= (e)=>{
  setData({...data,[e.target.name]:e.target.value})
}
const textCenter={
  id:'textCenter',
beforeDatasetsDraw(chart,args,pluginOptions){
const {ctx,data,width,height}=chart;

ctx.save();
ctx.font='24px sans-sarif';
  ctx.textBaseline='middle'
  ctx.textAlign='center'
  ctx.fillStyle='#FEC008'

 
  ctx.fillText(`Expenses`,width/2,(height*0.6))
  ctx.restore()
}
}

    return(
        <div className="grid grid-cols-1 md:grid-cols-6 p-2 md:p-1 md:pl-52 md:pt-20 justify-center gap-5">
          {loader&& <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
           <div className=" text-white md:flex md:justify-around md:overflow-hidden gap-2 overflow-scroll w-[full] md:col-span-3 md:row-span-1 flex p-4 md:h-32">
                <div className="bg-[#2B2B2B] md:row-span-1 rounded-lg min-w-[98%] md:min-w-[30%]">
                  <div className={bargraph=='monthly_income'?"text-white flex flex-col-reverse items-center justify-center h-full cursor-pointer border border-yellow-300 rounded-lg":"text-white flex flex-col-reverse items-center justify-center h-full cursor-pointer "} onClick={()=>setBarGraph('monthly_income')}>                                          
                        <div className="text-[#707070] ">Total Income</div>
                            {/* <div className="text-xs flex justify-around"><span className='bg-[#707070] pl-1.5 pr-1.5 rounded-sm'>3 Mon</span></div> */}
                          <div className="text-xl font-bold">₹ {IncomeData}</div>
                        {/* <div className="text-sm flex justify-around"><span className='mix-blend-multiply bg-[#0BD19D] p-0.5 rounded-lg '>6.0%</span></div> */}

                                        </div>
                </div>
                <div className="bg-[#2B2B2B] md:row-span-1 rounded-lg min-w-[98%] md:min-w-[30%]">
                  <div className="text-white flex flex-col-reverse items-center h-full justify-center">                                          
                                                <div className="text-[#707070]">Total Expence</div>
                                                {/* <div className="text-xs flex justify-around"><span className='bg-[#707070] pl-1.5 pr-1.5 rounded-sm'>3 Mon</span></div> */}
                                                <div className="text-xl font-bold">₹{ExpenceData?.totalExpenseArray?.total_expense}</div>
                                                {/* <div className="text-sm flex justify-around"><span className='mix-blend-multiply bg-[#0BD19D] p-0.5 rounded-lg '>6.0%</span></div> */}
                                           
                                           
                                        </div>
                </div>
                <div className="bg-[#2B2B2B] md:row-span-1 rounded-lg min-w-[98%] md:min-w-[30%]">
                  <div className="text-white flex flex-col-reverse items-center justify-center h-full">                                          
                                                <div className="text-[#707070] ">Weekly Expence</div>
                                                {/* <div className="text-xs flex justify-around"><span className='bg-[#707070] pl-1.5 pr-1.5 rounded-sm'>3 Mon</span></div> */}
                                                <div className="text-xl font-bold">₹{ExpenceData?.weeklyExpenseArray[0]?.weekly_expense}</div>
                                                {/* <div className="text-sm flex justify-around"><span className='mix-blend-multiply bg-[#0BD19D] p-0.5 rounded-lg '>6.0%</span></div> */}
                                           
                                           
                                        </div>
                </div>
            </div>
            <div className={bargraph=='monthly_expence'?" text-white bg-red-600 md:row-span-1 rounded-lg p-6 mt-4 mb-4 border border-yellow-300  cursor-pointer":" cursor-pointer text-white bg-red-600 md:row-span-1 rounded-lg p-6 mt-3 mb-3"} onClick={()=>setBarGraph('monthly_expence')}>
            <div className="text-white flex flex-col-reverse items-center justify-around h-full" >                                          
                                                <div className=" m-auto" >Monthly Expence </div>
                                                {/* <div className="text-xs flex justify-around"><span className='pl-1.5 pr-1.5 rounded-sm'>3 Mon</span></div> */}
                                                <div className="text-xl font-bold m-auto">₹{ExpenceData?.monthlyExpenseArray[0]?.monthly_expense}</div>
                                                {/* <div className="text-sm flex justify-around"><span className='p-0.5 rounded-lg '>6.0%</span></div> */}
                                           
                                           
                                        </div>
            </div>
            <div className="md:col-span-2 md:row-span-3 text-white p-5 flex flex-col justify-start gap-10 w-[360px] items-center">
                <div className="flex flex-col gap-5 justify-center w-full">
                  <div className="flex justify-between p-3">
                    <span>Edit / Manage</span>
                    <img src={calender} alt='calender' width='20px'/>
                  </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}  sx={{
          width:'100%'
        }}>
      <Stack spacing={2} >
        <Stack direction="row" spacing={2} className="justify-around">
        <div className="flex flex-col justify-center text-lg gap-3 items-center">
            <img src={dateUp} className='w-6'onClick={() => setSelectedSectionType('day_up')}/>
          <div>{new Date(selectedDate).getDate()}</div>
          <img src={dateDown} className='w-6' onClick={() => setSelectedSectionType('day_down')}/>
           
            </div>
         <div className="flex flex-col justify-center text-lg gap-3 items-center">
         <img src={dateUp} className='w-6' onClick={() => setSelectedSectionType('month_up')}/>
           
          <div>{monthNames[new Date(selectedDate).getMonth()]}</div>
          <img src={dateDown} className='w-6' onClick={() => setSelectedSectionType('month_down')}/>
            
            </div> 
            
          <div className="flex flex-col justify-center text-lg gap-3 items-center">
          <img src={dateUp} className='w-6' onClick={() => setSelectedSectionType('year_up')}/>
          <div>{new Date(selectedDate).getFullYear()}</div>
          <img src={dateDown} className='w-6' onClick={() => setSelectedSectionType('year_down')}/>
          
          </div>
          
        </Stack>
        <DateField
          inputRef={inputRef}
          sx={{
            display:'none'
          }}
          value={selectedDate}
          selectedSections={selectedSections}
          onSelectedSectionsChange={setSelectedSections}
        />
      </Stack>
    </LocalizationProvider>
    </div>
    <div className="text-white">
    <div className="flex justify-between rounded-xl h-16  bg-[#2B2B2B] border border-[#0BD19D]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Add income"
                        name='I'
                       value={data?.I}
                      onChange={setValues}  
                    />
                    <img
                        className="mr-6 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                        name="I"
                        onClick={operations}
                        // onClick = {remove}
                     />
                   </div>
    </div>
    <div className="flex flex-col gap-5 text-white items-center">
    
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B] border border-[#FF426F]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Shopping"
                        name='S'
                        value={data?.S}
                       onChange={setValues} 
                    />
                    <img
                        className="mr-8 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                        name="S"
                        onClick = {operations}
                     />
                   </div>
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B] border border-[#FEC008]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Payments"
                        // value={removesavings}
                        // onChange={handleInputChangevalues}
                        name='P'
                        value={data?.P}
                       onChange={setValues}  
                    />
                    <img
                        className="mr-8 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                        name='P'
                        onClick = {operations}
                     />
                   </div>
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B] border border-[#3F6FD9]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Food"
                        // value={removesavings}
                        // onChange={handleInputChangevalues}
                        name='F'
                        value={data?.F}
                       onChange={setValues}  
                        
                    />
                    <img
                        className="mr-8 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                       name='F'
                        onClick = {operations}
                     />
                   </div>
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B] border border-[#9772FF]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Others"
                        // value={removesavings}
                        name='O'
                        value={data?.O}
                       onChange={setValues}  
                        // onChange={handleInputChangevalues}
                        
                    />
                    <img
                        className="mr-8 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                        name="O"
                        onClick = {operations}
                     />
                   </div>
    </div>
            </div>
           <div className="chartBox text-white bg-[#2B2B2B] p-3 rounded-lg md:col-span-4 md:row-span-1">
            <div className="container">
            {renderBar(bargraph)}
            </div>
          
           </div>
           <div className="text-white md:col-span-2 ">
            <AddS/>
           </div>
           <div className="text-white md:col-span-2 flex justify-center" >
           {/* <AddS/> */}
           
           <DoughnutChart 
              chartData={doughnutData}
              textCenter={textCenter}
              options={
                {backgroundColor: [
                  '#FF426F',
                  '#FEC008',
                    '#3F6FD9',
                    '#9772FF'
                ],
                borderColor:'transparent'
              }
              }
           />
           </div>
           
        </div>
    )
}

export default ExpenceMangement