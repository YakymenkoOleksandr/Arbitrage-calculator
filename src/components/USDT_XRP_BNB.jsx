function USDT_XRP_BNB({
  workingСapital,
  pricesBNBUSDT,
  pricesXRPUSDT,
  pricesBNBXRP,
}) {
  let summinusСommission = workingСapital - workingСapital * 0.00075; // Сума з вирахуванням першої комісії
  let amountOfXRPPurchased = summinusСommission / pricesXRPUSDT; // Сума купленої першої валюти за оборотний капітал з відрахованою комісіє

  let summinusСommission2 =
    amountOfXRPPurchased - amountOfXRPPurchased * 0.00075; // Комісія яка знімається з BNB при купівлі іншої валюти
  let amountOfBNBPurchased = summinusСommission2 / pricesBNBXRP; // Сума обміну першої валюти на другу валюту

  let summinusСommission3 =
    amountOfBNBPurchased - amountOfBNBPurchased * 0.00075; //Комісія яка знімається з валюти перед покупкою
  let sumUSDT = summinusСommission3 * pricesBNBUSDT;

  let profitInPercentage =
    Math.round(((sumUSDT / workingСapital) * 100 - 100) * 100) / 100;

  return <p>XRP BNB  USDT {profitInPercentage}% </p>;
}

export default USDT_XRP_BNB;
