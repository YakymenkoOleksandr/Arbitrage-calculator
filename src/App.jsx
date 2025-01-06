import css from"./App.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchCryptoPrices } from "./redux/actions/actions.js";  //Підключається. якщо потрібно отримувати данні через http запити
import { CommonComponnt } from "./components/CommonComponent.jsx";
import {connectWebSocket} from "./serviceBinance/WebSocketService.js"

function App() {
  const dispatch = useDispatch();
  const { prices, error } = useSelector(
    (state) => state.bitcoin
  ); // Додаємо lastFetchTime
  let workingСapital = 100;
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
  ];

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
  }, []); // Викликається лише один раз при монтуванні компонента

  if (error) return <p>Error: {error}</p>;
  //  console.log(pricesBTCSOL, pricesETHSOL, pricesBNBSOL);

  // Масив даних для пар криптовалют
  const pairs = [
    { pairName: "BTC→ETH→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: prices['ETHBTC'] },
    { pairName: "BTC→BNB→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['BNBBTC'] },
    { pairName: "BTC→XRP→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['XRPUSDT'], pricesCoinToCoin: prices['XRPBTC'] },
    { pairName: "BTC→DOT→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['DOTUSDT'], pricesCoinToCoin: prices['DOTBTC'] },
    { pairName: "BTC→SOL→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['SOLUSDT'], pricesCoinToCoin: prices['SOLBTC'] },
    { pairName: "BTC→ADA→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['ADAUSDT'], pricesCoinToCoin: prices['ADABTC'] },
    { pairName: "BTC→TRX→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['TRXUSDT'], pricesCoinToCoin: prices['TRXBTC'] },
    { pairName: "BTC→AVAX→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['AVAXUSDT'], pricesCoinToCoin: prices['AVAXBTC'] },
    { pairName: "BTC→SUI→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['SUIUSDT'], pricesCoinToCoin: prices['SUIBTC'] },
    { pairName: "BTC→LINK→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['LINKUSDT'], pricesCoinToCoin: prices['LINKBTC'] },
    { pairName: "BTC→TON→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['TONUSDT'], pricesCoinToCoin: prices['TONBTC'] },
    { pairName: "BTC→DOGE→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['DOGEUSDT'], pricesCoinToCoin: prices['DOGEBTC'] },
    { pairName: "BTC→XLM→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['XLMUSDT'], pricesCoinToCoin: prices['XLMBTC'] },
    { pairName: "BTC→WBTC→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['WBTCUSDT'], pricesCoinToCoin: prices['WBTCBTC'] },
    { pairName: "BTC→HBAR→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['HBARUSDT'], pricesCoinToCoin: prices['HBARBTC']},
    { pairName: "BTC→BCH→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['BCHUSDT'], pricesCoinToCoin: prices['BCHBTC'] },
    { pairName: "BTC→UNI→USDT", pricesFirstCoin: prices['BTCUSDT'], pricesSecondCoin: prices['UNIUSDT'], pricesCoinToCoin: prices['UNIBTC'] },
    { pairName: "BTC→LTC→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["LTCUSDT"], pricesCoinToCoin: prices['LTCBTC'] },
    { pairName: "BTC→NEAR→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["NEARUSDT"], pricesCoinToCoin: prices['NEARBTC'] },
    { pairName: "BTC→ICP→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["ICPUSDT"], pricesCoinToCoin: prices['ICPBTC'] },
    { pairName: "BTC→APT→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["APTUSDT"], pricesCoinToCoin: prices['APTBTC'] },
    { pairName: "BTC→DAI→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["USDTDAI"], pricesCoinToCoin: 1 / prices['BTCDAI'] },
    { pairName: "BTC→AAVE→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["AAVEUSDT"], pricesCoinToCoin: prices['AAVEBTC'] },
    { pairName: "BTC→POL→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["POLUSDT"], pricesCoinToCoin: prices['POLBTC'] },
    { pairName: "BTC→ETC→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["ETCUSDT"], pricesCoinToCoin: prices['ETCBTC'] },
    { pairName: "BTC→RENDER→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["RENDERUSDT"], pricesCoinToCoin: prices['RENDERBTC'] },
    { pairName: "BTC→VET→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["VETUSDT"], pricesCoinToCoin: prices['VETBTC'] },
    { pairName: "BTC→ENA→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["ENAUSDT"], pricesCoinToCoin: prices['ENABTC'] },
    { pairName: "BTC→OM→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["OMUSDT"], pricesCoinToCoin: prices['OMBTC'] },
    { pairName: "BTC→FIL→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["FILUSDT"], pricesCoinToCoin: prices['FILBTC'] },
    { pairName: "BTC→ALGO→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["ALGOUSDT"], pricesCoinToCoin: prices['ALGOBTC'] },
    { pairName: "BTC→ATOM→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["ATOMUSDT"], pricesCoinToCoin: prices['ATOMBTC'] },
    { pairName: "BTC→OP→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["OPUSDT"], pricesCoinToCoin: prices['OPMBTC'] },
    { pairName: "BTC→STX→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["STXUSDT"], pricesCoinToCoin: prices['STXBTC'] },
    { pairName: "BTC→TIA→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["TIAUSDT"], pricesCoinToCoin: prices['TIABTC'] },
    { pairName: "BTC→INJ→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["INJUSDT"], pricesCoinToCoin: prices['INJBTC'] },
    { pairName: "BTC→THETA→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["THETAUSDT"], pricesCoinToCoin: prices['THETABTC'] },
    { pairName: "BTC→IMX→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["IMXUSDT"], pricesCoinToCoin: prices['IMXBTC'] },
    { pairName: "BTC→MOVE→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["MOVEUSDT"], pricesCoinToCoin: prices['MOVEBTC'] },
    { pairName: "BTC→GRT→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["GRTUSDT"], pricesCoinToCoin: prices['GRTBTC'] },
    { pairName: "BTC→WLD→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["WLDUSDT"], pricesCoinToCoin: prices['WLDBTC'] },
    { pairName: "BTC→FTM→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["FTMUSDT"], pricesCoinToCoin: prices['FTMBTC'] },
    { pairName: "BTC→WIF→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["WIFUSDT"], pricesCoinToCoin: prices['WIFBTC'] },
    { pairName: "BTC→SEI→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["SEIUSDT"], pricesCoinToCoin: prices['SEIBTC'] },
    { pairName: "BTC→LDO→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["LDOUSDT"], pricesCoinToCoin: prices['LDOBTC'] },
    { pairName: "BTC→SAND→USDT", pricesFirstCoin: prices["BTCUSDT"], pricesSecondCoin: prices["SANDUSDT"], pricesCoinToCoin: prices['SANDBTC'] },


    { pairName: "ETH→BTC→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 / prices['ETHBTC'] },
    { pairName: "ETH→BNB→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: prices['BNBETH'] },
    { pairName: "ETH→XRP→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['XRPUSDT'], pricesCoinToCoin: prices['XRPETH'] },
    { pairName: "ETH→DOT→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['DOTUSDT'], pricesCoinToCoin: prices['DOTETH'] },
    { pairName: "ETH→SOL→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['SOLUSDT'], pricesCoinToCoin: prices['SOLETH'] },
    { pairName: "ETH→ADA→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['ADAUSDT'], pricesCoinToCoin: prices['ADAETH'] },
    { pairName: "ETH→TRX→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['TRXUSDT'], pricesCoinToCoin: prices['TRXETH'] },
    { pairName: "ETH→AVAX→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['AVAXUSDT'], pricesCoinToCoin: prices['AVAXETH'] },
    { pairName: "ETH→LINK→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['LINKUSDT'], pricesCoinToCoin: prices['LINKETH'] },
    { pairName: "ETH→XLM→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['XLMUSDT'], pricesCoinToCoin: prices['XLMETH'] },
    { pairName: "ETH→WBTC→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['WBTCUSDT'], pricesCoinToCoin: prices['WBTCETH'] },
    { pairName: "ETH→UNI→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['UNIUSDT'], pricesCoinToCoin: prices['UNIETH'] },
    { pairName: "ETH→LTC→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['LTCUSDT'], pricesCoinToCoin: prices['LTCETH'] },
    { pairName: "ETH→NEAR→USDT", pricesFirstCoin: prices['ETHUSDT'], pricesSecondCoin: prices['NEARUSDT'], pricesCoinToCoin: prices['NEARETH'] },
    { pairName: "ETH→ICP→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["ICPUSDT"], pricesCoinToCoin: prices['ICPETH'] },
    { pairName: "ETH→APT→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["APTUSDT"], pricesCoinToCoin: prices['APTETH'] },
    { pairName: "ETH→DAI→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["USDTDAI"], pricesCoinToCoin: 1 / prices['ETHDAI'] },
    { pairName: "ETH→AAVE→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["AAVEUSDT"], pricesCoinToCoin: prices['AAVEETH'] },
    { pairName: "ETH→POL→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["POLUSDT"], pricesCoinToCoin: prices['POLETH'] },
    { pairName: "ETH→ETC→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["ETCUSDT"], pricesCoinToCoin: prices['ETCETH'] },
    { pairName: "ETH→VET→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["VETUSDT"], pricesCoinToCoin: prices['VETETH'] },
    { pairName: "ETH→FIL→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["FILUSDT"], pricesCoinToCoin: prices['FILETH'] },
    { pairName: "ETH→OP→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["OPUSDT"], pricesCoinToCoin: prices['OPETH'] },
    { pairName: "ETH→INJ→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["INJUSDT"], pricesCoinToCoin: prices['INJETH'] },
    { pairName: "ETH→GRT→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["GRTUSDT"], pricesCoinToCoin: prices['GRTETH'] },
    { pairName: "ETH→FTM→USDT", pricesFirstCoin: prices["ETHUSDT"], pricesSecondCoin: prices["FTMUSDT"], pricesCoinToCoin: prices['FTMETH'] },

    { pairName: "BNB→ETH→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 / prices['BNBETH'] },
    { pairName: "BNB→BTC→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 / prices['BNBBTC'] },
    { pairName: "BNB→XRP→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['XRPUSDT'], pricesCoinToCoin: prices['XRPBNB'] },
    { pairName: "BNB→DOT→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['DOTUSDT'], pricesCoinToCoin: prices['DOTBNB'] },
    { pairName: "BNB→SOL→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['SOLUSDT'], pricesCoinToCoin: prices['SOLBNB'] },
    { pairName: "BNB→ADA→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['ADAUSDT'], pricesCoinToCoin: prices['ADABNB'] },
    { pairName: "BNB→TRX→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['TRXUSDT'], pricesCoinToCoin: prices['TRXBNB'] },
    { pairName: "BNB→AVAX→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['AVAXUSDT'], pricesCoinToCoin: prices['AVAXBNB'] },
    { pairName: "BNB→SUI→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['SUIUSDT'], pricesCoinToCoin: prices['SUIBNB'] },
    { pairName: "BNB→LINK→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['LINKUSDT'], pricesCoinToCoin: prices['LINKBNB'] },
    { pairName: "BNB→HBAR→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['HBARUSDT'], pricesCoinToCoin: prices['HBARBNB'] },
    { pairName: "BNB→BCH→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['BCHUSDT'], pricesCoinToCoin: prices['BCHBNB'] },
    { pairName: "BNB→LTC→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['BCHUSDT'], pricesCoinToCoin: prices['BCHBNB'] },
    { pairName: "BNB→ETC→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['ETCUSDT'], pricesCoinToCoin: prices['ETCBNB'] },
    { pairName: "BNB→VET→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['VETUSDT'], pricesCoinToCoin: prices['VETBNB'] },
    { pairName: "BNB→ENA→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['ENAUSDT'], pricesCoinToCoin: prices['ENABNB'] },
    { pairName: "BNB→PENGU→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['PENGUUSDT'], pricesCoinToCoin: prices['PENGUBNB'] },
    { pairName: "BNB→STX→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['STXUSDT'], pricesCoinToCoin: prices['STXBNB'] },
    { pairName: "BNB→INJ→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['INJUSDT'], pricesCoinToCoin: prices['INJBNB'] },
    { pairName: "BNB→MOVE→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['MOVEUSDT'], pricesCoinToCoin: prices['MOVEBNB'] },
    { pairName: "BNB→FTM→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['FTMUSDT'], pricesCoinToCoin: prices['FTMBNB'] },
    { pairName: "BNB→SEI→USDT", pricesFirstCoin: prices['BNBUSDT'], pricesSecondCoin: prices['SEIUSDT'], pricesCoinToCoin: prices['SEIBNB'] },

    { pairName: "XRP→BNB→USDT", pricesFirstCoin: prices['XRPUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 / prices['XRPBNB'] },
    { pairName: "XRP→ETH→USDT", pricesFirstCoin: prices['XRPUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['XRPETH'] },
    { pairName: "XRP→BTC→USDT", pricesFirstCoin: prices['XRPUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['XRPBTC'] },
    { pairName: "DOT→BTC→USDT", pricesFirstCoin: prices['DOTUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['DOTBTC'] },
    { pairName: "DOT→ETH→USDT", pricesFirstCoin: prices['DOTUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['DOTETH'] },
    { pairName: "DOT→BNB→USDT", pricesFirstCoin: prices['DOTUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 /  prices['DOTBNB'] },
    { pairName: "SOL→BTC→USDT", pricesFirstCoin: prices['SOLUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['SOLBTC'] },
    { pairName: "SOL→ETH→USDT", pricesFirstCoin: prices['SOLUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['SOLETH'] },
    { pairName: "SOL→BNB→USDT", pricesFirstCoin: prices['SOLUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 /  prices['SOLBNB'] },
    { pairName: "ADA→BTC→USDT", pricesFirstCoin: prices['ADAUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 / prices['ADABTC'] },
    { pairName: "ADA→ETH→USDT", pricesFirstCoin: prices['ADAUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['ADAETH'] },
    { pairName: "ADA→BNB→USDT", pricesFirstCoin: prices['ADAUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 /  prices['ADABNB'] },
    { pairName: "TRX→BTC→USDT", pricesFirstCoin: prices['TRXUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['TRXBTC'] },
    { pairName: "TRX→ETH→USDT", pricesFirstCoin: prices['TRXUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['TRXETH'] },
    { pairName: "TRX→BNB→USDT", pricesFirstCoin: prices['TRXUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 /  prices['TRXBNB'] },
    { pairName: "AVAX→BTC→USDT", pricesFirstCoin: prices['AVAXUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['AVAXBTC'] },
    { pairName: "AVAX→ETH→USDT", pricesFirstCoin: prices['AVAXUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['AVAXETH'] },
    { pairName: "AVAX→BNB→USDT", pricesFirstCoin: prices['AVAXUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 /  prices['AVAXBNB'] },
    { pairName: "SUI→BTC→USDT", pricesFirstCoin: prices['SUIUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['SUIBTC'] },
    { pairName: "SUI→BNB→USDT", pricesFirstCoin: prices['SUIUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 /  prices['SUIBNB'] },
    { pairName: "LINK→BTC→USDT", pricesFirstCoin: prices['LINKUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['LINKBTC'] },
    { pairName: "LINK→ETH→USDT", pricesFirstCoin: prices['LINKUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['LINKETH'] },
    { pairName: "LINK→BNB→USDT", pricesFirstCoin: prices['LINKUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 /  prices['LINKBNB'] },
    { pairName: "TON→BTC→USDT", pricesFirstCoin: prices['TONUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['TONBTC'] },
    { pairName: "SHIB→DOGE→USDT", pricesFirstCoin: prices['SHIBUSDT'], pricesSecondCoin: prices['DOGEUSDT'], pricesCoinToCoin: 1 /   prices['SHIBDOGE'] },
    { pairName: "DOGE→SHIB→USDT", pricesFirstCoin: prices['DOGEUSDT'], pricesSecondCoin: prices['SHIBUSDT'], pricesCoinToCoin: prices['SHIBDOGE'] },
    { pairName: "DOGE→BTC→USDT", pricesFirstCoin: prices['DOGEUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['DOGEBTC'] },
    { pairName: "XLM→BTC→USDT", pricesFirstCoin: prices['XLMUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['XLMBTC'] },
    { pairName: "XLM→ETH→USDT", pricesFirstCoin: prices['XLMUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['XLMETH'] },
    { pairName: "WBTC→BTC→USDT", pricesFirstCoin: prices['WBTCUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['WBTCBTC'] },
    { pairName: "WBTC→ETH→USDT", pricesFirstCoin: prices['WBTCUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['WBTCETH'] },
    { pairName: "HBAR→BTC→USDT", pricesFirstCoin: prices['HBARUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['HBARBTC'] },
    { pairName: "HBAR→BNB→USDT", pricesFirstCoin: prices['HBARUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 /  prices['HBARBNB'] },
    { pairName: "BCH→BTC→USDT", pricesFirstCoin: prices['BCHUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['BCHBTC'] },
    { pairName: "BCH→BNB→USDT", pricesFirstCoin: prices['BCHUSDT'], pricesSecondCoin: prices['BNBUSDT'], pricesCoinToCoin: 1 /  prices['BCHBNB'] },
    { pairName: "UNI→BTC→USDT", pricesFirstCoin: prices['UNIUSDT'], pricesSecondCoin: prices['BTCUSDT'], pricesCoinToCoin: 1 /  prices['UNIBTC'] },
    { pairName: "UNI→ETH→USDT", pricesFirstCoin: prices['UNIUSDT'], pricesSecondCoin: prices['ETHUSDT'], pricesCoinToCoin: 1 /  prices['UNIETH'] },
    { pairName: "LTC→BTC→USDT", pricesFirstCoin: prices["LTCUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["LTCBTC"] },
    { pairName: "LTC→ETH→USDT", pricesFirstCoin: prices["LTCUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["LTCETH"] },
    { pairName: "LTC→BNB→USDT", pricesFirstCoin: prices["LTCUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: 1 / prices["LTCBNB"] },
    { pairName: "NEAR→BTC→USDT", pricesFirstCoin: prices["NEARUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["NEARBTC"] },
    { pairName: "NEAR→ETH→USDT", pricesFirstCoin: prices["NEARUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["NEARETH"] },
    { pairName: "ICP→BTC→USDT", pricesFirstCoin: prices["ICPUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["ICPBTC"] },
    { pairName: "ICP→ETH→USDT", pricesFirstCoin: prices["ICPUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["ICPETH"] },
    { pairName: "APT→BTC→USDT", pricesFirstCoin: prices["APTUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["APTBTC"] },
    { pairName: "APT→ETH→USDT", pricesFirstCoin: prices["APTUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["APTETH"] },
    { pairName: "DAI→BTC→USDT", pricesFirstCoin: prices["USDTDAI"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: prices["BTCDAI"] },
    { pairName: "DAI→ETH→USDT", pricesFirstCoin: prices["USDTDAI"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: prices["ETHDAI"] },
    { pairName: "AAVE→BTC→USDT", pricesFirstCoin: prices["AAVEUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["AAVEBTC"] },
    { pairName: "AAVE→ETH→USDT", pricesFirstCoin: prices["AAVEUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["AAVEETH"] },
    { pairName: "POL→BTC→USDT", pricesFirstCoin: prices["POLUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["POLBTC"] },
    { pairName: "POL→ETH→USDT", pricesFirstCoin: prices["POLUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["POLETH"] },
    { pairName: "ETC→BTC→USDT", pricesFirstCoin: prices["ETCUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["ETCBTC"] },
    { pairName: "ETC→ETH→USDT", pricesFirstCoin: prices["ETCUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["ETCETH"] },
    { pairName: "ETC→BNB→USDT", pricesFirstCoin: prices["ETCUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: 1 / prices["ETCBNB"] },
    { pairName: "RENDER→BNB→USDT", pricesFirstCoin: prices["RENDERUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["RENDERBTC"] },
    { pairName: "ENA→BTC→USDT", pricesFirstCoin: prices["ENAUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["ENABTC"] },
    { pairName: "ENA→BNB→USDT", pricesFirstCoin: prices["ENAUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: 1 / prices["ENABNB"] },
    { pairName: "OM→BTC→USDT", pricesFirstCoin: prices["OMUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["OMBTC"] },
    { pairName: "FIL→BTC→USDT", pricesFirstCoin: prices["FILUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["FILBTC"] },
    { pairName: "FIL→ETH→USDT", pricesFirstCoin: prices["FILUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["FILETH"] },
    { pairName: "ALGO→BTC→USDT", pricesFirstCoin: prices["ALGOUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["ALGOBTC"] },
    { pairName: "ATOM→BTC→USDT", pricesFirstCoin: prices["ATOMUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["ATOMBTC"] },
    { pairName: "OP→BTC→USDT", pricesFirstCoin: prices["OPUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["OPBTC"] },
    { pairName: "OP→ETH→USDT", pricesFirstCoin: prices["OPUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["OPETH"] },
    { pairName: "PENGU→BNB→USDT", pricesFirstCoin: prices["PENGUUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: 1 / prices["PENGUBNB"] },
    { pairName: "STX→BTC→USDT", pricesFirstCoin: prices["STXUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["STXBTC"] },
    { pairName: "STX→BNB→USDT", pricesFirstCoin: prices["STXUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: 1 / prices["STXBNB"] },
    { pairName: "TIA→BTC→USDT", pricesFirstCoin: prices["TIAUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["TIABTC"] },
    { pairName: "INJ→BTC→USDT", pricesFirstCoin: prices["INJUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["INJBTC"] },
    { pairName: "INJ→ETH→USDT", pricesFirstCoin: prices["INJUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["INJETH"] },
    { pairName: "INJ→BNB→USDT", pricesFirstCoin: prices["INJUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: 1 / prices["INJBNB"] },
    { pairName: "THETA→BTC→USDT", pricesFirstCoin: prices["THETAUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["THETABTC"] },
    { pairName: "IMX→BTC→USDT", pricesFirstCoin: prices["IMXUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["IMXBTC"] },
    { pairName: "MOVE→BTC→USDT", pricesFirstCoin: prices["MOVEUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["MOVEBTC"] },
    { pairName: "MOVE→BNB→USDT", pricesFirstCoin: prices["MOVEUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: 1 / prices["MOVEBNB"] },
    { pairName: "GRT→BTC→USDT", pricesFirstCoin: prices["GRTUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["GRTBTC"] },
    { pairName: "GRT→ETH→USDT", pricesFirstCoin: prices["GRTUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["GRTETH"] },
    { pairName: "WLD→BTC→USDT", pricesFirstCoin: prices["WLDUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["WLDBTC"] },
    { pairName: "FTM→BTC→USDT", pricesFirstCoin: prices["FTMUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["FTMBTC"] },
    { pairName: "FTM→ETH→USDT", pricesFirstCoin: prices["FTMUSDT"], pricesSecondCoin: prices["ETHUSDT"], pricesCoinToCoin: 1 / prices["FTMETH"] },
    { pairName: "FTM→BNB→USDT", pricesFirstCoin: prices["FTMUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: 1 / prices["FTMBNB"] },
    { pairName: "WIF→BTC→USDT", pricesFirstCoin: prices["WIFUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["WIFBTC"] },
    { pairName: "SEI→BTC→USDT", pricesFirstCoin: prices["SEIUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["SEIBTC"] },
    { pairName: "SEI→BNB→USDT", pricesFirstCoin: prices["SEIUSDT"], pricesSecondCoin: prices["BNBUSDT"], pricesCoinToCoin: 1 / prices["SEIBNB"] },
    { pairName: "LDO→BTC→USDT", pricesFirstCoin: prices["LDOUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["LDOBTC"] },
    { pairName: "SAND→BTC→USDT", pricesFirstCoin: prices["SANDUSDT"], pricesSecondCoin: prices["BTCUSDT"], pricesCoinToCoin: 1 / prices["SANDBTC"] },
  ];

  // console.log(prices["PENGUSDT"]); перевірка передаваємих данних в об"єкт
  
  return (
    <div className={css.wrapperForCoinPair}>
      <div className={css.currencyPairsOnBinance}>
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
    </div>
  );
}

export default App;