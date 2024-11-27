import { configureStore } from "@reduxjs/toolkit"

//import rootReducer from "./root-reducer";

import authReducer from '../slices/authSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
    }
});

export default store;