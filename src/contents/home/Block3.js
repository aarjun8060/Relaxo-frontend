import React from 'react'
import Image from 'next/image'

function Block3() {
  return (
    <div className='md:w-[100%] w-[360px]  '>
      <h1 className='md:text-[30px] text-[18px] text-[#374A94] text-center p-2 md:mt-[60px] mt-[10px]'>SHOP BY CATEGORY</h1>
      <div className='flex flex-wrap justify-evenly md:mt-[30px] mt-[0px]'>
        <div className='md:mt-[30px] mt-[10px]'><img  src="/sandal.jpg"    alt='' className='md:w-[588px] w-[150px] h-[50px] md:h-[315px]'  /></div>
        <div className='md:mt-[30px] mt-[10px]'><img  src="/shoes.jpg" className='md:w-[588px] w-[150px] h-[50px] md:h-[315px]' alt=''/></div>
        <div className='md:mt-[30px] mt-[10px]'><img  src="/sneakers.jpg"   alt='' className='md:w-[588px] w-[150px] h-[50px] md:h-[315px]'  /></div>
        <div className='md:mt-[30px] mt-[10px]' ><img  src="/slippers.jpg"  alt='' className='md:w-[588px] w-[150px] h-[50px] md:h-[315px]' /></div>
      </div>
    </div>
  )
}

export default Block3
