import { BookingChip } from './StatusChip'
import { HScroll } from './HScroll'

/* Событие, у которого можно забронировать стол (.ev[data-book]).
   Ряд брони скрыт до тех пор, пока свайп по карточке не откроет его;
   выбор времени, «думает», итог с обратным отсчётом и тег брони —
   всё это рантайм (initBooking) по data-атрибутам ниже. */

type Props = {
  title: string
  desc: string
  image: string
  /** предлагаемые времена; «Другое» уводит в набор текста */
  times?: string[]
}

export function BookableEvent({ title, desc, image, times = ['12:00', '13:00', 'Другое'] }: Props) {
  return (
    <div className="ev" data-book>
      <div className="ev-head">
        <div className="ev-head-txt">
          <h3 className="ev-t">{title}</h3>
          <p className="ev-d">{desc}</p>
        </div>
        <BookingChip />
      </div>
      <div className="media">
        <img src={image} alt="" />
      </div>
      <div className="book" data-bookrow hidden>
        <div data-bookask>
          <div className="book-label">Забронировать стол</div>
          <HScroll className="times" data-times>
            {times.map((t) => (
              <button className="pill" key={t}>
                {t}
              </button>
            ))}
          </HScroll>
        </div>
        <div className="book-state" data-bookstate hidden>
          <span data-bookmsg />
          <button className="book-x" data-bookclose aria-label="Скрыть">
            <svg viewBox="0 0 24 24" fill="none">
              <circle className="ring-bg" cx="12" cy="12" r="11" />
              <circle className="ring" cx="12" cy="12" r="11" data-ring />
              <path className="x" d="M9 9l6 6M15 9l-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookableEvent
