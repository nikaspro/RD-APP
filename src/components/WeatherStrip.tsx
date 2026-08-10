import { WxIcon } from './WxIcon'
import { HScroll } from './HScroll'

/* Погода дня: крупное «сейчас» и лента на 24 часа вперёд.
   Колонки часов (#days) считает и рисует рантайм — первая колонка это
   текущий час, поэтому её температура равна крупному значению. */
export function WeatherStrip() {
  return (
    <HScroll className="wx">
      <div className="wx-track">
        <div className="wx-now">
          <WxIcon />
          <div className="wx-temp">23°</div>
        </div>
        <div className="wx-days" id="days" />
      </div>
    </HScroll>
  )
}

export default WeatherStrip
