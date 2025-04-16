import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messageArray: [],
  loading: false
}

const messageSlice = createSlice({
  name:"messages",
  initialState,
  reducers:{
      getMessages:(state , action)=>{
        state.messageArray = action.payload;
      },
      addMessage: (state , action)=>{
        const newMessage = action.payload;
       return {
        ...state,
        messageArray: [...state.messageArray ,newMessage]
       }
      },
  }
});
export const {getMessages , addMessage }  = messageSlice.actions;
export default messageSlice.reducer;
