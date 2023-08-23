import React, { useState, useEffect } from 'react'
import {

  Autocomplete, Button

} from "@mui/material";
import TextField from '@mui/material/TextField';
import { GenerateNewToken } from '../../utils/api';
import { useNavigate } from "react-router-dom";

export default function Stocks() {

  const navigate = useNavigate();

  const [StockName,setStockName]=useState('');
  const [stockDetail,setStockDetail]=useState();
  const [stocksNameData,setStocksNameData]=useState([]);
  const [investedValue,setInvestedValue]=useState();

  const [buyAveragePrice,setBuyAveragePrice]=useState();
  const [viewStocks,setViewStocks]=useState(false);
  const [allStocks,setAllStocks]=useState([]);
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
  const handleSelectedStock=(e,option)=>{
    console.log(option)
    setStockDetail(option)
    setStockName(option)

  }
  const addStock=()=>{
    if(stockDetail){
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
        })
        .catch(error => console.log('error', error));

    }
  }
      useEffect(()=>{
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
      })
      .catch((error) => { console.log('error', error)});
  },[viewStocks])
  return ( <>
    {!viewStocks?<div className="it-right-body">
      <div>
        <div className='text-[#FEC008] font-bold'>Stocks</div>
        <div className='text-slate-300 flex w-full border border-cyan-50 p-3 font-thin'><span>Stocks Value</span><span>+21k</span> </div>
          <div><Button variant='contained' onClick={()=>setViewStocks(true)}>View Your Stocks</Button></div>
      </div>
      <div className='w-full flex flex-col gap-5'>
        <Autocomplete

          {...stockOptions}
          id="stockSearch"
          autoComplete
          onInputChange={handleStocks}
        onChange={(event,option)=>handleSelectedStock(event,option)}
          // includeInputInList
          defaultValue={StockName}
        value={StockName?StockName:null}

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
        <Button onClick={addStock}
          variant='outlined' color='success'
        > Add</Button>
      </div>
    </div>:
      <div className="it-right-body text-white">
    <Button onClick={()=>setViewStocks(false)} > Go Back</Button>
   {allStocks?.map(each=>{
          return <div>{each.stockSymbol}</div>
        })}
      </div>
    }
  </>
  )
}
