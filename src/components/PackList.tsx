import { AmenityIcon } from './AmenityIcon'
import { Item, ItemGroup, ItemMedia, ItemContent, ItemTitle } from '@/components/ui/item'

/* «Что взять с собой в дорогу». Строки — Item из библиотеки: иконка слева,
   подпись справа, это его штатная раскладка. Классы .list, .li и .li.add
   сохранены — по ним рантайм находит пункты (отметка ставит .on,
   [data-add-ask] открывает набор текста) и по ним же строки выглядят
   как в макете. */

const ITEMS = ['Зубная щетка', 'Паспорт', 'Зарядка для телефона']

export function PackList() {
  return (
    <div className="pad">
      <ItemGroup className="list">
        {ITEMS.map((item) => (
          <Item className="li" key={item} render={<button type="button" />}>
            <ItemMedia>
              <AmenityIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                <b>{item}</b>
              </ItemTitle>
            </ItemContent>
          </Item>
        ))}
        <Item className="li add" data-add-ask render={<button type="button" />}>
          <ItemMedia>
            <AmenityIcon variant="add" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              <b>Добавить еще</b>
            </ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
    </div>
  )
}

export default PackList
