import React, { useEffect, useState } from "react"
import rightarrow from "../../../assets/Group 1260.svg"
import { GenerateNewToken } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../../modal/modal";
import { Backdrop, CircularProgress } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Savings = (props) => {

    const navigate = useNavigate();

    const [addSaving, setAddSvaings] = useState('');
    const [removesavings, setRemoveSavings] = useState('');
    const [currentSavings,setcurrentSavings] = useState("");

    const [loader,setLoader]=useState(false);
    const [show,setShow] = useState(false)
    const [removeModal,setRemoveModal] = useState(false)
    const [open,setOpen]=useState(false);
    const handleClose=()=>{
      setOpen(false)
    }
    const [alertMsg,setAlert]=useState('');
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setAddSvaings(newValue);
    };

    const handleInputChangevalues = (event) => {
        const newValue = event.target.value;
        setRemoveSavings(newValue);

    };

    useEffect(()=>{
        totalSavings()
    },[])

    const totalSavings = () =>{
      setLoader(true)
        var myHeaders = new Headers();
          myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            // savingsAmount: value
          });
    
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
    
          fetch("http://3.237.3.113:3000/saving/getTotalSavings", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
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
                    setcurrentSavings(result?.data?.savingsAmount)
                    props.getDashboard()
                    setLoader(false)
                    setAddSvaings("")
                    setRemoveSavings("")
                  }
            })
            .catch(error => console.log('error', error));
    }


    const addSavings=()=>{
         if(!addSaving){
          setAlert(
            {
              'color':'error',
              'Message':'Enter Values'
            }
          )
          setOpen(true)
         }
         else if(addSaving<=0){
          setAlert(
            {
              'color':'error',
              'Message':"Enter amount greater than 0"
            }
          
          )
          setOpen(true)
        }
         else{
          setShow(false)
         setLoader(true)
         
          var myHeaders = new Headers();
          myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            savingsAmount: addSaving
          });
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          fetch("http://3.237.3.113:3000/saving/addSavings", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
                totalSavings()
                setLoader(false)
                setAlert(
                  {
                    'color':'success',
                    'Message':`Added ₹${addSaving} to Savings`
                  }
                )
                setOpen(true)
            })
            .catch(error => console.log('error', error));}
      }

    const remove = () =>{
      if(!removesavings){
        setAlert(
          {
            'color':'error',
            'Message':'Enter Values'
          }
        
        )
        setOpen(true)
      }
      else if(removesavings>currentSavings){
        setAlert(
          {
            'color':'error',
            'Message':"can't remove more amount than your current savings"
          }
        
        )
        setOpen(true)
      }
      else{
        setLoader(true)
        var myHeaders = new Headers();
          myHeaders.append("Authorization",`Bearer ${JSON.parse(localStorage.getItem('access_token'))}` );
          myHeaders.append("Content-Type", "application/json");
    
          var raw = JSON.stringify({
            savingsAmount:removesavings
          });
    
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
    
          fetch("http://3.237.3.113:3000/saving/removeSavings", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result)
                totalSavings()
                setLoader(false)
                setAlert(
                  {
                    'color':'success',
                    'Message':`Removed ₹${removesavings} from Savings`
                  }
                )
                setOpen(true)
            })
            .catch(error => console.log('error', error));
          }
      }

    



    return (
     <>   {
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertMsg.color} sx={{ width: '100%' }}>
          {alertMsg.Message}
        </Alert>
      </Snackbar>
     }
     
      
        {/* <div className=""> */}
           
            <div className='w-full flex flex-col  justify-evenly h-full gap-5'>
            <div className="flex flex-col">
              <div class="font-manrope text-sm " style={{ color: "#969696" }}>{props.subHEading}</div>
              <div class=" font-manrope   text-4xl pt-2.5 pb-7" style={{ color: "#FEC008" }}>{props.heading}</div>
            </div>
              <div className='text-slate-300 flex justify-between w-full rounded-lg p-3 bg-[#2B2B2B]'><span className=''>Current Savings</span><span className='text-[#0BD19D] font-bold text-xl'>₹ {currentSavings ? currentSavings : "0"}</span> </div>


              {/* <hr className="sm:flex-none" /> */}
              <div className="flex justify-between  rounded-xl rounded-10 h-16 border border-[#0BD19D] bg-[#2B2B2B]">
                <input
                  className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                  style={{ color: "#ffff" }}
                  type="number"
                  id="addStockInput"
                  placeholder="Add Savings"
                  value={addSaving}
                  onChange={handleInputChange} />
                <img
                  className="mr-8 cursor-pointer pl-2.5"
                  src={rightarrow}
                  alt="Right Arrow"
                  onClick={() => { addSavings(); } } />
              </div>

              <div className="flex justify-between  rounded-xl rounded-10 h-16 border border-red-500 bg-[#2B2B2B]">
                <input
                  className="focus:outline-none w-3/4 rounded-3xl border-none p-6 rounded-10 h-15  bg-[#2B2B2B]"
                  style={{ color: "#ffff" }}
                  type="number"
                  placeholder="Remove Savings"
                  value={removesavings}
                  onChange={handleInputChangevalues} />
                <img
                  className="mr-8 cursor-pointer pl-2.5"
                  src={rightarrow}
                  alt="Right Arrow"
                  onClick={() => {remove(); } } />
              </div>
            </div>
            {/* {<ModalComponent
              show={show}
              cancel={"cancel"}
              save={"save"}
              onHide={() => setShow(false)}
              onSubmit={() => { addSavings(); } } />}
            {<ModalComponent
              show={removeModal}
              cancel={"cancel"}
              save={"delete"}
              onHide={() => setRemoveModal(false)}
              onSubmit={() => { remove(); } } />} */}
          {/* </div>
           */}
          
          {loader &&<Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
        
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        }
        
    </>
    )
}

export default Savings;
