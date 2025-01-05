import css from"./App.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCryptoPrices } from "./redux/actions/actions.js";
import { CommonComponnt } from "./components/CommonComponent.jsx";
import {connectWebSocket} from "./serviceBinance/WebSocketService.js"

function App() {
  const dispatch = useDispatch();
  const { prices, error, lastFetchTime } = useSelector(
    (state) => state.bitcoin
  ); // Додаємо lastFetchTime
  let workingСapital = 1;
 // console.log(prices);
  

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
  ];

  /*useEffect(() => {
    dispatch(fetchCryptoPrices(symbols));
    // Викликаємо fetchCryptoPrices для всіх пар одночасно
    const interval = setInterval(() => {
      dispatch(fetchCryptoPrices(symbols));
    }, 10000);

    // Очищення інтервалу при розмонтуванні компонента
    return () => clearInterval(interval);
  }, [dispatch]);*/
  

  // Другий useEffect: Підключення до WebSocket
  useEffect(() => {
    // Викликаємо функцію для підключення до WebSocket
    const ws = connectWebSocket(symbols, dispatch);

    return () => {
      // Закриваємо WebSocket при розмонтуванні компонента
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []); // Викликається лише один раз при монтуванні компонента

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
  const pricesDOTBNB = prices["DOTBNB"];
  const pricesSOLUSDT = prices["SOLUSDT"];
  const pricesSOLBTC = prices["SOLBTC"];
  const pricesSOLETH = prices["SOLETH"];
  const pricesSOLBNB = prices["SOLBNB"];
  const pricesADAUSDT = prices["ADAUSDT"];
  const pricesADABTC = prices["ADABTC"];
  const pricesADAETH = prices["ADAETH"];
  const pricesADABNB = prices["ADABNB"];
  const pricesTRXUSDT = prices["TRXUSDT"];
  const pricesTRXBTC = prices["TRXBTC"];
  const pricesTRXETH = prices["TRXETH"];
  const pricesTRXBNB = prices["TRXBNB"];
  const pricesAVAXUSDT = prices["AVAXUSDT"];
  const pricesAVAXBTC = prices["AVAXBTC"];
  const pricesAVAXETH = prices["AVAXETH"];
  const pricesAVAXBNB = prices["AVAXBNB"];
  const pricesSUIUSDT = prices["SUIUSDT"];
  const pricesSUIBTC = prices["SUIBTC"];
  const pricesSUIBNB = prices["SUIBNB"];
  const pricesLINKUSDT = prices["LINKUSDT"];
  const pricesLINKBTC = prices["LINKBTC"];
  const pricesLINKETH = prices["LINKETH"];
  const pricesLINKBNB = prices["LINKBNB"];
  const pricesTONUSDT = prices["TONUSDT"];
  const pricesTONBTC = prices["TONBTC"];
  const pricesSHIBUSDT = prices["SHIBUSDT"];
  const pricesDOGEUSDT = prices["DOGEUSDT"];
  const pricesSHIBDOGE = prices["SHIBDOGE"];
  const pricesDOGEBTC = prices["DOGEBTC"];
  const pricesXLMUSDT = prices["XLMUSDT"];
  const pricesXLMBTC = prices["XLMBTC"];
  const pricesXLMETH = prices["XLMETH"];
  const pricesWBTCUSDT = prices["XLMUSDT"];
  const pricesWBTCBTC = prices["XLMBTC"];
  const pricesWBTCETH = prices["XLMETH"];
  const pricesHBARUSDT = prices["HBARUSDT"];
  const pricesHBARBTC = prices["HBARBTC"];
  const pricesHBARBNB = prices["HBARBNB"];
  const pricesBCHUSDT = prices["BCHUSDT"];
  const pricesBCHBTC = prices["BCHBTC"];
  const pricesBCHBNB = prices["BCHBNB"];
  const pricesUNIUSDT = prices["UNIUSDT"];
  const pricesUNIBTC = prices["UNIBTC"];
  const pricesUNIETH = prices["UNIETH"];

 // console.log(pricesADAUSDT, pricesADABTC, pricesADAETH, pricesADABNB);
  
  const pricesBTCETH = 1 / prices["ETHBTC"];
  const pricesETHBNB = 1 / prices["BNBETH"];
  const pricesBTCBNB = 1 / prices["BNBBTC"];
  const pricesBNBXRP = 1 / prices["XRPBNB"];
  const pricesETHXRP = 1 / prices["XRPETH"];
  const pricesBTCXRP = 1 / prices["XRPBTC"];
  const pricesBTCDOT = 1 / prices["DOTBTC"];
  const pricesETHDOT = 1 / prices["DOTETH"];
  const pricesBNBDOT = 1 / prices["DOTBNB"];
  const pricesBTCSOL = 1 / prices["SOLBTC"];
  const pricesETHSOL = 1 / prices["SOLETH"];
  const pricesBNBSOL = 1 / prices["SOLBNB"];
  const pricesBTCADA = 1 /  prices["ADABTC"];
  const pricesETHADA = 1 / prices["ADAETH"];
  const pricesBNBADA = 1 / prices["ADABNB"];
  const pricesBTCTRX = 1 / prices["TRXBTC"];
  const pricesETHTRX = 1 / prices["TRXETH"];
  const pricesBNBTRX = 1 / prices["TRXBNB"];
  const pricesBTCAVAX = 1 /  prices["AVAXBTC"];
  const pricesETHAVAX = 1 /  prices["AVAXETH"];
  const pricesBNBAVAX = 1 / prices["AVAXBNB"];
  const pricesBTCSUI = 1 /  prices["SUIBTC"];
  const pricesBNBSUI = 1 / prices["SUIBNB"];
  const pricesBTCLINK = 1 /  prices["LINKBTC"];
  const pricesETHLINK = 1 /  prices["LINKETH"];
  const pricesBNBLINK = 1 / prices["LINKBNB"];
  const pricesBTCTON = 1 / prices["TONBTC"];
  const pricesDOGESHIB = 1 / prices["SHIBDOGE"];
  const pricesBTCDOGE = 1 / prices["DOGEBTC"];
  const pricesBTCXLM = 1 /  prices["XLMBTC"];
  const pricesETHXLM = 1 / prices["XLMETH"];
  const pricesBTCWBTC = 1 / prices["XLMBTC"];
  const pricesETHWBTC = 1 / prices["XLMETH"];
  const pricesBTCHBAR = 1 / prices["HBARBTC"];
  const pricesBNBHBAR = 1 / prices["HBARBNB"];
  const pricesBTCBCH = 1 /  prices["BCHBTC"];
  const pricesBNBBCH = 1 / prices["BCHBNB"];
  const pricesBTCUNI = 1 / prices["UNIBTC"];
  const pricesETHUNI = 1 / prices["UNIETH"];

  //  console.log(pricesBTCSOL, pricesETHSOL, pricesBNBSOL);

  // Масив даних для пар криптовалют
  const pairs = [
    { pairName: "BTC→ETH→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHBTC },
    { pairName: "BTC→BNB→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBBTC },
    { pairName: "BTC→XRP→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesXRPUSDT, pricesCoinToCoin: pricesXRPBTC },
    { pairName: "BTC→DOT→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesDOTUSDT, pricesCoinToCoin: pricesDOTBTC },
    { pairName: "BTC→SOL→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesSOLUSDT, pricesCoinToCoin: pricesSOLBTC },
    { pairName: "BTC→ADA→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesADAUSDT, pricesCoinToCoin: pricesADABTC },
    { pairName: "BTC→TRX→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesTRXUSDT, pricesCoinToCoin: pricesTRXBTC },
    { pairName: "BTC→AVAX→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesAVAXUSDT, pricesCoinToCoin: pricesAVAXBTC },
    { pairName: "BTC→SUI→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesSUIUSDT, pricesCoinToCoin: pricesSUIBTC },
    { pairName: "BTC→LINK→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesLINKUSDT, pricesCoinToCoin: pricesLINKBTC },
    { pairName: "BTC→TON→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesTONUSDT, pricesCoinToCoin: pricesTONBTC },
    { pairName: "BTC→DOGE→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesDOGEUSDT, pricesCoinToCoin: pricesDOGEBTC },
    { pairName: "BTC→XLM→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesXLMUSDT, pricesCoinToCoin: pricesXLMBTC },
    { pairName: "BTC→WBTC→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesWBTCUSDT, pricesCoinToCoin: pricesWBTCBTC },
    { pairName: "BTC→HBAR→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesHBARUSDT, pricesCoinToCoin: pricesHBARBTC },
    { pairName: "BTC→BCH→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesBCHUSDT, pricesCoinToCoin: pricesBCHBTC },
    { pairName: "BTC→UNI→USDT", pricesFirstCoin: pricesBTCUSDT, pricesSecondCoin: pricesUNIUSDT, pricesCoinToCoin: pricesUNIBTC },

    { pairName: "ETH→BTC→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCETH },
    { pairName: "ETH→BNB→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBETH },
    { pairName: "ETH→XRP→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesXRPUSDT, pricesCoinToCoin: pricesXRPETH },
    { pairName: "ETH→DOT→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesDOTUSDT, pricesCoinToCoin: pricesDOTETH },
    { pairName: "ETH→SOL→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesSOLUSDT, pricesCoinToCoin: pricesSOLETH },
    { pairName: "ETH→ADA→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesADAUSDT, pricesCoinToCoin: pricesADAETH },
    { pairName: "ETH→TRX→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesTRXUSDT, pricesCoinToCoin: pricesTRXETH },
    { pairName: "ETH→AVAX→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesAVAXUSDT, pricesCoinToCoin: pricesAVAXETH },
    { pairName: "ETH→LINK→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesLINKUSDT, pricesCoinToCoin: pricesLINKETH },
    { pairName: "ETH→XLM→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesXLMUSDT, pricesCoinToCoin: pricesXLMETH },
    { pairName: "ETH→WBTC→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesWBTCUSDT, pricesCoinToCoin: pricesWBTCETH },
    { pairName: "ETH→UNI→USDT", pricesFirstCoin: pricesETHUSDT, pricesSecondCoin: pricesUNIUSDT, pricesCoinToCoin: pricesUNIETH },

    { pairName: "BNB→ETH→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHBNB },
    { pairName: "BNB→BTC→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCBNB },
    { pairName: "BNB→XRP→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesXRPUSDT, pricesCoinToCoin: pricesXRPBNB },
    { pairName: "BNB→DOT→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesDOTUSDT, pricesCoinToCoin: pricesDOTBNB },
    { pairName: "BNB→SOL→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesSOLUSDT, pricesCoinToCoin: pricesSOLBNB },
    { pairName: "BNB→ADA→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesADAUSDT, pricesCoinToCoin: pricesADABNB },
    { pairName: "BNB→TRX→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesTRXUSDT, pricesCoinToCoin: pricesTRXBNB },
    { pairName: "BNB→AVAX→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesAVAXUSDT, pricesCoinToCoin: pricesAVAXBNB },
    { pairName: "BNB→SUI→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesSUIUSDT, pricesCoinToCoin: pricesSUIBNB },
    { pairName: "BNB→LINK→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesLINKUSDT, pricesCoinToCoin: pricesLINKBNB },
    { pairName: "BNB→HBAR→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesHBARUSDT, pricesCoinToCoin: pricesHBARBNB },
    { pairName: "BNB→BCH→USDT", pricesFirstCoin: pricesBNBUSDT, pricesSecondCoin: pricesBCHUSDT, pricesCoinToCoin: pricesBCHBNB },
   
    { pairName: "XRP→BNB→USDT", pricesFirstCoin: pricesXRPUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBXRP },
    { pairName: "XRP→ETH→USDT", pricesFirstCoin: pricesXRPUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHXRP },
    { pairName: "XRP→BTC→USDT", pricesFirstCoin: pricesXRPUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCXRP },
    { pairName: "DOT→BTC→USDT", pricesFirstCoin: pricesDOTUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCDOT },
    { pairName: "DOT→ETH→USDT", pricesFirstCoin: pricesDOTUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHDOT },
    { pairName: "DOT→BNB→USDT", pricesFirstCoin: pricesDOTUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBDOT },
    { pairName: "SOL→BTC→USDT", pricesFirstCoin: pricesSOLUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCSOL },
    { pairName: "SOL→ETH→USDT", pricesFirstCoin: pricesSOLUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHSOL },
    { pairName: "SOL→BNB→USDT", pricesFirstCoin: pricesSOLUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBSOL },
    { pairName: "ADA→BTC→USDT", pricesFirstCoin: pricesADAUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCADA },
    { pairName: "ADA→ETH→USDT", pricesFirstCoin: pricesADAUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHADA },
    { pairName: "ADA→BNB→USDT", pricesFirstCoin: pricesADAUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBADA },
    { pairName: "TRX→BTC→USDT", pricesFirstCoin: pricesTRXUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCTRX },
    { pairName: "TRX→ETH→USDT", pricesFirstCoin: pricesTRXUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHTRX },
    { pairName: "TRX→BNB→USDT", pricesFirstCoin: pricesTRXUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBTRX },
    { pairName: "AVAX→BTC→USDT", pricesFirstCoin: pricesAVAXUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCAVAX },
    { pairName: "AVAX→ETH→USDT", pricesFirstCoin: pricesAVAXUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHAVAX },
    { pairName: "AVAX→BNB→USDT", pricesFirstCoin: pricesAVAXUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBAVAX },
    { pairName: "SUI→BTC→USDT", pricesFirstCoin: pricesSUIUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCSUI },
    { pairName: "SUI→BNB→USDT", pricesFirstCoin: pricesSUIUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBSUI },
    { pairName: "LINK→BTC→USDT", pricesFirstCoin: pricesLINKUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCLINK },
    { pairName: "LINK→ETH→USDT", pricesFirstCoin: pricesLINKUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHLINK },
    { pairName: "LINK→BNB→USDT", pricesFirstCoin: pricesLINKUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBLINK },
    { pairName: "TON→BTC→USDT", pricesFirstCoin: pricesTONUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCTON },
    { pairName: "SHIB→DOGE→USDT", pricesFirstCoin: pricesSHIBUSDT, pricesSecondCoin: pricesDOGEUSDT, pricesCoinToCoin:  pricesDOGESHIB },
    { pairName: "DOGE→SHIB→USDT", pricesFirstCoin: pricesDOGEUSDT, pricesSecondCoin: pricesSHIBUSDT, pricesCoinToCoin: pricesSHIBDOGE },
    { pairName: "DOGE→BTC→USDT", pricesFirstCoin: pricesDOGEUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCDOGE },
    { pairName: "XLM→BTC→USDT", pricesFirstCoin: pricesXLMUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCXLM },
    { pairName: "XLM→ETH→USDT", pricesFirstCoin: pricesXLMUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHXLM },
    { pairName: "WBTC→BTC→USDT", pricesFirstCoin: pricesWBTCUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCWBTC },
    { pairName: "WBTC→ETH→USDT", pricesFirstCoin: pricesWBTCUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHWBTC },
    { pairName: "HBAR→BTC→USDT", pricesFirstCoin: pricesHBARUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCHBAR },
    { pairName: "HBAR→BNB→USDT", pricesFirstCoin: pricesHBARUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBHBAR },
    { pairName: "BCH→BTC→USDT", pricesFirstCoin: pricesBCHUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCBCH },
    { pairName: "BCH→BNB→USDT", pricesFirstCoin: pricesBCHUSDT, pricesSecondCoin: pricesBNBUSDT, pricesCoinToCoin: pricesBNBBCH },
    { pairName: "UNI→BTC→USDT", pricesFirstCoin: pricesUNIUSDT, pricesSecondCoin: pricesBTCUSDT, pricesCoinToCoin: pricesBTCUNI },
    { pairName: "UNI→ETH→USDT", pricesFirstCoin: pricesUNIUSDT, pricesSecondCoin: pricesETHUSDT, pricesCoinToCoin: pricesETHUNI },
    
  ];

  return (
    <div className={css.currencyPairsOnBinance}>
      <p>
        Останне оновлення: <br /> {lastFetchTime}
      </p>
      {pairs.map(({ pairName, pricesFirstCoin, pricesSecondCoin, pricesCoinToCoin }) => (
        <CommonComponnt
          key={pairName} // Використовуємо pairName як унікальний ключ
          pairName={pairName}
          workingСapital={workingСapital}
          pricesFirstCoin={pricesFirstCoin}
          pricesSecondCoin={pricesSecondCoin}
          pricesCoinToCoin={pricesCoinToCoin}
        />
      ))}
    </div>
  );
}

export default App;