import { createSlice} from "@reduxjs/toolkit";
const initialState = {
    address:{},
}


const slice = createSlice({
    name:"address",
    initialState,
    reducers:{
        addAddress(state,action){
            state.address = {...action.payload}
    }
}
})
export const {reducer} = slice
export const addAddress =  async (data, dispatch) =>{
    // console.log(data)
    try{
        if(data){
            // console.log(data)
            await dispatch(slice.actions.addAddress(data))
            return true
        }
  
    }catch(e){
        console.log(e)
    }
}
export default slice