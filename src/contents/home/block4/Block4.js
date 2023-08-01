import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Block4() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,

     responsive: [
      {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
     ]
   
  };
  return (
    <div className='md:w-[100%] w-[360px] '>
    
      <h1 className='md:text-[30px] text-[18px] text-[#374A94] text-center p-2 md:mt-[60px] mt-[10px]'>SHOP BY GENDER</h1>
        <div className='flex  border '>
          <Slider {...settings} className='flex justify-around md:w-[1300px]  w-[350px]'>
              <div><img  src="/women.jpg"  className='md:w-[400px] w-[340px] md:h-[318px] h-[250px] md:ml-0 ml-2 ' alt=''/></div>
              <div><img  src="/MEN.jpg"   alt=''className='md:w-[400px] w-[340px] md:h-[318px] md:ml-0 ml-2 '/></div>
              <div><img  src="/kids.jpg" alt='' className='md:w-[400px] w-[340px] md:h-[318px] md:ml-0 ml-2   md:mr-2 ' /></div>
          </Slider>
        </div>
   
    
    </div>
  )
}

export default Block4

