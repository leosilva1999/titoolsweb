import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import loanService from "../services/loanService";

const initialState = {
    loans: null,
    loanCount: null,
    error: false,
    success: false,
    loading: false,
    message: null
}

export const getLoans = createAsyncThunk(
    "loan/getLoans",
    async({user, limit, offset, filters}, thunkAPI) => {
        const data = await loanService.getLoans(user, limit, offset, filters);

        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors);
        }
        return data;
    }
)

export const postLoan = createAsyncThunk(
    "loan/postLoan",
    async({user, body}, thunkAPI) => {
        const data = await loanService.postLoan(user, body);

        if(data.status != "Created"){
            return thunkAPI.rejectWithValue(data.Message);
        }

        return data;
    }
)

export const equipmentSlice = createSlice({
    name: "loan",
    initialState,
    reducers: {
        reset: (state) => {
            console.log("Resetando estado...");
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLoans.pending, (state)=>{
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(getLoans.fulfilled, (state, action)=>{
                state.loading = false;
                state.success = true;
                state.error = null;
                state.loans = action.payload.loanList;
                state.loanCount = action.payload.loanCount;
                console.log("fulfilled")
            }).addCase(getLoans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.loan = null;
                console.log("rejected: " + state.error)
            }).addCase(postLoan.pending, (state)=>{
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(postLoan.fulfilled, (state, action)=>{
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = action.payload;
                console.log("fullfiled");
            }).addCase(postLoan.rejected, (state, action)=>{
                state.loading = false;
                state.success = false;
                state.error = action.payload.status;
                state.message = action.payload.message
            })/*.addCase(deleteLoan.pending, (state)=>{
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(deleteLoan.fulfilled, (state, action)=>{
                state.loading = false;
                state.success = true;
                state.error = null;
                state.message = action.payload.message;
                console.log("fullfiled");
            }).addCase(deleteLoan.rejected, (state, action)=>{
                state.loading = false;
                state.success = false;
                state.error = action.payload.status;
                state.message = action.payload.message
            })*/
        }})
    
        export const {reset} = equipmentSlice.actions;
        export default equipmentSlice.reducer;