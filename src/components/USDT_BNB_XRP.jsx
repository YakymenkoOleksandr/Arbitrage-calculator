function USDT_BNB_XRP({
  workingСapital,
  pricesBNBUSDT,
  pricesXRPUSDT,
  picesXRPBNB,
}) {
  let summinusСommission = workingСapital - workingСapital * 0.00075; // Сума з вирахуванням першої комісії
  let amountOfBNBPurchased = summinusСommission / pricesBNBUSDT; // Сума купленої першої валюти за оборотний капітал з відрахованою комісіє

  let summinusСommission2 =
    amountOfBNBPurchased - amountOfBNBPurchased * 0.00075; // Комісія яка знімається з BNB при купівлі іншої валюти
  let amountOfXRPPurchased = summinusСommission2 / picesXRPBNB; // Сума обміну першої валюти на другу валюту

  let summinusСommission3 =
    amountOfXRPPurchased - amountOfXRPPurchased * 0.00075; //Комісія яка знімається з валюти перед покупкою
  let sumUSDT = summinusСommission3 * pricesXRPUSDT;

  let profitInPercentage =
    Math.round(((sumUSDT / workingСapital) * 100 - 100) * 100) / 100;

  return <p>BNB XRP USDT {profitInPercentage}% </p>;
}

export default USDT_BNB_XRP;
