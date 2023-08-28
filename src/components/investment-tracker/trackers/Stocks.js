import React, { useState, useEffect,useRef } from 'react'
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
export default function Stocks() {
  const classes = useStyles();
  const navigate = useNavigate();
  const viewRef=useRef();
  const [StockName,setStockName]=useState('');
  const [stockDetail,setStockDetail]=useState();
  const [stocksNameData,setStocksNameData]=useState([]);
  const [investedValue,setInvestedValue]=useState();

  const [buyAveragePrice,setBuyAveragePrice]=useState();
  const [viewStocks,setViewStocks]=useState(false);
  const [isEdit,setIsEdit]=useState(false);
  const [allStocks,setAllStocks]=useState([]);
  const [loader,setLoader]=useState(false);
  const handleStocks=(e)=>{


    if(e?.target?.value ){
      // console.log(e.target.value);
      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${e.target.value}&apikey=SDFU2BDW50I9JYIN`)
        .then(response=>{
          return response.json();
        })
        .then((result)=>{
          console.log(result);
          setStocksNameData(result.bestMatches)
        })
        .catch(error =>{
          console.log(error.message)
          //  setError(error.message)
        }
        );
    }


  }
  const stockOptions = {
    options: stocksNameData,
    getOptionLabel: (each) => each['2. name']?each['2. name']:'',
  };
  const handleSelectedStock=(option)=>{
    console.log(option)
    setStockDetail(option)
    setStockName(option)

  }
  const addStock=()=>{
    
    if(stockDetail){
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "stockSymbol": stockDetail['1. symbol'],
        "stockName": stockDetail['2. name'],
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

      fetch("https://findemybackedcode.onrender.com/stock/saveStock", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
          setViewStocks(true)
          scrollToResults();
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
       
       if(viewStocks)
       { 
        setLoader(true)
        var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://findemybackedcode.onrender.com/stock/viewStocks", requestOptions)
      .then(response => response.json())
      .then(result => {
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
          setAllStocks(result?.data)

        }
        setLoader(false)
      })
      .catch((error) => { console.log('error', error)});
    }
  },[viewStocks])
  const editStock=(each)=>{
    console.log(each)
    setViewStocks(false)
    setLoader(true)
    // setStockName(each.stockName);
    setBuyAveragePrice(each.totalInvestedAmount/each.numberOfShares)
    setInvestedValue(each.totalInvestedAmount)
    if(each.stockSymbol){
      // console.log(e.target.value);
      fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${each.stockSymbol}&apikey=SDFU2BDW50I9JYIN`)
        .then(response=>{
          return response.json();
        })
        .then((result)=>{
          console.log(result);
          setStocksNameData(result.bestMatches)
          setStockDetail(result.bestMatches[0])
          setStockName(result.bestMatches[0]['2. name'])
          handleSelectedStock(result.bestMatches[0])
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
  const goBack=()=>{
    setViewStocks(false)
    setBuyAveragePrice('');
    setInvestedValue('');
    setStockName('')
    setIsEdit(false)
  }
  const editStockHandle=()=>{
    if(stockDetail){
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "stockSymbol": stockDetail['1. symbol'],
        "stockName": stockDetail['2. name'],
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

      fetch("https://findemybackedcode.onrender.com/stock/editStock", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
          setViewStocks(true)
          scrollToResults();
        setLoader(false)
        })
        .catch(error => console.log('error', error));

    }
  }
  const deleteStock=()=>{
    if(stockDetail){
      // console.log(stockDetail['1. symbol'])
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
          "stockSymbol":stockDetail['1. symbol']
      });

      var requestOptions = {
        method: 'Delete',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://findemybackedcode.onrender.com/stock/deleteStock", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result)
          setViewStocks(true)
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
    {!viewStocks?<div className="flex flex-col justify-between gap-10">
      <div className='flex flex-col gap-3'>
        <div className='text-[#FEC008] font-bold text-2xl'>Stocks</div>
        <div className='text-slate-300 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B]'><span className=''>Stocks Value</span><span className='text-[#0BD19D] font-bold text-xl'>₹ 21K</span> </div>
          <div className='text-slate-200 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B] hover:cursor-pointer' onClick={()=>setViewStocks(true)}><span>View Your Stocks</span><img src={arrow} /></div>
      </div>
      <div className='max-w-full flex flex-col gap-5'>
        <Autocomplete

          {...stockOptions}
          id="stockSearch"
          autoComplete
          onInputChange={handleStocks}
        onChange={(event,option)=>handleSelectedStock(option)}
          // includeInputInList
          defaultValue={StockName}
        value={StockName?StockName:null}
     classes={{paper:classes.paper}}
          // loadingText='Loading'
          renderInput={(params) => (
            <TextField {...params}
           InputProps={{...params.InputProps, disableUnderline: true}} 
              placeholder='Stock Name'
              variant="outlined"
            sx={{ color:'white',  
                "& input": {
                  color: 'white',
                },
                "& fieldset": {
                  border: "1px solid white",
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0BD19D',
                  },
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
            },'& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0BD19D',
              },
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
            '& .MuiOutlinedInput-root': {
              // '& fieldset': {
              //   borderColor: 'white',
              // },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0BD19D',
              },
            },

          }}

                onChange={(e) =>  setInvestedValue(e.target.value) }
        />
        {isEdit?<div className='flex flex-row-reverse justify-between'><Button variant='contained' color='success' onClick={editStockHandle}>Save changes</Button> <Button variant='outlined' color='error' onClick={deleteStock}>Delete</Button></div>:<Button onClick={addStock}
          variant='outlined' color='success'
        > Add</Button>}
      </div>
    </div>:
      <div className="text-white min-h-screen" ref={viewRef}>
    <Button onClick={goBack} > Go Back</Button>
   <div className='flex flex-col gap-2' >
   {allStocks?.map(each=>{
    return <div className='text-slate-200 flex justify-between w-full rounded-sm h-16 items-center p-3 bg-[#2B2B2B] gap-2 hover:cursor-pointer' onClick={()=>editStock(each)}><span>{each.stockName}</span><span className='text-[#0BD19D]'>₹{each.currentTotalValue.toFixed(1)    }</span></div>
   })}
   </div>
  </div>
  }
  </>
  )
}
