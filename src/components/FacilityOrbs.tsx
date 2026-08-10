/* Слой карты: подложка территории, круглые пины активностей и окошко пина.
   Сами пины (.terr-pin) рисует рантайм из PIN_SETS — набор меняется вместе с
   часом на линейке, поэтому разметка пинов не может быть статичной. Окошко
   живёт внутри плоскости, чтобы ехать вместе с картой. */
export function FacilityOrbs() {
  return (
    <div className="terr-plane" data-plane>
      <img src="assets/img/territory-map.webp" alt="" draggable={false} />
      <div className="terr-tip" data-tip hidden>
        <div data-tiptext />
        <button className="terr-more" data-tipmore>
          Подробнее
        </button>
      </div>
    </div>
  )
}

export default FacilityOrbs
