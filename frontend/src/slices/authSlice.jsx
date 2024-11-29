import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
};

// sign in an user

export const login = createAsyncThunk(
    "auth/login",
    async(user, thunkAPI) => {
        const data = await authService.login(user);

        // check for error
        if(data.errors){
            return thunkAPI.rejectWithValue(data.message)
        }

        return data
    }
);

//sign out an user
export const logout = createAsyncThunk(
    "auth/logout",
    async() => {
        await authService.logout();
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            console.log("Resetando estado...");
            state.loading = false;
            state.error = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state)=>{
            state.loading = true;
            state.error = false;
            console.log("pending")
        }).addCase(login.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
            console.log("fulfilled")
        }).addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
            console.log("rejected: " + state.error)
        }).addCase(logout.pending, (state)=>{
            state.loading = true;
            state.error = false;
            console.log("pending")
        }).addCase(logout.fulfilled, (state)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = null;
            console.log("fulfilled")
        })
    },
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;

