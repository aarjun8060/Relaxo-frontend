import {reducer as authReducer} from "../slice/auth";
import {reducer as productReducer} from "../slice/productRoutes"
import {reducer as cartReducer} from "../slice/cartRoutes"
import {reducer as orderReducer} from "../slice/Order"
import {reducer as addressReducer} from "../slice/addressRedux" 

import {combineReducers} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
   auth:authReducer,
   products:productReducer,
   cart:cartReducer,
   order:orderReducer,
   address:addressReducer
});
