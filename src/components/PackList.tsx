import { AmenityIcon } from './AmenityIcon'

/* «Что взять с собой в дорогу». Отметка пункта и добавление нового
   (через набор текста в листе агента) — на рантайме: [data-add-ask]
   открывает поле ввода, отмеченному пункту ставится класс .on. */

const ITEMS = ['Зубная щетка', 'Паспорт', 'Зарядка для телефона']

export function PackList() {
  return (
    <div className="pad">
      <div className="list">
        {ITEMS.map((item) => (
          <button className="li" key={item}>
            <AmenityIcon />
            <b>{item}</b>
          </button>
        ))}
        <button className="li add" data-add-ask>
          <AmenityIcon variant="add" />
          <b>Добавить еще</b>
        </button>
      </div>
    </div>
  )
}

export default PackList
