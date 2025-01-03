import {FETCH_BITCOIN_PRICE_REQUEST, FETCH_BITCOIN_PRICE_SUCCESS, FETCH_BITCOIN_PRICE_FAILURE} from '../actions/actions.js'

const initialState = {
  loading: false,
  prices: {}, // Об'єкт для збереження цін кількох криптовалют
  error: null,
};

const bitcoinReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BITCOIN_PRICE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BITCOIN_PRICE_SUCCESS:
  return {
    ...state,
    loading: false,
    prices: action.payload, // Зберігаємо всі ціни, що надходять з action.payload
  };
    case FETCH_BITCOIN_PRICE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default bitcoinReducer;