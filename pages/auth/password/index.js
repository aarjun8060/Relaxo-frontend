import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { resetPasswordUser, setPasswordOtpUser, validateOtpUser } from '../../../src/redux/slice/auth';
import OtpInput from 'react-otp-input';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordPage = () => {
    // redux SetUp
    const router = useRouter()
  const dispatch = useDispatch()

  // All State Effect
//   const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP, Step 3: Reset Password

  // function for taking Input Email
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  // function for handle Submit email
   const handleEmailSubmit =async () => {   
    try{
      let data = {"email":email};
      const res = await dispatch(setPasswordOtpUser(data))
      if(res){
        setStep(2);
        return true
      }else{
         
        return false;
      }
    }catch(e){
      console.log(e);
    }
    
  };

 // function for  handle Submit OTP
  const handleOtpSubmit = async(e) => {
     try{
      let data = {"otp":otp};
      const res = await dispatch(validateOtpUser(data))
       
      if(res){
        setStep(3);
        return true
      }else{
        setMessage('')
        return false;
      }
    }catch(e){
      console.log(e);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePasswordSubmit = async() => {
    
        try{
            let data = {
                "code":otp,
                "newPassword":password
            }
            const res = await dispatch(resetPasswordUser(data))
       
            if(res){
               toast.success("Successfully! Password Changed")
              return true
            }else{
               
              return false;
            }
    
         }catch(e){
            console.log(e);
         }
     
     
  };

  return (
    <Box sx={{}}>
      {step === 1 ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        {/* {message && <p className="text-green-500 mb-4">{message}</p>} */}
        <div className='space-y-4'>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            onClick={handleEmailSubmit}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
          </div>
      </div>
    </div>
      ) : step === 2 ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        {/* {message && <p className="text-red-500 mb-4">{message}</p>} */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="email">
              OTP:
            </label>
            <OtpInput
                inputStyle="inputStyle"
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className='w-full flex text-blue-800 md:flex-row flex-col gap-1  text-[12px] '>
            <p className="">Didnt receive the code?</p>
            <p className="underline">Resend</p>
          </div>
          <button
            onClick={handleOtpSubmit}
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Set New Password</h2>
        {/* {message && <p className="text-green-500 mb-4">{message}</p>} */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="password">
              New Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handlePasswordSubmit}
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Password
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
      )}
    </Box>
  );
};

export default ForgotPasswordPage;
