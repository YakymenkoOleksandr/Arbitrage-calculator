function USDT_BTC_XRP({
  workingСapital,
  pricesBTCUSDT,
  pricesXRPUSDT,
  picesXRPBTC,
}) {
  let summinusСommission = workingСapital - workingСapital * 0.00075; // Сума з вирахуванням першої комісії
  let amountOfPurchased1 = summinusСommission / pricesBTCUSDT; // Сума купленої першої валюти за оборотний капітал з відрахованою комісіє
    
    
  let summinusСommission2 =
    amountOfPurchased1 - amountOfPurchased1 * 0.00075; // Комісія яка знімається з BNB при купівлі іншої валюти
  let amountOfPurchased2 = summinusСommission2 / picesXRPBTC; // Сума обміну першої валюти на другу валюту
    
  let summinusСommission3 =
    amountOfPurchased2 - amountOfPurchased2 * 0.00075; //Комісія яка знімається з валюти перед покупкою
  let sumUSDT = summinusСommission3 * pricesXRPUSDT;

    
  let profitInPercentage =
    Math.round(((sumUSDT / workingСapital) * 100 - 100) * 100) / 100;

  return <p>BTC XRP  USDT {profitInPercentage}% </p>;
}

export default USDT_BTC_XRP;