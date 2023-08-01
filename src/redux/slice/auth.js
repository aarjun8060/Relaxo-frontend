"use client"
import { authApi } from "../../mocks/auth";
import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    user:{},
    
}


const slice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        getUser(state,action){
            if( action.payload.data)
         state.user = action.payload.data
         else
         state.user={}
        },
        updateUser(state,action){
            let data = action.payload.data
        state.user = {...state.user, ...data}
        },
        deleteUser(state,action){
         let data = action.payload.data;
         state.user = {}
        },

    }

});

export const {reducer} = slice

export const getUser = () => async (dispatch) =>{
    try{
    const result = await authApi.getUser();
    if(result){
        await dispatch(slice.actions.getUser(result))
        return true
    } 
    await dispatch(slice.actions.getUser({}))
    return false
    }catch(e){
        console.log(e)
    }

}

export const updateUser = (data,id)=> async (dispatch) =>{
    try{
    const result = await authApi.updateUser(data,id);
    if(result){
        await dispatch(slice.actions.updateUser(result))
        return true
    }
    return false
}catch(e){
    console.log(e)
}
    
}

export const deleteUser = (id)=> async (dispatch) =>{
    try{
    const result = await authApi.deleteUser(id);
    if(result){
        await dispatch(slice.actions.deleteUser(result))
        return true
    }
    return false
}catch(e){
    console.log(e)
}
    
}

export const register = (data)=> async (dispatch) =>{
    try{ 
    const result = await authApi.register(data);
    if(result)
        return true
    return false
}catch(e){
    console.log(e)
}
}   

export const login = (data,users) => async (dispatch) =>{
    try{
    const result = await authApi.login(data);
    if(result){
        localStorage.setItem("accessToken",result.data.token)
        return result.data;
    }
    return false
}catch(e){
    console.log(e)
}
}
export const setPasswordOtpUser  = (data)=> async (dispatch) =>{
        try{ 
        const result = await authApi.setPasswordOtpUser(data);
        if(result)
            return true
        return false
        }catch(e){
            console.log(e)
        }
    }

    export const validateOtpUser = (data)=> async (dispatch) =>{
        try{ 
        const result = await authApi.validateOtpUser(data);
        if(result)
            return true
        return result
        }catch(e){
            console.log(e)
        }
    }

    export const resetPasswordUser = (data)=> async (dispatch) =>{
        try{ 
            console.log(data)
            const result = await authApi.resetPasswordUser(data);
            console.log(result)
        if(result)
            return true
        return result
        }catch(e){
            console.log(e)
        }
    }
export default slice;
