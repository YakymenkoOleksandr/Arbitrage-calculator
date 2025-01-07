export function CommonComponnt({
  pairName,
  profitInPercentage,
  showOnlyPositive,
  showOnlyMoreThen,
}) {

  // Динамічний стиль для прибутку
  const profitStyle =
    profitInPercentage >= 0 ? { color: "green" } : { color: "red" };

  // Якщо прибуток більше 0%, то відображаємо результат (Можна зробить таку кнопку, типу сорт і бачиш одразу які пари прибуткові)
  if (
    (!showOnlyPositive && profitInPercentage <= 0) ||
    isNaN(profitInPercentage) ||
    (!showOnlyMoreThen && profitInPercentage < 0.2)
  ) {
    return null; // Не рендеримо компонент
  }

  // Відображення результату
  return (
    <p style={profitStyle}>
      {pairName}: {profitInPercentage}%
    </p>
  );
}
