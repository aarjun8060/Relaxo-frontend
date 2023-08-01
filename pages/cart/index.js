import React, { useEffect } from 'react'
import {cartList,deleteManyCart,updateCart} from "../../src/redux/slice/cartRoutes";
import { useState } from 'react';
import style from  "../../styles/customer.module.css";
import { Divider, Skeleton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import { deleteCart } from '../../src/redux/slice/cartRoutes';
import { useRouter } from 'next/router';
import Spinner from '../../src/layout/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getUser } from '../../src/redux/slice/auth'

function Index() {
  let i=1;
  const router = useRouter();
   //useState setup
  const [update,setUpdate] = useState(false);
  const [loading,setLoading] = useState(true);
    
  
  const { carts,cartsPaginator} = useSelector((state)=>state.cart);
  const {user} = useSelector((state) => state.auth);
 
  const dispatch = useDispatch()
  

  const getCart =async ()=>{
    setLoading(true)
    const res = await dispatch(cartList())
    setLoading(false)
  }
  useEffect(() => {
    getCart()
  }, [update])
 

  useEffect(()=>{
     dispatch(getUser());
  },[])

  
   

  // function for remove item in cart
  const handleDelete = (id) => { 
    try{
      dispatch(deleteCart(id));
      setUpdate(true);
      router.push("/cart")
    
    }catch(e){
      console.log(e);
    }
    
  }
  
 
 // function -> to get total MRP
 let totalPrice = 0;

 for(let i = 0; i< carts.length ; i++){
    let ans = (carts && carts[i].products[0].productId.price.mrp) * (carts[i].products[0].qty);
   totalPrice += ans;
 }
 
 
   
    const[quantity,setQuantity] = useState(1);
    // handleUpdate function for inc and desc the qty of item

    const handleUpdate = async (index,type) => {
      
      let arr = carts[index];
      if(type==='sub' && arr.products[0].qty<=1)
      return ;
      
      let data =  {
        "products": [
                        {
                            "productId": arr.products[0].productId,
                            "qty": type==='add'?arr.products[0].qty+1:arr.products[0].qty-1
                        }
                    ]
    }
    try{
      
      const result = await dispatch(updateCart(data,arr.id));
        if(result){
          return true
        }else{
          return false;
        }
  
    }catch(e){
      console.log(e);
    }
    
    }

   // change page 
    const handlePageChange = (value) =>{
      setPage(value);   
   }



   
     

  return (
    <div className='mt-[100px]'>
{
       carts.length != 0 ? (
        <div className=' w-[100%] flex justify-around'>
      <div>
        <div className='mt-[50px]'>
          <h2 className='text-2xl font-semibold ml-1'>Your Cart</h2>
         <div> 
          {
            loading ? (
                                                <div>
                                                <Stack spacing={1} sx={{width:{xs:"350px",md:"100%"},height:"300px",display:"flex",flexDirection:"row",justifyContent:"space-between",alignContent:"center",marginTop:"40px"}}>
                                                    <div className=' flex justify-center items-center ml-3'>
                                                        <Skeleton  animation="wave" variant="circular" width={150} height={150}  />
                                                    </div>
                                                    <Stack sx={{width:"200px"}}>
                                                    <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                                                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />  
                                                    </Stack>
                                                    <Stack spacing={1} sx={{marginTop:"100px"}}>
                                                        <Skeleton animation="wave" variant="rectangular" width={150} height={40}sx={{borderRadius:"10px"}} />
                                                        <Skeleton animation="wave" variant="rectangular" width={150} height={40}sx={{borderRadius:"10px"}} />                                                    
                                                    </Stack>
                                                </Stack>
                                                </div>
                                            ) : (
          carts && carts.map((data,index) => (
              <div key={index} className='flex flex-col border w-[770px] h-[350px] mt-[10px] mb-[30px]'>
              <div className='w-[100%] h-[75px]  text-xl font-semibold text-[#666666] bg-[#EDEBEC] flex items-center px-[24px] py-[15px]'><h1>Item({carts.length > i ? [i++]:carts.length})</h1></div>
              <div className='flex h-max mb-[0px] justify-between ml-[30px] w-[70%] border-black mt-[10px]'>
              <div>
                <img src ={data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.image} className='w-[180px] h-[150px]' />
              </div>
              <div className='flex flex-col'>
                <h1 className='text-2xl font-semibold '>{data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.title &&  data.products[0].productId.title.longTitle}</h1>
                <h4 className='text-4xl mt-[12px] ml-[2px]'>₹ {data && data.products && data.products.length>0 && data.products[0].productId && data.products[0].productId.price &&  data.products[0].productId.price.mrp}.00</h4>
                <p className='text-[18px] mt-[25px] ml-2'>Size :9</p>
                <div className='flex w-[150px] '>
                  <p className='text-[18px] font-normal ml-2'>Qty:{data && data.products &&  data.products.length>0 && data.products[0].qty }</p>
                  <div className='ml-2 justify-around rounded-2xl w-[220px]  border-black border-2 flex'>
                    <div><button  className='' type="button" onClick={() => handleUpdate(index,'add')}><AddIcon/></button></div>
                     <div className='text-[20px]'>{data&& data.products &&data.products.length>0 && data.products[0].qty} </div>
                    <div><button class=" " type="button"  onClick={() => handleUpdate(index,'sub')}><RemoveIcon/></button></div>
                  </div>
                </div>
            <button className='mt-[20px] ml-[10px] bg-red-900 text-[#fff] w-[150px] h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] hover:bg-white hover:text-red-800 hover:border hover:border-red-700' 
            onClick={() => handleDelete(data.id)}>REMOVE</button>

              </div>
            </div>
            </div>
        )))
          }
            
          </div> 
          
        </div>
            <div>
            <button className='mt-[20px] ml-[20px] bg-[#223C8C] text-[#fff] w-[280px] h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] hover:bg-blue-600 hover:text-white' onClick={() => router.push("/arrival/a")}>CONTINUE SHOPPING</button>
          
            </div>
            {/* <Stack spacing={3} sx={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} >
            
           
              <Pagination  onChange={(e,page) => handlePageChange(page)} count={cartsPaginator.pageCount}  variant="outlined" shape="rounded" boundaryCount={4}/>
            </Stack> */}
        </div>
        <div className='mt-[90px] border w-[400px] h-[480px] '>
          <h2 className='w-[100%] h-[57px]  text-xl font-semibold    bg-[#EDEBEC] flex items-center px-[24px]'>Cart Summary</h2>
          <div>
            <div className='flex flex-col'>
              <div className='mt-[30px] px-[24px]   tracking-wide leading-3  font-normal'>Apply Coupon</div>
              <div class={style.field}>
                <input type="text" placeholder="Enter the code" class={style.inputs} />
                <div className={style.line}></div>
              </div>
              <button  
                className='mt-[20px] ml-[20px] bg-[#223C8C] text-[#fff] w-[100px] h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] font-semibold hover:bg-blue-600 hover:text-white'>APPLY</button>
            </div>
          </div>
          <div className='flex justify-around gap-[200px] text-[18px] items-center'>
            <div  >Subtotal</div>
            <div className='mr-[10px]'>{totalPrice}</div>
          </div>
          <div className='mt-[10px] flex justify-around gap-[200px] text-[18px] items-center'>
            <div>Shipping</div>
            <div  className='mr-[10px]'>{totalPrice > 500 ? '00' : '49' }.00</div>
          </div>
          <Divider sx={{ marginTop:"15px",width:"350px",marginLeft:"20px"}}/>
          <div>
            <div className='ml-[20px] flex justify-around gap-[120px] text-[22px] font-semibold items-center'>
              <div>Total Order</div>
              <div>{totalPrice>500 ? (totalPrice+0):(totalPrice+49)}</div>
            </div>
          </div>
          
              <button  onClick={()=> router.push("/checkout")}
                className='mt-[20px] ml-[20px] bg-[#223C8C] text-[#fff] w-[350px] h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] hover:bg-blue-600 hover:text-white'> PROCEED HERE</button>
       

        </div>
      </div>
       ) : (
        <div className='md:w-[100%] w-[350px] h-[300px] md:border mb-[20px] flex flex-col justify-center items-center '>
        <div className='md:w-9/12 w-[300px] flex justify-center flex-col border'>
            <div className='bg-black text-[#fff] h-[60px] '>
                <h1 className='text-[18px] font-semibold mt-[15px] ml-[20px]'>YOUR CART IS EMPTY</h1>
            </div>
            <div className='h-[80px] flex items-center'>
              <p className='md:text-[20px] text-[15px] font-normal ml-[20px]'>There’s nothing in your cart. Add items now. <span className='text-[#223C8C] cursor-pointer' onClick={()=> router.push("/arrival/a")}>Buy now</span></p>
            </div>
        </div>
      </div>
       )
    }
    <ToastContainer />
    
       
 
    </div>
  )
}

export default Index
