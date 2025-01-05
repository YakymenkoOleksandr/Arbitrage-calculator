import { updateCryptoPrices } from "../redux/slices/slice";

export const connectWebSocket = (symbols, dispatch) => {
  const streams = symbols
    .map(symbol => `${symbol.toLowerCase()}@ticker`)
    .join('/');

  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

  // Локальний об'єкт для збереження цін усіх пар
  const aggregatedPrices = {};

  ws.onopen = () => {
    console.log('WebSocket підключено');
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      // Перевірка необхідних полів
      if (data.s && data.c) {
        // Оновлюємо локальний об'єкт з новими даними
        aggregatedPrices[data.s] = data.c;

        // Диспатчимо оновлений об'єкт до Redux
        dispatch(updateCryptoPrices({ ...aggregatedPrices }));
      } else {
        console.error('Невірні дані від WebSocket:', data);
      }
    } catch (error) {
      console.error('Помилка обробки отриманих даних WebSocket:', error);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket помилка:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket закрито');
  };

  return ws;
};