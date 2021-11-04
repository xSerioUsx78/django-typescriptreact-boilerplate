import { authSlice } from "./auth";


const allReducers = {
    [authSlice.name]: authSlice.reducer
};

export default allReducers;