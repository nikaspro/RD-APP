/* Билет. Контейнер пустой намеренно: разметку рейса собирает рантайм
   (journey() по данным TICKETS) — один шаблон на все сегменты, чтобы новый
   рейс добавлялся записью в данные, а не копией блока.
   Он же вешает сюда «применить регистрацию»: нудж агента с
   data-action="checkin" дёргает все билеты разом. */

type Props = {
  /** ключ рейса в TICKETS: dep — «Перед заездом», ret — «Выезд» */
  flight: 'dep' | 'ret'
}

export function Ticket({ flight }: Props) {
  return <div className="pad tkt" data-ticket={flight} />
}

export default Ticket
