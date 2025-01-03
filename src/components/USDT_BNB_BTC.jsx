function USDT_BNB_BTC({
    workingСapital,
    pricesBNBUSDT,
    pricesBTCUSDT,
    pricesBTCBNB,
}) {
    
  let summinusСommission = workingСapital - workingСapital * 0.00075; // Сума з вирахуванням першої комісії
  let amountOfBNBPurchased = summinusСommission / pricesBNBUSDT; // Сума купленої першої валюти за оборотний капітал з відрахованою комісіє
    
  let summinusСommission2 =
    amountOfBNBPurchased - amountOfBNBPurchased * 0.00075; // Комісія яка знімається з BNB при купівлі іншої валюти
  let amountOfEtheriumPurchased = summinusСommission2 / pricesBTCBNB; // Сума обміну першої валюти на другу валюту

  let summinusСommission3 =
    amountOfEtheriumPurchased - amountOfEtheriumPurchased * 0.00075; //Комісія яка знімається з валюти перед покупкою
  let sumUSDT = summinusСommission3 * pricesBTCUSDT;
    
  let profitInPercentage =
    Math.round(((sumUSDT / workingСapital) * 100 - 100) * 100) / 100;


  return (
        <p>Валютна пара BNB BTC USDT {profitInPercentage}% </p>
  );
}

export default USDT_BNB_BTC;