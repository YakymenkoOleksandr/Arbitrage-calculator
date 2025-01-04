function USDT_DOT_BTC({ workingСapital, pricesDOTUSDT, pricesBTCUSDT, pricesBTCDOT }) {
  
  // Функція для обчислення суми після вирахування комісії
  const deductCommission = (amount) => amount - amount * 0.00075;

  // Розрахунки
  const amountAfterFirstTrade = deductCommission(workingСapital) / pricesDOTUSDT; // Купівля першої валюти
  const amountAfterSecondTrade = deductCommission(amountAfterFirstTrade) / pricesBTCDOT; // Обмін першої валюти на другу
  const finalAmountUSDT = deductCommission(amountAfterSecondTrade) * pricesBTCUSDT; // Продаж другої валюти

  
  // Розрахунок прибутку
  const profitInPercentage = Math.round(((finalAmountUSDT / workingСapital) * 100 - 100) * 100) / 100;

  return <p>XRP ETH USDT {profitInPercentage}%</p>;
}

export default USDT_DOT_BTC;