import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'


function Block5() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    speed: 100,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
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
    
    <div className='md:w-[99.5%] w-[360px]  border-pink-900 px-[20px]'>
      <h1 className='md:text-[30px]  text-[#374A94] text-center p-2 md:mt-[60px] mt-[10px]'>SHOP BY BRAND</h1>
        <Slider {...settings} className='w-[100%]'>
          <div className='mr-3'>
            <Image  src="/slider1.jpg" width={550} height={231}  alt=''  />
          </div>
          <div className='mr-3'>
            <Image  src="/slider2.jpg" width={550} height={231} alt=''   />
          </div>
          <div className='mr-3'>
            <Image  src="/slider3.jpg" width={550} height={231} alt=''   />
          </div>
          <div className='mr-3'>
            <Image  src="/slider4.jpg" width={550} height={231}  alt=''  />
          </div>
          <div className='mr-3'>
            <Image  src="/slider5.jpg" width={550} height={231}  alt=''  />
          </div>
          <div className='mr-3'>
            <Image  src="/slider6.jpg" width={550} height={231}  alt=''  />
          </div>
           
           
        </Slider>
  </div>
  )
}

export default Block5