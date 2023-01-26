import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./modules/login";


export default configureStore({
  reducer: {
    login: LoginReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});