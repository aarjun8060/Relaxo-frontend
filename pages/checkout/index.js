import React, { useEffect, useState } from 'react'
import style from "../../styles/orderDetail.module.css"
import {Divider, RadioGroup } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../../src/redux/slice/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {cartList} from "../../src/redux/slice/cartRoutes";
import { createOrder, orderList } from '../../src/redux/slice/Order';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router'
import Script from 'next/script'
import axios from 'axios';



function Index() {
    const router = useRouter();
   // for item count in map function
    let i =1;

    // redux dispatch
    const dispatch = useDispatch();

    // this State and handleChange Function is used for accordian
    const [expanded, setExpanded] = React.useState('panel2');
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    

    // user 
    const {user} = useSelector((state)=> state.auth)
    
 
 
    useEffect(()=>{
        dispatch(getUser());
        dispatch(orderList())
     },[])

     // carts
     const {carts} = useSelector((state)=> state.cart)
  const getCart =async ()=>{
    const res = await dispatch(cartList())
  
  }
  useEffect(() => {
    getCart()
  }, [])
      
    // Address validation 
        // initial values
        const initialValues = {
            locality: "",
            city:"",
            state:"",
            country:"",
            zipcode:""
        }
        //validation Schema
        const validationSchema = Yup.object({
  locality: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  state: Yup.string().required('Required'), 
  zipcode: Yup.number().required('Required'),
        });
   const [details,setDetails] = useState(null);
        const onSubmit = async (values) => {
         
                const  {locality,
                city,
                state,
                country,
                zipcode} = values;
                const details = {locality,city,state,country,zipcode};
                setDetails(details)
                try{
                    let add ={ address: [details]};
                    const result = await dispatch(updateUser(add,user.id));
                    toast.success("Address added")
                    
                  }catch(e){
                    toast.error("Address not deleted")
                    console.log(e);
                  }
                 
          }

           
          
// Use of formik 
        const formik = useFormik({
            initialValues,
            onSubmit ,
            validationSchema
        })
 
const handleCreateOrder = async() => {
    if(Object.keys(user).length===0){
        router.push("/auth/login");
        return;
        }
    let data = {
        userId:user.id,
        products:carts.map((item) => {
           return {
              productId: item.products[0].productId.id,
              qty: item.products[0].qty
          }     
       }) , 
       products:carts && carts.map((item) => {
        return {
               productId: item.products[0].productId.id,
               qty: item.products[0].qty
        }     
        }),
        "orderStatus":{
        "orderConfirm": {
        "isConfirmed": true,
        "date": new Date()
        },
    "shipped": {
    "isConfirmed": false,
    },
    "outForDelivery": {
    "isConfirmed": false,
    },
    "delivered": {
    "isConfirmed": false,
    },
        "cancel": {
    "isConfirmed": false,
    },
    "refunded": {
    "isConfirmed": false,
    },
    },
    "address":{
    "locality":user && user.address && user.address[0] && user.address[0].locality,
    "city":user && user.address && user.address[0] && user.address[0].city,
    "state":user && user.address && user.address[0] && user.address[0].state,
    "country":user && user.address && user.address[0] && user.address[0].country,
    "zipcode":user && user.address && user.address[0] && user.address[0].zipcode,
    },
        status: "pending",
        paymentStatus: "pending"
    };
    try{
        const result = await dispatch(createOrder(data));
            if(result){
                toast.success("Successfully Order Placed")
                router.push("/checkout/orderplaced")
                return true

            }else{
                toast.error("Order not placed")
            return false
            }
    }catch(e){
        console.log(e);
    }
}
// function -> to get total MRP
let price = 0;

for(let  j= 0; j<  carts.length ; j++){
   let ans = (carts && carts[j].products[0].productId.price.mrp) * (carts[j].products[0].qty);
    price += ans;
}

const totalPrice = (price + price * 0.12)*100 
 
 
// razorPay service
const handlePay = async () =>{

    const option = {
      amount :  100000,
      currency : 'INR'
    }
    const {data} = await axios.post('http://localhost:5000/userapp/payment/checkout',option, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  });


    const options = {
      key:process.env.NEXT_PUBLIC_RAZORPAY_API_ID,
      "amount": data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Harsh",
      "description": "Test Transaction",
      "image": "https://avatars.githubusercontent.com/u/86181346?v=4",
      "order_id": data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "http://localhost:5000/userapp/payment/paymentVerify",
      "prefill": {
          "name": user.name,
          "email": user.email,
          "contact": "9000090000"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
      rzp1.open();
  }
  // Payment Option radio button
  const[radioValue,setRadioValue] = useState('Cash')

  const handleRadioValue = (event) => {
        setRadioValue(event.target.value)
  }
  const handleCreatePayOrder = async() => {
    if(Object.keys(user).length===0){
        router.push("/auth/login");
        return;
        }
    let data = {
        userId:user.id,
        products:carts.map((item) => {
           return {
              productId: item.products[0].productId.id,
              qty: item.products[0].qty
          }     
       }) , 
       products:carts && carts.map((item) => {
        return {
               productId: item.products[0].productId.id,
               qty: item.products[0].qty
        }     
        }),
            "orderStatus":{
            "orderConfirm": {
            "isConfirmed": false,
            "date": new Date()
            },
        "shipped": {
        "isConfirmed": false,
        },
        "outForDelivery": {
        "isConfirmed": false,
        },
        "delivered": {
        "isConfirmed": false,
        },
            "cancel": {
        "isConfirmed": false,
        },
        "refunded": {
        "isConfirmed": false,
        },
        },
    "address":{
    "locality":user && user.address && user.address[0] && user.address[0].locality,
    "city":user && user.address && user.address[0] && user.address[0].city,
    "state":user && user.address && user.address[0] && user.address[0].state,
    "country":user && user.address && user.address[0] && user.address[0].country,
    "zipcode":user && user.address && user.address[0] && user.address[0].zipcode,
    },
        status: "pending",
        paymentStatus: "pending"
    };
    try{
        const result = await dispatch(createOrder(data));
            if(result){
                toast.success("Successfully Order Placed")
                return true

            }else{
                toast.error("Order not placed")
            return false
            }
    }catch(e){
        console.log(e);
    }
}
  const handlePayment =async () => {
    const creacteOrderPay = await handleCreatePayOrder();
    const pay = await handlePay();
  }

  // Order Option Process
  const handleOptionFunction = (value)  => {
        if(value === 'Cash'){
            handleCreateOrder()
        }else{
            handlePayment()
        }
  }

  const handleGetOrder = async(id) => {
    try{
        dispatch((getOrder(id)))
    }catch(e){
     console.log(e)
    }
}

        
  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"/>
    <div className='w-[100%] mb-[50px]'>
        <div className=' w-[100%] flex justify-center gap-[20px]'>
            <div className='w-[810px]  mt-[170px]'>

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
              <AccordionSummary
                
                sx={{backgroundColor:expanded === 'panel1' ? "black" : "#fff",color:expanded === 'panel1' ? "#fff" : "#7C7C7C"}}
                expandIcon={<ExpandMoreIcon sx={{color:"#fff"}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <div className='w-[100%] h-[27px]  text-xl font-semibold      flex items-center px-[24px]'>{user.name} | {user.email}</div>
              </AccordionSummary>
              <AccordionDetails >
              <div className='flex flex-col justify-center gap-5 mb-5'>
                    <div className=' flex flex-col justify-around ml-[20px]'>
                        <div className={style.field} >
                        <input type="email" id='email' name='email'  value={user.email} className={style.inputs} />
                        <div className={style.line}></div>
                        </div>
                    </div>
                    <div className='flex flex-col ml-[20px] justify-start'>
                        <div className={style.field} >
                            <input type="text" id='name' name="name" value={user.name} placeholder="name" className={style.inputs} />
                            <div className={style.line}>
                            </div>
                    </div>
                    </div>
                </div>
                
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{marginTop:"20px"}} >
              <AccordionSummary
                sx={{backgroundColor:expanded === 'panel2' ? "black" : "#fff",color:expanded === 'panel2' ? "#fff" : "#7C7C7C"}}
                expandIcon={<ExpandMoreIcon sx={{color:"#fff"}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <div className='w-[100%] h-[27px]  text-xl font-semibold  flex items-center px-[24px]'>
                Delivery Address</div>
              </AccordionSummary>
              <AccordionDetails >
              <form onSubmit={formik.handleSubmit}>
 
                    <div className=' flex flex-col justify-around ml-[20px]'>
                        <div className={style.field} >
                        <input type="text" name='locality' placeholder="Locality" 
                        onChange={formik.handleChange}
                        value={formik.values.locality}
                        onBlur={formik.handleBlur}
                        className={style.inputs} />
                        <div className={style.line}></div>
                        </div>
                    </div>
                    <div className=' flex flex-col justify-around ml-[20px]'>
                        <div className={style.field} >
                        <input type="text" name='city' placeholder="City" 
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        onBlur={formik.handleBlur}
                        className={style.inputs} />
                        <div className={style.line}></div>
                        </div>
                    </div>
                    <div className=' flex flex-col justify-around ml-[20px]'>
                        <div className={style.field} >
                        <input type="text" name='state' placeholder="State" 
                        onChange={formik.handleChange}
                        value={formik.values.state}
                        onBlur={formik.handleBlur}
                        className={style.inputs} />
                        <div className={style.line}></div>
                        </div>
                    </div>
                    <div className=' flex flex-col justify-around ml-[20px]'>
                        <div className={style.field} >
                        <input type="text" name='country' placeholder="Country" 
                        onChange={formik.handleChange}
                        value={formik.values.country}
                        onBlur={formik.handleBlur}
                        className={style.inputs} />
                        <div className={style.line}></div>
                        </div>
                    </div>
                    <div className=' flex flex-col justify-around ml-[20px]'>
                        <div className={style.field} >
                        <input type="number" name='zipcode' placeholder="Pincode" 
                        onChange={formik.handleChange}
                        value={formik.values.zipcode}
                        onBlur={formik.handleBlur}
                        className={style.inputs} />
                        <div className={style.line}></div>
                        </div>
                    </div>
                    <div>
                    <div className='ml-[38px] font-semibold text-[15px] text-gray-900 mt-[30px]'>
                        Address Type
                    </div>
                    <div className=' flex gap-[40px]  ml-[35px] mt-[15px]'>
                        <div className='flex gap-2'>
                            <FormControlLabel control={<Radio/>}   name="Address_type" value="Home (All day delivery)" label="Home (All day delivery)" />
                        </div>
                        <div className='flex gap-2 ml-[10px]'>
                            <FormControlLabel control={<Radio/>}   name="Address_type" value="Office (Delievery between 10 AM - 7 AM)" label="Office (Delievery between 10 AM - 7 AM)" />
                                
                        </div>
                    </div>
                    </div>
                    <button className='mt-[20px] ml-[20px] bg-[#223C8C] text-[#fff] w-[185px] font-semibold h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] hover:bg-blue-600 hover:text-white' type='submit'>SAVE & DELIVER HERE</button>
                </form>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{marginTop:"20px"}} >
              <AccordionSummary
                sx={{backgroundColor:expanded === 'panel3' ? "black" : "#fff",color:expanded === 'panel3' ? "#fff" : "#7C7C7C"}}
                expandIcon={<ExpandMoreIcon sx={{color:"#fff"}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <div className='w-[100%] h-[27px]  text-xl font-semibold     flex items-center px-[24px]'>Order Summary</div>
              </AccordionSummary>
              <AccordionDetails >
              <div className=' border'>
                {
                   carts && carts.map((data,index) => (
                     <div className='h-[250px]' key={index}>
                        <div className='ml-[30px] mt-[10px] '>Item({carts.length > i ? [i++]:carts.length})</div>
                        <div className='flex justify-start  mt-[30px] ml-[30px] gap-[40px]'>
                            <div>
                                <img alt="" src={data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.image}  className='w-[180px] h-[140px]'/>
                            </div>
                            <div className=''>
                                <h1 className='text-[25px] font-semibold'>{data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.title &&  data.products[0].productId.title.longTitle}</h1>
                                <h4 className='text-[25px] font-normal'>₹ {data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.price &&  data.products[0].productId.price.mrp}.00</h4>
                                <div className='flex gap-2'>
                                    <p className='text-[18px] font-normal'>size : 8</p>
                                    <Divider sx={{backgroundColor:"black",height:"20px", width:"2px",marginTop:"2px"}}/>
                                    <p className='text-[18px] font-normal'>Qty : {data && data.products &&  data.products.length>0 && data.products[0].qty }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    ))
                }
                    

                </div>
                <div className='h-[120px] flex justify-between px-[30px] items-center border'>
                    <div className='text-[16px] font-normal ' >
                     Order confirmation will be sent to <span className='bg-gray-200 text-semibold px-1 '>{user.email}</span>
                    </div>
                    <button  className='mt-[20px] mr-[20px] bg-[#223C8C] text-[#fff] w-[150px] font-semibold h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] hover:bg-blue-600 hover:text-white'>MAKE PAYMENT</button>
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{marginTop:"20px"}} >
              <AccordionSummary
                sx={{backgroundColor:expanded === 'panel4' ? "black" : "#fff",color:expanded === 'panel4' ? "#fff" : "#7C7C7C"}}
                expandIcon={<ExpandMoreIcon sx={{color:"#fff"}}/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <div className='w-[100%] h-[27px]  text-xl font-semibold  flex items-center px-[24px]'>Payment Options</div>
              </AccordionSummary>
              <AccordionDetails >
              <div className='h-[200px]'>
                    <RadioGroup
                     aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Cash"
                        radio= {radioValue}
                        onChange={handleRadioValue}
                        name="radio-buttons-group" >
                        <div className='flex mt-3 ml-[15px]'>
                            <FormControlLabel control={<Radio/>}   name="payment" value="netbanking"  />
                            <img src="https://www.relaxofootwear.com/assets/img/social.svg" alt=''></img>
                        </div>
                        <div className='flex mt-3 ml-[15px]'>
                            <FormControlLabel control={<Radio/>}   name="payment" value="card"  />
                            <img src='https://www.relaxofootwear.com/assets/img/Social-1.svg'  alt=''></img>
                        </div>
                        <div className='flex mt-3 ml-[15px]'>
                        <FormControlLabel control={<Radio/>}   name="payment" value="Cash" label="Cash on delivery" />
                        </div>
                    </RadioGroup>
                </div>
                <div className='border h-[100px] flex flex-row-reverse px-[20px]'>
            <button onClick={()=>handleOptionFunction(radioValue)}
            className='mt-[20px] ml-[20px] bg-[#223C8C] text-[#fff] w-[185px] font-semibold h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] hover:bg-blue-600 hover:text-white'>PLACE ORDER</button>
                </div>
              </AccordionDetails>
            </Accordion>

         
            </div>
         
  
            <div className='mt-[170px] border w-[380px]  '>
            <h2 className='w-[100%] h-[57px]  text-xl font-semibold    bg-[#EDEBEC] flex items-center px-[24px]'>Cart Summary</h2>
            <div>
                <div className='flex justify-between p-1 text-[12px] items-center'>
                    <div className=' px-[14px]   tracking-wide leading-3  font-normal'>{carts.length} Item</div>
                    
                    <div>
                        <p className='text-blue-700 mr-2 underline'>EDIT CART</p>
                    </div>
                </div>
                {
                    carts && carts.map((data,index) => (
                        <div key={index} className='flex justify-around mt-[17px]'>
                            <div>
                                <img src={data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.image} className='ml-[10px] w-[80px] h-[80px] border' alt=''/>
                            </div>
                            <div>
                                <h4 className='flex font-semibold text-[12px]'>{data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.title &&  data.products[0].productId.title.longTitle}</h4>
                                <h4 className='font-normal text-[18px]'>Size: 8</h4>
                            </div>
                            <div>
                                <h4 className='flex font-semibold text-[15px] mt-[10px]'>₹ {data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.price &&  data.products[0].productId.price.mrp}.00</h4>
                            </div>
                </div>
                    ))
                }
                
            </div>
            <Divider sx={{ marginTop:"15px",width:"350px",marginLeft:"20px"}}/>
            <div className='flex flex-col mt-[20px]'>   
            <div className='ml-[20px] flex justify-between  w-[340px] text-[18px] items-center'>
                <div  >GST @12%(Inc.)</div>
                <div className='mr-[10px]'>{price*0.12}</div>
            </div>
            <div className='ml-[20px] flex justify-between  w-[340px] text-[18px] items-center'>
                <div  >Subtotal</div>
                <div className='mr-[10px]'>{price + (price * 0.12)}</div>
            </div>
            <div className='ml-[20px] mt-[10px] flex justify-between  w-[340px] text-[18px] items-center'>
                <div>Shipping</div>
                <div  className='mr-[10px]'>{price > 500 ? '00' : '49' }.00</div>
            </div>
            

            </div>
            
            <div className='w-[100%] h-[90px] mt-[51px]  text-xl  font-bold justify-between   bg-black text-white flex items-center px-[24px]'>
                <div >Total Order</div>
                <div>{(price + (price * 0.12))>500 ? (price + (price * 0.12)):(price + (price * 0.12)+49)}</div>
                
            </div>

            </div>

        </div>
       
      <ToastContainer/>
    </div>
    </>
  )
}

export default Index
