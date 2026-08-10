import { AmenityIcon } from './AmenityIcon'
import { Button } from '@/components/ui/button'

/* «Что взять с собой в дорогу». Отметка пункта и добавление нового
   (через набор текста в листе агента) — на рантайме: [data-add-ask]
   открывает поле ввода, отмеченному пункту ставится класс .on.
   Строки — Button из библиотеки; классы .li и .li.add сохранены, по ним
   рантайм находит пункты и по ним же строки выглядят как в макете. */

const ITEMS = ['Зубная щетка', 'Паспорт', 'Зарядка для телефона']

export function PackList() {
  return (
    <div className="pad">
      <div className="list">
        {ITEMS.map((item) => (
          <Button variant="ghost" className="li justify-start" key={item}>
            <AmenityIcon />
            <b>{item}</b>
          </Button>
        ))}
        <Button variant="ghost" className="li add justify-start" data-add-ask>
          <AmenityIcon variant="add" />
          <b>Добавить еще</b>
        </Button>
      </div>
    </div>
  )
}

export default PackList
