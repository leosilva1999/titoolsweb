import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import equipmentService from "../services/equipmentService";

const initialState = {
    equipments: null,
    error: false,
    success: false,
    loading: false,
    message: false
}


export const getEquipments = createAsyncThunk(
    "equipment/getEquipments",
    async(thunkAPI) => {
        const findData = await equipmentService.getEquipments();
        const data = findData.equipmentList;

        if(findData.errors){
            return thunkAPI.rejectWithValue(data.errors)
        }
        return data;
    }
)

export const equipmentSlice = createSlice({
    name: "equipment",
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
            state.equipments = action.payload;
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
