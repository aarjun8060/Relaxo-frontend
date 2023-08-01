import { cartApi } from "../../mocks/cartRoutes";
import { createSlice } from "@reduxjs/toolkit";

// initialState
const initialState = {
        carts:[],
        cartsPaginator:{}
}
// create a slice
const slice = createSlice({
    name:"cart",
    initialState,
    reducers:{

        createCart(state,action){
            if(action.payload){
                state.carts = [action.payload.data,...state.carts];
                // state.cartsPaginator = {...state.cartsPaginator,itemCount:state.cartsPaginator.itemCount+1};
            }
        },
        
        updateCart(state,action){
           if(action.payload){
             let data = action.payload.data;
             state.carts = state.carts.map((cart) =>{
                if(data.id===cart.id){
                  cart.products[0].qty = data.products[0].qty;
                  
                }
                return cart;
             })
           }
        },
        
         
        cartList(state,action){
            if( action.payload.data){
            state.carts = [...action.payload.data]
            state.cartsPaginator = {...action.payload.paginator}
            }else{
                state.products=[]
                state.productsPagination={}
            }
          },
          getCart(state,action){
              if(action.payload){
              state.carts = [...action.payload]
              state.cartsPaginator = {...action.payload.paginator}
              }
              else{
              state.carts=[]
              state.cartsPaginator={}
              }
          },
        

        // delete a Cart 
        deleteCart(state,action){
            let id = action.payload;
            state.carts =  state.carts.filter((item)=> item.id !== id);
        },

        // delete Many 
        deleteManyCart(state,action){
             
            state.carts = [];
        },
     

    }
});

export const {reducer} = slice

export const cartList =(data)=>async(dispatch)=>{
    const res =  await cartApi.cartList(data)
  
    if(res){
      await dispatch(slice.actions.cartList(res.data))
      return true
    }
    else{
      return false
    }
  }
  

 

export const createCart = (data)=> async (dispatch) => {
 
    try{
        const result = await cartApi.createCart(data)
        if(result){
            await dispatch(slice.actions.createCart(result.data))
            return true;
        } else{
            await dispatch(slice.actions.createCart(false))
            return false
        }
    }catch(e){
        console.log(e);
    }
}

export const deleteCart = (id)=> async (dispatch) =>{

    try{
        
    const result = await cartApi.deleteCart(id);
   
    if(result){
        await dispatch(slice.actions.deleteCart(result))
        return true
    }
    return false
    }catch(e){
        console.log(e)
    }
}

export const deleteManyCart = (ids)=> async (dispatch) =>{

    try{
        console.log(ids)
    const result = await cartApi.deleteManyCart(ids);
   console.log(result)
    if(result){
        await dispatch(slice.actions.deleteManyCart(result))
        return true
    }
    return false
    }catch(e){
        console.log(e)
    }
    
}
 
export const updateCart = (data,id)=> async (dispatch) =>{
    try{
        const result = await cartApi.updateCart(data,id);
        if(result){
            await dispatch(slice.actions.updateCart(result))
            return true
        }
        return false
    }catch(e){
        console.log(e)
    } 
}

export default slice;