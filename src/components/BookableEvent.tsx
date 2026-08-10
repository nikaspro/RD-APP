import { BookingChip } from './StatusChip'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Button } from '@/components/ui/button'

/* Событие, у которого можно забронировать стол (.ev[data-book]).
   Ряд брони скрыт до тех пор, пока свайп по карточке не откроет его;
   выбор времени, «думает», итог с обратным отсчётом и тег брони —
   всё это рантайм (initBooking) по data-атрибутам ниже.

   Времена — ToggleGroup из библиотеки: по правилам проекта набор из 2–7
   вариантов делается им, а не циклом по кнопкам со своим активным
   состоянием. Класс .pill сохранён: по нему рантайм находит кнопки
   ([data-times] .pill) и по нему же они выглядят как пилюли из макета. */

type Props = {
  title: string
  desc: string
  image: string
  /** предлагаемые времена; «Другое» уводит в набор текста */
  times?: string[]
}

export function BookableEvent({ title, desc, image, times = ['12:00', '13:00', 'Другое'] }: Props) {
  return (
    <Card className="ev" data-book>
      <div className="ev-head">
        <div className="ev-head-txt">
          <CardTitle className="ev-t" role="heading" aria-level={3}>
            {title}
          </CardTitle>
          <CardDescription className="ev-d">{desc}</CardDescription>
        </div>
        <BookingChip />
      </div>
      <div className="media">
        <img src={image} alt="" />
      </div>
      <div className="book" data-bookrow hidden>
        <div data-bookask>
          <Label className="book-label">Забронировать стол</Label>
          <ToggleGroup
            className="times"
            /* data-rail — перетаскивание мышью, data-times — по нему рантайм
               ищет кнопки времени */
            data-rail
            data-times
            aria-label="Время брони"
          >
            {times.map((t) => (
              <ToggleGroupItem className="pill" key={t} value={t}>
                {t}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="book-state" data-bookstate hidden>
          <span data-bookmsg />
          <Button variant="ghost" className="book-x" data-bookclose aria-label="Скрыть">
            <svg viewBox="0 0 24 24" fill="none">
              <circle className="ring-bg" cx="12" cy="12" r="11" />
              <circle className="ring" cx="12" cy="12" r="11" data-ring />
              <path className="x" d="M9 9l6 6M15 9l-6 6" />
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default BookableEvent
