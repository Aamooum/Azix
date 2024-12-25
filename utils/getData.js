import { NextRequest } from "next/server";


export const getData = async (request) => {
    const requestPathname = request
  //  console.log(NextRequest.getAll(),'the request');
    
   // console.log("API_Key",process.env.API_KEY)
  /*  if (url){
        let data  = await  fetch(url,{
            headers: {
              'Authorization': process.env.API_KEY,
            },
          })
          let products = await data.json()
          //console.log(products);
          return products
    }*/

      return []
      

}