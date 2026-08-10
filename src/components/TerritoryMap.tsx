import { FacilityOrbs } from './FacilityOrbs'
import { TimeRuler } from './TimeRuler'

/* Карта территории — экран «Мой домик».
   Перетаскивание карты, фокус на пине и связка с линейкой времени —
   в рантайме (блок «Карта территории»), числа там же: карта 940×960,
   старт -260/-48, порог перетаскивания 4px, фокус пина на 50%/62% рамки. */
export function TerritoryMap() {
  return (
    <div className="terr" data-terr>
      <div className="terr-box" data-terrbox>
        <FacilityOrbs />
      </div>
      <div className="terr-scrim" />
      <TimeRuler />
    </div>
  )
}

export default TerritoryMap
