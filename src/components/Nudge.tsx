import { AgentPanel } from './AgentPanel'

/* Сообщение агента под блоком (.pad.nudge).
   Раскрытие пружиной, уточняющий вопрос и итог ведёт рантайм (openNudge),
   ему нужны те же data-атрибуты, что были в legacy:
     data-nudge    — сам блок,
     data-noevent  — итог не превращается в карточку события,
     data-action   — что дёрнуть при согласии («checkin» применяет регистрацию),
     data-follow   — уточняющий вопрос агента,
     data-done     — итоговая реплика. */

type Props = {
  /** текст первой реплики */
  message: string
  /** уточняющий вопрос агента после согласия */
  follow?: string
  /** итоговая реплика, когда агент договорился */
  done?: string
  /** побочное действие: "checkin" применяет регистрацию во всех билетах */
  action?: string
  /** итог не разворачивается в карточку нового события */
  noEvent?: boolean
}

export function Nudge({ message, follow, done, action, noEvent }: Props) {
  return (
    <div
      className="pad nudge"
      data-nudge
      {...(noEvent ? { 'data-noevent': true } : {})}
      {...(action ? { 'data-action': action } : {})}
      {...(follow ? { 'data-follow': follow } : {})}
      {...(done ? { 'data-done': done } : {})}
    >
      <AgentPanel>{message}</AgentPanel>
    </div>
  )
}

export default Nudge
