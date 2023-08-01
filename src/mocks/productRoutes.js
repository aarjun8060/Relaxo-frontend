import axios from "axios";

class ProductApi{
    
   
     async getProducts(page=1,limit=9,filters={}){
       try{
      const obj = {
        "query":filters,
        "options": {
          "collation": "",
          "sort": {"name":1},
          "populate": "",
          "projection": "",
          "lean": false,
          "leanWithId": true,
          "page": page,
          "limit": limit,
          "pagination": true,
          "useEstimatedCount": false,
          "useCustomCountFn": false,
          "forceCountFn": false,
          "read": {},
          "options": {}
        },
        "isCountOnly": false
      };
        const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/product/list`,obj);
        if(response.data.status==='SUCCESS')
        return response.data;
        else
         return false;
        }catch(e){
          console.log(e);
        }
       } 

       async getProduct(id){
        try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/userapp/product/get/${id}`);
       
         
          if(response.data.status==='SUCCESS')
          return response.data;
          else
           return false;
          }catch(e){
            console.log(e);
          }
      } 
}
export const productApi = new ProductApi();

