import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../services/authService";
import {jwtDecode} from "jwt-decode";

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
    async(user, thunkAPI) => {
        const userDecodedJwt  = jwtDecode(user.token)
        const data = await authService.logout(userDecodedJwt.email, user.token);

        // check for error
        if(data.status != "200"){
            localStorage.clear()
            return thunkAPI.rejectWithValue(data.errors)
        }

        return data
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
            localStorage.clear();
            console.log("fulfilled")
        }).addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log("rejected: " + state.error)
        });
    },
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;

