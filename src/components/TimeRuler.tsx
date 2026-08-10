/* Линейка времени над картой: тянешь — карта показывает, что будет через
   столько-то минут. Засечки (-36…36) и снап по 10 минут в пределах -180…360
   ставит рантайм, разметка даёт ему подпись, дорожку и метку «сейчас». */
export function TimeRuler() {
  return (
    <div className="ruler" data-ruler>
      <div className="ruler-label" data-rulerlabel>
        Сейчас
      </div>
      <div className="ruler-ticks">
        <div className="ruler-track" data-track />
        <i className="ruler-now" />
      </div>
    </div>
  )
}

export default TimeRuler
