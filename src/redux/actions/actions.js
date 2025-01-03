import axios from 'axios';

// Екшен-типи
export const FETCH_BITCOIN_PRICE_REQUEST = 'FETCH_BITCOIN_PRICE_REQUEST';
export const FETCH_BITCOIN_PRICE_SUCCESS = 'FETCH_BITCOIN_PRICE_SUCCESS';
export const FETCH_BITCOIN_PRICE_FAILURE = 'FETCH_BITCOIN_PRICE_FAILURE';

// Екшен-криейтори
const fetchBitcoinPriceRequest = () => ({
  type: FETCH_BITCOIN_PRICE_REQUEST,
});

const fetchBitcoinPriceSuccess = (symbol, price) => ({
  type: FETCH_BITCOIN_PRICE_SUCCESS,
  payload: { symbol, price }, // Передаємо символ і ціну
});


const fetchBitcoinPriceFailure = (error) => ({
  type: FETCH_BITCOIN_PRICE_FAILURE,
  payload: error,
});

// Асинхронний thunk для отримання ціни на біткоїн
export const fetchCryptoPrice = (symbol) => async (dispatch) => {
  dispatch(fetchBitcoinPriceRequest()); // Використовуйте той самий екшен для запиту

  try {
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const price = response.data.price; // Ціна для переданого символу
    dispatch(fetchBitcoinPriceSuccess(symbol, price)); // Використовуйте той самий екшен для успіху
  } catch (error) {
    console.error(`Помилка отримання ціни для ${symbol}:`, error.message);
    dispatch(fetchBitcoinPriceFailure(error.message));
  }
};