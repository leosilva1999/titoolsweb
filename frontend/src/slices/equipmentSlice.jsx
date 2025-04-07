import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import equipmentService from "../services/equipmentService";

const initialState = {
    equipments: null,
    equipmentCount: null,
    error: false,
    success: false,
    loading: false,
    message: null
}


export const getEquipments = createAsyncThunk(
    "equipment/getEquipments",
    async({user, limit, offset, filters}, thunkAPI) => {
        const data = await equipmentService.getEquipments(user, limit, offset, filters);

        if(data.errors){
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

export const deleteEquipment = createAsyncThunk(
    "equipment/deleteEquipment",
    async({user, equipmentId}, thunkAPI) => {
        const data = await equipmentService.deleteEquipment(user, equipmentId);

        if(data.status != "OK"){
            return thunkAPI.rejectWithValue(data.message);
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
            state.message = null;
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
            state.equipments = action.payload.equipmentList;
            state.equipmentCount = action.payload.equipmentCount;
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
        }).addCase(deleteEquipment.pending, (state)=>{
            state.loading = true;
            state.error = false;
            console.log("pending")
        }).addCase(deleteEquipment.fulfilled, (state, action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = action.payload.message;
            console.log("fullfiled");
        }).addCase(deleteEquipment.rejected, (state, action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload.status;
            state.message = action.payload.message
        })
    }})

    export const {reset} = equipmentSlice.actions;
    export default equipmentSlice.reducer;
