import axios from "axios";

class AuthApi{

    async getUser(){
      try{
       const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/me`,{
        method: "get",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
       if(response.data.status==='SUCCESS')
       return response.data;
       else
        return false;
    } catch(err){
      console.log(err)
    }
    } 

    async updateUser(data,id){
      try{
      const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/update/${id}`,data,{
        method: "put",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
        if(response.data.status==='SUCCESS')
        return response.data;
        else
         return false;
      }catch(e){
        console.log(e);
      }
    } 

    async deleteUser(id){
      try{
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/userapp/user/delete/${id}`,{
        method: "delete",
        headers: { 
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
        if(response.data.status==='SUCCESS')
        return response.data;
        else
         return false;
    }catch(e){
      console.log(e);
    }
    } 

 
   async register(data){
    try{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/register`,data);
    if(response.data.status==='SUCCESS')
    return response.data;
    else
     return false;
    }catch(e){
      console.log(e);
    }
   } 

   async login(data){
    try{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/login`,data);
    if(response.data.status==='SUCCESS')
    return response.data;
    else
     return false;
    }catch(e){
      console.log(e);
    }
   } 
   async setPasswordOtpUser(data){
    try{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/reset-password-otp`,data);
    if(response.data.status==='SUCCESS')
    return response.data;
    else
     return false;
    }catch(e){
      console.log(e);
    }
   } 

   async validateOtpUser(data){
    try{
    const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/validate-otp`,data);
    if(response.data.status==='SUCCESS')
    return response.data;
    else
     return false;
    }catch(e){
      console.log(e);
    }
   } 

   async resetPasswordUser(data){
    try{
    const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/reset-password`,data);
    console.log(response)
    if(response.data.status==='SUCCESS')
    return response.data;
    else
     return false;
    }catch(e){
      console.log(e);
    }
   } 

}

export const authApi = new AuthApi();