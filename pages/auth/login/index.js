"use client"
import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import style from "../../../styles/customer.module.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../../src/redux/slice/auth';
import { useDispatch } from 'react-redux';
const initialValues = {
  email:"",
  password:""
}

const validate= (values) => {
  let errors = {}

  if(!values.email){
    errors.email = 'Required'
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email = 'Invalid email format'
  }
  if(!values.password){
    errors.password = 'Required'
  }

  return errors
}
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    // .min(8, 'Password must be 8 characters long')
    // .matches(/[0-9]/, 'Password requires a number')
    // .matches(/[a-z]/, 'Password requires a lowercase letter')
    // .matches(/[A-Z]/, 'Password requires an uppercase letter')
    // .matches(/[^\w]/, 'Password requires a symbol').required('Required'),
})
function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
   const {email ,password} = values;
   const data = {username:email,password}
   const result = await dispatch(login(data));
   if(result){
    toast.success("successfully login")
    router.push("/auth/profile");
     
   } else{
    toast.error("Unauthorized User")
   }
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues,
    onSubmit ,
    validationSchema
})

 
 
  return (
    <div className='mt-[110px] h-[25%] md:h-[100%]'>
      {/* <Nav />
      <Nav2 /> */}
      <div className='w-[100%] md:h-[650px] h-[500px] flex flex-col items-center'>
        <h1 className='flex justify-center items-center text-[#223C8C] text-[35px] mt-[15px]'>New to the website</h1>
        <button className='bg-[#F9A925] text-[#fff] w-[200px] h-[40px] rounded-3xl mt-[20px] tracking-wide leading-3' onClick={()=> router.push("/auth/sign-up")}>REGISTER NOW</button>

        <form onSubmit={formik.handleSubmit} className='flex flex-col items-center border border-gray-200 rounded-sm mt-[30px] md:w-[500px] w-[320px] md:h-[390px] h-[300px]'>
              <div className='flex justify-center items-center flex-col md:mt-[50px] mt-[15px]'>
              <h1 className='flex justify-center items-center font-semibold text-[#223C8C] text-[25px]'>Already a member?</h1>
              <p className='mt-[3px] text-black '>Login Here</p>
              </div>
              <div className='flex flex-col justify-start mt-[10px]'>
                <div class={style.field} >
                  <input type="email" id='email' name='email' placeholder="Email" className={style.inputs} onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                  <div class={style.line}>
                  
                  </div>
                </div>
                {formik.errors.email ? <div  className='text-red-500'>{formik.errors.email}</div> : null}
                </div>
              <div className='flex flex-col mt-[10px] justify-start'>
              <div class={style.field} >
                  <input type="password" id='password' name="password" placeholder="Password" class={style.inputs} onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
                  <div class={style.line}>
                </div>

                  </div>
                {formik.errors.password ? <div className='text-red-500'>{formik.errors.password}</div> : null}

                </div>
                <div className='w-full ml-[160px] flex text-blue-800 md:flex-row flex-col gap-1  text-[14px] mt-[15px] underline cursor-pointer'>
                  <p onClick={() => router.push("/auth/password")}>forget Password?</p>
                </div>
              <div className='w-[100%] flex justify-around md:mt-[50px] mt-0'>
              <button className=' bg-[#223C8C] text-[#fff] md:w-[180px] w-[140px] md:h-[50px] h-[30px] rounded-3xl  tracking-wide leading-3 md:mb-[20px]' type='submit'>LOGIN <ArrowForwardIcon /></button>
              <button className='flex justify-center gap-[10px] l-0  items-center  bg-[#FFF] text-[black] border border-black md:w-[180px] w-[120px] md:h-[50px] h-[30px] rounded-3xl ' type='submit'><img src="/google (1).png" alt="" className=" rounded-full bg-black w-[40px] p-0 "/><p className='text-[20px] font-semibold'>GOOGLE</p></button>
              </div>

        </form>
      </div>
    
      <ToastContainer />
    
    </div>
  )
}

export default index
