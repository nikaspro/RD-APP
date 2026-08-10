import { Ticket } from './Ticket'
import { Nudge } from './Nudge'

/* Экран «Выезд»: обратный билет и предложение собрать завтрак к выезду.
   Регистрация на обратный рейс ещё не открыта — билет показывает состояние
   soon, так что в прототипе оба состояния видны одновременно. */
export function OutPane() {
  return (
    <div className="pane" data-tab="out">
      <Ticket flight="ret" />
      <Nudge
        noEvent
        message="Собрать завтрак-боксы к выезду?"
        follow="Сколько боксов подготовить?"
        done="Заказал завтрак-боксы, будут на ресепшене к 10:00"
      />
    </div>
  )
}

export default OutPane
