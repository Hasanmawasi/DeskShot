import { request } from '../../utils/request';

const useLogs = ()=>{

   const SubmitLogs = async ()=>{
        const response = await request({
          method:"GET" ,
          withBase:false,
           path:'https://ipapi.co/json',
          })
          return response;
      }

      const fetchLogs =async (logsData , action)=>{
        const token= localStorage.getItem("token");
        const {ip,city,country_name,latitude , longitude} = logsData;
        const response = await request({
          method:"POST" ,
           path:"log",
           headers:{
            Authorization: `${token}`
           },
           data:{
             action: action,
              ip_address: ip,
              city,
              country_name,
              latitude,
              longitude
           }
          })
          if(response.success){
            console.log(response);
          }
      }
      return {SubmitLogs , fetchLogs }
};
export default useLogs;
