import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';



function Index() {
    const router = useRouter();
    const [details,setDetails] = useState()
    const {orders} = useSelector((state)=> state.order) 

    const fetchOrder = () => {
        let arr ;
        for(let order of orders){
            for(let k of order.products){
                if(k.id === router.query.track){
                    arr = {...k}
                }
            }
        }
         
        setDetails({...arr})
    }
    useEffect(() => {
        fetchOrder()
    },[])
    // console.log(details);
    const handleStatus = () => {
        if(details && details.orderStatus){
            if(details.orderStatus && details.orderStatus.orderConfirm){
                return 0;
            }else if(details.orderStatus && details.orderStatus.shipped){
                return 1;
            }else if(details.orderStatus && details.orderStatus.outForDelivery){
                return 2;
            }else if(details.orderStatus && details.orderStatus.delivered){
                return 3;
            } 
        }
    }
    const steps = [
        'Order confirmed',
        'Shipped',
        'Out for Delivery','Delivered'
    ];
  return (
    <div className='mt-[150px] flex flex-col justify-center items-center'>
     <div className='flex flex-col border w-[770px] h-[300px] mt-[10px] '>     
     <h1 className='text-2xl text-blue-900 p-2 underline'>Track Order Details</h1>                                            
                               <div className='flex justify-between w-[100%]'>
                               <div className='flex h-[250px] mb-[80px] justify-around  w-[80%]  mt-[40px]'>
                               <div className='border w-[180px] h-[140px]'>
                                   <img src={details && details.productId && details.productId.image}  className='w-[180px] h-[120px]' />
                               </div>
                               <div className='flex flex-col'>
                                   <h1 className='text-2xl font-semibold '>{details && details.productId && details.productId.title &&details.productId.title.longTitle}</h1>
                                   <h4 className='text-lg mt-[1px] ml-[2px]'>Status:Pending</h4>
                                   <h4 className='text-lg mt-[1px] ml-[2px]'>Price:₹ {details && details.productId && details.productId.price && details.productId.price.mrp}.00</h4>
                                   <p className='text-[18px] mt-[1px] ml-2'>Size :9</p>
                                   <div className='flex w-[150px] '>
                                   <p className='text-[18px] font-normal ml-2'>Qty:{details && details.qty}</p>
                                   </div>
                                       
                               </div>
                       
                               </div>
                               </div>
            </div>
    <div>
    <Box sx={{ width: '770px',height:"100px",padding:"10px"  ,border:"1px solid #D3D3D3",marginTop:"10px"}}>
                    <Stepper activeStep={() => handleStatus()} alternativeLabel  >
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                                        </Box>
    </div>
    </div>     
    
     
  
  )
}

export default Index
