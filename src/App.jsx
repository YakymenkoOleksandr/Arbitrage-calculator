import css from"./App.module.css";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCryptoPrices } from "./redux/actions/actions.js";  //Підключається. якщо потрібно отримувати данні через http запити
import { CommonComponnt } from "./components/CommonComponent.jsx";
import {connectWebSocket} from "./serviceBinance/WebSocketService.js"
import { calculateProfit } from "./utils/calculateProfit.js";

function App() {
  const dispatch = useDispatch();
  const { prices, error } = useSelector(
    (state) => state.bitcoin
  ); 
  
  const [showOnlyPositive, setShowOnlyPositive] = useState(false); // Для керування фільтром позитивних пар
  const [showOnlyMoreThen, setShowOnlyMoreThen] = useState(false); // Для керування фільтром відсотка прибутку від пари
    // Обробник для зміни стану фільтрації
  const handleFilterPositivePairs = () => {
    setShowOnlyPositive(!showOnlyPositive);
  };

  const handleFilterShowOnlyMoreThen = () => {
    setShowOnlyMoreThen(!showOnlyMoreThen);
  };

  // Список всіх пар криптовалют
  const symbols  = useMemo(() => [
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
    "DOTBNB",
    "SOLUSDT",
    "SOLBTC",
    "SOLETH",
    "SOLBNB",
    "ADAUSDT",
    "ADABTC",
    "ADAETH",
    "ADABNB",
    "TRXUSDT",
    "TRXBTC",
    "TRXETH",
    "TRXBNB",
    "AVAXUSDT",
    "AVAXBTC",
    "AVAXETH",
    "AVAXBNB",
    "SUIUSDT",
    "SUIBTC",
    "SUIBNB",
    "LINKUSDT",
    "LINKBTC",
    "LINKETH",
    "LINKBNB",
    "TONUSDT",
    "TONBTC",
    "SHIBUSDT",
    "DOGEUSDT",
    "SHIBDOGE",
    "DOGEBTC",
    "XLMUSDT",
    "XLMBTC",
    "XLMETH",
    "WBTCUSDT",
    "WBTCBTC",
    "WBTCETH",
    "HBARUSDT",
    "HBARBTC",
    "HBARBNB",
    "BCHUSDT",
    "BCHBTC",
    "BCHBNB",
    "UNIUSDT",
    "UNIBTC",
    "UNIETH",
    "LTCUSDT",
    "LTCBTC",
    "LTCETH",
    "LTCBNB",
    "NEARUSDT",
    "NEARBTC",
    "NEARETH",
    "ICPUSDT",
    "ICPBTC",
    "ICPETH",
    "APTUSDT",
    "APTBTC",
    "APTETH",
    "USDTDAI",
    "BTCDAI",
    "ETHDAI",
    "AAVEUSDT",
    "AAVEBTC",
    "AAVEETH",
    "POLUSDT",
    "POLBTC",
    "POLETH",
    "POLBNB",
    "ETCUSDT",
    "ETCBTC",
    "ETCETH",
    "ETCBNB",
    "RENDERUSDT",
    "RENDERBTC",
    "VETUSDT",
    "VETBTC",
    "VETETH",
    "VETBNB",
    "ENAUSDT",
    "ENABTC",
    "ENAETH",
    "ENABNB",
    "OMUSDT",
    "OMBTC",
    "FILUSDT",
    "FILBTC",
    "FILETH",
    "ALGOUSDT",
    "ALGOBTC",
    "ATOMUSDT",
    "ATOMBTC",
    "OPUSDT",
    "OPBTC",
    "OPETH",
    "PENGUUSDT",
    "PENGUBNB",
    "STXUSDT",
    "STXBTC",
    "STXBNB",
    "TIABTC",
    "TIAUSDT",
    "INJUSDT",
    "INJBTC",
    "INJETH",
    "INJBNB",
    "THETAUSDT",
    "THETABTC",
    "IMXUSDT",
    "IMXBTC",
    "MOVEUSDT",
    "MOVEBTC",
    "MOVEBNB",
    "GRTUSDT",
    "GRTBTC",
    "GRTETH",
    "WLDUSDT",
    "WLDBTC",
    "FTMUSDT",
    "FTMBTC",
    "FTMETH",
    "FTMBNB",
    "WIFUSDT",
    "WIFBTC",
    "SEIUSDT",
    "SEIBTC",
    "SEIBNB",
    "LDOUSDT",
    "LDOBTC",
    "SANDUSDT",
    "SANDBTC",
  ], []);

  // Система отримання данних за допомогою http запитів 
  /*useEffect(() => {
    dispatch(fetchCryptoPrices(symbols));
    // Викликаємо fetchCryptoPrices для всіх пар одночасно
    const interval = setInterval(() => {
      dispatch(fetchCryptoPrices(symbols));
    }, 10000);

    // Очищення інтервалу при розмонтуванні компонента
    return () => clearInterval(interval);
  }, [dispatch]);*/
  

  //Система отримання данних за допомогою прямого підключення до біржі через WebSocket
  useEffect(() => {
    // Викликаємо функцію для підключення до WebSocket
    const ws = connectWebSocket(symbols, dispatch);

    return () => {
      // Закриваємо WebSocket при розмонтуванні компонента
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [symbols, dispatch]); // Викликається лише один раз при монтуванні компонента

  if (error) return <p>Error: {error}</p>;
  //  console.log(pricesBTCSOL, pricesETHSOL, pricesBNBSOL);

  // Масив даних для пар криптовалют
  const pairs = [
    { pairName: "BTC→ETH→USDT", first: {symbol:"BTCUSDT"}, second:{symbol: "ETHBTC"}, third:{symbol:"ETHUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['ETHBTC'], firstSymbol: "BTCUSDT", secondSymbol: "ETHBTC", firstQuantity: 0.00001, secondQuantity: 0.0001, thirdQuantity: 0.0001})},
    { pairName: "BTC→BNB→USDT", first: {symbol:"BTCUSDT"}, second:{symbol:"BNBBTC"}, third:{symbol:"BNBUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['BNBBTC'], firstSymbol: "BTCUSDT", secondSymbol: "BNBBTC", firstQuantity: 0.00001, secondQuantity: 0.001, thirdQuantity: 0.001})},
    { pairName: "BTC→XRP→USDT", first: {symbol:"BTCUSDT"}, second:{symbol:"XRPBTC"}, third:{symbol:"XRPUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['XRPUSDT'], pricesCoinToCoin: prices['XRPBTC'], firstSymbol: "BTCUSDT", secondSymbol: "XRPBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 1})},
    { pairName: "BTC→DOT→USDT", first: {symbol:"BTCUSDT"}, second:{symbol: "DOTBTC"}, third:{symbol:"DOTUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['DOTUSDT'], pricesCoinToCoin: prices['DOTBTC'], firstSymbol: "BTCUSDT", secondSymbol: "DOTBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01})},
    { pairName: "BTC→SOL→USDT", first: {symbol: "BTCUSDT"}, second: {symbol: "SOLBTC"}, third:{symbol:"SOLUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['SOLUSDT'], pricesCoinToCoin: prices['SOLBTC'], firstSymbol: "BTCUSDT", secondSymbol: "SOLBTC", firstQuantity: 0.00001, secondQuantity: 0.001, thirdQuantity: 0.001 })},
    { pairName: "BTC→ADA→USDT", first: {symbol:"BTCUSDT"}, second:{symbol: "ADABTC"}, third:{symbol:"SOLUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['ADAUSDT'], pricesCoinToCoin: prices['ADABTC'], firstSymbol: "BTCUSDT", secondSymbol: "ADABTC", firstQuantity: 0.00001, secondQuantity: 0.1, thirdQuantity: 0.1 })},
    { pairName: "BTC→TRX→USDT", first: {symbol: "BTCUSDT"}, second: {symbol: "TRXBTC"}, third:{symbol:"TRXUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['TRXUSDT'], pricesCoinToCoin: prices['TRXBTC'], firstSymbol: "BTCUSDT", secondSymbol: "TRXBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 0.1 })},
    { pairName: "BTC→AVAX→USDT", first: {symbol: "BTCUSDT"}, second: { symbol: "AVAXBTC"}, third:{symbol:"AVAXUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['AVAXUSDT'], pricesCoinToCoin: prices['AVAXBTC'], firstSymbol: "BTCUSDT", secondSymbol: "AVAXBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 })},
    { pairName: "BTC→SUI→USDT", first: {symbol: "BTCUSDT"}, second: {symbol: "SUIBTC"}, third:{symbol:"SUIUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['SUIUSDT'], pricesCoinToCoin: prices['SUIBTC'], firstSymbol: "BTCUSDT", secondSymbol: "SUIBTC", firstQuantity: 0.00001, secondQuantity: 0.1, thirdQuantity: 0.1  }) },
    { pairName: "BTC→LINK→USDT", first: { symbol: "BTCUSDT" }, second: { symbol: "LINKBTC" }, third: { symbol: "SUIUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['LINKUSDT'], pricesCoinToCoin: prices['LINKBTC'], firstSymbol: "BTCUSDT", secondSymbol: "LINKBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    
    { pairName: "BTC→TON→USDT", first: { symbol: "BTCUSDT" }, second: { symbol: "TONBTC" }, third: { symbol: "TONUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['TONUSDT'], pricesCoinToCoin: prices['TONBTC'], firstSymbol: "BTCUSDT", secondSymbol: "TONBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    
    { pairName: "BTC→DOGE→USDT", first: {symbol:"BTCUSDT"}, second: {symbol: "DOGEBTC"}, third:{symbol:"DOGEUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['DOGEUSDT'], pricesCoinToCoin: prices['DOGEBTC'], firstSymbol: "BTCUSDT", secondSymbol: "DOGEBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "BTC→XLM→USDT", first: { symbol: "BTCUSDT" }, second: { symbol: "XLMBTC" }, third: { symbol: "XMLUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['XLMUSDT'], pricesCoinToCoin: prices['XLMBTC'], firstSymbol: "BTCUSDT", secondSymbol: "XLMBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "BTC→WBTC→USDT", first: { symbol:"BTCUSDT"}, second: {symbol:"WBTCBTC"}, third:{symbol:"WBTCUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['WBTCUSDT'], pricesCoinToCoin: prices['WBTCBTC'], firstSymbol: "BTCUSDT", secondSymbol: "WBTCBTC", firstQuantity: 0.00001, secondQuantity: 0.00001, thirdQuantity: 0.00001 }) },
    { pairName: "BTC→HBAR→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"HBARBTC"}, third:{symbol:"HBARUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['HBARUSDT'], pricesCoinToCoin: prices['HBARBTC'], firstSymbol: "BTCUSDT", secondSymbol: "HBARBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "BTC→BCH→USDT", first: {symbol:"BTCUSDT"}, second: {symbol: "BCHBTC"}, third:{symbol:"BCHUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['BCHUSDT'], pricesCoinToCoin: prices['BCHBTC'], firstSymbol: "BTCUSDT", secondSymbol: "BCHBTC", firstQuantity: 0.00001, secondQuantity: 0.001 , thirdQuantity: 0.001 }) },
    { pairName: "BTC→UNI→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"UNIBTC"}, third:{symbol:"UNIUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['UNIUSDT'], pricesCoinToCoin: prices['UNIBTC'], firstSymbol: "BTCUSDT", secondSymbol: "UNIBTC", firstQuantity: 0.00001, secondQuantity: 0.01 , thirdQuantity: 0.01 }) },
    { pairName: "BTC→LTC→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"LTCBTC"}, third:{symbol:"LTCUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['LTCUSDT'], pricesCoinToCoin: prices['LTCBTC'], firstSymbol: "BTCUSDT", secondSymbol: "LTCBTC", firstQuantity: 0.00001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
    { pairName: "BTC→NEAR→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"NEARBTC"}, third:{symbol:"NEARUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['NEARUSDT'], pricesCoinToCoin: prices['NEARBTC'], firstSymbol: "BTCUSDT", secondSymbol: "NEARBTC", firstQuantity: 0.00001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BTC→ICP→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"ICPBTC"}, third:{symbol:"ICPUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['ICPUSDT'], pricesCoinToCoin: prices['ICPBTC'], firstSymbol: "BTCUSDT", secondSymbol: "ICPBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→APT→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"APTBTC"}, third:{symbol:"APTUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['APTUSDT'], pricesCoinToCoin: prices['APTBTC'], firstSymbol: "BTCUSDT", secondSymbol: "APTBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→AAVE→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"AAVEBTC"}, third:{symbol:"AAVEUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['AAVEUSDT'], pricesCoinToCoin: prices['AAVEBTC'], firstSymbol: "BTCUSDT", secondSymbol: "AAVEBTC", firstQuantity: 0.00001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
    { pairName: "BTC→POL→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"POLBTC"}, third:{symbol:"POLUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['POLUSDT'], pricesCoinToCoin: prices['POLBTC'], firstSymbol: "BTCUSDT", secondSymbol: "POLBTC", firstQuantity: 0.00001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BTC→ETC→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"ECTBTC"}, third:{symbol:"ECTUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["ETCUSDT"], pricesCoinToCoin: prices['ETCBTC'], firstSymbol: "BTCUSDT", secondSymbol: "ETCBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→RENDER→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"RENDERBTC"}, third:{symbol:"RENDERUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["RENDERUSDT"], pricesCoinToCoin: prices['RENDERBTC'], firstSymbol: "BTCUSDT", secondSymbol: "RENDERBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→VET→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"VETBTC"}, third:{symbol:"VETUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["VETUSDT"], pricesCoinToCoin: prices['VETBTC'], firstSymbol: "BTCUSDT", secondSymbol: "VETBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 0.1 }) },
    { pairName: "BTC→ENA→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"ENABTC"}, third:{symbol:"ENAUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["ENAUSDT"], pricesCoinToCoin: prices['ENABTC'], firstSymbol: "BTCUSDT", secondSymbol: "ENABTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→OM→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"OMBTC"}, third:{symbol:"OMUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["OMUSDT"], pricesCoinToCoin: prices['OMBTC'], firstSymbol: "BTCUSDT", secondSymbol: "OMBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 1  }) },
    { pairName: "BTC→FIL→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"FILBTC"}, third:{symbol:"FILUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["FILUSDT"], pricesCoinToCoin: prices['FILBTC'], firstSymbol: "BTCUSDT", secondSymbol: "FILBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→ALGO→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"ALGOBTC"}, third:{symbol:"ALGOUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["ALGOUSDT"], pricesCoinToCoin: prices['ALGOBTC'], firstSymbol: "BTCUSDT", secondSymbol: "ALGOBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "BTC→ATOM→USDT", first: {symbol:"BTCUSDT"}, second: { symbol:"ATOMBTC"},  third:{symbol:"ATOMUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["ATOMUSDT"], pricesCoinToCoin: prices['ATOMBTC'], firstSymbol: "BTCUSDT", secondSymbol: "ATOMBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→OP→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"OPBTC"}, third:{symbol:"OPUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["OPUSDT"], pricesCoinToCoin: prices['OPBTC'], firstSymbol: "BTCUSDT", secondSymbol: "OPBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→STX→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"STXBTC"}, third:{symbol:"STXUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["STXUSDT"], pricesCoinToCoin: prices['STXBTC'], firstSymbol: "BTCUSDT", secondSymbol: "STXBTC", firstQuantity: 0.00001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BTC→TIA→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"TIABTC"}, third:{symbol:"TIAUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["TIAUSDT"], pricesCoinToCoin: prices['TIABTC'], firstSymbol: "BTCUSDT", secondSymbol: "TIABTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→INJ→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"INJBTC"}, third:{symbol:"INJUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["INJUSDT"], pricesCoinToCoin: prices['INJBTC'], firstSymbol: "BTCUSDT", secondSymbol: "INJBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→THETA→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"THETABTC"}, third:{symbol:"THETAUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["THETAUSDT"], pricesCoinToCoin: prices['THETABTC'], firstSymbol: "BTCUSDT", secondSymbol: "THETABTC", firstQuantity: 0.00001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BTC→IMX→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"IMXBTC"}, third:{symbol:"IMXUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["IMXUSDT"], pricesCoinToCoin: prices['IMXBTC'], firstSymbol: "BTCUSDT", secondSymbol: "IMXBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→MOVE→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"MOVEBTC"}, third:{symbol:"MOVEUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["MOVEUSDT"], pricesCoinToCoin: prices['MOVEBTC'], firstSymbol: "BTCUSDT", secondSymbol: "MOVEBTC", firstQuantity: 0.00001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BTC→GRT→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"GRTBTC"}, third:{symbol:"GRTUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["GRTUSDT"], pricesCoinToCoin: prices['GRTBTC'], firstSymbol: "BTCUSDT", secondSymbol: "GRTBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "BTC→WLD→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"WLDBTC"}, third:{symbol:"WLDUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["WLDUSDT"], pricesCoinToCoin: prices['WLDBTC'], firstSymbol: "BTCUSDT", secondSymbol: "WLDBTC", firstQuantity: 0.00001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BTC→WIF→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"WIFBTC"}, third:{symbol:"WIFUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["WIFUSDT"], pricesCoinToCoin: prices['WIFBTC'], firstSymbol: "BTCUSDT", secondSymbol: "WLDBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→SEI→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"SEIBTC"}, third:{symbol:"SEIUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["SEIUSDT"], pricesCoinToCoin: prices['SEIBTC'], firstSymbol: "BTCUSDT", secondSymbol: "SEIBTC", firstQuantity: 0.00001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BTC→LDO→USDT", first: {symbol:"BTCUSDT"}, second: {symbol:"LDOBTC"}, third:{symbol:"LDOUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["LDOUSDT"], pricesCoinToCoin: prices['LDOBTC'], firstSymbol: "BTCUSDT", secondSymbol: "LDOBTC", firstQuantity: 0.00001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BTC→SAND→USDT", first: { symbol: "BTCUSDT" }, second: { symbol: "SANDBTC" }, third:{symbol:"SANDUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["SANDUSDT"], pricesCoinToCoin: prices['SANDBTC'], firstSymbol: "BTCUSDT", secondSymbol: "SANDBTC", firstQuantity: 0.00001, secondQuantity: 1, thirdQuantity: 1  }) },

    { pairName: "ETH→BNB→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"BNBETH"}, third:{symbol:"BNBUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['BNBETH'], firstSymbol: "ETHUSDT", secondSymbol: "BNBETH'", firstQuantity: 0.0001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
    { pairName: "ETH→XRP→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"XRPETH"}, third:{symbol:"XRPUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['XRPUSDT'], pricesCoinToCoin: prices['XRPETH'], firstSymbol: "ETHUSDT", secondSymbol: "XRPETH'", firstQuantity: 0.0001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "ETH→DOT→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"DOTETH"}, third:{symbol:"DOTUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['DOTUSDT'], pricesCoinToCoin: prices['DOTETH'], firstSymbol: "ETHUSDT", secondSymbol: "DOTETH'", firstQuantity: 0.0001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "ETH→SOL→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"SOLETH"}, third:{symbol:"SOLUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['SOLUSDT'], pricesCoinToCoin: prices['SOLETH'], firstSymbol: "ETHUSDT", secondSymbol: "SOLETH'", firstQuantity: 0.0001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
    { pairName: "ETH→ADA→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"ADAETH"}, third:{symbol:"ADAUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['ADAUSDT'], pricesCoinToCoin: prices['ADAETH'], firstSymbol: "ETHUSDT", secondSymbol: "ADAETH'", firstQuantity: 0.0001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "ETH→TRX→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"TRXETH"}, third:{symbol:"TRXUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['TRXUSDT'], pricesCoinToCoin: prices['TRXETH'], firstSymbol: "ETHUSDT", secondSymbol: "TRXETH'", firstQuantity: 0.0001, secondQuantity: 1, thirdQuantity: 0.1 }) },
    { pairName: "ETH→AVAX→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"AVAXETH"}, third:{symbol:"AVAXUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['AVAXUSDT'], pricesCoinToCoin: prices['AVAXETH'], firstSymbol: "ETHUSDT", secondSymbol: "AVAXETH'", firstQuantity: 0.0001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "ETH→LINK→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"LINKETH"}, third:{symbol:"LINKUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['LINKUSDT'], pricesCoinToCoin: prices['LINKETH'], firstSymbol: "ETHUSDT", secondSymbol: "LINKETH'", firstQuantity: 0.0001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "ETH→XLM→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"XLMETH"}, third:{symbol:"XLMUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['XLMUSDT'], pricesCoinToCoin: prices['XLMETH'], firstSymbol: "ETHUSDT", secondSymbol: "XLMETH'", firstQuantity: 0.0001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "ETH→WBTC→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"WBTCETH"}, third:{symbol:"WBTCUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['WBTCUSDT'], pricesCoinToCoin: prices['WBTCETH'], firstSymbol: "ETHUSDT", secondSymbol: "WBTCETH'", firstQuantity: 0.0001, secondQuantity: 0.00001, thirdQuantity: 0.00001 }) },
    { pairName: "ETH→UNI→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"UNIETH"}, third:{symbol:"UNIUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['UNIUSDT'], pricesCoinToCoin: prices['UNIETH'], firstSymbol: "ETHUSDT", secondSymbol: "UNIETH'", firstQuantity: 0.0001, secondQuantity: 0.001, thirdQuantity: 0.01 }) },
    { pairName: "ETH→LTC→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"LTCETH"}, third:{symbol:"LTCUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['LTCUSDT'], pricesCoinToCoin: prices['LTCETH'], firstSymbol: "ETHUSDT", secondSymbol: "LTCETH'", firstQuantity: 0.0001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
    // { pairName: "ETH→NEAR→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"NEARETH"}, third:{symbol:"NEARUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['NEARUSDT'], pricesCoinToCoin: prices['NEARETH'], firstSymbol: "ETHUSDT", secondSymbol: "NEARETH'", firstQuantity: 0.0001, secondQuantity: 0.001, thirdQuantity: 0.1 }) },
    { pairName: "ETH→ICP→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"ICPETH"}, third:{symbol:"ICPUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["ICPUSDT"], pricesCoinToCoin: prices['ICPETH'], firstSymbol: "ETHUSDT", secondSymbol: "ICPETH'", firstQuantity: 0.0001, secondQuantity: 0.001, thirdQuantity: 0.01 }) },
    { pairName: "ETH→APT→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"APTETH"}, third:{symbol:"APTUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["APTUSDT"], pricesCoinToCoin: prices['APTETH'], firstSymbol: "ETHUSDT", secondSymbol: "APTETH'", firstQuantity: 0.0001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "ETH→AAVE→USDT", first: {symbol:"ETHUSDT"}, second: { symbol: "AAVEETH"}, third:{symbol:"AAVEUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["AAVEUSDT"], pricesCoinToCoin: prices['AAVEETH'], firstSymbol: "ETHUSDT", secondSymbol: "AAVEETH'", firstQuantity: 0.0001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
    { pairName: "ETH→POL→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"POLETH"}, third:{symbol:"AAVEUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["POLUSDT"], pricesCoinToCoin: prices['POLETH'], firstSymbol: "ETHUSDT", secondSymbol: "POLETH'", firstQuantity: 0.0001, secondQuantity: 0.1, thirdQuantity: 0.1  }) },
    { pairName: "ETH→ETC→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"ETCETH"}, third:{symbol:"ETCUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["ETCUSDT"], pricesCoinToCoin: prices['ETCETH'], firstSymbol: "ETHUSDT", secondSymbol: "ETCETH'", firstQuantity: 0.0001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "ETH→VET→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"VETETH"},  third:{symbol:"VETUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["VETUSDT"], pricesCoinToCoin: prices['VETETH'], firstSymbol: "ETHUSDT", secondSymbol: "VETETH'", firstQuantity: 0.0001, secondQuantity: 1, thirdQuantity: 0.1 }) },
    { pairName: "ETH→FIL→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"FILETH"}, third:{symbol:"FILUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["FILUSDT"], pricesCoinToCoin: prices['FILETH'], firstSymbol: "ETHUSDT", secondSymbol: "FILETH'", firstQuantity: 0.0001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "ETH→OP→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"OPETH"}, third:{symbol:"OPUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["OPUSDT"], pricesCoinToCoin: prices['OPETH'], firstSymbol: "ETHUSDT", secondSymbol: "OPETH'", firstQuantity: 0.0001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "ETH→INJ→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"INJETH"}, third:{symbol:"INJUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["INJUSDT"], pricesCoinToCoin: prices['INJETH'], firstSymbol: "ETHUSDT", secondSymbol: "INJETH'", firstQuantity: 0.0001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "ETH→GRT→USDT", first: {symbol:"ETHUSDT"}, second: {symbol:"GRTETH"}, third:{symbol:"GRTUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["GRTUSDT"], pricesCoinToCoin: prices['GRTETH'], firstSymbol: "ETHUSDT", secondSymbol: "GRTETH'", firstQuantity: 0.0001, secondQuantity: 1, thirdQuantity: 1 }) },
    
    { pairName: "BNB→XRP→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "XRPBNB"}, third:{symbol:"XRPUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['XRPUSDT'], pricesCoinToCoin: prices['XRPBNB'], firstSymbol: "BNBUSDT", secondSymbol: "XRPBNB'", firstQuantity: 0.001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "BNB→DOT→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "DOTBNB"}, third:{symbol:"DOTUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['DOTUSDT'], pricesCoinToCoin: prices['DOTBNB'], firstSymbol: "BNBUSDT", secondSymbol: "DOTBNB'", firstQuantity: 0.001, secondQuantity: 0.01, thirdQuantity: 0.01  }) },
    { pairName: "BNB→SOL→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "SOLBNB"}, third:{symbol:"SOLUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['SOLUSDT'], pricesCoinToCoin: prices['SOLBNB'], firstSymbol: "BNBUSDT", secondSymbol: "SOLBNB'", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
    { pairName: "BNB→ADA→USDT", first: { symbol: "BNBUSDT"}, second: { symbol:"ADABNB"}, third: {symbol: "ADAUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['ADAUSDT'], pricesCoinToCoin: prices['ADABNB'], firstSymbol: "BNBUSDT", secondSymbol: "ADABNB'", firstQuantity: 0.001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BNB→TRX→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "TRXBNB"}, third: { symbol: "TRXUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['TRXUSDT'], pricesCoinToCoin: prices['TRXBNB'], firstSymbol: "BNBUSDT", secondSymbol: "TRXBNB'", firstQuantity: 0.001, secondQuantity: 1, thirdQuantity: 0.1 }) },
    { pairName: "BNB→AVAX→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "AVAXBNB"}, third: { symbol: "AVAXUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['AVAXUSDT'], pricesCoinToCoin: prices['AVAXBNB'], firstSymbol: "BNBUSDT", secondSymbol: "AVAXBNB'", firstQuantity: 0.001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BNB→SUI→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "SUIBNB"}, third: { symbol: "SUIUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['SUIUSDT'], pricesCoinToCoin: prices['SUIBNB'], firstSymbol: "BNBUSDT", secondSymbol: "SUIBNB'", firstQuantity: 0.001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BNB→LINK→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "LINKBNB"}, third: { symbol: "LINKUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['LINKUSDT'], pricesCoinToCoin: prices['LINKBNB'], firstSymbol: "BNBUSDT", secondSymbol: "LINKBNB'", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.01 }) },
    { pairName: "BNB→HBAR→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "HBARBNB"}, third: { symbol: "HBARUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['HBARUSDT'], pricesCoinToCoin: prices['HBARBNB'], firstSymbol: "BNBUSDT", secondSymbol: "HBARBNB'", firstQuantity: 0.001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "BNB→BCH→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "BCHBNB"}, third: { symbol: "BCHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['BCHUSDT'], pricesCoinToCoin: prices['BCHBNB'], firstSymbol: "BNBUSDT", secondSymbol: "BCHBNB'", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
    { pairName: "BNB→LTC→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "LTCBNB"}, third: { symbol: "LTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['LTCUSDT'], pricesCoinToCoin: prices['LTCBNB'], firstSymbol: "BNBUSDT", secondSymbol: "LTCBNB'", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.001}) },
    { pairName: "BNB→ETC→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "ETCBNB"}, third: { symbol: "ETCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['ETCUSDT'], pricesCoinToCoin: prices['ETCBNB'], firstSymbol: "BNBUSDT", secondSymbol: "ETCBNB'", firstQuantity: 0.001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BNB→VET→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "VETBNB"}, third: { symbol: "VETUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['VETUSDT'], pricesCoinToCoin: prices['VETBNB'], firstSymbol: "BNBUSDT", secondSymbol: "VETBNB'", firstQuantity: 0.001, secondQuantity: 1, thirdQuantity: 0.1 }) },
    { pairName: "BNB→ENA→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "ENABNB"}, third: { symbol: "ENAUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['ENAUSDT'], pricesCoinToCoin: prices['ENABNB'], firstSymbol: "BNBUSDT", secondSymbol: "ENABNB'", firstQuantity: 0.001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BNB→PENGU→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "PENGUBNB"}, third: { symbol: "PENGUUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['PENGUUSDT'], pricesCoinToCoin: prices['PENGUBNB'], firstSymbol: "BNBUSDT", secondSymbol: "PENGUBNB'", firstQuantity: 0.001, secondQuantity: 1, thirdQuantity: 1 }) },
    { pairName: "BNB→STX→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "STXBNB"}, third: { symbol: "STXUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['STXUSDT'], pricesCoinToCoin: prices['STXBNB'], firstSymbol: "BNBUSDT", secondSymbol: "STXBNB'", firstQuantity: 0.001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BNB→INJ→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "INJBNB"}, third: { symbol: "INJUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['INJUSDT'], pricesCoinToCoin: prices['INJBNB'], firstSymbol: "BNBUSDT", secondSymbol: "INJBNB'", firstQuantity: 0.001, secondQuantity: 0.01, thirdQuantity: 0.01 }) },
    { pairName: "BNB→MOVE→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "MOVEBNB"}, third: { symbol: "MOVEUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['MOVEUSDT'], pricesCoinToCoin: prices['MOVEBNB'], firstSymbol: "BNBUSDT", secondSymbol: "MOVEBNB'", firstQuantity: 0.001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
    { pairName: "BNB→SEI→USDT", first: { symbol: "BNBUSDT"}, second: { symbol: "SEIBNB"}, third: { symbol: "SEIUSDT" }, profitInPercentage: calculateProfit({  pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['SEIUSDT'], pricesCoinToCoin: prices['SEIBNB'], firstSymbol: "BNBUSDT", secondSymbol: "SEIBNB'", firstQuantity: 0.001, secondQuantity: 0.1, thirdQuantity: 0.1 }) },
       
    // Зворотні пари
     { pairName: "ETC→BNB→USDT", first: {symbol: "ETCUSDT"}, second: {symbol: "ETCBNB"},  third: { symbol: "ETCUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETCUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: prices["ETCBNB"], firstSymbol: "ETCUSDT", secondSymbol: "ETCBNB'", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.001  }) },
     { pairName: "XRP→BNB→USDT", first: { symbol: "XRPUSDT"}, second: { symbol: "XRPBNB"},  third: { symbol: "XRPUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['XRPUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['XRPBNB'], firstSymbol: "ETCUSDT", secondSymbol: "XRPBNB'", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.001 }) },
     { pairName: "XRP→ETH→USDT", first: { symbol: "XRPUSDT"}, second: { symbol: "XRPETH"}, third: { symbol: "ETHUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['XRPUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['XRPETH'], firstSymbol: "XRPUSDT", secondSymbol: "XRPETH'", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.0001 }) },
     { pairName: "XRP→BTC→USDT", first: { symbol: "XRPUSDT" }, second: { symbol: "XRPBTC" }, third: { symbol: "BTCUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['XRPUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['XRPBTC'], firstSymbol: "XRPUSDT", secondSymbol: "XRPBTC'", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.00001 }) },
     { pairName: "DOT→BTC→USDT", first: { symbol: "DOTUSDT"}, second: { symbol: "DOTBTC"}, third: { symbol: "BTCUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['DOTUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['DOTBTC'], firstSymbol: "DOTUSDT", secondSymbol: "DOTBTC'", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "DOT→ETH→USDT", first: { symbol: "DOTUSDT"}, second: { symbol: "DOTETH"}, third: { symbol: "ETHUSDT"}, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['DOTUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['DOTETH'], firstSymbol: "DOTUSDT", secondSymbol: "DOTETH'", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.0001 }) },
     { pairName: "DOT→BNB→USDT", first: { symbol: "DOTUSDT"}, second: { symbol: "DOTBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['DOTUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['DOTBNB'], firstSymbol: "DOTUSDT", secondSymbol: "DOTBNB'", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.001}) },
     { pairName: "SOL→BTC→USDT", first: { symbol: "SOLUSDT"}, second: { symbol: "SOLBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['SOLUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['SOLBTC'], firstSymbol: "SOLUSDT", secondSymbol: "SOLBTC'", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.00001  }) },
     { pairName: "SOL→ETH→USDT", first: { symbol: "SOLUSDT"}, second: { symbol: "SOLETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['SOLUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['SOLETH'], firstSymbol: "SOLUSDT", secondSymbol: "SOLETH'", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.0001 }) },
     { pairName: "SOL→BNB→USDT", first: { symbol: "SOLUSDT"}, second: { symbol: "SOLBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['SOLUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['SOLBNB'], firstSymbol: "SOLUSDT", secondSymbol: "SOLBNB'", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
     { pairName: "ADA→BTC→USDT", first: { symbol: "ADAUSDT"}, second: { symbol: "ADABTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ADAUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['ADABTC'], firstSymbol: "ADAUSDT", secondSymbol: "ADABTC'", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.00001 }) },
     { pairName: "ADA→ETH→USDT", first: { symbol: "ADAUSDT"}, second: { symbol: "ADAETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ADAUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['ADAETH'], firstSymbol: "ADAUSDT", secondSymbol: "ADAETH'", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.0001 }) },
     { pairName: "ADA→BNB→USDT", first: { symbol: "ADAUSDT"}, second: { symbol: "ADABNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['ADAUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['ADABNB'], firstSymbol: "ADAUSDT", secondSymbol: "ADAETH'", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.001 }) },
     { pairName: "TRX→BTC→USDT", first: { symbol: "TRXUSDT"}, second: { symbol: "TRXBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['TRXUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['TRXBTC'], firstSymbol: "TRXUSDT", secondSymbol: "TRXBTC'", firstQuantity: 0.1, secondQuantity: 1, thirdQuantity: 0.00001 }) },
     { pairName: "TRX→ETH→USDT", first: { symbol: "TRXUSDT"}, second: { symbol: "TRXETH"},  third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['TRXUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['TRXETH'], firstSymbol: "TRXUSDT", secondSymbol: "TRXETH", firstQuantity: 0.1, secondQuantity: 1, thirdQuantity: 0.0001 }) },
     { pairName: "TRX→BNB→USDT", first: { symbol: "TRXUSDT"}, second: { symbol: "TRXBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['TRXUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['TRXBNB'], firstSymbol: "TRXUSDT", secondSymbol: "TRXBNB", firstQuantity: 0.1, secondQuantity: 1, thirdQuantity: 0.001 }) },
     { pairName: "AVAX→BTC→USDT", first: { symbol: "AVAXUSDT"}, second: { symbol: "AVAXBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['AVAXUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['AVAXBTC'], firstSymbol: "AVAXUSDT", secondSymbol: "AVAXBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "AVAX→ETH→USDT", first: { symbol: "AVAXUSDT"}, second: { symbol: "AVAXETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['AVAXUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['AVAXETH'], firstSymbol: "AVAXUSDT", secondSymbol: "AVAXETH", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.0001 }) },
     { pairName: "AVAX→BNB→USDT", first: { symbol: "AVAXUSDT"}, second: { symbol: "AVAXBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['AVAXUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['AVAXBNB'], firstSymbol: "AVAXUSDT", secondSymbol: "AVAXBNB", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.001 }) },
     { pairName: "SUI→BTC→USDT", first: { symbol: "SUIUSDT" }, second: { symbol: "SUIBTC" }, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['SUIUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['SUIBTC'], firstSymbol: "SUIUSDT", secondSymbol: "SUIBTC", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.00001 }) },
     { pairName: "SUI→BNB→USDT", first: { symbol: "SUIUSDT"}, second: { symbol: "SUIBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['SUIUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['SUIBNB'], firstSymbol: "SUIUSDT", secondSymbol: "SUIBNB", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.001 }) },
     { pairName: "LINK→BTC→USDT", first: { symbol: "LINKUSDT"}, second: { symbol: "LINKBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['LINKUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['LINKBTC'], firstSymbol: "LINKUSDT", secondSymbol: "LINKBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "LINK→ETH→USDT", first: { symbol: "LINKUSDT"}, second: { symbol: "LINKETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['LINKUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['LINKETH'], firstSymbol: "LINKUSDT", secondSymbol: "LINKETH", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.0001 }) },
     { pairName: "LINK→BNB→USDT", first: { symbol: "LINKUSDT"}, second: { symbol: "LINKBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['LINKUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['LINKBNB'], firstSymbol: "LINKUSDT", secondSymbol: "LINKBNB", firstQuantity: 0.01, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
     { pairName: "TON→BTC→USDT", first: { symbol: "TONUSDT"}, second: { symbol: "TONBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['TONUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['TONBTC'], firstSymbol: "TONUSDT", secondSymbol: "TONBTC", firstQuantity: 0.01, secondQuantity: 0.001, thirdQuantity: 0.00001 }) },
     { pairName: "DOGE→BTC→USDT", first: { symbol: "DOGEUSDT"}, second: { symbol: "DOGEBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['DOGEUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['DOGEBTC'], firstSymbol: "DOGEUSDT", secondSymbol: "DOGEBTC", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.00001 }) },
     { pairName: "XLM→BTC→USDT",  first: { symbol: "XLMUSDT"}, second: { symbol: "XLMBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({  pricesFirstCoin: prices['XLMUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['XLMBTC'], firstSymbol: "XLMUSDT", secondSymbol: "XLMBTC", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.00001 }) },
     { pairName: "XLM→ETH→USDT",  first: { symbol: "XLMUSDT"}, second: { symbol: "XLMETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['XLMUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['XLMETH'], firstSymbol: "XLMUSDT", secondSymbol: "XLMETH", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.0001 }) },
     { pairName: "WBTC→BTC→USDT", first: { symbol: "WBTCUSDT" }, second: { symbol: "WBTCBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['WBTCUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['WBTCBTC'], firstSymbol: "WBTCUSDT", secondSymbol: "WBTCBTC", firstQuantity: 0.00001, secondQuantity: 0.00001 , thirdQuantity: 0.00001 }) },
     { pairName: "WBTC→ETH→USDT", first: { symbol: "WBTCUSDT"}, second: { symbol: "WBTCETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['WBTCUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['WBTCETH'], firstSymbol: "WBTCUSDT", secondSymbol: "WBTCETH", firstQuantity: 0.00001, secondQuantity: 0.00001 , thirdQuantity: 0.0001 }) },
     { pairName: "HBAR→BTC→USDT", first: { symbol: "HBARUSDT"}, second: { symbol: "HBARBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['HBARUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['HBARBTC'], firstSymbol: "HBARUSDT", secondSymbol: "HBARBTC", firstQuantity: 1, secondQuantity: 1 , thirdQuantity: 0.00001 }) },
     { pairName: "HBAR→BNB→USDT", first: { symbol: "HBARUSDT"}, second: { symbol: "HBARBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['HBARUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['HBARBNB'], firstSymbol: "HBARUSDT", secondSymbol: "HBARBNB", firstQuantity: 1, secondQuantity: 1 , thirdQuantity: 0.001 }) },
     { pairName: "BCH→BTC→USDT", first: { symbol: "BCHUSDT"}, second: { symbol: "BCHBTC"},  third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BCHUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['BCHBTC'], firstSymbol: "BCHUSDT", secondSymbol: "BCHBTC", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.00001 }) },
     { pairName: "BCH→BNB→USDT", first: { symbol: "BCHUSDT"}, second: { symbol: "BCHBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['BCHUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['BCHBNB'], firstSymbol: "BCHUSDT", secondSymbol: "BCHBNB", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.001 }) },
     { pairName: "UNI→BTC→USDT", first: { symbol: "UNIUSDT"}, second: { symbol: "UNIBTC"},  third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['UNIUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: prices['UNIBTC'], firstSymbol: "UNIUSDT", secondSymbol: "UNIBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "UNI→ETH→USDT", first: { symbol: "UNIUSDT"}, second: { symbol: "UNIETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices['UNIUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['UNIETH'], firstSymbol: "UNIUSDT", secondSymbol: "UNIETH", firstQuantity: 0.01, secondQuantity: 0.001, thirdQuantity: 0.0001 }) },
     { pairName: "LTC→BTC→USDT", first: { symbol: "LTCUSDT"}, second: { symbol: "LTCBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["LTCUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["LTCBTC"], firstSymbol: "LTCUSDT", secondSymbol: "LTCBTC", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.00001 }) },
     { pairName: "LTC→ETH→USDT", first: { symbol: "LTCUSDT"}, second: { symbol: "LTCETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["LTCUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["LTCETH"], firstSymbol: "LTCUSDT", secondSymbol: "LTCETH", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.0001 }) },
     { pairName: "LTC→BNB→USDT", first: { symbol: "LTCUSDT"}, second: { symbol: "LTCBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({  pricesFirstCoin: prices["LTCUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: prices["LTCBNB"], firstSymbol: "LTCUSDT", secondSymbol: "LTCBNB", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.001  }) },
     { pairName: "NEAR→BTC→USDT", first: { symbol: "NEARUSDT"}, second: { symbol: "NEARBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["NEARUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["NEARBTC"], firstSymbol: "NEARUSDT", secondSymbol: "NEARBTC", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.00001 }) },
     { pairName: "NEAR→ETH→USDT", first: { symbol: "NEARUSDT"}, second: { symbol: "NEARETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["NEARUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["NEARETH"], firstSymbol: "NEARUSDT", secondSymbol: "NEARETH", firstQuantity: 0.1, secondQuantity: 0.001, thirdQuantity: 0.0001 }) },
     { pairName: "ICP→BTC→USDT", first: { symbol: "ICPUSDT"}, second: { symbol: "ICPBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ICPUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["ICPBTC"], firstSymbol: "ICPUSDT", secondSymbol: "ICPBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "ICP→ETH→USDT", first: { symbol: "ICPUSDT"}, second: { symbol: "ICPETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ICPUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["ICPETH"], firstSymbol: "ICPUSDT", secondSymbol: "ICPETH", firstQuantity: 0.01, secondQuantity: 0.001, thirdQuantity: 0.0001 }) },
     { pairName: "APT→BTC→USDT", first: { symbol: "APTUSDT"}, second: { symbol: "APTBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["APTUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["APTBTC"], firstSymbol: "APTUSDT", secondSymbol: "APTBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "APT→ETH→USDT", first: { symbol: "APTUSDT"}, second: { symbol: "APTETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["APTUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["APTETH"], firstSymbol: "APTUSDT", secondSymbol: "APTETH", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.0001 }) },
     { pairName: "AAVE→BTC→USDT", first: { symbol: "AAVEUSDT"}, second: { symbol: "AAVEBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["AAVEUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["AAVEBTC"], firstSymbol: "AAVEUSDT", secondSymbol: "AAVEBTC", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.00001 }) },
     { pairName: "AAVE→ETH→USDT", first: { symbol: "AAVEUSDT"}, second: { symbol: "AAVEETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["AAVEUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["AAVEETH"], firstSymbol: "AAVEUSDT", secondSymbol: "AAVEETH", firstQuantity: 0.001, secondQuantity: 0.001, thirdQuantity: 0.0001 }) },
     { pairName: "POL→BTC→USDT", first: { symbol: "POLUSDT"}, second: { symbol: "POLBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["POLUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["POLBTC"], firstSymbol: "POLUSDT", secondSymbol: "POLBTC", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.00001 }) },
     { pairName: "POL→ETH→USDT", first: { symbol: "POLUSDT"}, second: { symbol: "POLETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["POLUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["POLETH"], firstSymbol: "POLUSDT", secondSymbol: "POLETH", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.0001 }) },
     { pairName: "ETC→BTC→USDT", first: { symbol: "ETCUSDT"}, second: { symbol: "ETCBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETCUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["ETCBTC"], firstSymbol: "ETCUSDT", secondSymbol: "ETCBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "ETC→ETH→USDT", first: { symbol: "ETCUSDT"}, second: { symbol: "ETCETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ETCUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["ETCETH"], firstSymbol: "ETCUSDT", secondSymbol: "ETCETH", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.0001 }) },
     { pairName: "RENDER→BTC→USDT", first: { symbol: "RENDERUSDT"}, second: { symbol: "RENDERBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["RENDERUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["RENDERBTC"], firstSymbol: "RENDERUSDT", secondSymbol: "RENDERBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "ENA→BTC→USDT", first: { symbol: "ENAUSDT"}, second: { symbol: "ENABTC"},  third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ENAUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["ENABTC"], firstSymbol: "ENAUSDT", secondSymbol: "ENARBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "ENA→BNB→USDT", first: { symbol: "ENAUSDT"}, second: { symbol: "ENABNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ENAUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: prices["ENABNB"], firstSymbol: "ENAUSDT", secondSymbol: "ENARBNB", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.001 }) },
     { pairName: "OM→BTC→USDT", first: { symbol: "OMUSDT"}, second: { symbol: "OMBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["OMUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["OMBTC"], firstSymbol: "OMUSDT", secondSymbol: "OMBTC", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.00001}) },
     { pairName: "FIL→BTC→USDT", first: { symbol: "FILUSDT"}, second: { symbol: "FILBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["FILUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["FILBTC"], firstSymbol: "FILUSDT", secondSymbol: "FILBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "FIL→ETH→USDT", first: { symbol: "FILUSDT"}, second: { symbol: "FILETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["FILUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["FILETH"], firstSymbol: "FILUSDT", secondSymbol: "FILETH", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.00001  }) },
     { pairName: "ALGO→BTC→USDT", first: { symbol: "ALGOUSDT"}, second: { symbol: "ALGOBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ALGOUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["ALGOBTC"], firstSymbol: "ALGOUSDT", secondSymbol: "ALGOBTC", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.00001 }) },
     { pairName: "ATOM→BTC→USDT", first: { symbol: "ATOMUSDT"}, second: { symbol: "ATOMBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["ATOMUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["ATOMBTC"], firstSymbol: "ATOMUSDT", secondSymbol: "ATOMBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "OP→BTC→USDT", first: { symbol: "OPUSDT"}, second: { symbol: "OPBTC"}, third: { symbol: "BTCUSDT" },  profitInPercentage: calculateProfit({ pricesFirstCoin: prices["OPUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["OPBTC"], firstSymbol: "OPUSDT", secondSymbol: "OPBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "OP→ETH→USDT", first: { symbol: "OPUSDT"}, second: { symbol: "OPETH"}, third: { symbol: "ETHUSDT" },profitInPercentage: calculateProfit({ pricesFirstCoin: prices["OPUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["OPETH"], firstSymbol: "OPUSDT", secondSymbol: "OPETH", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.0001 }) },
     { pairName: "STX→BTC→USDT", first: { symbol: "STXUSDT" }, second: { symbol: "STXBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["STXUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["STXBTC"], firstSymbol: "STXUSDT", secondSymbol: "STXBTC", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.00001 }) },
     { pairName: "STX→BNB→USDT", first: { symbol: "STXUSDT"}, second: { symbol: "STXBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["STXUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: prices["STXBNB"], firstSymbol: "STXUSDT", secondSymbol: "STXBNB", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.001 }) },
     { pairName: "TIA→BTC→USDT", first: { symbol: "TIAUSDT"}, second: { symbol: "TIABTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["TIAUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["TIABTC"], firstSymbol: "TIAUSDT", secondSymbol: "TIABTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "INJ→BTC→USDT", first: { symbol: "INJUSDT"}, second: { symbol: "INJBTC"}, third: { symbol: "USDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["INJUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["INJBTC"], firstSymbol: "INJUSDT", secondSymbol: "INJBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "INJ→ETH→USDT", first: { symbol: "INJUSDT"}, second: { symbol: "INJETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["INJUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["INJETH"], firstSymbol: "INJUSDT", secondSymbol: "INJETH", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.0001 }) },
     { pairName: "INJ→BNB→USDT", first: { symbol: "INJUSDT"}, second: { symbol: "INJBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["INJUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: prices["INJBNB"], firstSymbol: "INJUSDT", secondSymbol: "INJBNB", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.001}) },
     { pairName: "THETA→BTC→USDT", first: { symbol: "THETAUSDT"}, second: { symbol: "THETABTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["THETAUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["THETABTC"], firstSymbol: "THETAUSDT", secondSymbol: "THETABTC", firstQuantity: 0.1 , secondQuantity: 0.1 , thirdQuantity: 0.00001 }) },
     { pairName: "IMX→BTC→USDT", first: { symbol: "IMXUSDT"}, second: { symbol: "IMXBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["IMXUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["IMXBTC"], firstSymbol: "IMXUSDT", secondSymbol: "IMXBTC", firstQuantity: 0.01 , secondQuantity: 0.01 , thirdQuantity: 0.00001 }) },
     { pairName: "MOVE→BTC→USDT", first: { symbol: "MOVEUSDT"}, second: { symbol: "MOVEBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["MOVEUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["MOVEBTC"], firstSymbol: "MOVEUSDT", secondSymbol: "MOVEBTC", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.00001 }) },
     { pairName: "MOVE→BNB→USDT", first: { symbol: "MOVEUSDT"}, second: { symbol: "MOVEBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["MOVEUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: prices["MOVEBNB"], firstSymbol: "MOVEUSDT", secondSymbol: "MOVEBNB", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.001 }) },
     { pairName: "GRT→BTC→USDT", first: { symbol: "GRTUSDT"}, second: { symbol: "GRTBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["GRTUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["GRTBTC"], firstSymbol: "GRTUSDT", secondSymbol: "GRTBTC", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.00001 }) },
     { pairName: "GRT→ETH→USDT", first: { symbol: "GRTUSDT"}, second: { symbol: "GRTETH"}, third: { symbol: "ETHUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["GRTUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["GRTETH"], firstSymbol: "GRTUSDT", secondSymbol: "GRTETH", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.0001 }) },
     { pairName: "WLD→BTC→USDT", first: { symbol: "WLDUSDT"}, second: { symbol: "WLDBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["WLDUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["WLDBTC"], firstSymbol: "WLDUSDT", secondSymbol: "WLDBTC", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.00001 }) },
     { pairName: "WIF→BTC→USDT", first: { symbol: "WIFUSDT"}, second: { symbol: "WIFBTC"}, third: { symbol: "WIFUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["WIFUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["WIFBTC"], firstSymbol: "WIFUSDT", secondSymbol: "WIFBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "SEI→BTC→USDT", first: { symbol: "SEIUSDT"}, second: { symbol: "SEIBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["SEIUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["SEIBTC"], firstSymbol: "SEIUSDT", secondSymbol: "SEIBTC", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.00001 }) },
     { pairName: "SEI→BNB→USDT", first: { symbol: "SEIUSDT"}, second: { symbol: "SEIBNB"}, third: { symbol: "BNBUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["SEIUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: prices["SEIBNB"], firstSymbol: "SEIUSDT", secondSymbol: "SEIBNB", firstQuantity: 0.1, secondQuantity: 0.1, thirdQuantity: 0.001 }) },
     { pairName: "LDO→BTC→USDT", first: { symbol: "LDOUSDT"}, second: { symbol: "LDOBTC"}, third: { symbol: "BTCUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["LDOUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["LDOBTC"], firstSymbol: "LDOUSDT", secondSymbol: "LDOBTC", firstQuantity: 0.01, secondQuantity: 0.01, thirdQuantity: 0.00001 }) },
     { pairName: "SAND→BTC→USDT", first: { symbol: "SANDUSDT"}, second: { symbol: "SANDBTC"}, third: { symbol: "SANDUSDT" }, profitInPercentage: calculateProfit({ pricesFirstCoin: prices["SANDUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["SANDBTC"], firstSymbol: "SANDUSDT", secondSymbol: "SANDBTC", firstQuantity: 1, secondQuantity: 1, thirdQuantity: 0.00001 }) },
  ];

  // console.log(prices["PENGUSDT"]); перевірка передаваємих данних в об"єкт
  
  return (
    <div className={css.wrapperForCoinPair}>
      <div>
        <div className={css.blockOfAddButtons}>
          <button onClick={handleFilterPositivePairs}>
          {showOnlyPositive ? "Показати тільки позитивні" : "Показати також негативні"}
        </button>
        <button onClick={handleFilterShowOnlyMoreThen}>
          {showOnlyMoreThen ? "Показати пари < 0,2" : "Показати також > 0,2"}
        </button>
      </div>
        
      </div>
      <div className={css.currencyPairsOnBinance}>
        {pairs
          .map(({ pairName, profitInPercentage }) => (
        <CommonComponnt
          key={pairName} // Використовуємо pairName як унікальний ключ
          pairName={pairName}
          profitInPercentage={profitInPercentage}
          showOnlyPositive={showOnlyPositive}
          showOnlyMoreThen={showOnlyMoreThen}
        />
      ))} 
    </div>
    </div>
  );
}

export default App;