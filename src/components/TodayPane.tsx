import { WeatherStrip } from './WeatherStrip'
import { BookableEvent } from './BookableEvent'
import { EventCard } from './EventCard'
import { StatusChip } from './StatusChip'
import { SwipeDeck } from './SwipeDeck'
import { DishRail } from './DishRail'
import { Nudge } from './Nudge'
import { PlayPillIcon, PausePillIcon } from './icons'

/* Экран дня: погода, утро / день / вечер с событиями.
   Этот же макет рантайм клонирует под 5.07 и 6.07, подставляя свои
   температуры, дни недели и время заката — поэтому день свёрстан один раз. */
export function TodayPane() {
  return (
    <div className="pane" data-tab="today">
      <WeatherStrip />

      <div className="sec">Утро</div>

      <BookableEvent
        title="Prosa Breakfast Bar"
        desc="Завтрак в тихой кофейне во дворе с авторской выпечкой"
        image="assets/img/ev-prosa-breakfast.webp"
      />

      <Nudge message="Сходим на конную прогулку?" />

      <EventCard
        title="Новая Голландия"
        desc="Атмосферное место для шоппинга и прогулок с детьми"
        image="assets/img/ev-novaya-gollandiya.webp"
        chip="на территории отеля"
        chipDark
      >
        <div className="row">
          <button
            className="pill"
            data-audio="Новая Голландия, историческая территория"
            data-dur="881"
          >
            <PlayPillIcon />
            <PausePillIcon />
            Аудиогид
          </button>
        </div>
      </EventCard>

      <div className="sec gap-l">День</div>

      <EventCard
        title="Тропа к роднику"
        desc="Ровная тропа через кедровник к холодному роднику"
        image="assets/img/ev-spring-trail.webp"
      />

      <EventCard
        title="Новая Голландия"
        desc="Атмосферное место для шоппинга и прогулок с детьми"
        image="assets/img/ev-novaya-gollandiya.webp"
        chip="на территории отеля"
        chipDark
      />

      <Nudge
        noEvent
        message="Затопить баню перед костром?"
        follow="К 19:00, за час до костра — подойдёт?"
        done="Записал баню на 19:00, перед костром"
      />

      <div className="sec gap-l">Вечер</div>

      <SwipeDeck
        image="assets/img/deck-rolls.webp"
        face={<h3 className="ev-t">Как насчет роллов вечером?</h3>}
      >
        <div>
          <h3 className="ev-t">Subzero</h3>
          <p className="ev-d">Стильный минималистичный ресторан на улице Рубинштейна</p>
          <div className="media">
            <img src="assets/img/ev-subzero.webp" alt="" />
            <StatusChip dark>на территории отеля</StatusChip>
          </div>
        </div>
        <div>
          <h3 className="ev-t">Важная Рыба</h3>
          <p className="ev-d">
            Популярная доставка и суши-бары с большим выбором блюд ресторанного уровня
          </p>
          <div className="media">
            <img src="assets/img/ev-vazhnaya-ryba.webp" alt="" />
            <StatusChip>доставка</StatusChip>
          </div>
        </div>
        <div>
          <h3 className="ev-t">Gills</h3>
          <p className="ev-d">Уютное японское кафе на Казанской улице</p>
          <div className="media">
            <img src="assets/img/deck-rolls.webp" alt="" />
          </div>
        </div>
      </SwipeDeck>

      <EventCard
        title="Birch"
        desc="Авторская русская кухня, переосмысленная через локальные продукты и сезонные ингредиенты"
      />
      <DishRail />

      <SwipeDeck
        image="assets/img/deck-sunset.webp"
        face={
          <div className="sun-head">
            <div>
              <h3 className="ev-t" style={{ paddingTop: 0 }}>
                Закат
              </h3>
              <p className="ev-d">Собрал идеи, с которых провожать закат в разы приятнее</p>
            </div>
            <div className="sun-time">21:31</div>
          </div>
        }
      >
        <div>
          <h3 className="ev-t">Крыша на Казанской</h3>
          <p className="ev-d">Открытый вид на Исаакий, вход по записи</p>
          <div className="media">
            <img src="assets/img/deck-sunset.webp" alt="" />
            <StatusChip>21:31</StatusChip>
          </div>
        </div>
        <div>
          <h3 className="ev-t">Стрелка Васильевского</h3>
          <p className="ev-d">Классическая точка на закат, 15 минут пешком</p>
          <div className="media" />
        </div>
        <div>
          <h3 className="ev-t">Мост Ломоносова</h3>
          <p className="ev-d">Тихая набережная почти без туристов</p>
          <div className="media" />
        </div>
      </SwipeDeck>

      <div className="tail" />
      <div className="sky-hold">
        <div className="sky-grow" />
      </div>
    </div>
  )
}

export default TodayPane
