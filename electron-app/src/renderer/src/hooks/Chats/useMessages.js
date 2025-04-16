import {request} from '../../utils/request.js'

const useMessages = ()=>{
  const fetchMessages = async ()=>{
        const token = localStorage.getItem('token')
    try {
      const response = await request({
        method:"GET",
        path:"message",
        headers:{
          Authorization : `${token}`
        }
      });
      return response
    } catch (error) {
      console.error('Error fetching messages:', error);
    }

      }
return {fetchMessages}
}

export default useMessages;
