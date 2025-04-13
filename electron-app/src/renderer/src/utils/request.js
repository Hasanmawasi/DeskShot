import axios from "axios";

export const baseApi = import.meta.env.VITE_Base_API;

export const request = async ({method,path,data,headers , withBase=true })=>{

try {
  let fullPath = "";
  withBase ?  fullPath=baseApi+path : fullPath=path;
    const response = await axios({
        method,
       url:fullPath,
        data,
        headers,
    })
    return response.data;
} catch (error) {
    console.log(error);
    return error;
}

}
