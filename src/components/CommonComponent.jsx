
export function CommonComponnt({
  pairName,
  profitInPercentage,
}) {

  // Динамічний стиль для прибутку
  const profitStyle =
    profitInPercentage >= 0 ? { color: "green" } : { color: "red" };
  
  // Якщо прибуток більше 0%, то відображаємо результат (Можна зробить таку кнопку, типу сорт і бачиш одразу які пари прибуткові)
  /*if (profitInPercentage <= 0) {
    return null; // Не рендеримо компонент, якщо прибуток <= 0
  }*/

  // Відображення результату
  return (
    <p style={profitStyle}>
      {pairName}: {profitInPercentage}%
    </p>
  );
}
