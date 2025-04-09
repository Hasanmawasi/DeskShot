import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  imagesArray: [],
  loading: false
}

const imagesSlice = createSlice({
  name:"images",
  initialState,
  reducers:{
      setimages: (state , action)=>{
        state.imagesArray = action.payload;
      },
      addImage: (state , action)=>{
        const newImage = action.payload;
       return {
        ...state,
        imagesArray: [ newImage,...state.imagesArray]
       }
      },
      removeImage: (state, action)=>{
        const deletedimage = action.payload;
         state.imagesArray =  state.imagesArray.filter((image)=> image.name != deletedimage);
        // return {
        //   ...state,
        //   imagesArray: filteredArray
        // }
      }
  }
})

export const {setimages , addImage , removeImage}  = imagesSlice.actions;
export default imagesSlice.reducer;
