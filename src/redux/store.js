import { configureStore } from "@reduxjs/toolkit";
import bitcoinReducer from "./slices/slice.js"

const store = configureStore({
    reducer: {
        bitcoin: bitcoinReducer,
    }
})

export default store;