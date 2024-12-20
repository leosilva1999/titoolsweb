import { configureStore } from "@reduxjs/toolkit"

//import rootReducer from "./root-reducer";

import authReducer from '../slices/authSlice'
import equipmentReducer from '../slices/equipmentSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        equipment: equipmentReducer,
    }
});

export default store;