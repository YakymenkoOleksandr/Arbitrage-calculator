import { calculateProfit } from "../utils/calculateProfit.js";

export function CommonComponnt({
  workingСapital,
  pricesFirstCoin,
  pricesSecondCoin,
  pricesCoinToCoin,
  pairName,
}) {
  // Перевірка наявності всіх необхідних даних для розрахунку
  if (
    !workingСapital ||
    !pricesFirstCoin ||
    !pricesSecondCoin ||
    !pricesCoinToCoin
  ) {
    return <p>Не всі данні</p>;
  }

  // Виконання розрахунків
  const profitInPercentage = calculateProfit({
    workingСapital,
    pricesFirstCoin,
    pricesCoinToCoin,
    pricesSecondCoin,
  });

  // Динамічний стиль для прибутку
  const profitStyle =
    profitInPercentage >= 0 ? { color: "green" } : { color: "red" };

  // Відображення результату
  return (
    <p style={profitStyle}>
      {pairName}: {profitInPercentage}%
    </p>
  );
}
