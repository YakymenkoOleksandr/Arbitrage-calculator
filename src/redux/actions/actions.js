import axios from 'axios';

// Екшен-типи
export const FETCH_BITCOIN_PRICE_REQUEST = 'FETCH_BITCOIN_PRICE_REQUEST';
export const FETCH_BITCOIN_PRICE_SUCCESS = 'FETCH_BITCOIN_PRICE_SUCCESS';
export const FETCH_BITCOIN_PRICE_FAILURE = 'FETCH_BITCOIN_PRICE_FAILURE';

// Екшен-криейтори
const fetchBitcoinPriceRequest = () => ({
  type: FETCH_BITCOIN_PRICE_REQUEST,
});

const fetchBitcoinPriceSuccess = (prices) => ({
  type: FETCH_BITCOIN_PRICE_SUCCESS,
  payload: prices, // Передаємо всі ціни одночасно
});

const fetchBitcoinPriceFailure = (error) => ({
  type: FETCH_BITCOIN_PRICE_FAILURE,
  payload: error,
});

// Асинхронний thunk для отримання цін на кілька криптовалют
export const fetchCryptoPrices = (symbols) => async (dispatch) => {
  dispatch(fetchBitcoinPriceRequest()); // Викликаємо запит

  try {
    // Створюємо масив промісів для всіх запитів
    const promises = symbols.map(symbol =>
      axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`)
    );

    // Чекаємо на виконання всіх промісів
    const responses = await Promise.all(promises);

    // Формуємо об'єкт з цінами
    const prices = responses.reduce((acc, response) => {
      const { symbol, price } = response.data;
      acc[symbol] = price;
      return acc;
    }, {});

    dispatch(fetchBitcoinPriceSuccess(prices)); // Відправляємо всі ціни
  } catch (error) {
    console.error("Помилка отримання цін:", error.message);
    dispatch(fetchBitcoinPriceFailure(error.message)); // Відправляємо помилку
  }
};