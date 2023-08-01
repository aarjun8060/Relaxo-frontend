import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderList } from '../../../src/redux/slice/Order'
import { useRouter } from 'next/router'

function Index() {
    // use Router
    const router = useRouter();
    // redux setup
    const dispatch = useDispatch()
    
    const  getOrderList = async() => {
        const res = await dispatch(orderList())
    }
    // USE EFFECT
    useEffect(()=> {
        getOrderList()
    },[])

    const {orders} = useSelector((state)=> state.order);
    console.log(orders);


  return (
    <div className='flex flex-col mt-[100px] m-16 border h-auto'>
       <div className='mt-[110px]'>
                   <div className='w-[100%] h-[57px]  text-xl font-semibold    bg-black text-white flex items-center px-[24px]'>Your Order Confirmation</div>
       </div>
       <div className='flex w-full justify-around mt-5'>
           <div className='w-[50%]'>
               <p>Thanks for placing your Order is now: CONFIRMED</p>
               <p><span className='font-semibold'>Shipping Address:</span>Locality:{orders && orders[0] && orders[0].address && orders[0].address.locality}, city:{orders && orders[0] && orders[0].address && orders[0].address.city}, state:{orders && orders[0] && orders[0].address && orders[0].address.state},    country:{orders && orders[0] && orders[0].address && orders[0].address.country}, pincode:{orders && orders[0] && orders[0].address && orders[0].address.zipcode} </p>
           </div>
           <div>
               <p className='text-black text-[16px]'>Order Number:#3000057689</p>
               <button className='mt-[20px] ml-[10px] bg-white text-black w-[150px] h-[40px] rounded-3xl border border-black tracking-wide leading-3 mb-[20px] hover:bg-[#374A94] hover:text-[#fff] hover:border ' 
                       >TRACK ORDER</button>
           </div>
       </div>
       <div className='p-10'> 
       {
                orders.map((data,index)=> (
                    <div key={index} className='flex flex-col border w-[770px] h-[300px] mt-[10px] '>                                                 
                               
                               
                               <div className='flex justify-between w-[100%]'>
                               <div className='flex h-[250px] mb-[80px] justify-around  w-[60%]  mt-[40px]'>
                               <div className='border w-[180px] h-[140px]'>
                                   <img src ={data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.image}  className='w-[180px] h-[120px]' />
                               </div>
                               <div className='flex flex-col'>
                                   <h1 className='text-2xl font-semibold '>{data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.title &&  data.products[0].productId.title.longTitle}</h1>
                                   <h4 className='text-lg mt-[1px] ml-[2px]'>Status:Pending</h4>
                                   <h4 className='text-lg mt-[1px] ml-[2px]'>Price:₹ {data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.price &&  data.products[0].productId.price.mrp}.00</h4>
                                   <p className='text-[18px] mt-[1px] ml-2'>Size :9</p>
                                   <div className='flex w-[150px] '>
                                   <p className='text-[18px] font-normal ml-2'>Qty:{data && data.products &&  data.products.length>0 && data.products[0].qty }</p>
                                   </div>
                                       
                               </div>
                       
                               </div>
                               <div className='flex justify-center items-center h-[200px] mr-[20px]'>
                               <div className='mt-[20px] ml-[10px] bg-white text-black w-[150px] h-[40px]'>₹ {data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.price &&  data.products[0].productId.price.mrp}.00</div>

                               </div>
                      

                               

                               </div>
            </div>
                ))
       }
        </div>                    
        <div>
            <div className='w-[100%] h-[90px] mr-[50px]  text-xl  font-bold justify-between   bg-black text-white flex items-center px-[24px]'>
                <div >Total Order</div>
                    <button  onClick= {()=> router.push("/auth/profile")}
                    className='mt-[20px] mr-[20px] bg-[#223C8C] text-[#fff] w-[150px] font-semibold h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] hover:bg-blue-600 hover:text-white'>My Orders</button>
                     
                </div>
        </div>
               
            
                       
        
    </div>
  )
}

export default Index
