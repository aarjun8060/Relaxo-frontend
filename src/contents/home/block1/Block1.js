import React, { useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'
import { Avatar } from '@mui/material';


function Block1() {

  
  // const PreviousBtn = (props) =>{
  //   const {className,onClick} = props;
    
  //    return (
  //          <div className={className}   onClick={onClick}>
  //           <ArrowBack sx={{color:'black',zIndex:'100',background:'white',borderRadius:'50px',fontSize:'40px' }} />
  //          </div>  
  //    )
  // }
  
  // const NextBtn = (props) =>{
  //    const {className,onClick} = props
  //    return (
  //      <div  className={className}  onClick={onClick}>
  //        <ArrowForward sx={{color:'black',zIndex:'200' ,background:'white',borderRadius:'50px',fontSize:'40px' }} />
  //      </div>
  //    )
  // }
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow:<PreviousBtn />,
    // nextArrow:<NextBtn />,
    initialSlide: 0,

    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 3,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 600,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       initialSlide: 2
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1
    //     }
    //   }
    // ]
  };
  return (
 
          <div className=' w-[100%]  md:w-[100%] border-green-900 md:mt-[112px] mt-[60px]'>
        <Slider {...settings} className='w-[100%] '>
          <div  >
            <Avatar  alt='' src="/banner1.png" sx={{width:{md:"100%",xs:"360px"}, height:{md:"600px",xs:"180px"},borderRadius:"0px", objectFit:"cover"}}
                  />
          </div>
          <div>
          <Avatar alt='' src="/banner2.png" sx={{width:{md:"100%",xs:"360px"}, height:{md:"600px",xs:"180px"}, borderRadius:"0px", objectFit:"cover"}}
                 />
          </div>
          <div>
          <Avatar alt=''  src="/banner3.png" sx={{width:{md:"100%",xs:"360px"}, height:{md:"600px",xs:"180px"},borderRadius:"0px", objectFit:"cover"}}
                    />
          </div>
        </Slider>
            </div>
  )
}

export default Block1
