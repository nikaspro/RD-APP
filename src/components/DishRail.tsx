import { HScroll } from './HScroll'
import { Card, CardTitle, CardDescription } from '@/components/ui/card'

/* Лента блюд под карточкой ресторана. Круглые фото, название и цена.
   Card из библиотеки; вид даёт .dish из chiposh.css. */

const DISHES = [
  { img: 'assets/img/dish-oysters-yuzu.webp', name: 'Устрицы с юдзу', price: '690 ₽' },
  { img: 'assets/img/dish-creme-brulee-miso.webp', name: 'Крем-брюле с мисо', price: '890 ₽' },
  { img: 'assets/img/dish-syrniki-lingonberry.webp', name: 'Сырники с брусникой', price: '640 ₽' },
  { img: 'assets/img/dish-salmon-roll.webp', name: 'Ролл с лососем', price: '720 ₽' },
  { img: 'assets/img/dish-tuna-tartare.webp', name: 'Тартар из тунца', price: '890 ₽' },
  { img: 'assets/img/dish-evening-set.webp', name: 'Сет «Вечерний»', price: '1 890 ₽' },
]

export function DishRail() {
  return (
    <HScroll className="dishes">
      {DISHES.map((d) => (
        <Card className="dish" key={d.name}>
          <img src={d.img} alt="" />
          <CardTitle className="dish-n">{d.name}</CardTitle>
          <CardDescription className="dish-p">{d.price}</CardDescription>
        </Card>
      ))}
    </HScroll>
  )
}

export default DishRail
