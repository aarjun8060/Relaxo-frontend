import axios from "axios";

class OrderApi{


    async createOrder(data){
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/order/create`,data,{
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

    async orderList(filters){
        console.log(filters);
        const data = {
            "query":filters,
            "options": {
              "collation": "",
              "sort": {"createdAt":-1},
              "populate": "products.productId",
              "projection": "",
              "lean": false,
              "leanWithId": true,
              "page": 1,
              "limit": 10,
              "pagination": true,
              "useEstimatedCount": false,
              "useCustomCountFn": false,
              "forceCountFn": false,
              "read": {},
              "options": {}
            },
            "isCountOnly": false
        }

        try{
            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/order/list`,data,{
                method:"post",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                  }
            })
            if(res.data.status === "SUCCESS")
                return res.data
            else
                return res.data
        }catch(e){
            console.log(e)
        }
    }

    async orderDelete(id){
        try{
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_HOST}/userapp/order/soft-delete/${id}`,{
                method:"delete",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }   
            });
            if(response.data.status === 'SUCCESS')
                return response.data;
            else{
                return false;
            }
        }catch(e){
            console.log(e)
        }
    }


    async getOrder(id){
      
        try{
        const response = await axios.get(`http://localhost:5000/userapp/order/get/64a4dc22029c7d0143644c2c`,{
            method:"get",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
                }  
        });
       
         
          if(response.data.status==='SUCCESS'){
           
            return response.data;
          }
          else{
            console.log("mocks fail")
           return false;}
          }catch(e){
            console.log(e);
          }
      } 

    async updateOrder(data,id){
        try{
        console.log(data)
        console.log(id)
        
        const response = await axios.put(`${process.env.NEXT_PUBLIC_HOST}/userapp/order/update/${id}`,data,{
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

}

export const orderApi = new OrderApi();