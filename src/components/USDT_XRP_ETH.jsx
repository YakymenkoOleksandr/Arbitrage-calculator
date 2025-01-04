function USDT_XRP_ETH({ workingСapital, pricesETHUSDT, pricesXRPUSDT, pricesETHXRP }) {
  // Функція для обчислення суми після вирахування комісії
  const deductCommission = (amount) => amount - amount * 0.00075;

  // Розрахунки
  const amountAfterFirstTrade = deductCommission(workingСapital) / pricesXRPUSDT; // Купівля XRP
  const amountAfterSecondTrade = deductCommission(amountAfterFirstTrade) / pricesETHXRP; // Обмін XRP на ETH
  const finalAmountUSDT = deductCommission(amountAfterSecondTrade) * pricesETHUSDT; // Конвертація ETH в USDT

  // Розрахунок прибутку
  const profitInPercentage = Math.round(((finalAmountUSDT / workingСapital) * 100 - 100) * 100) / 100;

  return <p>XRP ETH USDT {profitInPercentage}%</p>;
}

export default USDT_XRP_ETH;