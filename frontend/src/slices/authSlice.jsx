import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "../services/authService";

const user = JSON.parse(localStorage.getItem("user"));
const refreshToken = sessionStorage.getItem("refreshToken");

const initialState = {
    user: user ? user : null,
    //refreshToken: refreshToken ? refreshToken : null,
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

        return data;
    }
);

export const createUser = createAsyncThunk(
    "auth/createUser",
    async(user, thunkAPI) => {
        const data = await authService.createUser(user);

        //check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)
export const getUsers = createAsyncThunk(
    "auth/getUsers",
    async({user, limit, offset}, thunkAPI) => {
        const data = await authService.getUsers(user, limit, offset);

        //check for errors
        if(data.errors){
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)

//sign out an user
export const logout = createAsyncThunk(
    "auth/logout",
    async() => {
        await authService.logout();
    }
);

//refresh token without another login
/*export const refreshtoken = createAsyncThunk(
    "auth/refreshtoken",
    async(user, thunkAPI) => {
        const data = await authService.refreshToken(user);

        console.log("authSlice refreshtoken data: " + data)

        // check for error
        if(data.errors){
            return thunkAPI.rejectWithValue("refreshtoken slice rejected with error: "+data.message)
        }
        console.log("authslice refreshtoken executado com sucesso")
        return data
    }
);*/

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
            state.user = {
                token: action.payload.token,
                expiration: action.payload.expiration,
                errors: action.payload.errors
            };
            state.refreshToken = action.payload.refreshToken;
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
            state.refreshToken = null;
            console.log("fulfilled")
        })/*.addCase(refreshtoken.pending,  (state)=>{
            state.loading = true;
            state.error = false;
            console.log("pending")
        }).addCase(refreshtoken.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = {
                token: action.payload.accessToken,
                errors: action.payload.errors
            };
            state.refreshToken = action.payload.refreshToken;
            console.log("fulfilled")
        }).addCase(refreshtoken.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
            console.log("rejected: " + state.error)
        })*/
    },
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;

