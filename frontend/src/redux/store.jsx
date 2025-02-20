import { configureStore } from "@reduxjs/toolkit"

//import rootReducer from "./root-reducer";

import authReducer from '../slices/authSlice'
import equipmentReducer from '../slices/equipmentSlice'
import loanReducer from '../slices/loanSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        equipment: equipmentReducer,
        loan: loanReducer
    }
});

export default store;