import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoPrice } from "./redux/actions/actions.js";
import USDT_BTC_ETH from "./components/USDT_BTC_ETH.jsx";
import USDT_ETH_BTC from "./components/USDT_ETH_BTC.jsx";
import USDT_BNB_ETH from "./components/USDT_BNB_ETH.jsx";
import USDT_ETH_BNB from "./components/USDT_ETH_BNB.jsx";
import USDT_BNB_BTC from "./components/USDT_BNB_BTC.jsx";
import USDT_BTC_BNB from "./components/USDT_BTC_BNB.jsx";

function App() {
  const dispatch = useDispatch();
  const { prices, error } = useSelector((state) => state.bitcoin);
  let workingСapital = 1000;
  let pricesBTCUSDT = prices["BTCUSDT"];
  let pricesETHUSDT = prices["ETHUSDT"];
  let pricesETHBTC = prices["ETHBTC"];
  let pricesBNBUSDT = prices["BNBUSDT"];
  let pricesBNBETH = prices["BNBETH"];
  let pricesBNBBTC = prices["BNBBTC"];

  let pricesBTCETH = 1 / prices["ETHBTC"];
  let pricesETHBNB = 1 / prices["BNBETH"];
  let pricesBTCBNB = 1 / prices["BNBBTC"];

  useEffect(() => {
    // Створення інтервалу для оновлення ціни кожну секунду
    const interval = setInterval(() => {
      dispatch(fetchCryptoPrice("BTCUSDT")); // Ціна BTC/USDT
      dispatch(fetchCryptoPrice("ETHUSDT")); // Ціна ETH/USDT
      dispatch(fetchCryptoPrice("BNBUSDT")); // Ціна BNB/USDT
      dispatch(fetchCryptoPrice("ETHBTC")); // Ціна BTC/ETH
      dispatch(fetchCryptoPrice("BNBETH")); // Ціна BNB/ETH
      dispatch(fetchCryptoPrice("BNBBTC")); // Ціна BNB/ETH
    }, 1000);

    // Очищення інтервалу при розмонтуванні компонента
    return () => clearInterval(interval);
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <USDT_BTC_ETH
        pricesBTCUSDT={pricesBTCUSDT}
        pricesETHUSDT={pricesETHUSDT}
        pricesETHBTC={pricesETHBTC}
        workingСapital={workingСapital}
      />
      <USDT_BTC_BNB
        workingСapital={workingСapital}
        pricesBNBUSDT={pricesBNBUSDT}
        pricesBTCUSDT={pricesBTCUSDT}
        pricesBNBBTC={pricesBNBBTC}
      />
      <USDT_ETH_BTC
        pricesBTCUSDT={pricesBTCUSDT}
        pricesETHUSDT={pricesETHUSDT}
        pricesBTCETH={pricesBTCETH}
        workingСapital={workingСapital}
      />
      <USDT_ETH_BNB
        workingСapital={workingСapital}
        pricesBNBUSDT={pricesBNBUSDT}
        pricesETHUSDT={pricesETHUSDT}
        pricesBNBETH={pricesBNBETH}
      />
      <USDT_BNB_ETH
        workingСapital={workingСapital}
        pricesBNBUSDT={pricesBNBUSDT}
        pricesETHUSDT={pricesETHUSDT}
        pricesETHBNB={pricesETHBNB}
      />
      <USDT_BNB_BTC
        workingСapital={workingСapital}
        pricesBNBUSDT={pricesBNBUSDT}
        pricesBTCUSDT={pricesBTCUSDT}
        pricesBTCBNB={pricesBTCBNB}
      />
    </div>
  );
}

export default App;
