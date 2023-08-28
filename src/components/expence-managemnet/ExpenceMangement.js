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
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const today = dayjs();
const ExpenceMangement =()=>{
    
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
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-6 gap-10 p-4 md:p-1 md:pl-40 justify-center h-screen">
           <div className=" text-white md:flex md:justify-around md:overflow-hidden md:gap-2 overflow-scroll w-full md:col-span-3 md:row-span-1 flex">
                <div className="border border-green-500 rounded-lg h-full min-w-[98%] md:min-w-[30%]">
                
                                        <div className="text-white pt-2 pb-2">
                                           
                                                <div className="text-[#707070]">Total</div>
                                                <div className="text-2xl">6K</div>
                                           
                                           
                                        </div>
                </div>
                <div className="border border-green-500 rounded-lg h-full min-w-[98%] md:min-w-[30%]"> monthly</div>
                <div className="border border-green-500 rounded-lg  h-full min-w-[98%] md:min-w-[30%]">yearly</div>
            </div>
            <div className="border border-red-400 text-white bg-red-600 md:row-span-1 rounded-lg">monthly Expence</div>
            <div className="border border-red-400 md:col-span-2 md:row-span-6 text-white p-2 flex flex-col justify-around">
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
           <div className="text-white border border-red-400 md:col-span-4 md:row-span-3">Graphs/ HCarts</div>
           <div className="text-white border border-red-400 md:col-span-2 md:row-span-2">Ad1</div>
           <div className="text-white border border-red-400 md:col-span-2 md:row-span-2">Ad1</div>
        </div>
    )
}

export default ExpenceMangement