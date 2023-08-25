import React ,{useState,useEffect} from 'react'
import {
 
  Autocomplete, Button,Backdrop,CircularProgress
 
} from "@mui/material";
import TextField from '@mui/material/TextField';
export default function Stocks() {
  const [schemeName,setSchemeName]=useState('');
  const [schemeDetail,setSchemeDetail]=useState();
  const [schemeNameData,setSchemeNameData]=useState([]);
  const [investedValue,setInvestedValue]=useState();

  const [buyAveragePrice,setBuyAveragePrice]=useState();
  const [viewSchemes,setViewSchemes]=useState(false);
  const [allSchemes,setAllSchemes]=useState([]);
  const [loader,setLoader]=useState(false);
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
  const handleSelectedScheme=(e,option)=>{
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
      
      fetch("https://findemybackedcode.onrender.com/mutualFunds/saveQuantity", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
        setViewSchemes(true)
        setLoader(false)
        })
        .catch(error => console.log('error', error));
      
    }
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

fetch("https://findemybackedcode.onrender.com/mutualFunds/getInvestmentHistory", requestOptions)
  .then(response => response.json())
  .then(result =>{
    setAllSchemes(result?.data)
    setLoader(false)
  })
  .catch(error => console.log('error', error));}
      },[viewSchemes])
  return ( <>
  {loader&& <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        
      >
        <CircularProgress color="inherit" />
      </Backdrop>}
    {!viewSchemes?<div className="it-right-body">
      <div>
          <div className='text-[#FEC008] font-bold'>Mutual Funds</div>
          <div className='text-slate-300 flex w-full border border-cyan-50 p-3 font-thin'><span>Value</span><span>+21k</span> </div>
          <div><Button variant='contained' onClick={()=>setViewSchemes(true)}>View Your Schemes</Button></div>
        </div>
        <div className='w-full flex flex-col gap-5'>
         <Autocomplete
      
        {...schemeOptions}
        id="stockSearch"
        autoComplete
        onInputChange={handleSchemes}
        onChange={(event,option)=>handleSelectedScheme(event,option)}
        // includeInputInList
        defaultValue={schemeName}
        value={schemeName?schemeName:null}
    
    // loadingText='Loading'
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
            <Button onClick={addScheme} 
              variant='outlined' color='success'
            > Add</Button>
        </div>
    </div>:
  <div className="it-right-body text-white">
    <Button onClick={()=>setViewSchemes(false)} > Go Back</Button>
   {allSchemes?.map(each=>{
    return <div>{each.schemeName}</div>
   })}
  </div>
  }
  </>
  )
}
