import { createSlice } from "@reduxjs/toolkit";
import { fetchCryptoPrices } from "../actions/actions"; // Імпортуємо thunk

const bitcoinSlice = createSlice({
  name: "bitcoin",
  initialState: {
    loading: false,
    prices: {},
    error: null,
  },
  reducers: {}, // Можемо додати інші синхронні редуктори тут
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoPrices.fulfilled, (state, action) => {
        state.loading = false;
        state.prices = action.payload.prices;
        state.lastFetchTime = action.payload.lastFetchTime; // Записуємо час
      })
      .addCase(fetchCryptoPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bitcoinSlice.reducer;
