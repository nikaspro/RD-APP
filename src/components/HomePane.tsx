import { TerritoryMap } from './TerritoryMap'
import { Nudge } from './Nudge'

/* Экран «Мой домик» — карта территории и предложение собрать план.
   Обложки на этом экране нет (скрыта правилом .frame[data-tab-view="home"]),
   поэтому карта занимает весь кадр. */
export function HomePane() {
  return (
    <div className="pane is-on" data-tab="home">
      <TerritoryMap />
      <Nudge
        noEvent
        message="Собрать план поездки под вас?"
        follow="Отметите пару мест из плана — соберу маршрут. Начнём?"
        done="Готово, собрал черновик плана — он в днях 15 и 16 авг"
      />
    </div>
  )
}

export default HomePane
