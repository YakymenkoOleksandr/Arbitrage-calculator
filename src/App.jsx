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
import USDT_BNB_XRP from "./components/USDT_BNB_XRP.jsx";
import USDT_XRP_BNB from "./components/USDT_XRP_BNB.jsx";
import USDT_XRP_ETH from "./components/USDT_XRP_ETH.jsx";
import USDT_ETH_XRP from "./components/USDT_ETH_XRP.jsx";
import USDT_XRP_BTC from "./components/USDT_XRP_BTC.jsx";
import USDT_BTC_XRP from "./components/USDT_BTC_XRP.jsx";


function App() {
  const dispatch = useDispatch();
  const { prices, error } = useSelector((state) => state.bitcoin);
  let workingСapital = 1000;

  // Список всіх пар криптовалют
  const symbols = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "ETHBTC",
    "BNBETH",
    "BNBBTC",
    "XRPUSDT",
    "XRPBNB",
    "XRPETH",
    "XRPBTC",
  ];

  useEffect(() => {
    dispatch(fetchCryptoPrices(symbols));
    // Викликаємо fetchCryptoPrices для всіх пар одночасно
    const interval = setInterval(() => {
      dispatch(fetchCryptoPrices(symbols));
    }, 2000);

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
  const pricesXRPUSDT = prices["XRPUSDT"];
  const picesXRPBNB = prices["XRPBNB"];
  const picesXRPETH = prices["XRPETH"];
  const picesXRPBTC = prices["XRPBTC"];

 

  

  const pricesBTCETH = 1 / prices["ETHBTC"];
  const pricesETHBNB = 1 / prices["BNBETH"];
  const pricesBTCBNB = 1 / prices["BNBBTC"];
  const pricesBNBXRP = 1 / prices["XRPBNB"];
  const picesETHXRP = 1 / prices["XRPETH"];
  const picesBTCXRP = 1 / prices["XRPBTC"];

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
      <USDT_BTC_XRP
        workingСapital={workingСapital}
        pricesXRPUSDT={pricesXRPUSDT}
        pricesBTCUSDT={pricesBTCUSDT}
        picesXRPBTC={picesXRPBTC}
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
      <USDT_ETH_XRP
        workingСapital={workingСapital}
        pricesETHUSDT={pricesETHUSDT}
        pricesXRPUSDT={pricesXRPUSDT}
        picesXRPETH={picesXRPETH}
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
      <USDT_BNB_XRP
        workingСapital={workingСapital}
        pricesBNBUSDT={pricesBNBUSDT}
        pricesXRPUSDT={pricesXRPUSDT}
        picesXRPBNB={picesXRPBNB}
      />
      <USDT_XRP_BNB
        workingСapital={workingСapital}
        pricesBNBUSDT={pricesBNBUSDT}
        pricesXRPUSDT={pricesXRPUSDT}
        pricesBNBXRP={pricesBNBXRP}
      />
      <USDT_XRP_ETH 
        workingСapital={workingСapital}
        pricesETHUSDT={pricesETHUSDT}
        pricesXRPUSDT={pricesXRPUSDT}
        picesETHXRP={picesETHXRP}
      />
      
      <USDT_XRP_BTC
        workingСapital={workingСapital}
        pricesXRPUSDT={pricesXRPUSDT}
        pricesBTCUSDT={pricesBTCUSDT}
        picesBTCXRP={picesBTCXRP}
      />
      
    </div>
  );
}

export default App;
