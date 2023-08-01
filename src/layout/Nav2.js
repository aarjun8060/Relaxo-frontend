import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import { useRouter } from 'next/navigation';

const Button = styled('button')({
    width:"80px",
    borderRadius:"0px",
    height:"52px",
    color:"white",
    border:"2px",
    fontWeight:"500"
    // ":hover":{
        
    // }

})
function Nav2() {
    // use State 
    const router = useRouter();
    const [showTab,setShowTab] = useState(" ");
    const handleClick =(value) => {
        setShowTab(value);
        
  };
  const [style, setStyle] = useState({display: 'none'});

  return (
    <div className='hidden sm:block'>
    <div className=' flex flex-col w-[100%] fixed top-[60px] z-40 '>
    <div className='bg-black h-[52px] w-[100%] flex justify-end mr-20'>
    <Box
      sx={{
        width:"700px",display: 'flex',justifyContent:"space-around",flexDirection: 'row',alignItems: 'center',
        marginRight: '20px',
        '& > *': {
        m: 1,
        },
      }}
    >
                    <Button   onMouseEnter={e => {
                      setStyle({display: 'block'});
                  }} 
                  onMouseLeave={e => {
                      setStyle({display: 'none'})
                  }} key="sale"   variant='text'   className='bg-[#F9A925] hover:' id="sale">SALE</Button>
                         
                         
                         
                        

                    <Button  onMouseEnter={()=> handleClick("arrivals")} onMouseLeave={() => handleClick(" ")} key="arrivals" variant='text' sx={{color:"white",border:"0px",width:"120px"}} onClick={()=> router.push("/arrival/a")} >NEW ARRIVALS</Button>


                    <Button onMouseEnter={()=> handleClick("women")} onMouseLeave={() => handleClick(" ")} key="women" variant='text' sx={{color:"white",border:"0px"}} onClick={()=> router.push("/arrival/women")}>WOMEN</Button>

                    <Button  onMouseEnter={()=> handleClick("men")} onMouseLeave={() => handleClick(" ")} key="men" variant='text' sx={{color:"white",border:"0px"}} onClick={()=> router.push("/arrival/men")}>MEN</Button>

                    <Button  onMouseEnter={()=> handleClick("kids")} onMouseLeave={() => handleClick(" ")} key="kids" variant='text' sx={{color:"white",border:"0px"}} onClick={()=> router.push("/arrival/kid")}>KIDS</Button>


                    <Button  onMouseEnter={()=> handleClick("accessories")} onMouseLeave={() => handleClick(" ")} key="accessories" variant='text' sx={{color:"white",border:"0px",marginRight:"30px"}}>ACCESSORIES</Button>
            
         </Box>
         </div>
        <div className='flex relative z-100'>
        <div style={style} className='bg-[#1D1D1D] text-[#fff] ml-[385px] w-[215px] h-[110px] z-100 flex flex-col justify-start '>
                                    <p className='ml-[20px] mt-[20px] text-sm'>Women</p>
                                    <p className='ml-[20px] mt-[5px] text-sm'>Men</p>
                                    <p className='ml-[20px] mt-[5px] text-sm'>Kids</p>
                                </div> 
        {/* <div>
        
                        </div>
                        <div>
        {showTab=="arrival" && 
            <div className='bg-[#1D1D1D] text-[#fff] ml-[550px] w-[215px] h-[110px] z-200 flex flex-col justify-start absolute '>
                                    <p className='ml-[20px] mt-[20px] text-sm'>Women</p>
                                    <p className='ml-[20px] mt-[5px] text-sm'>Men</p>
                                    <p className='ml-[20px] mt-[5px] text-sm'>Kids</p>
                                </div> 
                        }
                        </div>
        <div>    
        {showTab=="women" && 
            <div className='bg-[#1D1D1D] text-[#fff] ml-[302px] w-[700px] h-[160px] z-100 flex justify-around absolute'>
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                        
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                    
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                </div> 
                        }
                        {showTab=="men" && 
            <div className='bg-[#1D1D1D] text-[#fff] ml-[302px] w-[700px] h-[160px] z-100 flex justify-around'>
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                        
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                    
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                </div> 
                        }
                        {showTab=="kids" && 
            <div className='bg-[#1D1D1D] text-[#fff] ml-[302px] w-[700px] h-[160px] z-100 flex justify-around'>
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                        
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                    
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                </div> 
                        }
                        {showTab=="accessories" && 
            <div className='bg-[#1D1D1D] text-[#fff] ml-[302px] w-[700px] h-[160px] z-100 flex justify-around'>
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                        
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                    
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                    <div className='mt-[20px] flex flex-col justify-evenly'>
                                        <h4 className='text-gray-500 font-semibold'>SHOES</h4>
                                        <p>Casuals</p>
                                        <p>Running</p>
                                        <p>Athleisure</p>
                                        <p>Walking</p>
                                    </div>
                                </div> 
                        }
                        
                        
                    </div> */}
            </div>
    </div>
</div>
    
    
  )
};

export default Nav2;
