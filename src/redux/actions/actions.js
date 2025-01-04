import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

// Екшен-типи
export const FETCH_BITCOIN_PRICE_REQUEST = 'FETCH_BITCOIN_PRICE_REQUEST';
export const FETCH_BITCOIN_PRICE_SUCCESS = 'FETCH_BITCOIN_PRICE_SUCCESS';
export const FETCH_BITCOIN_PRICE_FAILURE = 'FETCH_BITCOIN_PRICE_FAILURE';

// Асинхронний thunk для отримання цін на кілька криптовалют
export const fetchCryptoPrices = createAsyncThunk(
  "bitcoin/fetchCryptoPrices",
  async (symbols, { rejectWithValue }) => {
    try {
    //  const startTime = new Date().toISOString(); // Час початку операції
      const promises = symbols.map((symbol) =>
        axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
      );
      const responses = await Promise.all(promises);

      const prices = responses.reduce((acc, response) => {
        const { symbol, price } = response.data;
        acc[symbol] = price;
        return acc;
      }, {});

      const endTime = new Date().toISOString(); // Час завершення операції

      return { prices, lastFetchTime: endTime }; // Повертаємо ціни та час
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);