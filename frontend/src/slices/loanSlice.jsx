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

export const putLoan = createAsyncThunk(
    "loan/putLoan",
    async({user, loanId, body}, thunkAPI) => {
        const data = await loanService.putLoan(user, loanId, body);
        
        if(data.status != 204){
            return thunkAPI.rejectWithValue(data.message);
        };

        return {status: data.status, message: "NoContent"};
    }
)
export const deleteEquipmentFromLoan = createAsyncThunk(
    "loan/deleteEquipmentFromLoan",
    async({user, equipmentId}, thunkAPI) => {
        const data = await loanService.deleteEquipmentFromLoan(user, equipmentId);
        
        if(data.status != 204){
            return thunkAPI.rejectWithValue(data.message);
        };

        return {status: data.status, message: "NoContent"};
    }
)

export const deleteLoan = createAsyncThunk(
    "loan/deleteLoan",
    async({user, loanId}, thunkAPI) => {
        const data = await loanService.deleteLoan(user, loanId);

        if(data.status != 204){
            return thunkAPI.rejectWithValue(data.message);
        }

        return data;
    }
)

export const loanSlice = createSlice({
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
        builder
        // Cases para getLoans
        .addCase(getLoans.pending, (state)=>{
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(getLoans.fulfilled, (state, action)=>{
                state.loading = false;
                state.success = true;
                state.loans = action.payload.loanList;
                state.loanCount = action.payload.loanCount;
                console.log("fulfilled")
            }).addCase(getLoans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Erro ao buscar empréstimo";
                console.log("rejected: " + state.error)
            })
            
            // Cases para postLoan
            .addCase(postLoan.pending, (state)=>{
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(postLoan.fulfilled, (state, action)=>{
                state.loading = false;
                state.success = true;
                state.message = action.payload.message || "Empréstimo criado com sucesso";
                console.log("fullfiled");
            }).addCase(postLoan.rejected, (state, action)=>{
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload.message || "Erro ao criar empréstimo";
            })

            // cases pra putLoan
            .addCase(putLoan.pending, (state)=>{
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(putLoan.fulfilled, (state)=>{
                state.loading = false;
                state.success = true;
                state.message = "Emprestimo alterado com sucesso!";
                console.log("fullfiled");
            }).addCase(putLoan.rejected, (state, action)=>{
                state.loading = false;
                state.success = false;
                state.error = action.payload.status;
                state.message = action.payload?.message || "Erro ao alterar empréstimo";
            })
            
            // Cases para deleteLoan
            .addCase(deleteLoan.pending, (state)=>{
                state.loading = true;
                state.error = false;
                console.log("pending")
            }).addCase(deleteLoan.fulfilled, (state, action)=>{
                state.loading = false;
                state.success = true;
                state.message = action.payload?.message || "Emprestimo excluído com sucesso!";
                console.log("fullfiled");
            }).addCase(deleteLoan.rejected, (state, action)=>{
                state.loading = false;
                state.success = false;
                state.error = action.payload.status;
                state.message = action.payload?.message || "Erro ao deletar empréstimo";
            })
        }})
    
        export const {reset} = loanSlice.actions;
        export default loanSlice.reducer;