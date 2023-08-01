import Nav from "../src/layout/Nav"
import Head from 'next/head'
import Nav2 from "../src/layout/Nav2";
import Block1 from "../src/contents/home/block1/Block1";
import Block4 from "../src/contents/home/block4/Block4";
import Block5 from "../src/contents/home/block5/Block5";
import Block3 from "../src/contents/home/Block3";
import Footer from "../src/layout/Footer"; 
import { getUser } from "../src/redux/slice/auth";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {getProducts} from "../src/redux/slice/productRoutes";
 




export default function Home() {
const dispatch = useDispatch();
  useEffect(()=>{
     dispatch(getUser());
     dispatch(getProducts()); 
  },[])
 

  return (
    <>
      <Head>
        <title>Relaxo</title>
      </Head>
  
    <main className="">
      
      
         
        <Block1 />
        <Block3 />
        <Block4/>
        <Block5 />        
      </main> 
      </>
  )
}
