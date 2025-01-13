import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import equipmentService from "../services/equipmentService";
import { toast } from 'react-toastify';

const initialState = {
    equipments: null,
    error: false,
    success: false,
    loading: false,
    message: null
}


export const getEquipments = createAsyncThunk(
    "equipment/getEquipments",
    async(user, thunkAPI) => {
        const findData = await equipmentService.getEquipments(user);
        const data = findData.equipmentList;

        if(findData.errors){
            return thunkAPI.rejectWithValue(data.errors);
        }
        return data;
    }
)

export const postEquipment = createAsyncThunk(
    "equipment/postEquipment",
    async({user, body}, thunkAPI) => {
        const data = await equipmentService.postEquipment(user, body);

        if(data.status != "Created"){
            //toast.error(data.message || 'Ocorreu um erro.');
            return thunkAPI.rejectWithValue(data.Message);
        }

        //toast.success(data.message || 'Operação realizada com sucesso!');
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
        }).addCase(postEquipment.pending, (state)=>{
            state.loading = true;
            state.error = false;
            console.log("pending")
        }).addCase(postEquipment.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = action.payload;
            console.log("fullfiled");
        }).addCase(postEquipment.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload.status;
            state.message = action.payload.message
        })
    }})

    export const {reset} = equipmentSlice.actions;
    export default equipmentSlice.reducer;
