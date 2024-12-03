import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import equipmentService from "../services/equipmentService";

const initialState = {
    equipment: null,
    error: false,
    success: false,
    loading: false,
    message: false
}


export const getEquipments = createAsyncThunk(
    "equipment/getEquipments",
    async(thunkAPI) => {
        const data = await equipmentService();

        if(data.errors){
            return thunkAPI.rejectWithValue(data.message)
        }

        return data;
    }
)

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
        builder.addCase(getEquipments.pending, (state)=>{
            state.loading = true;
            state.error = false;
            console.log("pending")
        }).addCase(getEquipments.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.equipment = action.payload;
            console.log("fulfilled")
        }).addCase(getEquipments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.equipment = null;
            console.log("rejected: " + state.error)
        })
    }})

    export const {reset} = equipmentSlice.actions;
    export default equipmentSlice.reducer;
