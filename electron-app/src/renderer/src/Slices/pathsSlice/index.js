import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pathsArray: [],
}

const pathSlice = createSlice({
  name:"paths",
  initialState,
  reducers:{
      getPaths: (state , action)=>{
        state.pathsArray = action.payload
      }

  }
})
