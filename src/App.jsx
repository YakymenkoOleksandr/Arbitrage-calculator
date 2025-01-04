import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptoPrices } from "./redux/actions/actions.js";
import { CommonComponnt } from "./components/CommonComponent.jsx";

function App() {
  const dispatch = useDispatch();
  const { prices, error, lastFetchTime } = useSelector(
    (state) => state.bitcoin
  ); // Додаємо lastFetchTime
  let workingСapital = 1;

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
    "DOTUSDT",
    "DOTBTC",
    "DOTETH",
  ];

  useEffect(() => {
    dispatch(fetchCryptoPrices(symbols));
    // Викликаємо fetchCryptoPrices для всіх пар одночасно
    const interval = setInterval(() => {
      dispatch(fetchCryptoPrices(symbols));
    }, 5000);

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
  const pricesXRPBNB = prices["XRPBNB"];
  const pricesXRPETH = prices["XRPETH"];
  const pricesXRPBTC = prices["XRPBTC"];
  const pricesDOTUSDT = prices["DOTUSDT"];
  const pricesDOTBTC = prices["DOTBTC"];
  const pricesDOTETH = prices["DOTETH"];

  const pricesBTCETH = 1 / prices["ETHBTC"];
  const pricesETHBNB = 1 / prices["BNBETH"];
  const pricesBTCBNB = 1 / prices["BNBBTC"];
  const pricesBNBXRP = 1 / prices["XRPBNB"];
  const pricesETHXRP = 1 / prices["XRPETH"];
  const pricesBTCXRP = 1 / prices["XRPBTC"];
  const pricesBTCDOT = 1 / prices["DOTBTC"];
  const pricesETHDOT = 1 / prices["DOTETH"];

  return (
    <div>
      <p>
        Останне оновлення: <br /> {lastFetchTime}
      </p>
      <CommonComponnt
        pairName="BTC→ETH→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesBTCUSDT}
        pricesSecondCoin={pricesETHUSDT}
        pricesCoinToCoin={pricesETHBTC}
      />
      <CommonComponnt
        pairName="BTC→BNB→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesBTCUSDT}
        pricesSecondCoin={pricesBNBUSDT}
        pricesCoinToCoin={pricesBNBBTC}
      />
      <CommonComponnt
        pairName="BTC→XRP→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesBTCUSDT}
        pricesSecondCoin={pricesXRPUSDT}
        pricesCoinToCoin={pricesXRPBTC}
      />
      <CommonComponnt
        pairName="BTC→DOT→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesBTCUSDT}
        pricesSecondCoin={pricesDOTUSDT}
        pricesCoinToCoin={pricesDOTBTC}
      />
      <CommonComponnt
        pairName="ETH→BTC→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesETHUSDT}
        pricesSecondCoin={pricesBTCUSDT}
        pricesCoinToCoin={pricesBTCETH}
      />
      <CommonComponnt
        pairName="ETH→BNB→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesETHUSDT}
        pricesSecondCoin={pricesBNBUSDT}
        pricesCoinToCoin={pricesBNBETH}
      />
      <CommonComponnt
        pairName="ETH→XRP→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesETHUSDT}
        pricesSecondCoin={pricesXRPUSDT}
        pricesCoinToCoin={pricesXRPETH}
      />
      <CommonComponnt
        pairName="BNB→ETH→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesBNBUSDT}
        pricesSecondCoin={pricesETHUSDT}
        pricesCoinToCoin={pricesETHBNB}
      />
      <CommonComponnt
        pairName="BNB→BTC→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesBNBUSDT}
        pricesSecondCoin={pricesBTCUSDT}
        pricesCoinToCoin={pricesBTCBNB}
      />
      <CommonComponnt
        pairName="BNB→XRP→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesBNBUSDT}
        pricesSecondCoin={pricesXRPUSDT}
        pricesCoinToCoin={pricesXRPBNB}
      />
      <CommonComponnt
        pairName="XRP→BNB→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesXRPUSDT}
        pricesSecondCoin={pricesBNBUSDT}
        pricesCoinToCoin={pricesBNBXRP}
      />
      <CommonComponnt
        pairName="XRP→ETH→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesXRPUSDT}
        pricesSecondCoin={pricesETHUSDT}
        pricesCoinToCoin={pricesETHXRP}
      />
      <CommonComponnt
        pairName="XRP→BTC→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesXRPUSDT}
        pricesSecondCoin={pricesBTCUSDT}
        pricesCoinToCoin={pricesBTCXRP}
      />
      <CommonComponnt
        pairName="DOT→BTC→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesDOTUSDT}
        pricesSecondCoin={pricesBTCUSDT}
        pricesCoinToCoin={pricesBTCDOT}
      />
      <CommonComponnt
        pairName="DOT→ETH→USDT"
        workingСapital={workingСapital}
        pricesFirstCoin={pricesDOTUSDT}
        pricesSecondCoin={pricesETHUSDT}
        pricesCoinToCoin={pricesETHDOT}
      />
    </div>
  );
}

export default App;
