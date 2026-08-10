import { CloseIcon } from './icons'
import { LottieStar } from './LottieStar'

/* Плашка агента (.abub) — мятная капсула со светом из-под края.
   Состояния (st-msg / st-idle / st-wait / st-think) переключает рантайм,
   он же разбивает текст на слова для влёта. Здесь — разметка и стартовый
   текст сообщения. */

type Props = {
  /** текст первой реплики агента */
  children?: string
}

export function AgentPanel({ children }: Props) {
  return (
    <div className="abub st-msg">
      <div
        className="nudge-msg"
        data-nudgebtn
        role="button"
        tabIndex={0}
        aria-label="Сообщение агента"
      >
        <span className="tx" data-nudgetx>
          {children}
        </span>
        <button className="x" data-nudgex aria-label="Скрыть">
          <CloseIcon />
        </button>
      </div>
      <LottieStar />
    </div>
  )
}

export default AgentPanel
