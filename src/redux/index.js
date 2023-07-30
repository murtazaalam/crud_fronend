import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./users/usersSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
})

export default store;