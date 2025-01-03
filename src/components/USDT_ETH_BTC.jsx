function USDT_ETH_BTC({
    workingСapital,
    pricesBTCUSDT,
    pricesETHUSDT,
    pricesBTCETH
}) {
   
   
      let summinusСommission = workingСapital - workingСapital * 0.00075; // Сума обміну з вирахуванням комісії
    let amountOfEtheriumPurchased = summinusСommission / pricesETHUSDT;  // Сума куплених ефірів за оборотний капітал
    let summinusСommission2 = amountOfEtheriumPurchased - amountOfEtheriumPurchased * 0.00075; // Комісія яка знімається з ефірів при купівлі іншої валюти
    let amountOfBitcoinsPurchased = summinusСommission2 / pricesBTCETH; // Сума обміну BTC на ETH
    let summinusСommission3 = amountOfBitcoinsPurchased - amountOfBitcoinsPurchased * 0.00075; //Комісія яка знімається з валюти перед покупкою
    let sumUSDT = summinusСommission3 * pricesBTCUSDT;
    let profitInPercentage = Math.round(((sumUSDT / workingСapital) * 100 - 100) * 100) / 100;
    
    return (
        <p>ETH BTC USDT {profitInPercentage}% </p>
  );
};
  
export default USDT_ETH_BTC;