import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersServices from "./users.services";

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    userData: null,
    totalCount: 0,
}

export const getUsers = createAsyncThunk("users/getUser", 
    async (params, thunkAPI) => {
    try {
      return await usersServices.getUsers(params);
    } catch (error) {
      const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateUser = createAsyncThunk("users/updateUser", 
    async (params, thunkAPI) => {
    try {
      return await usersServices.updateUser(params);
    } catch (error) {
      const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteUser = createAsyncThunk("users/deleteUser", 
    async (params, thunkAPI) => {
    try {
      return await usersServices.deleteUser(params);
    } catch (error) {
      const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUsers.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.totalCount = action.payload.totalItems
                state.userData = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
            })
    }
})

export default userSlice.reducer;