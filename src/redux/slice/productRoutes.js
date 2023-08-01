import { productApi } from "../../mocks/productRoutes";
import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    products:[],
    productsPagination:{}
}

const slice = createSlice({
    name:"product",
    initialState,
    reducers:{
        getProducts(state,action){
            if( action.payload.data){
            state.products = [...action.payload.data]
            state.productsPagination = {...action.payload.paginator}
            }
            else{
            state.products=[]
            state.productsPagination={}
            }
        },
    
     
    }

});

export const {reducer} = slice;

export const getProducts = (page=1,limit=9,filters={}) => async (dispatch) =>{
    const result = await productApi.getProducts(page,limit,filters);
    if(result){
        await dispatch(slice.actions.getProducts(result.data))
        return true
    }
    await dispatch(slice.actions.getProducts({}))
    return false
}

 
export default slice;
