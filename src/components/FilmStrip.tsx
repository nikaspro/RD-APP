/* «Что посмотреть в дороге» — зацикленная лента карточек.
   Рантайм клонирует детей #films в три набора и гоняет бесконечную
   прокрутку с масштабом по центру, поэтому детей этого блока React
   после первого рендера не трогает. */

const FILMS = [
  { img: 'assets/img/film-rating-72.webp', rating: '7.2' },
  { img: 'assets/img/film-rating-64.webp', rating: '6.4' },
  { img: 'assets/img/film-rating-79.webp', rating: '7.9' },
]

export function FilmStrip() {
  return (
    <div className="films" id="films">
      <div className="film cap">
        <img src="assets/img/film-spb-guide.webp" alt="" />
        <span>САНКТ-ПЕТЕРБУРГ, РОССИЯ | 39 лучших достопримечательностей Петербурга</span>
      </div>
      {FILMS.map((f) => (
        <div className="film" key={f.img}>
          <img src={f.img} alt="" />
          <em>{f.rating}</em>
        </div>
      ))}
    </div>
  )
}

export default FilmStrip
