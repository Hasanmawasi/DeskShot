import { configureStore } from '@reduxjs/toolkit'
import imagesReducer from "../Slices/pathsSlice"
import { createLogger } from "redux-logger";
import messageReducer from '../Slices/messegeSlice'

const logger = createLogger();
 const store = configureStore({
  reducer: {
    images: imagesReducer,
    messages: messageReducer
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
})

export default store;
