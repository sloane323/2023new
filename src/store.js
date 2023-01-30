import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./modules/login";
import UserReducer from "./modules/user";


export default configureStore({
  reducer: {
    login: LoginReducer,
    user: UserReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});