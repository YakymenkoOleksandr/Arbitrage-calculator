import { configureStore } from "@reduxjs/toolkit";
import bitcoinReducer from "./slices/slice.js"; // Оновлена назва

const store = configureStore({
  reducer: {
    bitcoin: bitcoinReducer,
  },
});

export default store;