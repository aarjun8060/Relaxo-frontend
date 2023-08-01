import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
 
import { CheckBox } from '@mui/icons-material';
import { productApi } from '../../src/mocks/productRoutes';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Button } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { createCart } from '../../src/redux/slice/cartRoutes';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Product() {
    
    const router = useRouter();
    const [detail,setDetail] = useState({ })
    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.auth);

    const fetchData = async () =>{
        const result = await productApi.getProduct(router.query.productId);
     
        if(result && result.status==='SUCCESS'){
          setDetail(result.data);
        }else{
          setDetail({ })
        }
    }
    

    // cart function 
    const handleCart = async (id) => {
        
        if(Object.keys(user).length===0){
        router.push("/auth/login");
        return;
        }
        let data = {
         userId:user.id,
         "products":[
            {
                "productId": id,
                "qty": 1
            }
         ]
        }

        try {
            const result = await dispatch(createCart(data));
            if(result)
            toast.success("Item Successfully added to Cart")
            else
            toast.warn("Some error to create cart")
        } catch (error) {
             console.log(error)
        }
    }
     

  // mocks function 
  useEffect(()=> {
   fetchData();
  },[router.query.productId])

//   // button of custom paging 
  const PreviousBtn = (props) =>{
    const {className,onClick} = props;
    
     return (
           <div className={className}   onClick={onClick}>
            <ExpandLessIcon sx={{color:'black',zIndex:'100',background:'white',borderRadius:'50px',fontSize:'40px' }} />
           </div>  
     )
  }
  
  const NextBtn = (props) =>{
     const {className,onClick} = props
     return (
       <div  className={className}  onClick={onClick}>
         <ExpandMoreIcon sx={{color:'black',zIndex:'200' ,background:'white',borderRadius:'50px',fontSize:'40px' }} />
       </div>
     )
  }

 
    const settings = {
        customPaging: function(i) {
            
            return (
                
                    <div className='mt-[20px]' style={{display:"flex!important", gap:"50px"}} >
                        <Avatar alt='' src={detail&&detail.productImages&&detail.productImages[i].path} sx={{width:"120px !important", height:"105px !important", objectFit:"contain", borderRadius:"0px"}} />  
                    </div>
            
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        autoplay:1000,
        slidesToShow: 1,
        slidesToScroll: 1,
     
      };
  return (
    <div>
         
        <div className='w-[100%]  flex justify-between '>
            <div className='   w-[650px]'>

                <Slider {...settings} className='mt-[50px] border-black ml-[20px] flex flex-col justify-evenly' >
                <div>
                    <img src={detail&&detail.productImages&&detail.productImages[0].path} alt='' className='ml-[110px] w-[500px] h-[50]'/>
                </div>
                <div>
                    <img src={detail&&detail.productImages&&detail.productImages[1].path} alt='' className='ml-[110px] w-[500px] h-[50]'/>
                </div>
                <div>
                    <img src={detail&&detail.productImages&&detail.productImages[2].path} alt='' className='ml-[110px] w-[500px] h-[100]'/>
                </div>
        
                </Slider>
            </div>
            <div className='flex ml-[60px] flex-col mt-[50px] justify-evenly'>
                <div>
                    <h1 className='text-black text-[28px] font-semibold'>{detail&&detail.title&&detail.title.shortTitle}</h1>
                    <h3 className='text-gray-400 text-[25px] font-semibold'>{detail && detail.title && detail.title.longTitle.substring(0,detail.title.longTitle.length-7)}</h3>
                    <h4 className='text-gray-400 text-[25px] font-normal'>{detail && detail.title&&detail.title.longTitle.substring(detail.title.longTitle.length-7)}</h4>
                </div>
                <div className='flex justify-start items-center '>
                    <p className='text-black text-[28px] font-normal'>₹ {detail && detail.price&& detail.price.mrp}.00<span className='text-gray-400 text-[15px] font-normal mb-[15px]'>MRP inclusive of all taxes</span></p>
                </div>
                <div>
                    <p className='text-black text-[20px] font-normal'>Glamorous look with this comfortable & lightweight style to always keep you delighted.</p>
                </div>
                <div className='flex flex-col'>
                    <h4 className='text-black text-[28px] font-semibold'>Color</h4>
                    <div className='flex'>
                    <CheckBox className='text-purple-500'/>
                    <CheckBox className='text-pink-500'/>
                    <CheckBox className='text-blue-500'/>
                    </div>
                    
                </div>
                <div>
                    <h4 className='text-black text-[28px] font-semibold'>Select Size</h4>
                    <div className='flex gap-2'>
                    <div className=" w-[40px] flex justify-center items-center text-[25px] h-[35px] border border-black">5</div>
                    <div className=" w-[40px] flex justify-center items-center text-[25px] h-[35px] border border-black">6</div>
                    <div className=" w-[40px] flex justify-center items-center text-[25px] h-[35px] border border-black">7</div>
                    
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h4 className='text-black text-[28px] font-semibold'>Color</h4>
                    <div className='flex'>
                    <CheckBox className='text-red-500'/>
                    <CheckBox className='text-yellow-500'/>
                    <CheckBox className='text-blue-500'/>
                    </div>
                </div>
                <div>
                    <p>Select a delivery location to see product availability and delivery options</p>
                </div>
                <div className='flex border-1 border-black'>
                    <input type='text' className='border border-black w-[180px] h-[40px] mt-[20px] '/>
                    <button className='mt-[20px] bg-[#223C8C] text-[#fff] w-[100px] h-[40px]   tracking-wide leading-3 mb-[20px]'>SUBMIT</button>
                </div>
                <div className='flex gap-2'>
                    
                    <button className='mt-[20px] cursor-pointer bg-[#223C8C] text-[#fff] w-[180px] h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] hover:bg-white hover:text-[#223C8C] hover:border-black hover:border-2'>BUY NOW</button>

                    <button  onClick={() => handleCart(detail.id)}
                    className='mt-[20px] cursor-pointer bg-[#fff] text-black border w-[180px] h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px] hover:text-white hover:bg-[#223C8C] hover:border-black hover:border-2'>ADD TO CART</button>
                </div>
                
            </div>
        </div>

        <div className='flex justify-normal ml-[20px] gap-[150px] mt-[20px]'>

            <div className='w-[350px] gap-5'>
                <div className='flex  items-center py-[2px] h-[33px] text-[25px] space-x-1'>
                    <h1 className='font-2xl leading-3 '>SPECIFICATIONS</h1>
                </div>
                <div>
                    <div className='flex h-[33px] px-[14px] gap-[140px] font-lg text-[18px] text-black-800 bg-gray-200'>
                        <h1>Category</h1>
                        <h1>{detail&&detail.subCategory}</h1>
                    </div>
                    <div className='flex h-[33px] px-[14px] gap-[165px] font-lg text-[18px] text-black-800'>
                        <h1>Brand</h1>
                        <h1>{detail&&detail.title&&detail.title.shortTitle}</h1>
                    </div>
                    <div className='flex h-[33px] px-[14px] gap-[166px] font-lg text-[18px] text-black-800 bg-gray-200'>
                        <h1>Color</h1>
                        <h1>BLUE</h1>
                    </div>
                    <div className='flex h-[33px] px-[14px] gap-[150px] font-lg text-[18px] text-black-800'>
                        <h1>Gender</h1>
                        <h1>{detail&&detail.category}</h1>
                    </div>
                    <div className='flex h-[33px] px-[14px] gap-[140px] font-lg text-[18px] text-black-800 bg-gray-200'>
                        <h1>Material</h1>
                        <h1>SYNTHETIC</h1>
                    </div>
                    <div className='flex h-[33px] px-[14px] gap-[170px] font-lg text-[18px] text-black-800 '>
                        <h1>Sole</h1>
                        <h1>TPR</h1>
                    </div>
                </div>


            </div>
            <div>
            <div>
                <h1 className='font-2xl leading-3 flex  items-center py-[2px] h-[33px] text-[25px] space-x-1'>SHIPPING</h1>
                <p className='mt-[15px] text-gray-500 '>Free shipping on order above Rs.{detail&&detail.price&&detail.price.mrp}</p>
            </div>
            <div className='mt-[20px]'>
                <h4 className='font-2xl leading-3 flex  items-center py-[2px] h-[33px] text-[25px] space-x-1'>OTHER INFORMATION</h4>
                <ul className='text-[17px] text-black' >
                    <li><CircleIcon sx={{color:"#223C8C",height:"10px"}}/>15 days return / exchange</li>
                    <li><CircleIcon sx={{color:"#223C8C",height:"10px"}}/>Manufactured & Marketed by: Relaxo Footwears Limited</li>
                    <li><CircleIcon sx={{color:"#223C8C",height:"10px"}}/>Office: Aggarwal City Square, Plot No.10, Manglam Place,<br/>  <span className='ml-[24px]'></span>District Centre, Sector-3, Rohini, Delhi-110085</li>
                    <li className='gap-0'><CircleIcon sx={{color:"#223C8C",height:"10px"}}/>Customer Care Cell: Address same as Regd. Office.<br/>
                    <span className='ml-[24px]'></span>                Tel.: 18001086001, E-Mail:<br/>
                    <span className='ml-[24px]'></span>                   Customercare@relaxofootwear.com</li>
                    <li className='mt-[7px]'><CircleIcon sx={{color:"#223C8C",height:"15px"}}/>Cash on delivery available</li>
                </ul>
            </div>

            <div className='mt-[15px] gap-0 flex justify-stretch flex-col'>
                {/* review  */}
                <div className='flex text-[15px] font-xl text-orange-500'>
                    <StarBorderIcon/>
                    <StarBorderIcon/>
                    <StarBorderIcon/>
                    <StarBorderIcon/>
                    <StarBorderIcon/>
                    
                </div>
                <span >0 reviews</span>
            </div>
            <div className='mt-[80px]'>
                <Button variant="contained" sx={{backgroundColor:"#fff",color:"#223C8C",border:"1px solid #223C8C",paddingX:"42px",paddingY:"8px",borderRadius:"24px",fontWeight:"700",fontSize:"15px","&:hover":{color:"#FFF"}}}>WRITE A REVIEW</Button>
            </div>






            </div>

            



        </div>
   
        <ToastContainer />
    </div>
  )
}

export default Product

