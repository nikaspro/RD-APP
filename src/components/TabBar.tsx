/* Строка табов, прибитая к верху прокрутки.
   Кнопки рисует рантайм из TABS (Карта / Подготовка / Сегодня / 5.07 / 6.07 /
   Выезд) и он же держит активный таб в видимой части ленты. [data-rail]
   даёт перетаскивание мышью. */
export function TabBar() {
  return (
    <div className="tabbar">
      <div className="tabs" data-tabs data-rail />
    </div>
  )
}

export default TabBar
