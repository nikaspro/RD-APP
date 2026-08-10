import { Ticket } from './Ticket'
import { Nudge } from './Nudge'
import { RoomBlock } from './RoomBlock'
import { PackList } from './PackList'
import { FilmStrip } from './FilmStrip'

/* Экран «Перед заездом»: билет туда, заезд, номер, сборы и что посмотреть
   в дороге. Между блоками — сообщения агента; у нуджа регистрации есть
   побочное действие checkin, которое применяет регистрацию во всех билетах. */
export function PrepPane() {
  return (
    <div className="pane" data-tab="prep">
      <Ticket flight="dep" />

      <Nudge
        noEvent
        action="checkin"
        message="Зарегистрировать на рейс?"
        follow="Возьму места рядом у окна — подойдёт?"
        done="Зарегистрировал на оба рейса, места 12A и 12B"
      />

      <div className="pad checkin">
        <div className="lbl">Заезд</div>
        <button className="big" data-checkindate>
          Пятница, 14 августа • с 12:00
        </button>
      </div>

      <RoomBlock />

      <Nudge
        noEvent
        message="Устроить ранний заезд?"
        follow="Могу договориться к 10:00 — подойдёт?"
        done="Договорился о раннем заезде к 10:00, обновил время"
      />

      <div className="pad prep-head">
        <h2 className="h2">Что взять с собой в дорогу</h2>
      </div>

      <PackList />

      <div className="pad films-head">
        <h2 className="h2">Что посмотреть в дороге</h2>
      </div>
      <FilmStrip />

      <div className="prep-tail" />
    </div>
  )
}

export default PrepPane
