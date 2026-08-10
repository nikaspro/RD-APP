import { Card } from '@/components/ui/card'
import { Item, ItemContent, ItemTitle, ItemActions } from '@/components/ui/item'

/* Карточка номера на экране «Перед заездом»: фото, название и ряды-переходы.
   Card и Item из библиотеки; вид проектный — классы .room и .nav из
   chiposh.css. Item здесь уместнее кнопки: это строка списка с содержимым
   слева и шевроном справа, ровно его раскладка. */
export function RoomBlock() {
  return (
    <Card className="room">
      <img src="assets/img/room-bungalow.webp" alt="Бунгало с террасой" />
      <div className="pad">
        <div className="big">Бунгало с террасой</div>
      </div>
      <div className="pad navs">
        <Item className="nav" render={<button type="button" />}>
          <ItemContent>
            <ItemTitle>Удобства в номере</ItemTitle>
          </ItemContent>
          <ItemActions>
            <i>›</i>
          </ItemActions>
        </Item>
        <Item className="nav" render={<button type="button" />}>
          <ItemContent>
            <ItemTitle>Инструкция по заселению</ItemTitle>
          </ItemContent>
          <ItemActions>
            <i>›</i>
          </ItemActions>
        </Item>
      </div>
    </Card>
  )
}

export default RoomBlock
