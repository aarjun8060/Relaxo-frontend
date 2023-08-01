import React from 'react'
import Image from "next/image";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import { useState } from 'react';
import {Button, Tooltip, Typography} from "@mui/material";
import { useRouter } from 'next/router';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';

import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
function Nav(){
  const {user} = useSelector((state)=> state.auth)
  const router = useRouter();
  const [display , setDisplay] = useState(false);
   
  // use Selector for cart badge
 const {cartsPaginator} = useSelector((state)=>state.cart);
 
  const handleLogout = () =>{
    localStorage.removeItem("accessToken");
    router.push("/")
  }

  return (
 
    <div className='w-[350px] flex justify-between  md:px-5  h-[60px] md:w-[100%] fixed top-0 z-50 bg-white'>
        <div className='mt-[10px] sm:mt-[8px] md:mt-3 ml-1'>
            <Image src="/footwear.svg" width={140} height={50} alt=""></Image>
        </div>
        <div className='md:w-[300px]  flex justify-around mt-[12px] md:mt-3 h-8 text-gray-500'>
            <SearchIcon className='text-[30px]' />
            <HomeOutlinedIcon className='text-[30px] cursor-pointer' onClick={()=> router.push("/")} />
            <LocationOnOutlinedIcon className='text-[30px]' />
           <div>
           {
            Object.keys(user).length!==0 ? <Typography onClick={()=> router.push("/auth/profile")} className='cursor-pointer text-black font-semibold text-2xl border-2 border-black rounded-[90%] px-2 py-0'>{user.name.substring(0,1)}</Typography>
           : <PermContactCalendarOutlinedIcon className='text-[30px] cursor-pointer' onClick={()=> router.push("/auth/login")} />
           }</div>
            <Badge badgeContent={cartsPaginator.itemCount} color="primary">
              <LocalGroceryStoreOutlinedIcon className='text-[30px]' onClick={()=> router.push("/cart")} />
              </Badge>
            <Button onClick={()=> {setDisplay(true)}} className='mt-[9px] font-semibold leading-3 align-baseline sm:mr-8 ' sx={{color:"black",paddingBottom:"30px"}}><ReorderOutlinedIcon className='text-[30px]'  /></Button>
            <Drawer anchor='right' open={display} onClose={()=> setDisplay(false)} sx={{height:"60vh !important",}} >
              <Box p={2} width='350px' textAlign='center' sx={{backgroundColor:"#374A94",height:"100vh"}} >
                <Typography variant='h5' sx={{marginTop:"30px"}}>
                  COMPANY INFO
                </Typography>
                <Typography variant='h5'>
                  MEDIA
                </Typography>
                <Typography variant='h5'>
                  CAREERS
                </Typography>
                <Typography variant='h5'>
                <div onClick={handleLogout} >
                  logout
                </div>
                </Typography>
              </Box>
            </Drawer>
        </div>
     </div>
  )
}

export default Nav
