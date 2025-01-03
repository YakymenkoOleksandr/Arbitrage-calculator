import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoPrices } from "./redux/actions/actions.js";
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

  // Список всіх пар криптовалют
  const symbols = ["BTCUSDT", "ETHUSDT", "BNBUSDT", "ETHBTC", "BNBETH", "BNBBTC"];

  useEffect(() => {
    // Викликаємо fetchCryptoPrices для всіх пар одночасно
    const interval = setInterval(() => {
      dispatch(fetchCryptoPrices(symbols));
    }, 1000);

    // Очищення інтервалу при розмонтуванні компонента
    return () => clearInterval(interval);
  }, [dispatch]);

  
  
  if (error) return <p>Error: {error}</p>;

  // Отримуємо ціни для кожної пари
  const pricesBTCUSDT = prices["BTCUSDT"];
  const pricesETHUSDT = prices["ETHUSDT"];
  const pricesETHBTC = prices["ETHBTC"];
  const pricesBNBUSDT = prices["BNBUSDT"];
  const pricesBNBETH = prices["BNBETH"];
  const pricesBNBBTC = prices["BNBBTC"];

  const pricesBTCETH = 1 / prices["ETHBTC"];
  const pricesETHBNB = 1 / prices["BNBETH"];
  const pricesBTCBNB = 1 / prices["BNBBTC"];

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