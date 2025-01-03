function USDT_ETH_BNB({
    workingСapital,
    pricesBNBUSDT,
    pricesETHUSDT,
    pricesBNBETH
}) {

    
  let summinusСommission = workingСapital - workingСapital * 0.00075; // Сума з вирахуванням першої комісії
  let amountOfBNBPurchased = summinusСommission / pricesETHUSDT; // Сума купленої першої валюти за оборотний капітал з відрахованою комісіє
    
  let summinusСommission2 =
    amountOfBNBPurchased - amountOfBNBPurchased * 0.00075; // Комісія яка знімається з BNB при купівлі іншої валюти
  let amountOfEtheriumPurchased = summinusСommission2 / pricesBNBETH; // Сума обміну першої валюти на другу валюту

  let summinusСommission3 =
    amountOfEtheriumPurchased - amountOfEtheriumPurchased * 0.00075; //Комісія яка знімається з валюти перед покупкою
  let sumUSDT = summinusСommission3 * pricesBNBUSDT;
    
  let profitInPercentage =
    Math.round(((sumUSDT / workingСapital) * 100 - 100) * 100) / 100;


  return (
        <p>ETH BNB USDT {profitInPercentage}% </p>
  );
}

export default USDT_ETH_BNB;