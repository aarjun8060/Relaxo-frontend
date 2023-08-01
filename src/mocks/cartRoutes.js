import axios from "axios";

class CartsApi{

    async createCart(data){
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/create`,data,{
                headers:{Authorization:`Bearer ${localStorage.getItem("accessToken")}`}
            })
            if(response.data.status==='SUCCESS')
            return response.data;
            else
                return false;
        }catch(e){
            console.log(e);
        }
    }


    async getCart(id){
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/get/${id}`,{
                method:"GET",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                  }
            });
            if(res.data.status ==="SUCCESS")
            return true
            else
            return false
        }
        catch(err){
            console.log(err)
        }
    }


    async deleteCart(id){
        try{
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/soft-delete/${id}`,{
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
    async deleteManyCart(ids){
        try{
            const obj = {ids};
            const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/softDeleteMany`,obj,{
                method: "put",
                headers: { 
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }    
            });
            console.log(response)
            if(response.data.status==='SUCCESS')
                return response.data;
            else    
                return false;
        }catch(e){
            console.log(e);
        }
    }


    async cartList(page=1,limit=2,filters={}){
        filters.isDeleted = false;
       const data={
            "query":filters,
            "options": {
              "collation": "",
              "sort": {},
              "populate": "products.productId",
              "projection": "",
              "lean": false,
              "leanWithId": true,
              "page": page,
              "limit": limit,
              "pagination": false,
              "useEstimatedCount": false,
              "useCustomCountFn": false,
              "forceCountFn": false,
              "read": {},
              "options": {}
            },
            "isCountOnly": false
          }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/list`,data,{
                method:"post",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            if(res.data.status==="SUCCESS")
            return res.data
            else
            return false
        } catch (error) {
           console.log(error); 
        }
    }

    async updateCart(data,id){
        try{
        const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/userapp/cart/update/${id}`,data,{
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
        
};
export const cartApi = new CartsApi();