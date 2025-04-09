import { configureStore } from '@reduxjs/toolkit'
import imagesReducer from "../Slices/pathsSlice"
import { createLogger } from "redux-logger";

const logger = createLogger();
 const store = configureStore({
  reducer: {
    images: imagesReducer
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
})

export default store;
