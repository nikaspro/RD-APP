/* Иконки, которые в legacy/ChiposhPark.html повторялись инлайном по нескольку
   раз. Пути SVG перенесены символ в символ — менялась только запись атрибутов
   под JSX (stroke-width → strokeWidth и т.д.). */

/** Звезда агента — статичная подложка под Lottie-анимацию. */
export function StarIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        fill="#23D741"
        d="M12 2.6l1.7 5.3a4 4 0 0 0 2.6 2.6l5.3 1.7-5.3 1.7a4 4 0 0 0-2.6 2.6L12 21.8l-1.7-5.3a4 4 0 0 0-2.6-2.6L2.4 12.2l5.3-1.7a4 4 0 0 0 2.6-2.6L12 2.6z"
      />
    </svg>
  )
}

/** Крестик «скрыть» внутри плашки агента. */
export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

/** Галочка пункта списка «что взять с собой». */
export function CheckIcon() {
  return (
    <svg
      viewBox="0 0 13 13"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.6 6.9 4.7 10 11.4 3" />
    </svg>
  )
}

/** Плюс у пункта «Добавить еще». */
export function PlusIcon() {
  return (
    <svg viewBox="0 0 13 13" fill="none" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6.5 1v11M1 6.5h11" />
    </svg>
  )
}

/** Play/pause у пилюли аудиогида. */
export function PlayPillIcon() {
  return (
    <svg className="ic-play" viewBox="0 0 12 14" fill="currentColor">
      <path d="M11 6.13a1 1 0 0 1 0 1.74l-9 5.2A1 1 0 0 1 .5 12.2V1.8A1 1 0 0 1 2 .93l9 5.2Z" />
    </svg>
  )
}

export function PausePillIcon() {
  return (
    <svg className="ic-pause" viewBox="0 0 12 14" fill="currentColor">
      <path d="M1 1h3.4v12H1zM7.6 1H11v12H7.6z" />
    </svg>
  )
}
