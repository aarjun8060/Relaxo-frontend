import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import style from "../../../styles/customer.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { CheckBox } from '@mui/icons-material';
import   {useDispatch}  from 'react-redux';
import { register } from '../../../src/redux/slice/auth';
import { useSnackbar} from 'notistack';
const initialValues = {
  name: "",
  email:"",
  password:""
}

const validate= (values) => {
  let errors = {}

  if(!values.name){
    errors.name = 'Required'
  }
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
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    // .matches(/[0-9]/, 'Password requires a number')
    // .matches(/[a-z]/, 'Password requires a lowercase letter')
    // .matches(/[A-Z]/, 'Password requires an uppercase letter')
    // .matches(/[^\w]/, 'Password requires a symbol').required('Required'),
})
function index(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar()
    const onSubmit = async (values) => {
      
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {name,email,password} = values;
      const data = {name,email,password};
      const result = await dispatch(register(data));
      if(result){
        toast.success("successfully login")
        router.push("/auth/login");
      
      }
      else{
        console.log("data not found");
      }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
        initialValues,
        onSubmit ,
        validationSchema
    })


    
    
     
    return(
        <div className='md:mt-[130px] mt-[70px]'>
        {/* <Nav />
        <Nav2 /> */}
        <div className='flex mx-auto justify-center'>
          <form onSubmit={formik.handleSubmit} className='flex flex-col justify-start  mb-[60px] items-center border border-gray-200 rounded-sm mt-[30px] md:w-[500px] w-[300px]  h-[380px] md:h-[500px]'>
                <h1 className='flex justify-center items-center text-[#223C8C] md:text-[35px] text-lg font-semibold md:font-normal mt-[15px]'>Create Account!</h1>
                
                 
                <div className='flex flex-col justify-start mt-[10px]'>
                <div class={style.field} >
                  <input type="text" id='name'  name='name' placeholder="Name" class={style.inputs} onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                  <div class={style.line}>
                  
                  </div>
                </div>
                {formik.errors.name ? <div  className='text-red-500'>{formik.errors.name}</div> : null}
                </div>
                <div className='flex flex-col justify-start mt-[10px]'>
                <div class={style.field} >
                  <input type="email" id='email' name='email' placeholder="Email" class={style.inputs} onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                  <div class={style.line}>
                  
                  </div>
                </div>
                {formik.errors.email ? <div  className='text-red-500'>{formik.errors.email}</div> : null}
                </div>
                <div className='flex flex-col justify-start mt-[10px]'>
                <div class={style.field} >
                  <input type="password" id='password' name="password" placeholder="Password" class={style.inputs} onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur}/>
                  <div class={style.line}>
                  </div>
                </div>
                {formik.errors.password ? <div className='text-red-500'>{formik.errors.password}</div> : null}
                </div>

                <div className='flex mt-[28px] w-[82%]  justify-start items-start text-[14px] md:text-lg'>
                  <CheckBox /> <p> I agree to all <span className='text-[#223C8C]'>Terms and Conditions</span> </p>
                </div>
                
                <button className='mt-[20px] bg-[#223C8C] text-[#fff] w-[180px] h-[40px] rounded-3xl  tracking-wide leading-3 mb-[20px]' type='submit'>SUBMIT</button>
                <div className='flex mt-[8px] justify-start items-start'>
                    Already Have an account? <span className='text-[#223C8C] cursor-pointer' onClick={()=> router.push("/auth/login")}>Log in now!</span>
                </div>
          </form>
          </div>
          <ToastContainer/>
        {/* <Footer/> */}
      </div>

    )
}
export default index;