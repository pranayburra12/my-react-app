import "./ExpenceMangement.css"
import React,{useState,useRef} from "react"
import group from "../../assets/Group.svg"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


const today = dayjs();
const ExpenceMangement =()=>{
  const [barData,setBarData]=useState({
    labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets:[
     { 
      label:['Amount'],
      data:[20000,30000,12000,23233 ,53434,7823],
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
    return(
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-6 gap-10 p-4 md:p-1 md:pl-40 justify-center">
           <div className=" text-white md:flex md:justify-around md:overflow-hidden gap-2 overflow-scroll w-full md:col-span-3 md:row-span-1 flex p-6">
                <div className="bg-[#2B2B2B] rounded-lg min-w-[98%] md:min-w-[30%]">
                  <div className="text-white grid grid-cols-2 items-center justify-around h-full">                                          
                                                <div className="text-[#707070] m-auto">Total</div>
                                                <div className="text-xs flex justify-around"><span className='bg-[#707070] pl-1.5 pr-1.5 rounded-sm'>3 Mon</span></div>
                                                <div className="text-4xl font-bold m-auto">3.2L</div>
                                                <div className="text-sm flex justify-around"><span className='mix-blend-multiply bg-[#0BD19D] p-0.5 rounded-lg '>6.0%</span></div>
                                           
                                           
                                        </div>
                </div>
                <div className="bg-[#2B2B2B] rounded-lg h-36 min-w-[98%] md:min-w-[30%]">
                  <div className="text-white grid grid-cols-2 items-center justify-around h-full">                                          
                                                <div className="text-[#707070] m-auto">Total</div>
                                                <div className="text-xs flex justify-around"><span className='bg-[#707070] pl-1.5 pr-1.5 rounded-sm'>3 Mon</span></div>
                                                <div className="text-4xl font-bold m-auto">3.2L</div>
                                                <div className="text-sm flex justify-around"><span className='mix-blend-multiply bg-[#0BD19D] p-0.5 rounded-lg '>6.0%</span></div>
                                           
                                           
                                        </div>
                </div>
                <div className="bg-[#2B2B2B] rounded-lg min-w-[98%] md:min-w-[30%]">
                  <div className="text-white grid grid-cols-2 items-center justify-around h-full">                                          
                                                <div className="text-[#707070] m-auto">Total</div>
                                                <div className="text-xs flex justify-around"><span className='bg-[#707070] pl-1.5 pr-1.5 rounded-sm'>3 Mon</span></div>
                                                <div className="text-4xl font-bold m-auto">3.2L</div>
                                                <div className="text-sm flex justify-around"><span className='mix-blend-multiply bg-[#0BD19D] p-0.5 rounded-lg '>6.0%</span></div>
                                           
                                           
                                        </div>
                </div>
            </div>
            <div className=" text-white bg-red-600 md:row-span-1 rounded-lg p-6 ">
            <div className="text-white grid grid-cols-2 items-center justify-around h-full">                                          
                                                <div className=" m-auto">Total</div>
                                                <div className="text-xs flex justify-around"><span className='pl-1.5 pr-1.5 rounded-sm'>3 Mon</span></div>
                                                <div className="text-4xl font-bold m-auto">3.2L</div>
                                                <div className="text-sm flex justify-around"><span className='p-0.5 rounded-lg '>6.0%</span></div>
                                           
                                           
                                        </div>
            </div>
            <div className="md:col-span-2 md:row-span-6 text-white p-2 flex flex-col justify-around gap-5">
                <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2}>
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
    <div className="flex justify-between rounded-xl h-16  bg-[#2B2B2B]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Add income"
                        // value={removesavings}
                        // onChange={handleInputChangevalues}
                        
                    />
                    <img
                        className="mr-6 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                       
                        // onClick = {remove}
                     />
                   </div>
    </div>
    <div className="flex flex-col gap-5 text-white">
    
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Shopping"
                        // value={removesavings}
                        // onChange={handleInputChangevalues}
                        
                    />
                    <img
                        className="mr-8 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                       
                        // onClick = {remove}
                     />
                   </div>
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Payments"
                        // value={removesavings}
                        // onChange={handleInputChangevalues}
                        
                    />
                    <img
                        className="mr-8 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                       
                        // onClick = {remove}
                     />
                   </div>
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Food"
                        // value={removesavings}
                        // onChange={handleInputChangevalues}
                        
                    />
                    <img
                        className="mr-8 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                       
                        // onClick = {remove}
                     />
                   </div>
                   <div className="flex justify-between  rounded-xl rounded-10 h-16  bg-[#2B2B2B]" >
                   <input
                        className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                        style={{color:"#ffff"}}
                        type="number"
                        placeholder="Others"
                        // value={removesavings}
                        // onChange={handleInputChangevalues}
                        
                    />
                    <img
                        className="mr-8 cursor-pointer w-4"
                        src={rightarrow}
                        alt="Right Arrow"
                       
                        // onClick = {remove}
                     />
                   </div>
    </div>
            </div>
           <div className="text-white bg-[#2B2B2B] p-3 rounded-lg md:col-span-4 md:row-span-3">
            
           <BarChart chartData={barData} />
           </div>
           <div className="text-white md:col-span-2 md:row-span-2">
            <AddS/>
           </div>
           <div className="text-white md:col-span-2 md:row-span-2">
           <AddS/>
           </div>
        </div>
    )
}

export default ExpenceMangement