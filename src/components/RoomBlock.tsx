/* Карточка номера на экране «Перед заездом»: фото, название и ряды-переходы.
   Тап по ряду рантайм превращает в разговор с агентом. */
export function RoomBlock() {
  return (
    <div className="room">
      <img src="assets/img/room-bungalow.webp" alt="Бунгало с террасой" />
      <div className="pad">
        <div className="big">Бунгало с террасой</div>
      </div>
      <div className="pad navs">
        <button className="nav">
          Удобства в номере<i>›</i>
        </button>
        <button className="nav">
          Инструкция по заселению<i>›</i>
        </button>
      </div>
    </div>
  )
}

export default RoomBlock
