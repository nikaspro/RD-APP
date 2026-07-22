// Единственный источник правды по токенам.
// Компоненты берут значения отсюда. Галерея вклеивает этот объект
// в "копировать для артефакта", а сборка генерит tokens.json для SwiftUI.

export const tokens = {
  color: {
    ink: "#14202A",
    accent: "#0FA5D8",
    surface: "#FFFFFF",
    surfaceMuted: "#F4F6F8",
    line: "#E6EBEF",
    textMuted: "#5B6B77",
  },
  font: {
    family: '"Google Sans", Inter, system-ui, sans-serif',
    minSize: 16, // px, минимальный размер по системе
  },
  radius: {
    // суперэллипс задаём через большой радиус + border-radius, детали в компонентах
    card: 24,
    pill: 999,
  },
  motion: {
    // база проекта
    easing: "cubic-bezier(0.60, 0.00, 0.40, 1.00)",
    duration: 0.3, // сек
    spring: { type: "spring", stiffness: 420, damping: 34, mass: 0.9 },
  },
  space: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
};

export default tokens;
