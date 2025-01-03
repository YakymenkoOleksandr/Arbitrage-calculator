function USDT_BTC_ETH({
    workingСapital,
    pricesBTCUSDT,
    pricesETHUSDT,
    pricesETHBTC
}) {

    
  let summinusСommission = workingСapital - workingСapital * 0.00075; // Сума обміну з вирахуванням комісії
  let amountOfBitcoinsPurchased = summinusСommission / pricesBTCUSDT; // Сума куплених біткоінів за оборотний капітал
    
  let summinusСommission2 =
    amountOfBitcoinsPurchased - amountOfBitcoinsPurchased * 0.00075; // Комісія яка знімається з біткоїна при купівлі іншої валюти
  let amountOfEtheriumPurchased = summinusСommission2 / pricesETHBTC; // Сума обміну BTC на ETH

  let summinusСommission3 =
    amountOfEtheriumPurchased - amountOfEtheriumPurchased * 0.00075; //Комісія яка знімається з валюти перед покупкою
  let sumUSDT = summinusСommission3 * pricesETHUSDT;
    
  let profitInPercentage =
    Math.round(((sumUSDT / workingСapital) * 100 - 100) * 100) / 100;


  return (
        <p>Валютна пара BTC ETH USDT {profitInPercentage}% </p>
  );
}

export default USDT_BTC_ETH;
