import { Button } from '@/components/ui/button'

/* Карточка номера на экране «Перед заездом»: фото, название и ряды-переходы.
   Ряды — Button из библиотеки в варианте ghost: от него нужны состояния
   и семантика, а вид даёт класс .nav из chiposh.css. */
export function RoomBlock() {
  return (
    <div className="room">
      <img src="assets/img/room-bungalow.webp" alt="Бунгало с террасой" />
      <div className="pad">
        <div className="big">Бунгало с террасой</div>
      </div>
      <div className="pad navs">
        <Button variant="ghost" className="nav">
          Удобства в номере<i>›</i>
        </Button>
        <Button variant="ghost" className="nav">
          Инструкция по заселению<i>›</i>
        </Button>
      </div>
    </div>
  )
}

export default RoomBlock
