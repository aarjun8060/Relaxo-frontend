import { Box, Card, Skeleton, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {TabContext,TabList,TabPanel} from "@mui/lab"
import {Avatar} from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import style from  "../../../styles/customer.module.css"
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import { updateUser } from '../../../src/redux/slice/auth';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getOrder, orderDelete, orderList } from '../../../src/redux/slice/Order';
import Stack from '@mui/material/Stack';


function Profile() {
    const router = useRouter();
    const[value,setValue] = useState('1');
    const [update,setUpdate] = useState(false);
    const[loading,setLoading] = useState(true);

    const handleChangeValue = (event,newValue)=>{
        setValue(newValue)
    }
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth);
    const [userData,setUserData] = useState({
        name:user&&user.name&&user.name,
        email:user&&user.email&&user.email
    })
    const handleChange = (e) => {
        setUserData({...userData,[e.target.name]:e.target.value})
    }
    const updateHandle = async () => {
      try{
        const result = await dispatch(updateUser(userData,user.id));
        toast.success("successfully login")
        
      }catch(e){
        toast.error("Unauthorized User")
        console.log(e);
      }
    }
    const handleLogout = () =>{
                localStorage.removeItem("accessToken");
                toast.error("LogOut")
                router.push("/")
              }
               

        // This useState use for mobileSize View Display Tab
    const [displayStyle, setDisplayStyle] = useState('block');
    
    const handleDisplay = () => {
        setDisplayStyle(displayStyle === 'block' ? 'none' : '');
      };
    
    // order Details  get List 
    const  getOrderList = async() => {
        setLoading(true)
        const res = await dispatch(orderList())
        setLoading(false)

        }
        // USE EFFECT
        useEffect(()=> {
            getOrderList()
        },[update])
  
        const {orders} = useSelector((state)=> state.order);
    // function for remove item
    const handleDeleteOrder = (id) => {
        try{
            dispatch(orderDelete(id));
            setUpdate(true);
            toast.warn("Remove Item")
        }catch(e){
            console.log(e)
        }
        
    }
    
    const trackOrder = (id) => {
        router.push(`/checkout/trackOrder/${id}`)
    }
  return (
    <div className='mt-[180px]'>
        <Box sx={{display:"flex",flexDirection:{md:"row",xs:"column"}}}>

            <TabContext value={value} sx={{display:"flex",flexDirection:{xs:"column",md:"row"} ,border:"1px solid gray",justifyContent:"space-around"}}>
                
                <Box sx={{borderBottom:0,width:{xs:"350px",md:"600px"},marginTop:"22px"}}>
                    <Box sx={{width:{xs:"315px",md:"360px"},height:{md:"250px",xs:"140px"},border:"1px solid black",marginLeft:{md:"30px",xs:"20px"},display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <Avatar alt="" sx={{width:{md:"150px",xs:"80px"},height:{md:"150px",xs:"80px"},border:"2px solid #374A94"}} ></Avatar>
                    </Box>
                    <TabList aria-label='Tabs' onChange={handleChangeValue} orientation='vertical'  sx={{width:{md:"390px",xs:"335px"},marginLeft:{md:"30px",xs:"0px"},height:"100%"}}>
                            <Box onClick={handleDisplay} sx={{display:{md:"none",xs:"block"},backgroundColor:"#374A94",color:"#fff",marginLeft:{md:"30px",xs:"20px"}}}>
                            <Tab onChange={handleChangeValue} icon={<ListAltIcon/>} label="User Menu" iconPosition="end" value='8' sx={{padding:"20px",display:"flex",justifyContent:"space-between",margin:"0",width:{md:"390px",xs:"320px"},minHeight:"50px",border:"1px solid black"}}></Tab>
                            </Box>
                            <Box  sx={{display:{md:"block"}}}  >
                            <Tab onChange={handleChangeValue} style={{ display: displayStyle }}  icon={<ListAltIcon/>} label="My Orders" iconPosition="start" value='1' sx={{padding:"0",margin:"0",minHeight:"50px",width:{md:"390px",xs:"315px"},border:"1px solid black",marginLeft:{md:"0px",xs:"20px"},color:"black","&:hover":{backgroundColor:"black",color:"#fff"}}}></Tab>
                            <Tab onChange={handleChangeValue} style={{ display: displayStyle }} icon={<FavoriteBorderIcon/>} label="My Wishlist" iconPosition="start" value='2' sx={{padding:"0",margin:"0",minHeight:"50px",width:{md:"390px",xs:"315px"},border:"1px solid black",marginLeft:{md:"0px",xs:"20px"},color:"black","&:hover":{backgroundColor:"black",color:"#fff"}}}></Tab>
                            <Tab  onChange={handleChangeValue} style={{ display: displayStyle }}  icon={<PersonIcon/>} label="Edit Profile" iconPosition="start" value='3' sx={{padding:"0",margin:"0",minHeight:"50px",width:{md:"390px",xs:"315px"},border:"1px solid black",marginLeft:{md:"0px",xs:"20px"},color:"black","&:hover":{backgroundColor:"black",color:"#fff"}}}></Tab>
                            <Tab onChange={handleChangeValue} style={{ display: displayStyle }} icon={<LocationOnIcon/>} label="Manage Address" iconPosition="start" value='4' sx={{padding:"0",margin:"0",minHeight:"50px",width:{md:"390px",xs:"315px"},border:"1px solid black",marginLeft:{md:"0px",xs:"20px"},color:"black","&:hover":{backgroundColor:"black",color:"#fff"}}}></Tab>
                            <Tab onChange={handleChangeValue} style={{ display: displayStyle }} icon={<CardGiftcardIcon />} label="Relaxo Credit" iconPosition="start" value='5' sx={{padding:"0",margin:"0",minHeight:"50px",width:{md:"390px",xs:"315px"},border:"1px solid black",marginLeft:{md:"0px",xs:"20px"},color:"black","&:hover":{backgroundColor:"black",color:"#fff"}}}></Tab>
                            <Tab  onChange={handleChangeValue} style={{ display: displayStyle }} icon={<StarBorderIcon/>} label="My Reviews" iconPosition="start" value='6' sx={{padding:"0",margin:"0",minHeight:"50px",width:{md:"390px",xs:"315px"},border:"1px solid black",marginLeft:{md:"0px",xs:"20px"},color:"black","&:hover":{backgroundColor:"black",color:"#fff"}}}></Tab>
                            <Tab  onChange={handleChangeValue} style={{ display: displayStyle }} icon={<LogoutIcon/>} label="Logout" iconPosition="start" value='7' sx={{padding:"0",margin:"0",minHeight:"50px",width:{md:"390px",xs:"315px"},border:"1px solid black",marginLeft:{md:"0px",xs:"20px"},color:"black","&:hover":{backgroundColor:"black",color:"#fff"}}}
                            onClick={handleLogout}></Tab>
                        </Box>
                    
                    </TabList>
                </Box>

                <Box>
                
                <TabPanel value='1'>
                        <Box sx={{width:{md:"800px",xs:"315px"},border:"1px solid #D3D3D3",marginRight:{md:"20px",xs:"0px"},padding:"0px",marginLeft:{xs:"-5px"}}}>
                        <div className=' md:w-[100%] w-[315px] flex justify-around h-auto'>
                            <div className=''>
                                <div className='md:mt-[10px] mt-1  '>
                                    <h2 className='md:text-3xl text-lg font-normal text-[#374A94] md:p-5 p-2 ml-1'>My Orders</h2>
                                    <div> 
                                    <div className='flex flex-col md:border w-[310px]  md:w-[770px] h-max mt-[10px] md:mb-[30px]'>
                                    <div className='md:w-[100%] w-[309px] h-[150px]  text-xl font-semibold text-[#666666] bg-[#F6F6F6] flex md:flex-row flex-col md:items-center   md:px-[24px] md:py-[15px] md:justify-between justify-start p-3'>
                                        
                                        <h1 className='text-black text-[16px]'>Order Number:#3000057689</h1>
                                        <div className='text-[12px] m-0 p-0'>
                                            <div>Order Placed : 29 Jun 23, 5:37 pm</div>
                                            <div>Order Amount : 1,120</div>
                                        </div>
                                    </div>
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

                                            orders && orders.map((item) => (
                                                item.products.map((data,index)=> (
                                                <div key={index} className='flex justify-between w-[100%]'>
                                    <div className='flex md:flex-row flex-col h-auto  justify-around  md:w-[60%]  border-black mt-[40px]'>
                                    <div className='border md:w-[180px] w-[100px] md:h-[140px] h-[100px] '>
                                        <img src ={data && data.productId && data.productId.image} className='md:w-[180px] w-[100px] md:h-[140px] h-[100px]' />
                                    </div>
                                    <div className='flex flex-col mt-[10px] md:mt-0 w-[200px]'>
                                        <h1 className='md:text-2xl text-[18px] font-semibold ml-2'>{data && data.productId && data.productId.title && data.productId.title.longTitle}</h1>
                                    <h4 className='md:text-lg text-normal mt-[1px] ml-2'>Status:{item && item.status}</h4>
                                    <h4 className='md:text-lg text-normal mt-[1px] ml-2'>Price:₹ {data && data.productId && data.productId.price && data.productId.price.mrp}.00</h4>
                                    <p className='md:text-[18px] text-normal mt-[1px] ml-2'>Size :9</p>
                                    <div className='flex w-[150px] '>
                                    <p className='md:text-[18px] text-normal font-normal ml-2'>Qty:{data && data.qty }</p>
                                    </div>
                                        
                                </div>
                        
                                </div>
                                <div className='flex flex-col justify-center items-center h-[200px] mr-[20px]'>
                                <button onClick={()=> trackOrder(data.id)}
                                className='mt-[20px] md:ml-[10px] mr-[10px] md:mr-0 bg-white text-black md:w-[150px] w-[100px] text-[10px] md:text-[20px] h-[40px] rounded-3xl border border-black tracking-wide leading-3 mb-[20px] hover:bg-[#374A94] hover:text-[#fff] hover:border ' 
                    >TRACk ORDER</button>
                    <button onClick={() => handleDeleteOrder(data.id)}
                     className=' md:ml-[10px] mr-[10px] md:mr-0 bg-red-800 text-white md:w-[150px] w-[100px] text-[10px] md:text-[20px] h-[40px] rounded-3xl border border-black tracking-wide leading-3 mb-[20px] hover:bg-[#fff] hover:text-[#374A94] hover:border ' 
                    >REMOVE</button>
                                </div>
                                

                                </div>
                                ))))

                                            )
                                        }
                                    </div>
                                 
                                
                                
                                </div>
                                
                        
                                </div> 
                            </div>
                        </div>
                        
                        </div>
                        </Box>
                </TabPanel>
                <TabPanel value='2'>
                    <Box sx={{width:{md:"800px",xs:"315px"},height:"700px",border:"1px solid #D3D3D3",marginRight:"20px",padding:"0px",marginLeft:{xs:"-5px"}}}> 
                            <div>
                            <div>
                                <h2 className='md:text-3xl text-lg font-normal text-[#374A94] md:p-8 p-3 ml-1'>My Wish List(0)</h2>
                            </div>
                            <div className='border md:p-5 md:ml-7 md:mr-7 px-3 ml-2 mr-2 text-gray-400'>
                                No Product in Your Wishlist
                            </div>
                            </div>
                    </Box>
                </TabPanel>
                <TabPanel value='3'>
                    <Box sx={{width:{md:"800px",xs:"315px"},height:"700px",border:"1px solid #D3D3D3",marginRight:"20px",padding:"0px",marginLeft:{xs:"-5px"}}}> 
                            <div>
                                <div className='md:text-3xl text-lg font-normal text-[#374A94] md:p-5 p-3 ml-1'>
                                    Edit Profile
                                </div>
                                <div>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className=' flex flex-col  md:ml-[20px] '>
                                        <h1 className='ml-5'><PersonIcon />Name</h1>
                                        <div className={style.field} >
                                        <input  className={style.inputs}
             name= 'name' value={userData.name} type="text" placeholder='Arjun Singh' onChange={(e) => handleChange(e)} />
                                        <div className={style.line}></div>
                                        </div>
                                    </div>
                                
                                    <div className=' flex flex-col md:ml-[20px] '>
                                        <h1 className='ml-5'><EmailIcon />Email</h1>
                                        <div className={style.field} >
                                        <input type="email" id='email' name='email' value={userData.email}  placeholder="Email" className={style.inputs} onChange={(e) => handleChange(e)}  />
                                        <div className={style.line}></div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:ml-[20px] justify-start'>
                                        <h1 className='ml-5'><SmartphoneOutlinedIcon />Mobile No.:</h1>
                                        <div className={style.field} >
                                            <input type="text" id='number' name="number" placeholder="Number" className={style.inputs} />
                                            <div className={style.line}>
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:ml-[5px] mt-5 justify-start'>
                                        <h1 className='ml-5'><PersonIcon />GST No.(optional):</h1> 
                                        <div className={style.field} >
                                            <input type="text" id='number' name="number" placeholder="" className={style.inputs} />
                                            <div className={style.line}>
                                        </div>
                                    </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            <button className='mt-[30px] md:ml-[30px] ml-[10px] bg-white text-black md:w-[150px] w-[100px] h-[40px] rounded-3xl border border-black tracking-wide leading-3 md:mb-[20px] hover:bg-[#374A94] hover:text-[#fff] hover:border ' 
                                onClick={updateHandle}>SAVE</button>
                            </div>
                    </Box>
                </TabPanel>
                <TabPanel value='4'>
                    <Box sx={{width:{md:"800px",xs:"315px"},height:"700px",border:"1px solid #D3D3D3",marginRight:"20px",padding:"0px",marginLeft:{xs:"-5px"}}}> 
                    <div className='md:text-3xl text-lg font-normal text-[#374A94] md:p-5 p-3 ml-1'>
                                    Manage Address
                                </div>
                                <div>
                                    <Card>
                                        <div>Arjun Singh</div>
                                        
                                    </Card>
                                </div>
                    </Box>
                </TabPanel>
                <TabPanel value='5'>
                    <Box sx={{width:{md:"800px",xs:"315px"},height:"700px",border:"1px solid #D3D3D3",marginRight:"20px",padding:"0px",marginLeft:{xs:"-5px"}}}> 
                    <div>
                            <div>
                                <h2 className='md:text-3xl text-lg font-normal text-[#374A94]  md:ml-7 ml-2 md:mt-5 mt-3'>Relaxo Credit</h2>
                            </div>
                            <p className='text-black mt-0  md:ml-7 ml-2'>Your available current Credit: 0</p>
                    </div>
                    </Box>
                </TabPanel>
                <TabPanel value='6'>
                    <Box sx={{width:{md:"800px",xs:"315px"},height:"700px",border:"1px solid #D3D3D3",marginRight:"20px",padding:"0px",marginLeft:{xs:"-5px"}}}> 
                    <div>
                            <div>
                                <h2 className='md:text-3xl text-lg font-normal text-[#374A94] md:ml-7 ml-2 md:mt-7 mt-2'>My Reviews(0)</h2>
                            </div>
                            <div className='ml-2 md:ml-7 md:mr-7 mr-2 md:mt-4 mt-2 text-gray-400 flex justify-center items-center'>
                                No Product in Your Wishlist
                            </div>
                            </div>
                    </Box>
                </TabPanel>
                 
                </Box>
                
            </TabContext>
            
        </Box>
        <ToastContainer />
    </div>
  )
}

export default Profile
