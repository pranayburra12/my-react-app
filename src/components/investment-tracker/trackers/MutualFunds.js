import React ,{useState,useEffect,useRef} from 'react'
import {
 
  Autocomplete, Button,Backdrop,CircularProgress
 
} from "@mui/material";
import TextField from '@mui/material/TextField';
import { GenerateNewToken } from '../../utils/api';
import { useNavigate } from "react-router-dom";
import arrow from "../../../assets/arrow.svg"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    backgroundColor: "#2B2B2B",
    color:'white'
  }
});
export default function MutualFunds({tracker, getDashboard }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const viewRef=useRef();
  const [schemeName,setSchemeName]=useState('');
  const [schemeDetail,setSchemeDetail]=useState();
  const [schemeNameData,setSchemeNameData]=useState([]);
  const [investedValue,setInvestedValue]=useState();
  const [isEdit,setIsEdit]=useState(false);
  const [buyAveragePrice,setBuyAveragePrice]=useState();
  const [viewSchemes,setViewSchemes]=useState(false);
  const [allSchemes,setAllSchemes]=useState([]);
  const [loader,setLoader]=useState(false);
    const goBack=()=>{
    setViewSchemes(false)
    setBuyAveragePrice('');
    setInvestedValue('');
    setSchemeName('')
    setIsEdit(false)
  }
  const handleSchemes=(e)=>{
      
   
    if(e?.target?.value ){
      // console.log(e.target.value);
        fetch(`https://api.mfapi.in/mf/search?q=${e.target.value}`)
        .then(response=>{
          return response.json();
        })
        .then((result)=>{
          console.log(result);
          setSchemeNameData(result)
        })
        .catch(error =>{
           console.log(error.message)
          //  setError(error.message)
        }
           );
    }
 
   
  }
  const schemeOptions = {
    options: schemeNameData,
    getOptionLabel: (each) => each['schemeName']?each['schemeName']:'',
  };
  const handleSelectedScheme=(option)=>{
    console.log(option)
    setSchemeDetail(option)
    setSchemeName(option)
    
  }
  const addScheme=()=>{
    
    if(schemeDetail){
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "schemeName": schemeDetail['schemeName'],
        "schemeCode": schemeDetail['schemeCode'],
        "perSharePrice": buyAveragePrice,
        "numberOfShares": Math.round(investedValue/buyAveragePrice),
        "totalAmount": investedValue
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("http://3.237.3.113:3000/mutualFunds/saveQuantity", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
        setViewSchemes(true)
        scrollToResults();
        getDashboard()
        setLoader(false)
        
        })
        .catch(error => console.log('error', error));
      
    }
      }
      const scrollToResults=()=>{
        window.scrollTo({
          top:0,
          behavior:"smooth"
      
        })
      }
      useEffect(()=>{
       
       if(viewSchemes)
       { 
        setLoader(true)
        var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://3.237.3.113:3000/mutualFunds/getInvestmentHistory", requestOptions)
  .then(response => response.json())
  .then(result =>{
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
      setAllSchemes(result?.data)
    }
    
    setLoader(false)
  })
  .catch(error => console.log('error', error));}
      },[viewSchemes])

const editScheme=(each)=>{
    console.log(each)
    setViewSchemes(false)
    setLoader(true)
    setSchemeName(each.schemeName);
    setBuyAveragePrice(each.totalInvestedAmount/each.numberOfShares)
    setInvestedValue(each.totalInvestedAmount)
    if(each.schemeCode){
      // console.log(e.target.value);
      fetch(`https://api.mfapi.in/mf/search?q=${each.schemeName}`)
        .then(response=>{
          return response.json();
        })
        .then((result)=>{
          console.log(result);
          setSchemeNameData(result[0])
          setSchemeDetail(result[0])
          setSchemeName(result[0]['schemeName'])
          handleSelectedScheme(result[0])
          setIsEdit(true)
          
        })
        .catch(error =>{
          console.log(error.message)
          //  setError(error.message)
        }
        );
    }
    setLoader(false)
  }
    const editSchemeHandle=()=>{
    if(schemeDetail){
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "schemeName": schemeDetail.schemeName,
        "schemeCode": schemeDetail.schemeCode,
        "perSharePrice": buyAveragePrice,
        "numberOfShares": Math.round(investedValue/buyAveragePrice),
        "totalAmount": investedValue
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://3.237.3.113:3000/mutualFunds/editQuantity", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
          setViewSchemes(true)
          scrollToResults();
        setLoader(false)
        getDashboard();
        })
        .catch(error => console.log('error', error));

    }
  }
  const deleteScheme=()=>{
    if(schemeDetail){
      // console.log(stockDetail['1. symbol'])
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "schemeCode":schemeDetail.schemeCode
      });

      var requestOptions = {
        method: 'Delete',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://3.237.3.113:3000/mutualFunds/deleteMutualFunds", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
          setViewSchemes(true)
          scrollToResults();
        setLoader(false)
        })
        .catch(error => console.log('error', error));

    }
  }

  return ( <>
  {loader&& <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
    {!viewSchemes?<div className="flex flex-col justify-between gap-10">
      <div className='flex flex-col gap-3'>
          <div className='text-[#FEC008] font-bold text-2xl'>Mutual Funds</div>
          <div className='text-slate-300 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B]'><span>Value</span><span className='text-[#0BD19D] font-bold text-xl'>₹ {tracker?.currentValues?.toFixed(1)}</span> </div>
          <div className='text-slate-200 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B] hover:cursor-pointer' onClick={()=>setViewSchemes(true)}><span>View Your Schemes</span><img src={arrow} /></div>
        </div>
        <div className='max-w-full flex flex-col gap-5'>
         <Autocomplete
      
        {...schemeOptions}
        id="stockSearch"
        autoComplete
        onInputChange={handleSchemes}
        onChange={(event,option)=>handleSelectedScheme(option)}
        // includeInputInList
        defaultValue={schemeName}
        value={schemeName?schemeName:null}
        classes={{paper:classes.paper}}
    // loadingText='Loading'
    disabled={isEdit}
    sx={{
      "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "grey",
      },
      }}
        renderInput={(params) => (
          <TextField {...params}

           InputProps={{...params.InputProps, disableUnderline: true}} 
           placeholder='Scheme Name'
            variant="outlined"
            sx={{ color:'white',  
            "& input": {
                color: 'white',
            },
            "& fieldset": {
              border: "1px solid white",
            },

        }}
         
          />
        )}
        
      />
   
       <TextField
                value={buyAveragePrice}
                placeholder="Buy Average Price"
                name="average-price"
                // margin="dense"
                disabled={false}
                type='number'
                variant='outlined'
                
                sx={{ color:'white',  
                  "& input": {
                      color: 'white',
                  },
                  "& fieldset": {
                    border: "1px solid white",
                  },

              }}
              
                onChange={(e) => setBuyAveragePrice(e.target.value)  }
                />

      <TextField
                value={investedValue}
                placeholder="Invested Value"
                name="invested-value"
                // margin="dense"
                disabled={false}
                
                type='number'
                variant="outlined"
                sx={{color:'white',  
                "& input": {
                    color: 'white',
                },
                "& fieldset": {
                  border: "1px solid white",
                },
               

            }}

                onChange={(e) =>  setInvestedValue(e.target.value) }
                />
             {isEdit?<div className='flex flex-row-reverse justify-between'><Button variant='contained' color='success' onClick={editSchemeHandle}>Save changes</Button> <Button variant='outlined' color='error' onClick={deleteScheme}>Delete</Button></div>:<Button onClick={addScheme}
          variant='outlined' color='success'
        > Add</Button>}
        </div>
    </div>:
  <div className="text-white min-h-screen" ref={viewRef}>
    <Button onClick={goBack} > Go Back</Button>
    {allSchemes.length!==0 ? <div className='flex flex-col gap-2' >
   {allSchemes?.map(each=>{
    return <div className='text-slate-200 flex justify-between w-full rounded-sm h-16 items-center p-3 bg-[#2B2B2B] gap-2 hover:cursor-pointer' 
    onClick={()=>editScheme(each)}
    ><span>{each.schemeName}</span><span className='text-[#0BD19D]'>₹{each.currentTotalValue.toFixed(1)    }</span></div>
   })}
   </div>:
   <div className='text-slate-200 flex justify-between w-full rounded-sm h-16 items-center p-3 bg-[#2B2B2B] gap-2 hover:cursor-pointer'><span>NO RECORDS FOUND</span><span className='text-[#0BD19D]'></span></div>
   }
  </div>
  }
  </>
  )
}


