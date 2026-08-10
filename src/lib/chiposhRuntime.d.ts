/** Точка входа логики виджета. Идемпотентна: повторный вызов ничего не делает. */
export declare function initChiposh(): void

/** Мостик наружу: React переключает панель тем же show(), что и раньше. */
export declare const chiposh: {
  show: (key: string) => void
}
