import { createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../../mocks/Order";

// initial State 
const initialState = {
    orders:[],
    ordersPaginator:{}
}

// create a Slice
const slice = createSlice({
    name:"order",
    initialState,
    reducers:{
        createOrder(state,action){
            try{
                if(action.payload){
                    state.orders = [action.payload.data,...state.orders];
                  //   state.ordersPaginator = {...state.ordersPaginator,}  
                  }
            }catch(e){
                console.log(e);
            }
           
        },

        orderList(state,action){
            if(action.payload){
                state.orders = [...action.payload.data]
            }
            // else{
            //     state.orders = []
            // }
        },

        orderDelete(state,action){
            let id = action.payload;
            state.orders = state.orders.filter((item)=> item.id !== id);
        },

        getOrder(state,action){
            if( action.payload.data)
                state.orders = action.payload.data
            else
                state.orders={}
        },
         
        updateOrder(state,action){
            let data = action.payload.data
            state.orders = {...state.orders, ...data}
        }
    }
});
export const {reducer} = slice

export const getOrder = (id) => async (dispatch) =>{
    try{
    const result = await orderApi.getOrder(id);
    if(result){
        await dispatch(slice.actions.getOrder(result))
        console.log("slice succss")
        return true
    } 
  
    return false
    }catch(e){
        console.log(e)
    }

}

export const createOrder=(data) => async(dispatch) => {

    try{
        const result = await orderApi.createOrder(data)
        if(result){
            await dispatch(slice.actions.createOrder(result))
            return true
        }
    }catch(e){
        console.log(e);
    }
}

export const orderList = (filters) => async (dispatch) => {
    try{
        console.log(filters);
        const res = await orderApi.orderList(filters)
        // console.log(res)
        if(res){
            await dispatch(slice.actions.orderList(res.data))
            return res
        }else{
            // console.log(res)
            return res
        }
    }catch(e){
        console.log(e)
    }
}

export const orderDelete = (id) => async (dispatch) => {
    try{
        const result = await orderApi.orderDelete(id);
        if(result){
            await dispatch(slice.actions.orderDelete(result))
        }else{
            return false
        }
    }catch(e){
        console.log(e)
    }
}

 
export const updateOrder = (data,id)=> async (dispatch) =>{
    try{
        console.log(data)
        console.log(id)
        const result = await orderApi.updateOrder(data,id);
        if(result){
            await dispatch(slice.actions.updateOrder(result))
            return true
        }
        return false
    }catch(e){
        console.log(e)
    } 
}

export default slice;