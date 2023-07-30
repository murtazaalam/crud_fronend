import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    route: ""
}

const routeSlice = createSlice({
    name: "route",
    initialState,
    reducers: {
        setRoute: (state, payload) => {
            state.route = payload.payload;
        }
    }
});

export const { setRoute } = routeSlice.actions;
export default routeSlice.reducer;