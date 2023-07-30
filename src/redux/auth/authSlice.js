import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./auth.services";

const user = JSON.parse(localStorage.getItem("web_o_user"));

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    user: user ? user : null
}

export const signup = createAsyncThunk("auth/signup", async (user, thunkAPI) => {
    try {
      return await authServices.signup(user);
    } catch (error) {
      const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authServices.login(user);
    }catch(error){
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const changerPassword = createAsyncThunk("auth/changePassword", 
    async (passwords, thunkAPI) => {
    try {
        return await authServices.changePassword(passwords);
    }catch(error){
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        },
        logout: (state) => {
            localStorage.removeItem("web_o_user");
            localStorage.removeItem("web_o_token");
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(signup.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload.data;
            })
            .addCase(changerPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(changerPassword.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(changerPassword.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
    }
})
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;