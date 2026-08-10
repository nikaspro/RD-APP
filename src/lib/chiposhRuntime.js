/* Логика виджета «Чепош Парк».
 *
 * Перенесено из legacy/ChiposhPark.html (последний <script>) КАК ЕСТЬ —
 * без переписывания с нуля. Изменения относительно оригинала минимальны:
 *   1. IIFE обёрнут в экспортируемую initChiposh(), которую Widget вызывает
 *      из useEffect после монтирования (в legacy скрипт стоял после разметки,
 *      здесь роль «разметка уже в DOM» играет эффект);
 *   2. STAR_ANIMS приходит импортом из ../data/starAnims вместо глобальной
 *      переменной из inline-скрипта;
 *   3. защита от повторного запуска — React в dev монтирует дважды.
 *
 * Файл намеренно оставлен .js: это ES5-код, который под strict-TypeScript
 * пришлось бы править, а править его нельзя — он источник поведения.
 * Разметку, с которой он работает, отдают компоненты из src/components.
 */
import { STAR_ANIMS } from '../data/starAnims'

let started = false

/* Мостик наружу. Табы теперь рисует React (src/components/TabBar.tsx), и ему
   нужно уметь сказать рантайму «покажи такую-то панель». Сам show() при этом
   не тронут — здесь только ссылка на него. */
export const chiposh = {
  /** @type {(key: string) => void} */
  show: () => {},
}

export function initChiposh(){
  if (started) return
  /* точка с запятой обязательна: следом идёт IIFE в скобках, без неё
     присваивание и вызов склеятся в true(...) */
  started = true;

  (function(){
    var WX_ICON = "<svg viewBox=\"0 0 40 40\" fill=\"none\"><path d=\"M29.0806 19.7335C28.8905 18.4773 28.4566 17.3657 27.7789 16.3988C27.1012 15.4236 26.2376 14.6467 25.188 14.0682C24.1384 13.4814 22.9566 13.1426 21.6426 13.0517C21.4442 12.6798 21.2252 12.3368 20.9855 12.0227C20.7541 11.7004 20.5021 11.3988 20.2293 11.1178C20.7417 10.25 21.469 9.53926 22.4112 8.98554C23.3616 8.42355 24.4112 8.14256 25.5599 8.14256C26.7252 8.14256 27.7831 8.42769 28.7335 8.99793C29.6921 9.56818 30.4525 10.3326 31.0145 11.2913C31.5847 12.2417 31.8698 13.2955 31.8698 14.4525C31.8698 15.5434 31.6178 16.5517 31.1136 17.4773C30.6095 18.3946 29.9318 19.1467 29.0806 19.7335Z\" fill=\"#F3B53A\"/> <path d=\"M17.8988 8.61364L16.2252 6.94008C15.9773 6.69215 15.8492 6.3905 15.8409 6.03512C15.8409 5.67975 15.9649 5.3781 16.2128 5.13017C16.4607 4.88223 16.7624 4.75826 17.1178 4.75826C17.4814 4.75826 17.7831 4.88223 18.0227 5.13017L19.6963 6.82851C19.9442 7.07645 20.0682 7.3781 20.0682 7.73347C20.0764 8.08058 19.9566 8.3781 19.7087 8.62603C19.469 8.87397 19.1674 8.99793 18.8037 8.99793C18.4483 8.99793 18.1467 8.86983 17.8988 8.61364Z\" fill=\"#F3B53A\"/> <path d=\"M25.5475 6.19628C25.2004 6.19628 24.8988 6.07231 24.6426 5.82438C24.3946 5.56818 24.2707 5.2624 24.2707 4.90702V2.53926C24.2707 2.18388 24.3946 1.88223 24.6426 1.6343C24.8988 1.3781 25.2004 1.25 25.5475 1.25C25.9029 1.25 26.2045 1.3781 26.4525 1.6343C26.7004 1.88223 26.8244 2.18388 26.8244 2.53926V4.90702C26.8244 5.2624 26.7004 5.56818 26.4525 5.82438C26.2045 6.07231 25.9029 6.19628 25.5475 6.19628Z\" fill=\"#F3B53A\"/> <path d=\"M31.3988 8.63843C31.1508 8.3905 31.0269 8.08884 31.0269 7.73347C31.0269 7.36983 31.1508 7.06818 31.3988 6.82851L33.0971 5.15496C33.345 4.89876 33.6426 4.77066 33.9897 4.77066C34.345 4.77066 34.6467 4.8905 34.8946 5.13017C35.1426 5.3781 35.2665 5.68388 35.2665 6.04752C35.2665 6.40289 35.1426 6.70455 34.8946 6.95248L33.2087 8.62603C32.9607 8.87397 32.655 9.00207 32.2913 9.01033C31.9359 9.01033 31.6384 8.88636 31.3988 8.63843Z\" fill=\"#F3B53A\"/> <path d=\"M35.0806 15.7293C34.7335 15.7293 34.4318 15.6095 34.1756 15.3698C33.9194 15.1219 33.7913 14.8202 33.7913 14.4649C33.7913 14.1178 33.9194 13.8161 34.1756 13.5599C34.4318 13.3037 34.7335 13.1756 35.0806 13.1756H37.4607C37.8161 13.1756 38.1178 13.3037 38.3657 13.5599C38.6219 13.8161 38.75 14.1178 38.75 14.4649C38.75 14.8202 38.6219 15.1219 38.3657 15.3698C38.1178 15.6095 37.8161 15.7293 37.4607 15.7293H35.0806Z\" fill=\"#F3B53A\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.59297 27.593C5.53512 27.593 4.60537 27.3864 3.80372 26.9731C3.00207 26.5517 2.37397 25.969 1.91942 25.2252C1.47314 24.4814 1.25 23.6178 1.25 22.6343C1.25 21.469 1.58058 20.4525 2.24174 19.5847C2.91116 18.7087 3.79959 18.1178 4.90702 17.812C4.99793 16.7459 5.27066 15.7583 5.72521 14.8492C6.18802 13.9401 6.79132 13.1467 7.53512 12.469C8.28719 11.7913 9.13843 11.2665 10.0888 10.8946C11.0393 10.5145 12.0517 10.3244 13.126 10.3244C14.3161 10.3244 15.3822 10.5227 16.3244 10.9194C17.2748 11.3079 18.0971 11.8409 18.7913 12.5186C19.4938 13.188 20.0682 13.9442 20.5145 14.7872C21.812 14.7872 22.969 15.0682 23.9855 15.6302C25.0021 16.1921 25.8037 16.9566 26.3905 17.9236C26.9773 18.8905 27.2707 19.9938 27.2707 21.2335C27.2707 22.4401 26.9897 23.5227 26.4277 24.4814C25.874 25.4401 25.1219 26.2004 24.1715 26.7624C23.2211 27.3161 22.1467 27.593 20.9483 27.593H6.59297ZM6.95248 33.7417C6.82025 33.9566 6.6343 34.1012 6.39463 34.1756C6.15496 34.2583 5.92355 34.2335 5.70041 34.1012C5.46901 33.969 5.32438 33.7831 5.26653 33.5434C5.21694 33.3037 5.25413 33.0764 5.3781 32.8616L6.95248 30.1219C7.09297 29.8905 7.27893 29.7376 7.51033 29.6632C7.74174 29.5971 7.97314 29.6302 8.20455 29.7624C8.42769 29.8946 8.56818 30.0806 8.62603 30.3202C8.68388 30.5682 8.64669 30.8037 8.51446 31.0269L6.95248 33.7417ZM10.8574 37.2252C10.7252 37.4401 10.5393 37.5847 10.2996 37.6591C10.0682 37.7335 9.83678 37.7087 9.60537 37.5847C9.37397 37.4442 9.22934 37.2541 9.17149 37.0145C9.1219 36.7831 9.15909 36.5558 9.28306 36.3326L10.8574 33.6054C10.9979 33.374 11.1839 33.2211 11.4153 33.1467C11.6467 33.0806 11.8781 33.1136 12.1095 33.2459C12.3326 33.3781 12.4731 33.564 12.531 33.8037C12.5888 34.0434 12.5517 34.2748 12.4194 34.4979L10.8574 37.2252ZM16.8202 33.7293C16.688 33.9525 16.5021 34.1012 16.2624 34.1756C16.0227 34.25 15.7913 34.2211 15.5682 34.0888C15.3368 33.9566 15.1921 33.7707 15.1343 33.531C15.0847 33.2913 15.1219 33.064 15.2459 32.8492L16.8202 30.1219C16.9607 29.8822 17.1467 29.7252 17.3781 29.6508C17.6095 29.5847 17.8368 29.6178 18.0599 29.75C18.2913 29.8905 18.4359 30.0806 18.4938 30.3202C18.5517 30.5599 18.5186 30.7913 18.3946 31.0145L16.8202 33.7293ZM20.7128 37.2128C20.5888 37.4359 20.407 37.5847 20.1674 37.6591C19.9277 37.7335 19.6963 37.7045 19.4731 37.5723C19.2417 37.4401 19.0971 37.2541 19.0393 37.0145C18.9897 36.7748 19.0269 36.5475 19.1508 36.3326L20.7252 33.6054C20.8657 33.3657 21.0517 33.2087 21.2831 33.1343C21.5145 33.0682 21.7459 33.1012 21.9773 33.2335C22.2087 33.3657 22.3492 33.5517 22.3988 33.7913C22.4566 34.0393 22.4236 34.2748 22.2996 34.4979L20.7128 37.2128Z\" fill=\"#9ABAF2\"/> <path d=\"M33.0847 23.7996L31.3988 22.1136C31.1508 21.874 31.0227 21.5764 31.0145 21.2211C31.0145 20.8574 31.1384 20.5558 31.3864 20.3161C31.6343 20.0682 31.9359 19.9442 32.2913 19.9442C32.655 19.9442 32.9566 20.0682 33.1963 20.3161L34.8822 22.0021C35.1219 22.25 35.2459 22.5517 35.2541 22.907C35.2624 23.2624 35.1426 23.564 34.8946 23.812C34.6467 24.0517 34.345 24.1715 33.9897 24.1715C33.6343 24.1715 33.3326 24.0475 33.0847 23.7996Z\" fill=\"#F3B53A\"/></svg>";

    /* ---- проявление заголовка в ТРЕВЕЛ ---- */
    function revealCity(){
      var box = document.querySelector(".hero-city");
      if (!box) return;
      var h1 = box.querySelector("h1"), p = box.querySelector("p");
      var text = h1.dataset.text || h1.textContent;
      h1.dataset.text = text;
      h1.innerHTML = text.split("").map(function(ch, i){
        return '<i style="--i:' + i + '">' + (ch === " " ? "&nbsp;" : ch) + "</i>";
      }).join("");
      p.style.setProperty("--pd", (text.length * 20 + 60) + "ms");
      /* перезапуск анимации: снимаем и возвращаем в следующем кадре */
      p.style.animation = "none";
      requestAnimationFrame(function(){ p.style.animation = ""; });
    }

    /* ---- переключатель сценариев ---- */
    (function(){
      var btns = document.querySelectorAll("[data-app]");
      function pick(name){
        document.body.dataset.app = name;
        [].forEach.call(btns, function(b){ b.classList.toggle("on", b.dataset.app === name); });
        /* у сценариев разная обложка, поэтому сбрасываем прокрутку и перерисовываем */
        var sc = document.getElementById("scroller");
        if (sc) sc.scrollTop = 0;
        show(name === "travel" ? "prep" : "home");
        if (name === "travel") revealCity();
      }
      [].forEach.call(btns, function(b){ b.onclick = function(){ pick(b.dataset.app); }; });
      document.body.dataset.app = "cheposh";
    })();
    /* ---- weather icon + strip ---- */
    document.querySelector("[data-icon]").innerHTML = WX_ICON;
    /* 24 часа вперёд. Подписи — только часы: «сейчас» дублировало бы крупное
       число, поэтому первая колонка это текущий час, и её температура равна
       крупному значению */
    var wx = (function(){
      var start = 9, BIG = 23, out = [];
      for (var i = 0; i < 24; i++){
        var hr = (start + i) % 24;
        var t = Math.round(BIG - 6 + 6 * Math.cos(i / 24 * 2 * Math.PI));
        out.push([(hr < 10 ? "0" + hr : String(hr)), t + "°"]);
      }
      return out;
    })();
    document.getElementById("days").innerHTML = wx.map(function(d){
      return '<div class="wx-day"><b>'+d[0]+'</b>'+WX_ICON+'<i>'+d[1]+'</i></div>';
    }).join("");

    /* ---- 5.07 / 6.07 reuse the day layout with their own numbers ---- */
    var today = document.querySelector('.pane[data-tab="today"]');
    [["d05","21°",["Вт","Ср","Чт","Пт","Сб","Вс","Пн"],["20°","20°","19°","21°","22°","18°","19°"],"21:29"],
     ["d06","19°",["Ср","Чт","Пт","Сб","Вс","Пн","Вт"],["20°","19°","21°","22°","18°","19°","20°"],"21:27"]].forEach(function(cfg){
      var c = today.cloneNode(true);
      c.dataset.tab = cfg[0];
      c.classList.remove("is-on");
      c.querySelector(".wx-temp").textContent = cfg[1];
      var days = c.querySelectorAll(".wx-day");
      [].forEach.call(days, function(d, i){
        if (cfg[2][i]) d.querySelector("b").textContent = cfg[2][i];
        if (cfg[3][i]) d.querySelector("i").textContent = cfg[3][i];
      });
      var t = c.querySelector(".sun-time"); if (t) t.textContent = cfg[4];
      today.parentNode.appendChild(c);
    });

    /* ---- билет ----
       Один шаблон на все рейсы: разметка живёт здесь, в панелях остаются только
       контейнеры [data-ticket]. Новый рейс — запись в TICKETS, а не копия блока. */
    /* Общее у билета: pax — сколько летит, bag — норма провоза.
       legs — сегменты маршрута: один у прямого рейса, два и больше у рейса
       с пересадкой. stop на сегменте значит, что после него ждём стыковку.
       У каждого сегмента свои номер рейса, регистрация, терминал и гейт —
       на пересадке они меняются, поэтому это не общие поля билета. */
    /* Билеты складывают сюда «применить регистрацию»: нудж агента дёргает их
       все разом, когда договорился. Так билет не знает про агента, а агент
       не знает про вёрстку билета */
    var PAX_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12.4c2.3 0 4.2-1.9 4.2-4.2S14.3 4 12 4 7.8 5.9 7.8 8.2s1.9 4.2 4.2 4.2Zm0 1.7c-3.8 0-6.9 2-6.9 4.5 0 1 .8 1.8 1.8 1.8h10.2c1 0 1.8-.8 1.8-1.8 0-2.5-3.1-4.5-6.9-4.5Z"/></svg>';
    /* «2 гостя» это про отель; в билете летят пассажиры */
    function paxWord(n){
      var t = n % 10, h = n % 100;
      if (t === 1 && h !== 11) return "\u043f\u0430\u0441\u0441\u0430\u0436\u0438\u0440";
      if (t >= 2 && t <= 4 && (h < 12 || h > 14)) return "\u043f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0430";
      return "\u043f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u043e\u0432";
    }
    var TICKET_CHECKIN = [];
    function applyCheckin(){ TICKET_CHECKIN.forEach(function(f){ f(); }); }
    /* Влёт букв по демо GSAP «Revert after animation»: строка разбивается
       на буквы, буквы влетают по одной, и сразу после анимации split.revert()
       возвращает обычный текстовый узел. Revert тут не украшение: без него
       в теге навсегда остаются десятки <span>, их читает скринридер по буквам.
       Применяем там, где текст правда меняется — в теге билета: «Регистрация
       до 05:40» превращается в «Зарегистрирован».
       Параметры из демо (scale 0, rotationX 180, ease back, stagger), кроме
       дистанций: в демо заголовок 6rem и буквы летят с y:80, у нас кегль 16 —
       сдвиг и z уменьшены, иначе буквы улетали бы за пределы тега */
    function splitIn(el){
      if (!el || !window.gsap || !window.SplitText) return;
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      var split = SplitText.create(el, { type: "chars,words" });
      gsap.from(split.chars, {
        duration: .5,
        opacity: 0,
        scale: 0,
        y: 16,
        rotationX: 180,
        transformOrigin: "0% 50% -9",
        ease: "back",
        stagger: .03,
        onComplete: function(){ split.revert(); }
      });
    }
    /* Метка регистрации: один текст на все три состояния */
    function regLabel(l){
      return l.state === "open" ? "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0434\u043e " + l.reg
           : l.state === "soon" ? "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0441 " + l.opens
           : "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f \u0437\u0430\u043a\u0440\u044b\u0442\u0430";
    }
    var GATE_SVG = '<svg viewBox="0 0 16 16" fill="none"><path fill="#fff" d="M7.63916 15.2783C6.58447 15.2783 5.5957 15.0781 4.67285 14.6777C3.75 14.2822 2.93701 13.7329 2.23389 13.0298C1.53564 12.3315 0.98877 11.5234 0.593262 10.6055C0.197754 9.68262 0 8.69385 0 7.63916C0 6.58447 0.197754 5.5957 0.593262 4.67285C0.98877 3.75 1.53564 2.93945 2.23389 2.24121C2.93701 1.53809 3.75 0.98877 4.67285 0.593262C5.5957 0.197754 6.58447 0 7.63916 0C8.69385 0 9.68262 0.197754 10.6055 0.593262C11.5283 0.98877 12.3389 1.53809 13.0371 2.24121C13.7354 2.93945 14.2822 3.75 14.6777 4.67285C15.0781 5.5957 15.2783 6.58447 15.2783 7.63916C15.2783 8.69385 15.0781 9.68262 14.6777 10.6055C14.2822 11.5234 13.7354 12.3315 13.0371 13.0298C12.3389 13.7329 11.5283 14.2822 10.6055 14.6777C9.68262 15.0781 8.69385 15.2783 7.63916 15.2783ZM11.4697 7.63184C11.4697 7.5293 11.4502 7.4292 11.4111 7.33154C11.3721 7.23389 11.3037 7.13379 11.2061 7.03125L8.81836 4.55566C8.75 4.4873 8.67676 4.43604 8.59863 4.40186C8.52539 4.36279 8.4375 4.34326 8.33496 4.34326C8.14453 4.34326 7.98828 4.41162 7.86621 4.54834C7.74414 4.68018 7.68311 4.83887 7.68311 5.02441C7.68311 5.22461 7.75635 5.39307 7.90283 5.52979L8.97217 6.5332L9.48486 6.92139L8.37158 6.85547H4.50439C4.29932 6.85547 4.12109 6.93115 3.96973 7.08252C3.82324 7.23389 3.75 7.41699 3.75 7.63184C3.75 7.84668 3.82324 8.02979 3.96973 8.18115C4.12109 8.33252 4.29932 8.4082 4.50439 8.4082H8.37158L9.49219 8.34229L8.97217 8.73047L7.90283 9.73389C7.75635 9.87061 7.68311 10.0415 7.68311 10.2466C7.68311 10.4272 7.74414 10.5859 7.86621 10.7227C7.98828 10.8545 8.14453 10.9204 8.33496 10.9204C8.4375 10.9204 8.52539 10.9033 8.59863 10.8691C8.67676 10.8301 8.75 10.7764 8.81836 10.708L11.2061 8.23242C11.3037 8.12988 11.3721 8.02979 11.4111 7.93213C11.4502 7.83447 11.4697 7.73438 11.4697 7.63184Z"/></svg>';
    /* Состояние сегмента, от него зависит, что вообще показывать:
         soon   — регистрация ещё не открыта. Гейта и терминала не существует:
                  гейт назначают за несколько часов до вылета. Пишем, когда
                  регистрация откроется, и не даём кнопку — нажимать нечего.
         open   — регистрация открыта. Только тут терминал и гейт есть смысл
                  показывать, и только тут работает онлайн-регистрация.
         closed — регистрация закрыта. Терминал и гейт больше не нужны:
                  либо гость уже у выхода, либо рейс улетел.
       Прямой рейс «Перед заездом» открыт, обратный ещё нет — он на три дня
       позже, так что в прототипе видны оба состояния сразу. */
    var TICKETS = {
      dep: { pax: 2, bag: "Ручная 1×10 кг · Багаж 1×23 кг",
             legs: [
               { state: "open", reg: "05:40", no: "S7-5014", counter: "A1-A3", gate: "26", terminal: "D",
                 dur: "1 ч 45 мин",
                 seat: "12A и 12B",
                 from: { time: "06:20", city: "Екатеринбург", iata: "SVX", date: "14 авг" },
                 to:   { time: "08:05", city: "Новосибирск", iata: "OVB", date: "14 авг" },
                 stop: { city: "Новосибирске", wait: "1 ч 25 мин" } },
               { state: "open", reg: "09:00", no: "S7-2118", counter: "B2-B4", gate: "12", terminal: "A",
                 dur: "1 ч 10 мин",
                 seat: "7A и 7B",
                 from: { time: "09:30", city: "Новосибирск", iata: "OVB", date: "14 авг" },
                 to:   { time: "10:40", city: "Горно-Алтайск", iata: "RGK", date: "14 авг" } }
             ] },
      ret: { pax: 2, bag: "Ручная 1×10 кг · Багаж 1×23 кг",
             legs: [
               { state: "soon", opens: "16 авг", no: "S7-5015", counter: "C1-C3", terminal: "B",
                 dur: "2 ч 40 мин",
                 seat: "6A и 6B",
                 from: { time: "21:40", city: "Горно-Алтайск", iata: "RGK", date: "17 авг" },
                 to:   { time: "02:20", city: "Екатеринбург", iata: "SVX", date: "18 авг" } }
             ] }
    };
    /* Компактная строка того же сегмента. Данные те же, что у полного билета —
       отдельного набора полей не появляется, иначе они разъедутся */
    /* Компактная строка — только главное: борт с датой или сроком регистрации,
       города и времена. Терминал, стойки, выход и места убраны: в аэропорту они
       нужны, но здесь превращали короткую сводку во второй полный билет.
       live — сегмент, на котором стоит срок регистрации. Регистрация одна на всю
       бронь, поэтому срок показываем только у первого открытого рейса: писать
       «Регистрация до» на каждом сегменте значит показывать одно действие дважды.
       У остальных в том же слое дата рейса — делать по ним пока нечего */
    /* Маршрут по сегментам: у каждого рейса свой ряд дат, времён, городов
       и кодов аэропортов, а пересадка идёт полосой между ними. Раньше весь
       маршрут был свёрнут в один блок с чипом «1 пересадка» — по макету
       сегменты показываются целиком, каждый со своим временем в пути.
       Тег регистрации и номер рейса — только над первым сегментом:
       регистрация одна на бронь, и повторять её у каждого рейса значит
       показывать одно действие дважды. */
    function journey(t){
      var legs = t.legs, first = legs[0];
      /* тег берёт состояние у первого открытого сегмента, а если открытых
         нет — у первого */
      var regLeg = first;
      for (var i = 0; i < legs.length; i++)
        if (legs[i].state === "open"){ regLeg = legs[i]; break; }
      var live = regLeg.state === "open";
      function place(p){ return "<span>" + p.city + "<u>" + p.iata + "</u></span>"; }
      /* один сегмент: даты, времена с временем в пути между ними, города */
      function seg(l){
        return '<div class="tkt-j-dates"><span>' + l.from.date + "</span>" +
                 "<span>" + l.to.date + "</span></div>" +
               '<div class="tkt-b-times">' +
                 '<span class="tkt-time">' + l.from.time + "</span>" +
                 '<div class="tkt-mid">' +
                   '<i class="tkt-line"></i>' +
                   '<span class="tkt-dur">' + l.dur + "</span>" +
                   '<i class="tkt-line"></i>' +
                 "</div>" +
                 '<span class="tkt-time">' + l.to.time + "</span>" +
               "</div>" +
               '<div class="tkt-b-places">' + place(l.from) + place(l.to) + "</div>";
      }
      /* Служебный ряд — у своего сегмента, и только пока регистрация на него
         открыта. Раньше он стоял один на весь билет и брал данные у первого
         рейса: на стыковке это врало, потому что терминал, стойки и выход
         у второго рейса свои. Пока регистрация не открыта, ряда нет вовсе —
         гейта в этот момент ещё не существует */
      function svc(l){
        /* Только у первого открытого рейса. Раньше ряд появлялся у каждого
           открытого сегмента, и на стыковке их было два — но гость сейчас
           в аэропорту вылета, а терминал и выход пересадки это справка на
           потом, и к моменту стыковки гейт всё равно могут поменять */
        if (l !== regLeg || l.state !== "open") return "";
        return '<div class="tkt-c-svc">' +
                 "<span><u>\u0422\u0435\u0440\u043c\u0438\u043d\u0430\u043b</u><b>" + l.terminal + "</b></span>" +
                 "<span><u>\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f</u><b>" + l.counter + "</b></span>" +
                 (l.seat
                   ? '<span hidden data-cseat><u>\u041c\u0435\u0441\u0442\u0430</u><b>' +
                       l.seat + "</b></span>"
                   : "") +
                 '<span class="tkt-gate">' + GATE_SVG + (l.gate || "\u2014") + "</span>" +
               "</div>";
      }
      /* полоса пересадки: город в предложном падеже уже лежит в данных */
      function stopbar(s){
        return '<button class="tkt-stopbar" data-stopinfo>' +
                 "\u041f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0430 \u0432 " +
                 s.city + ", " + s.wait + "</button>";
      }
      return '<div class="tkt-b">' +
               /* Тег состояния слева, номер рейса справа: состояние — то, что
                  читают первым, борт при нём уточнение.
                  Тег — только состояние, не кнопка: регистрацию предлагает агент
                  сообщением под билетом, инициатива его, а не гостя, который
                  должен догадаться тапнуть по тегу */
               '<div class="tkt-j-top">' +
                 '<span class="tkt-badge ' + (live ? "live" : "soon") +
                   '" data-legbadge>' + regLabel(regLeg) + "</span>" +
                 '<span class="tkt-j-no">' + first.no + "</span>" +
               "</div>" +
               legs.map(function(l){
                 return seg(l) + svc(l) + (l.stop ? stopbar(l.stop) : "");
               }).join("") +
               /* Ряды-переходы, точная копия «Удобства в номере» в карточке
                  номера: тот же .nav, та же высота, тот же разделитель.
                  Общие на бронь, поэтому стоят после всех рейсов.
                  Скрыты, но не удалены: разметка и обработчики [data-pax]
                  и [data-fare] на месте, тап открывает чат.
                  Вернуть: убрать hidden */
               '<div class="navs" hidden>' +
                 '<button class="nav" data-pax>' +
                   "\u041f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u044b" +
                   "<span>" + new Array(t.pax + 1).join(PAX_SVG) +
                   "</span><i>\u203a</i></button>" +
                 '<button class="nav" data-fare>' +
                   "\u0423\u0441\u043b\u043e\u0432\u0438\u044f \u0442\u0430\u0440\u0438\u0444\u0430" +
                   "<i>\u203a</i></button>" +
               "</div>" +
             "</div>";
    }

    [].forEach.call(document.querySelectorAll("[data-ticket]"), function(el){
      var t = TICKETS[el.dataset.ticket];
      if (!t) return;
      /* Раскладка одна. Раньше рядом лежали два скрытых варианта вёрстки —
         полный и компактный — со своими функциями и своим CSS; после того как
         раскладка утвердилась, они остались мёртвым весом и тянули за собой
         двадцать с лишним правил. Условия тарифа тоже были скрыты: их место
         заняли ряды «Пассажиры / Условия тарифа» ниже. */
      el.innerHTML = journey(t);
      /* Регистрация одна на всю бронь: нажатие → бегущие статусы → итог.
         После неё меняется вся картина билета, потому что меняется задача гостя:
           шильдик  «Регистрация до 05:40» → «Ожидает посадки» — срок отработал;
           мета     терминал и стойки → место. Стойки после онлайн-регистрации
                    не нужны совсем, а место нужно на посадке;
           кнопка   исчезает, вместо неё итог.
         Место пишем у своего рейса, а не списком в итоге: «места 12A и 12B,
         7A и 7B» не читается — непонятно, какая пара к какому сегменту. */
      /* Итог регистрации билет применяет сам, но запускает его агент: нудж
         с data-action="checkin" вызывает эту функцию, когда договорился.
         Бегущих статусов здесь нет — их показывает сам агент («думает»),
         дублировать их в билете значило бы показывать одно ожидание дважды */
      TICKET_CHECKIN.push(function(){
        /* тег меняет смысл: срок отработал, теперь важен факт.
           Влёт букв (SplitText) здесь — на теге меняется текст, а места
           просто появляются */
        [].forEach.call(el.querySelectorAll("[data-legbadge]"), function(b){
          b.textContent = "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d";
          b.classList.remove("soon");
          b.classList.remove("live");
          b.classList.add("done");
          splitIn(b);
        });
        /* места встают в ряд аэропорта, рядом с терминалом и гейтом: всё это
           нужно в один момент — когда идёшь на посадку */
        [].forEach.call(el.querySelectorAll("[data-cseat]"), function(node){
          node.hidden = false;
        });
      });
      /* пересадка: тап по плашке открывает разговор о стыковке. Успею ли,
         где ждать, забирать ли багаж — это вопросы к агенту, а не текст,
         который поместился бы в плашку на 100px */
      var stopChip = el.querySelector("[data-stopinfo]");
      if (stopChip) stopChip.onclick = function(){
        var parts = [];
        t.legs.forEach(function(l, i){
          if (!l.stop) return;
          var next = t.legs[i + 1];
          parts.push(l.stop.city + " \u2014 " + l.stop.wait +
            (next ? ", \u0434\u0430\u043b\u044c\u0448\u0435 " + next.no +
                    " \u0432 " + next.from.time : ""));
        });
        openAskSheet("\u041f\u0435\u0440\u0435\u0441\u0430\u0434\u043a\u0430 \u0432 " +
          parts.join("; ") + ". \u0427\u0442\u043e \u0443\u0442\u043e\u0447\u043d\u0438\u0442\u044c?",
          ["\u0423\u0441\u043f\u0435\u044e \u043d\u0430 \u0441\u0442\u044b\u043a\u043e\u0432\u043a\u0443?",
           "\u0413\u0434\u0435 \u0436\u0434\u0430\u0442\u044c?",
           "\u0417\u0430\u0431\u0438\u0440\u0430\u0442\u044c \u043b\u0438 \u0431\u0430\u0433\u0430\u0436?"]);
      };
      /* условия тарифа: подробности не занимают место в билете, а открываются
         разговором с агентом — там же можно сразу доплатить или уточнить */
      /* пассажиры: состав и документы — тоже разговор, а не таблица в билете */
      var pax = el.querySelector("[data-pax]");
      if (pax) pax.onclick = function(){
        openAskSheet("\u041b\u0435\u0442\u044f\u0442 " + t.pax + " " + paxWord(t.pax) +
          ". \u0427\u0442\u043e \u043d\u0443\u0436\u043d\u043e?",
          ["\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u0430\u0441\u0441\u0430\u0436\u0438\u0440\u0430",
           "\u041f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b",
           "\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435"]);
      };
      var fare = el.querySelector("[data-fare]");
      if (fare) fare.onclick = function(){
        openAskSheet(t.bag + ". \u041e\u0431\u043c\u0435\u043d \u0438 \u0432\u043e\u0437\u0432\u0440\u0430\u0442 " +
          "\u0441 \u0443\u0434\u0435\u0440\u0436\u0430\u043d\u0438\u0435\u043c. " +
          "\u0427\u0442\u043e \u0443\u0442\u043e\u0447\u043d\u0438\u0442\u044c?",
          ["\u0414\u043e\u043f\u043b\u0430\u0442\u0438\u0442\u044c \u0437\u0430 \u0431\u0430\u0433\u0430\u0436",
           "\u041c\u043e\u0436\u043d\u043e \u043b\u0438 \u043f\u043e\u043c\u0435\u043d\u044f\u0442\u044c \u0434\u0430\u0442\u0443",
           "\u0427\u0442\u043e \u043d\u0435\u043b\u044c\u0437\u044f \u0432 \u0440\u0443\u0447\u043d\u0443\u044e \u043a\u043b\u0430\u0434\u044c"]);
      };
    });

    /* ---- tab bars ---- */
    var MAP_ICON = "<svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M5.49219 20.1953C5.08594 20.1953 4.76302 20.0807 4.52344 19.8516C4.28385 19.6224 4.16406 19.3099 4.16406 18.9141V8.41406C4.16406 8.0599 4.23698 7.75781 4.38281 7.50781C4.53385 7.25781 4.77344 7.04167 5.10156 6.85938L8.67188 4.85156C9.00521 4.65885 9.36979 4.5625 9.76562 4.5625C10.1823 4.5625 10.5755 4.66927 10.9453 4.88281L14.8281 7.16406L18.4688 5.14062C18.6719 5.03125 18.8516 4.94271 19.0078 4.875C19.1693 4.80729 19.3359 4.77344 19.5078 4.77344C19.9141 4.77344 20.237 4.89323 20.4766 5.13281C20.7161 5.36719 20.8359 5.67969 20.8359 6.07031V16.5156C20.8359 16.8698 20.7604 17.1771 20.6094 17.4375C20.4635 17.6979 20.2266 17.9193 19.8984 18.1016L16.3281 20.1094C15.9531 20.3177 15.5625 20.4219 15.1562 20.4219C14.7448 20.4219 14.3438 20.3151 13.9531 20.1016L10.0703 17.9375L6.53125 19.8516C6.33333 19.9661 6.15365 20.0521 5.99219 20.1094C5.83594 20.1667 5.66927 20.1953 5.49219 20.1953ZM9.0625 16.2969V6.83594C9.02604 6.85677 8.98958 6.8776 8.95312 6.89844C8.92188 6.91406 8.88542 6.93229 8.84375 6.95312L6.28906 8.42188C6.16406 8.48958 6.07552 8.5651 6.02344 8.64844C5.97656 8.72656 5.95312 8.83333 5.95312 8.96875V17.6094C5.95312 17.776 6.01823 17.8594 6.14844 17.8594C6.19531 17.8594 6.25521 17.8411 6.32812 17.8047L9.0625 16.2969ZM10.9062 16.2031L13.8125 17.8359C13.8594 17.862 13.9062 17.888 13.9531 17.9141C14.0052 17.9349 14.0547 17.9583 14.1016 17.9844V8.92969L11.1484 7.19531C11.1068 7.17448 11.0651 7.15365 11.0234 7.13281C10.987 7.10677 10.9479 7.08333 10.9062 7.0625V16.2031ZM15.9453 18.0625C16.0026 18.026 16.0599 17.9922 16.1172 17.9609C16.1797 17.9297 16.2422 17.8958 16.3047 17.8594L18.7188 16.4766C18.8385 16.4089 18.9219 16.3333 18.9688 16.25C19.0208 16.1667 19.0469 16.0573 19.0469 15.9219V7.39062C19.0469 7.32292 19.026 7.26823 18.9844 7.22656C18.9427 7.17969 18.888 7.15625 18.8203 7.15625C18.7786 7.15625 18.7266 7.17188 18.6641 7.20312L15.9453 8.69531V18.0625Z\" fill=\"currentColor\"/></svg>";
    var TABS = [["home", MAP_ICON, "map"],["prep","Подготовка"],["today","Сегодня"],
                ["d05","5.07"],["d06","6.07"],["out","Выезд"]];
    function paintTabs(active){
      [].forEach.call(document.querySelectorAll("[data-tabs]"), function(bar){
        bar.innerHTML = TABS.map(function(t){
          var cls = 'tab' + (t[0]===active?' is-on':'') + (t[2]==='map'?' tab-map':'');
          return '<button class="'+cls+'"'+(t[0]?' data-go="'+t[0]+'"':'')+' aria-label="'+(t[2]==='map'?'Карта':t[1])+'">'+t[1]+'</button>';
        }).join("");
      });
      [].forEach.call(document.querySelectorAll("[data-go]"), function(b){
        b.onclick = function(){ show(b.dataset.go); };
      });
      /* keep the chosen tab inside the visible part of the row without
         touching the vertical scroll, which scrollIntoView would do */
      [].forEach.call(document.querySelectorAll("[data-tabs]"), function(bar){
        var on = bar.querySelector(".tab.is-on");
        if (!on) return;
        var left = on.offsetLeft, right = left + on.offsetWidth;
        if (left - 32 < bar.scrollLeft) bar.scrollLeft = Math.max(0, left - 32);
        else if (right + 32 > bar.scrollLeft + bar.clientWidth) bar.scrollLeft = right + 32 - bar.clientWidth;
      });
    }
    function show(key){
      var sc = document.getElementById("scroller");
      var hero = document.querySelector(".hero");
      var heroH = hero ? hero.offsetHeight : 0;
      [].forEach.call(document.querySelectorAll(".pane"), function(p){
        p.classList.toggle("is-on", p.dataset.tab === key);
      });
      document.getElementById("frame").dataset.tabView = key;
      paintTabs(key);
      /* переключение таба всегда прокручивает мимо обложки: контент начинается
         сразу под прибитой строкой табов. На карте обложки нет, там ноль */
      sc.scrollTop = key === "home" ? 0 : heroH;
      requestAnimationFrame(function(){
        centerFilms(); measureSky();
        var pane = document.querySelector(".pane.is-on");
        if (pane) [].forEach.call(pane.querySelectorAll("[data-nudge]"), function(n){
          if (n.__run) n.__run();
        });
      });
    }

    /* ---- Карта территории: перенос TerritoryMap + TimeRuler из ChiposhBooking.jsx ----
       Числа и формулы взяты из бандла один в один: карта 940×960, старт -260/-48,
       клампы по краям, порог перетаскивания 4px, фокус пина на 50%/62% рамки,
       линейка снапится по 10 минут в пределах -180…360, шаг 18px на 10 минут. */
    (function(){
      var terr = document.querySelector("[data-terr]");
      if (!terr) return;
      var box = terr.querySelector("[data-terrbox]");
      var plane = terr.querySelector("[data-plane]");
      var tip = terr.querySelector("[data-tip]");
      var tipText = terr.querySelector("[data-tiptext]");
      var tipMore = terr.querySelector("[data-tipmore]");
      var MAP_W = 940, MAP_H = 960;
      var pos = { x: -260, y: -48 };
      var drag = { down: false, x: 0, y: 0, sx: 0, sy: 0 }, moved = false;
      var activePin = null, offsetMinutes = 0, mapDate = new Date();

      var PIN_SETS = [
        [ { label:"Кино", x:39, y:31, scale:1, photo:"assets/img/pin-cinema.webp", text:"Через 5 минут начнется кинопоказ «Мой сосед Тоторо»" },
          { label:"Чай", x:58, y:55, scale:1.18, photo:"assets/img/pin-tea.webp", text:"Через 25 минут у костра будет травяной чай и пледы" } ],
        [ { label:"Закат", x:51, y:76, scale:1.3, photo:"assets/img/pin-sunset.webp", text:"Через 20 минут начнется закат — отсюда лучший вид" },
          { label:"Йога", x:45, y:45, scale:1.1, photo:"assets/img/pin-yoga.webp", text:"Через 40 минут начнется мягкая йога на поляне" },
          { label:"Ресторан", x:34, y:63, scale:1.2, photo:"assets/img/pin-restaurant.webp", text:"Через 15 минут откроется вечернее меню в ресторане" } ],
        [ { label:"Баня", x:61, y:56, scale:1.22, photo:"assets/img/pin-banya.webp", text:"Через 30 минут начнется коллективное парение. Приходите погреться!" },
          { label:"Маршрут", x:47, y:70, scale:1.05, photo:"assets/img/pin-yoga.webp", text:"Через 10 минут стартует короткая прогулка к роднику" } ],
        [ { label:"Костер", x:54, y:42, scale:1.3, photo:"assets/img/pin-tea.webp", text:"Через 15 минут начнется вечер у костра с гитарой" },
          { label:"Смотровая", x:66, y:69, scale:1.16, photo:"assets/img/pin-sunset.webp", text:"Через 35 минут гид поведет на смотровую над Катунью" },
          { label:"СПА", x:36, y:50, scale:1.08, photo:"assets/img/pin-banya.webp", text:"Свободное окно на массаж" } ]
      ];
      var setIdx = new Date().getHours() % 4;
      var pins = PIN_SETS[setIdx];

      function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }
      function bounds(){
        var W = box.clientWidth || 393, H = box.clientHeight || 872;
        return { minX: Math.min(0, W - MAP_W), minY: Math.min(0, H - MAP_H) };
      }
      function apply(){ plane.style.transform = "translate3d(" + pos.x + "px," + pos.y + "px,0)"; }

      /* pins are rebuilt whenever the ruler lands on another hour block,
         so the events on the map change with the time */
      function renderPins(){
        [].forEach.call(plane.querySelectorAll(".terr-pin"), function(p){ p.remove(); });
        pins.forEach(function(pin){
          var b = document.createElement("button");
          b.className = "terr-pin";
          b.setAttribute("aria-label", pin.label);
          b.style.left = pin.x + "%";
          b.style.top = pin.y + "%";
          var size = 48 * (pin.scale || 1);
          b.innerHTML = '<span style="width:' + size + 'px;height:' + size + 'px">' +
                        '<img src="' + pin.photo + '" alt="" draggable="false"></span>';
          b.addEventListener("pointerdown", function(e){ e.stopPropagation(); });
          b.addEventListener("click", function(e){
            e.stopPropagation();
            var next = activePin === pin.label ? null : pin.label;
            activePin = next;
            if (next){ focusPin(pin); showTip(pin); } else { tip.hidden = true; }
          });
          plane.appendChild(b);
        });
      }
      renderPins();

      function focusPin(pin){
        var W = box.clientWidth || 393, H = box.clientHeight || 872, b = bounds();
        pos.x = clamp(W * 0.5 - pin.x / 100 * MAP_W, b.minX, 0);
        pos.y = clamp(H * 0.62 - pin.y / 100 * MAP_H, b.minY, 0);
        apply();
        setTimeout(function(){ if (activePin === pin.label) showTip(pin); }, 340);
      }
      function tipCopy(pin){
        if (offsetMinutes === 0) return pin.text;
        var t = mapDate.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
        return pin.text.replace(/^Через \d+ минут /, "В " + t + " ");
      }
      /* окошко живёт внутри плоскости карты и позиционируется в её координатах,
         поэтому едет вместе с картой и всегда стоит над своим пином,
         а не прилипает к краю экрана */
      function showTip(pin){
        tipText.textContent = tipCopy(pin);
        tip.hidden = false;
        var th = tip.offsetHeight || 130;
        var px = pin.x / 100 * MAP_W, py = pin.y / 100 * MAP_H;
        var size = 48 * (pin.scale || 1);
        tip.style.left = clamp(px - 107, 8, MAP_W - 222) + "px";
        tip.style.top = clamp(py - size / 2 - 12 - th, 8, MAP_H - th - 8) + "px";
        tip.dataset.pin = pin.label;
      }
      tip.addEventListener("pointerdown", function(e){ e.stopPropagation(); });
      tipMore.addEventListener("click", function(e){
        e.stopPropagation();
        activePin = null; tip.hidden = true;
        document.body.classList.add("sheet-open");
      });

      /* drag the map */
      box.addEventListener("pointerdown", function(e){
        box.setPointerCapture && box.setPointerCapture(e.pointerId);
        drag = { down: true, x: e.clientX, y: e.clientY, sx: pos.x, sy: pos.y };
        moved = false;
        plane.classList.add("dragging"); box.classList.add("dragging");
      });
      box.addEventListener("pointermove", function(e){
        if (!drag.down) return;
        if (Math.abs(e.clientX - drag.x) > 4 || Math.abs(e.clientY - drag.y) > 4) moved = true;
        var b = bounds();
        pos.x = clamp(drag.sx + e.clientX - drag.x, b.minX, 0);
        pos.y = clamp(drag.sy + e.clientY - drag.y, b.minY, 0);
        apply();
      });
      function up(){ drag.down = false; plane.classList.remove("dragging"); box.classList.remove("dragging"); }
      box.addEventListener("pointerup", up);
      box.addEventListener("pointercancel", up);
      box.addEventListener("pointerleave", up);
      box.addEventListener("click", function(){ if (!moved){ activePin = null; tip.hidden = true; } });
      apply();

      /* ---- TimeRuler ---- */
      var ruler = terr.querySelector("[data-ruler]");
      var label = terr.querySelector("[data-rulerlabel]");
      var track = terr.querySelector("[data-track]");
      var base = new Date(), minutes = 0;
      var rdrag = { down: false, x: 0, m: 0 };
      for (var i = -36; i <= 36; i++){
        var t = document.createElement("i");
        t.style.height = (i === 0 ? 28 : i % 4 === 0 ? 24 : i % 2 === 0 ? 19 : 14) + "px";
        if (i === 0) t.style.background = "#fff";
        track.appendChild(t);
      }
      function dateFor(v){ return new Date(base.getTime() + v * 60000); }
      function fmt(v){
        if (v === 0) return "Сейчас";
        return dateFor(v).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
      }
      function paintRuler(){
        track.style.transform = "translateX(calc(-50% + " + (-minutes / 10 * 18) + "px))";
        label.textContent = fmt(minutes);
        mapDate = dateFor(minutes);
        offsetMinutes = minutes;
        var idx = mapDate.getHours() % 4;
        if (idx !== setIdx){
          setIdx = idx;
          pins = PIN_SETS[idx];
          activePin = null;
          tip.hidden = true;
          renderPins();
          return;
        }
        if (activePin){
          var pin = pins.filter(function(p){ return p.label === activePin; })[0];
          if (pin) tipText.textContent = tipCopy(pin);
        }
      }
      ruler.addEventListener("pointerdown", function(e){
        rdrag = { down: true, x: e.clientX, m: minutes };
        ruler.setPointerCapture && ruler.setPointerCapture(e.pointerId);
        track.classList.add("dragging");
      });
      ruler.addEventListener("pointermove", function(e){
        if (!rdrag.down) return;
        var next = clamp(Math.round((rdrag.m - (e.clientX - rdrag.x) / 1.25) / 10) * 10, -180, 360);
        if (next !== minutes){ minutes = next; paintRuler(); }
      });
      function rup(){ rdrag.down = false; track.classList.remove("dragging"); }
      ruler.addEventListener("pointerup", rup);
      ruler.addEventListener("pointercancel", rup);
      ruler.addEventListener("pointerleave", rup);
      paintRuler();
    })();

    /* ---- самолёт в билете ----
       Пролетает всю дорожку слева направо и уходит за правый край, растворяясь.
       Пружина той же модели, что spring() в motion: кадры считаем один раз и
       отдаём в WAAPI. Полёт повторяется при каждом показе панели, поэтому
       выглядит одинаково и на «Подготовке», и на «Выезде». */

    /* ---- hero parallax ----
       Same law as the bundle: heroY = useTransform(scrollY, [0, HERO], [0, -HERO*0.5]),
       i.e. the picture lags the page by half. The image is 150% of the box, which is
       exactly the slack the shift consumes, so no gap can open at the bottom. */
    (function(){
      var sc = document.getElementById("scroller"), hero = document.querySelector(".hero");
      if (!sc || !hero) return;
      var raf = null;
      function draw(){
        raf = null;
        var max = hero.offsetHeight || 360;
        var y = -Math.min(sc.scrollTop, max) * 0.5;
        hero.style.transform = "translate3d(0," + y.toFixed(1) + "px,0)";
      }
      sc.addEventListener("scroll", function(){
        document.body.classList.toggle("scrolled", sc.scrollTop > 8);
        if (!raf) raf = requestAnimationFrame(draw);
      }, { passive: true });
      draw();
    })();

    /* ---- agent chat: ported from AgentReplyDialog in ChiposhBooking.jsx ----
       same FAQ pills, same keyword replies, same 900ms delay before the agent
       answers, same ЙЦУКЕН keyboard. Two contexts: the general chat and
       "Что добавить в список?" opened from the checklist. */
    var HOTEL_FAQ = ["Во сколько выезд?", "Где завтрак?", "Есть парковка?"];
    var PACK_HINTS = ["Зонт", "Кроссовки для трекинга", "Аптечка", "Повербанк", "Термос"];
    var msgsBox = document.querySelector("[data-msgs]");
    var chatIn = document.querySelector("[data-chatinput]");
    var sendBtn = document.querySelector("[data-chatsend]");
    var closeBtn = document.querySelector(".chat-close");
    var kb = document.querySelector("[data-kb]");
    var mode = "chat", addTarget = null;

    function agentReply(q){
      var t = (q || "").toLowerCase();
      if (t.indexOf("выезд") > -1) return "Выезд до 12:00. Могу устроить поздний выезд — сказать?";
      if (t.indexOf("завтрак") > -1) return "Завтрак «шведский стол» в ресторане с 8:00 до 11:00. Или подам в номер.";
      if (t.indexOf("парков") > -1) return "Да, парковка бесплатная прямо у домика.";
      if (t.indexOf("ресепш") > -1 || t.indexOf("позвонить") > -1) return "Соединяю с ресепшеном — ответят через пару секунд.";
      return "Понял — сейчас всё организую и вернусь с деталями.";
    }
    function bubble(cls, text){
      var el = document.createElement("div");
      el.className = "bub " + cls;
      el.textContent = text;
      msgsBox.appendChild(el);
      msgsBox.scrollTop = msgsBox.scrollHeight;
      return el;
    }
    function push(t){
      if (!t || !t.trim()) return;
      clearPills();
      bubble("bub-user", t);
      setTimeout(function(){ bubble("bub-agent", agentReply(t)); }, 900);
    }
    function clearPills(){
      [].forEach.call(msgsBox.querySelectorAll(".bub-pill"), function(p){ p.remove(); });
    }
    function pills(list, onPick){
      /* не больше трёх тёмных кнопок за раз */
      list = list.slice(0, 3);
      list.forEach(function(txt, i){
        var b = document.createElement("button");
        b.className = "bub bub-pill" + (i === 0 ? " p-top" : "") +
                      (i === list.length - 1 ? " p-bot" : "");
        b.textContent = txt;
        /* снизу вверх, шаг мягче прежнего 0.07 */
        b.style.animationDelay = ((list.length - 1 - i) * 0.05) + "s";
        b.onclick = function(){ onPick(txt); };
        msgsBox.appendChild(b);
      });
    }
    function openSheet(){
      mode = "chat";
      msgsBox.innerHTML = "";
      chatIn.value = "";
      chatIn.placeholder = "Спросите о чём угодно";
      syncSend();
      pills(HOTEL_FAQ, push);
      document.body.classList.add("sheet-open");
    }
    function openAddSheet(){
      mode = "add";
      msgsBox.innerHTML = "";
      chatIn.value = "";
      chatIn.placeholder = "Что добавить в список?";
      syncSend();
      bubble("bub-agent", "Что добавить в список?");
      pills(PACK_HINTS, function(t){ addPackItem(t); closeSheet(); });
      document.body.classList.add("sheet-open");
    }
    function openAskSheet(message, chips){
      mode = "chat";
      msgsBox.innerHTML = "";
      chatIn.value = "";
      chatIn.placeholder = "Замените на что угодно";
      syncSend();
      bubble("bub-agent", message);
      pills(chips, push);
      document.body.classList.add("sheet-open");
    }
    /* тот же чат, что открывает свайп («Обсудить»/«Перенести»): реплика агента
       слева, подсказки-пилюли, полноэкранная шторка — а не узкий композер
       только с полем ввода. Ответ (пилюля или свой текст) сразу закрывает
       чат и уходит в думает()/think() самой карточки, а не в общий FAQ-чат */
    var askAnswer = null;
    function openNudgeAsk(message, onAnswer, chips){
      mode = "ask";
      askAnswer = onAnswer;
      msgsBox.innerHTML = "";
      chatIn.value = "";
      chatIn.placeholder = "Ответьте или выберите вариант";
      syncSend();
      bubble("bub-agent", message);
      /* подсказки задаёт вызывающий: у сообщения агента это «Да / Нет»,
         у брони — времена. Свой текст в поле работает в обоих случаях */
      pills(chips || ["Да", "Нет"], function(t){ closeSheet(); onAnswer(t); });
      document.body.classList.add("sheet-open");
    }
    /* набор без списка сообщений: поднимаем только поле и клавиатуру,
       а экран за ними гасим теми же классами, что при лонг-тапе */
    var composeSubmit = null, composeKeep = null;
    function dimAround(keep){
      var pane = keep ? keep.closest(".pane") : document.querySelector(".pane.is-on");
      if (pane) [].forEach.call(pane.children, function(c){ if (c !== keep) c.classList.add("lp-dim"); });
      [".tabbar .tabs", ".hero"].forEach(function(sel){
        var el = document.querySelector(sel);
        if (el) el.classList.add("lp-dim");
      });
    }
    function undim(){
      [].forEach.call(document.querySelectorAll(".lp-dim"), function(e){ e.classList.remove("lp-dim"); });
    }
    var composeSkip = null;
    function openCompose(placeholder, keep, onSubmit, onSkip){
      composeSkip = onSkip || null;
      mode = "compose";
      composeSubmit = onSubmit || null;
      composeKeep = keep || null;
      msgsBox.innerHTML = "";
      chatIn.value = "";
      chatIn.placeholder = placeholder || "Спросите о чём угодно";
      syncSend();
      dimAround(keep);
      document.body.classList.add("compose", "sheet-open");
      syncSend();
    }
    function closeCompose(){
      document.body.classList.remove("compose", "sheet-open");
      undim();
      composeSubmit = null; composeKeep = null; composeSkip = null;
      mode = "chat";
    }
    function closeSheet(){
      if (document.body.classList.contains("compose")){ closeCompose(); return; }
      document.body.classList.remove("sheet-open");
    }

    function addPackItem(text){
      var list = addTarget;
      var proto = list && list.querySelector(".li:not(.add)");
      if (!list || !proto) return;
      var row = proto.cloneNode(true);
      row.classList.remove("on");
      row.querySelector("b").textContent = text;
      row.onclick = function(){ row.classList.toggle("on"); };
      list.insertBefore(row, list.querySelector(".li.add"));
    }

    function submit(){
      var t = chatIn.value;
      chatIn.value = "";
      syncSend();
      if (mode === "add"){ if (t.trim()){ addPackItem(t.trim()); closeSheet(); } return; }
      if (mode === "compose"){
        var cb = composeSubmit;
        closeCompose();
        if (cb && t.trim()) cb(t.trim());
        return;
      }
      if (mode === "ask"){
        var ask = askAnswer;
        closeSheet();
        if (ask && t.trim()) ask(t.trim());
        return;
      }
      push(t);
    }
    function syncSend(){
      var has = !!chatIn.value.trim();
      sendBtn.hidden = !has;
      closeBtn.hidden = has;
      /* «Пропустить» имеет смысл только пока ничего не набрано */
      var skipBtn = document.querySelector("[data-skip]");
      if (skipBtn) skipBtn.hidden = has || !document.body.classList.contains("compose");
      if (has) clearPills();
    }
    document.addEventListener("click", function(e){
      if (!e.target.closest("[data-skip]")) return;
      var skip = composeSkip;
      closeCompose();
      if (skip) skip();                  /* «Пропустить» просто убирает комментарий */
    });
    chatIn.addEventListener("input", syncSend);
    chatIn.addEventListener("keydown", function(e){ if (e.key === "Enter"){ e.preventDefault(); submit(); } });
    sendBtn.onclick = submit;

    /* ЙЦУКЕН, key sizes and colours copied from the bundle */
    (function(){
      var rows = ["йцукенгшщзхъ", "фывапролджэ", "ячсмитьбю"];
      function key(label, opts){
        opts = opts || {};
        return '<button' + (opts.dark ? ' class="dark"' : '') +
               (opts.flex ? ' style="flex:' + opts.flex + '"' : '') +
               (opts.act ? ' data-k="' + opts.act + '"' : '') + '>' + label + '</button>';
      }
      var html = "";
      html += '<div class="kb-row">' + rows[0].split("").map(function(c){ return key(c.toUpperCase(), {act:c}); }).join("") + "</div>";
      html += '<div class="kb-row mid">' + rows[1].split("").map(function(c){ return key(c.toUpperCase(), {act:c}); }).join("") + "</div>";
      html += '<div class="kb-row">' + key("⇧", {dark:true, flex:1.5}) +
              rows[2].split("").map(function(c){ return key(c.toUpperCase(), {act:c}); }).join("") +
              key("⌫", {dark:true, flex:1.5, act:"\\b"}) + "</div>";
      html += '<div class="kb-row">' + key("123", {dark:true, flex:1.4}) +
              key("пробел", {flex:5, act:" "}) +
              key("готово", {dark:true, flex:1.8, act:"\\n"}) + "</div>";
      kb.innerHTML = html;
      kb.addEventListener("click", function(e){
        var b = e.target.closest("button[data-k]");
        if (!b) return;
        var k = b.getAttribute("data-k");
        if (k === "\\b") chatIn.value = chatIn.value.slice(0, -1);
        else if (k === "\\n"){ submit(); return; }
        else chatIn.value += k;
        syncSend();
      });
    })();

    document.addEventListener("click", function(e){
      var addBtn = e.target.closest("[data-add-ask]");
      if (addBtn){ addTarget = addBtn.closest(".list"); openAddSheet(); return; }
      if (e.target.closest("[data-ask]")) openSheet();
      else if (e.target.closest("[data-close]")) closeSheet();
    });
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeSheet(); });

    /* ---- стопка агента ----
       Двухфазное раскрытие из бандла: сначала открывается место (высота 0.42s,
       [0.33,0,0.15,1]), потом выпадают карты со сдвигом по времени.
       Лицевую карту не трогаем: она остаётся первой, а высоту анимирует только
       остаток. Раньше здесь мерялась и складывалась в ноль высота лицевой части
       (offsetHeight на первом тапе, потому что экран мог быть display:none) —
       всё это стало ненужным вместе с подменой. */
    [].forEach.call(document.querySelectorAll("[data-deck]"), function(deck){
      var rest = deck.querySelector("[data-rest]");
      if (!rest) return;
      function open(){
        rest.style.height = rest.scrollHeight + "px";
        deck.classList.add("open");
      }
      function close(){
        deck.classList.remove("open");
        rest.style.height = "0px";
      }
      /* раскрытие теперь чисто визуальное: карточки выпадают на месте,
         страница сама больше никуда не едет */
      deck.addEventListener("click", function(e){
        if (e.target.closest("[data-hide]")){ close(); return; }
        if (!deck.classList.contains("open")) open();
      });
    });

    /* ---- drag-to-scroll rails ----
       Touch already swipes them; this adds mouse dragging, the same way the
       tab row does it in the bundle (pointerdown / move / up over scrollLeft).
       A move under 4px is still treated as a tap, so buttons keep working. */
    [].forEach.call(document.querySelectorAll("[data-rail]"), function(rail){
      var down = false, startX = 0, startLeft = 0, moved = false;
      rail.addEventListener("pointerdown", function(e){
        if (e.pointerType === "touch") return;
        down = true; moved = false; startX = e.clientX; startLeft = rail.scrollLeft;
      });
      rail.addEventListener("pointermove", function(e){
        if (!down) return;
        var dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 4){ moved = true; rail.classList.add("dragging"); }
        if (moved){ rail.scrollLeft = startLeft - dx; e.preventDefault(); }
      });
      function end(){ down = false; rail.classList.remove("dragging"); }
      rail.addEventListener("pointerup", end);
      rail.addEventListener("pointercancel", end);
      rail.addEventListener("pointerleave", end);
      rail.addEventListener("click", function(e){ if (moved){ e.stopPropagation(); e.preventDefault(); } }, true);
      rail.addEventListener("dragstart", function(e){ e.preventDefault(); });
    });

    /* сообщение агента висит поверх контента, поэтому перед работой с бронью
       его надо убрать, иначе оно закрывает пилюли и текст */
    var nudgeFolders = [];
    function foldNudges(){ nudgeFolders.forEach(function(f){ f(); }); }

    /* ---- booking flow ----
       tap a time -> "Проверяю свободные слоты" in mint -> after the pause the
       first-person result plus a lime "бронь HH:MM" chip next to the title.
       Same предложение → думает → итог lifecycle the agent panels use. */
    function initBooking(ev){
      var ask = ev.querySelector("[data-bookask]");
      var state = ev.querySelector("[data-bookstate]");
      var msg = ev.querySelector("[data-bookmsg]");
      var chip = ev.querySelector("[data-bookchip]");
      var row = ev.querySelector("[data-bookrow]");
      var ring = ev.querySelector("[data-ring]");
      var STATES = ["Проверяю свободные слоты", "Согласовываю с рестораном", "Почти готово"];
      var timer = null, hide = null, cycle = null, HOLD = 3000;
      /* время брони держим отдельно: разбирать его обратно из текста тега
         («бронь 12:00») значит завязаться на формулировку */
      var booked = "";
      function closeRow(){
        clearTimeout(hide);
        clearInterval(cycle);
        row.classList.add("fade");
        setTimeout(function(){ row.hidden = true; row.classList.remove("fade"); }, 360);
      }
      /* Сама бронь вынесена в функцию на карточке: её зовёт и свайп «Бронь»
         через чат, и пилюли под фото (они скрыты, но живы). Раньше логика
         висела внутри onclick пилюли, и добраться до неё из чата было нельзя */
      ev.__book = function(t){
        if (!t || t === "Другое") return;
        foldNudges();
        /* спрашивали в чате, поэтому строка выбора под фото не показывается —
           сразу бегущие статусы и итог */
        ask.hidden = true;
        row.hidden = false;
        row.classList.remove("fade");
        state.hidden = false;
        state.classList.add("is-wait");
        if (chip) chip.hidden = true;
        state.classList.remove("is-done");
        /* бегущие статусы, как ADDING_STATES в бандле */
        var si = 0;
        msg.textContent = STATES[0];
        clearInterval(cycle);
        cycle = setInterval(function(){
          si = Math.min(si + 1, STATES.length - 1);
          msg.textContent = STATES[si];
        }, 800);
        clearTimeout(timer);
        timer = setTimeout(function(){
          clearInterval(cycle);
          state.classList.remove("is-wait");
          msg.textContent = "Забронировал столик на " + t;
          booked = t;
          if (chip){ chip.textContent = "бронь " + t; chip.hidden = false; }
          /* результат живёт HOLD, потом строка сама уходит; чип с бронью остаётся.
             Кольцо вокруг крестика идёт ровно те же HOLD, отсюда и длительность. */
          ring.style.animationDuration = HOLD + "ms";
          state.classList.add("is-done");
          clearTimeout(hide);
          hide = setTimeout(closeRow, HOLD);
        }, 800 * STATES.length);
      };
      [].forEach.call(ev.querySelectorAll("[data-times] .pill"), function(b){
        b.onclick = function(){ ev.__book(b.textContent); };
      });
      var closeBtnEl = ev.querySelector("[data-bookclose]");
      if (closeBtnEl) closeBtnEl.onclick = function(e){ e.stopPropagation(); closeRow(); };
      /* Тег брони — свой разговор, а не общий чат события. Без этого обработчика
         тап проваливался на карточку и открывал её обычное «Спрошу про …»,
         где про саму бронь ничего нет. stopPropagation обязателен: иначе после
         нашей шторки открывалась бы ещё и карточкина */
      if (chip) chip.onclick = function(e){
        e.stopPropagation();
        openAskSheet("\u0421\u0442\u043e\u043b\u0438\u043a \u0437\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u043d \u043d\u0430 " +
          booked + ". \u0427\u0442\u043e \u0441\u0434\u0435\u043b\u0430\u0442\u044c?",
          ["\u041f\u0435\u0440\u0435\u043d\u0435\u0441\u0442\u0438 \u0432\u0440\u0435\u043c\u044f",
           "\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0447\u0438\u0441\u043b\u043e \u0433\u043e\u0441\u0442\u0435\u0439",
           "\u041f\u0440\u0435\u0434\u0443\u043f\u0440\u0435\u0434\u0438\u0442\u044c, \u0447\u0442\u043e \u043e\u043f\u043e\u0437\u0434\u0430\u0435\u043c",
           "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c \u0431\u0440\u043e\u043d\u044c"]);
      };
    }
    [].forEach.call(document.querySelectorAll("[data-book]"), initBooking);

    /* Тег заезда работает как тег брони у события: тап открывает разговор,
       где время можно передвинуть.
       Атрибут отдельный (data-checkindate), а не общий data-checkin: тот же
       атрибут носит кнопка «Онлайн-регистрация» в билете, и она стоит выше по
       документу. Общий селектор доставал её, переписывал ей onclick и вместо
       регистрации открывалась эта шторка */
    (function(){
      var chip = document.querySelector("[data-checkindate]");
      if (!chip) return;
      chip.onclick = function(){
        openAskSheet("\u0417\u0430\u0435\u0437\u0434 \u0432 12:00. \u041c\u043e\u0433\u0443 \u0443\u0441\u0442\u0440\u043e\u0438\u0442\u044c \u0440\u0430\u043d\u043d\u0438\u0439 \u2014 \u0432\u043e \u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0443\u0434\u043e\u0431\u043d\u043e?",
          ["\u041a 9:00", "\u041a 10:00", "\u041a 11:00", "\u041e\u0441\u0442\u0430\u0432\u0438\u0442\u044c 12:00"]);
      };
    })();

    /* ---- свайп по событию ----
       Как в iOS Mail: горизонтальная тяга 1:1 до открытого положения, за ним
       резинка UIScrollView (c = 0.55), отпускание решается по скорости, снап
       пружиной с лёгким овершутом (k 340 / c 34 — та же модель, что springFrames,
       но с начальной скоростью броска). Действия выезжают из-под карточки на
       половинной скорости: тот же параллакс, что у нативных swipe actions.
       Открыта всегда одна карточка; прокрутка, тап мимо и смена таба закрывают. */
    /* варианты замены: чем занять слот вместо этого события */
    var PLAN_SWAP = ["\u0414\u0440\u0443\u0433\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",
                     "\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0441\u043f\u043e\u043a\u043e\u0439\u043d\u0435\u0435",
                     "\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0430\u043a\u0442\u0438\u0432\u043d\u0435\u0435",
                     "\u041f\u043e\u0434\u0431\u0435\u0440\u0438 \u0441\u0430\u043c"];
    var PLAN_ASK  = ["\u0427\u0442\u043e \u0432\u0437\u044f\u0442\u044c \u0441 \u0441\u043e\u0431\u043e\u0439", "\u0421\u043a\u043e\u043b\u044c\u043a\u043e \u043f\u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438", "\u041c\u043e\u0436\u043d\u043e \u0441 \u0434\u0435\u0442\u044c\u043c\u0438", "\u041d\u0430 \u0447\u0442\u043e \u0437\u0430\u043c\u0435\u043d\u0438\u0442\u044c"];
    (function(){
      var frame = document.getElementById("frame");
      if (!frame) return;
      var LOCK = 8;
      var SLOW = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var ICO = {
        talk: '<svg viewBox="4 4 24 24" fill="none"><path d="M16.4902 24.5723C14.3353 24.5723 12.4017 24.1816 10.6895 23.4004C10.1882 23.765 9.60872 24.0514 8.95117 24.2598C8.29362 24.4681 7.62956 24.5723 6.95898 24.5723C6.74414 24.5723 6.57812 24.5267 6.46094 24.4355C6.34375 24.3444 6.28516 24.2305 6.28516 24.0938C6.29167 23.9635 6.36979 23.8333 6.51953 23.7031C6.8125 23.4297 7.02409 23.1562 7.1543 22.8828C7.28451 22.6029 7.34961 22.2741 7.34961 21.8965C7.34961 21.5449 7.27799 21.2129 7.13477 20.9004C6.99154 20.5814 6.8125 20.2493 6.59766 19.9043C6.38281 19.5592 6.16797 19.1719 5.95312 18.7422C5.73828 18.306 5.55924 17.7982 5.41602 17.2188C5.27279 16.6393 5.20117 15.959 5.20117 15.1777C5.20117 13.8171 5.47786 12.5638 6.03125 11.418C6.59115 10.2721 7.37565 9.2793 8.38477 8.43945C9.40039 7.5931 10.5951 6.9388 11.9688 6.47656C13.349 6.01432 14.8561 5.7832 16.4902 5.7832C18.1243 5.7832 19.6283 6.01432 21.002 6.47656C22.3822 6.9388 23.5801 7.5931 24.5957 8.43945C25.6113 9.2793 26.3958 10.2721 26.9492 11.418C27.5091 12.5638 27.7891 13.8171 27.7891 15.1777C27.7891 16.5384 27.5091 17.7917 26.9492 18.9375C26.3958 20.0833 25.6113 21.0794 24.5957 21.9258C23.5866 22.7656 22.3919 23.4167 21.0117 23.8789C19.638 24.3411 18.1309 24.5723 16.4902 24.5723ZM11.8418 16.6816C12.2454 16.6816 12.5905 16.5384 12.877 16.252C13.1634 15.9655 13.3066 15.6204 13.3066 15.2168C13.3066 14.8132 13.1602 14.4681 12.8672 14.1816C12.5807 13.8952 12.2389 13.752 11.8418 13.752C11.4382 13.752 11.0931 13.8952 10.8066 14.1816C10.5202 14.4681 10.377 14.8132 10.377 15.2168C10.377 15.6204 10.5202 15.9655 10.8066 16.252C11.0931 16.5384 11.4382 16.6816 11.8418 16.6816ZM16.5391 16.6816C16.9492 16.6816 17.2943 16.5384 17.5742 16.252C17.8607 15.9655 18.0039 15.6204 18.0039 15.2168C18.0039 14.8132 17.8607 14.4681 17.5742 14.1816C17.2943 13.8952 16.9492 13.752 16.5391 13.752C16.1354 13.752 15.7904 13.8952 15.5039 14.1816C15.224 14.4681 15.084 14.8132 15.084 15.2168C15.084 15.6204 15.224 15.9655 15.5039 16.252C15.7904 16.5384 16.1354 16.6816 16.5391 16.6816ZM21.2461 16.6816C21.6432 16.6816 21.985 16.5384 22.2715 16.252C22.5645 15.9655 22.7109 15.6204 22.7109 15.2168C22.7109 14.8132 22.5645 14.4681 22.2715 14.1816C21.985 13.8952 21.6432 13.752 21.2461 13.752C20.8424 13.752 20.4974 13.8952 20.2109 14.1816C19.9245 14.4681 19.7812 14.8132 19.7812 15.2168C19.7812 15.6204 19.9245 15.9655 20.2109 16.252C20.4974 16.5384 20.8424 16.6816 21.2461 16.6816Z" fill="#1CA658"/></svg>',
        swap: '<svg viewBox="4 4 24 24" fill="none"><path d="M16.5 25.2949C15.3086 25.2949 14.1921 25.0703 13.1504 24.6211C12.1087 24.1784 11.1908 23.5632 10.3965 22.7754C9.60872 21.9811 8.99023 21.0632 8.54102 20.0215C8.09831 18.9798 7.87695 17.8633 7.87695 16.6719C7.87695 15.4805 8.09831 14.3639 8.54102 13.3223C8.99023 12.2806 9.60872 11.3659 10.3965 10.5781C11.1908 9.78385 12.1087 9.16536 13.1504 8.72266C14.1921 8.27344 15.3086 8.04883 16.5 8.04883C17.0208 8.04883 17.5286 8.0944 18.0234 8.18555C18.5182 8.27669 18.9902 8.4069 19.4395 8.57617C19.5762 8.62826 19.7161 8.70964 19.8594 8.82031C20.0026 8.93099 20.071 9.11003 20.0645 9.35742C20.0645 9.55924 20.0059 9.72526 19.8887 9.85547C19.778 9.97917 19.638 10.0605 19.4688 10.0996C19.2995 10.1322 19.1335 10.1159 18.9707 10.0508C18.5801 9.90755 18.1797 9.80013 17.7695 9.72852C17.3594 9.65039 16.9362 9.61133 16.5 9.61133C15.5299 9.61133 14.6185 9.79362 13.7656 10.1582C12.9128 10.5228 12.1608 11.0306 11.5098 11.6816C10.8652 12.3262 10.3607 13.0749 9.99609 13.9277C9.63151 14.7806 9.44922 15.6921 9.44922 16.6621C9.44922 17.6387 9.63151 18.5534 9.99609 19.4062C10.3607 20.2591 10.8652 21.0078 11.5098 21.6523C12.1608 22.2969 12.9128 22.8014 13.7656 23.166C14.6185 23.5306 15.5299 23.7129 16.5 23.7129C17.4766 23.7129 18.3913 23.5306 19.2441 23.166C20.097 22.8014 20.8457 22.2969 21.4902 21.6523C22.1348 21.0078 22.6393 20.2591 23.0039 19.4062C23.3685 18.5534 23.5508 17.6387 23.5508 16.6621C23.5508 16.4473 23.6289 16.265 23.7852 16.1152C23.9414 15.959 24.127 15.8809 24.3418 15.8809C24.5566 15.8809 24.7389 15.959 24.8887 16.1152C25.0449 16.265 25.123 16.4473 25.123 16.6621C25.123 17.86 24.8984 18.9798 24.4492 20.0215C24.0065 21.0632 23.388 21.9811 22.5938 22.7754C21.806 23.5632 20.8913 24.1784 19.8496 24.6211C18.8079 25.0703 17.6914 25.2949 16.5 25.2949ZM19.1465 9.2207L15.5918 5.68555C15.5137 5.60742 15.4583 5.51953 15.4258 5.42188C15.3932 5.32422 15.377 5.22331 15.377 5.11914C15.377 4.89779 15.4486 4.70898 15.5918 4.55273C15.7415 4.39648 15.9238 4.31836 16.1387 4.31836C16.36 4.31836 16.5521 4.39974 16.7148 4.5625L20.7285 8.64453C20.8978 8.80729 20.9824 9.0026 20.9824 9.23047C20.9824 9.34115 20.9629 9.44531 20.9238 9.54297C20.8848 9.64062 20.8197 9.73177 20.7285 9.81641L16.7051 13.8594C16.5488 14.0091 16.36 14.084 16.1387 14.084C15.9238 14.084 15.7415 14.0091 15.5918 13.8594C15.4486 13.7096 15.377 13.5208 15.377 13.293C15.377 13.1953 15.3932 13.0977 15.4258 13C15.4583 12.9023 15.5169 12.8177 15.6016 12.7461L19.1465 9.2207Z" fill="#1CA658"/></svg>',
        book: '<svg viewBox="0 0 24 24" fill="none"><path d="M5.16382 19.709C4.26945 19.709 3.59725 19.4868 3.14722 19.0425C2.70288 18.6038 2.48071 17.943 2.48071 17.0601V6.62671C2.48071 5.74373 2.70288 5.08293 3.14722 4.64429C3.59725 4.19995 4.26945 3.97778 5.16382 3.97778H16.8362C17.7306 3.97778 18.3999 4.19995 18.8442 4.64429C19.2886 5.08293 19.5107 5.74373 19.5107 6.62671V11.5059C19.4025 11.4888 19.2914 11.4774 19.1775 11.4717C19.0636 11.466 18.9496 11.4631 18.8357 11.4631C18.7218 11.4631 18.6078 11.4688 18.4939 11.4802C18.38 11.4859 18.2603 11.4945 18.135 11.5059V9.0791C18.135 8.68604 18.0325 8.38981 17.8274 8.19043C17.6223 7.98535 17.3289 7.88281 16.9473 7.88281H5.03564C4.65967 7.88281 4.36914 7.98535 4.16406 8.19043C3.95898 8.38981 3.85645 8.68604 3.85645 9.0791V17.137C3.85645 17.53 3.95898 17.8263 4.16406 18.0256C4.36914 18.2307 4.65967 18.3333 5.03564 18.3333H13.5037C13.5606 18.5782 13.6347 18.8146 13.7258 19.0425C13.8227 19.276 13.9338 19.4982 14.0591 19.709H5.16382ZM9.3252 10.9504C9.17708 10.9504 9.0717 10.9248 9.00903 10.8735C8.95207 10.8166 8.92358 10.714 8.92358 10.5659V10.0618C8.92358 9.91366 8.95207 9.81112 9.00903 9.75415C9.0717 9.69718 9.17708 9.6687 9.3252 9.6687H9.82935C9.97746 9.6687 10.08 9.69718 10.137 9.75415C10.1996 9.81112 10.231 9.91366 10.231 10.0618V10.5659C10.231 10.714 10.1996 10.8166 10.137 10.8735C10.08 10.9248 9.97746 10.9504 9.82935 10.9504H9.3252ZM12.1707 10.9504C12.0168 10.9504 11.9115 10.9248 11.8545 10.8735C11.7975 10.8166 11.769 10.714 11.769 10.5659V10.0618C11.769 9.91366 11.7975 9.81112 11.8545 9.75415C11.9115 9.69718 12.0168 9.6687 12.1707 9.6687H12.6663C12.8201 9.6687 12.9255 9.69718 12.9824 9.75415C13.0394 9.81112 13.0679 9.91366 13.0679 10.0618V10.5659C13.0679 10.714 13.0394 10.8166 12.9824 10.8735C12.9255 10.9248 12.8201 10.9504 12.6663 10.9504H12.1707ZM15.0076 10.9504C14.8538 10.9504 14.7484 10.9248 14.6914 10.8735C14.6344 10.8166 14.606 10.714 14.606 10.5659V10.0618C14.606 9.91366 14.6344 9.81112 14.6914 9.75415C14.7484 9.69718 14.8538 9.6687 15.0076 9.6687H15.5117C15.6598 9.6687 15.7624 9.69718 15.8193 9.75415C15.8763 9.81112 15.9048 9.91366 15.9048 10.0618V10.5659C15.9048 10.714 15.8763 10.8166 15.8193 10.8735C15.7624 10.9248 15.6598 10.9504 15.5117 10.9504H15.0076ZM6.48828 13.7446C6.33447 13.7446 6.22909 13.719 6.17212 13.6677C6.11515 13.6108 6.08667 13.5082 6.08667 13.3601V12.856C6.08667 12.7078 6.11515 12.6082 6.17212 12.5569C6.22909 12.4999 6.33447 12.4714 6.48828 12.4714H6.99243C7.14054 12.4714 7.24308 12.4999 7.30005 12.5569C7.35701 12.6082 7.3855 12.7078 7.3855 12.856V13.3601C7.3855 13.5082 7.35701 13.6108 7.30005 13.6677C7.24308 13.719 7.14054 13.7446 6.99243 13.7446H6.48828ZM9.3252 13.7446C9.17708 13.7446 9.0717 13.719 9.00903 13.6677C8.95207 13.6108 8.92358 13.5082 8.92358 13.3601V12.856C8.92358 12.7078 8.95207 12.6082 9.00903 12.5569C9.0717 12.4999 9.17708 12.4714 9.3252 12.4714H9.82935C9.97746 12.4714 10.08 12.4999 10.137 12.5569C10.1996 12.6082 10.231 12.7078 10.231 12.856V13.3601C10.231 13.5082 10.1996 13.6108 10.137 13.6677C10.08 13.719 9.97746 13.7446 9.82935 13.7446H9.3252ZM12.1707 13.7446C12.0168 13.7446 11.9115 13.719 11.8545 13.6677C11.7975 13.6108 11.769 13.5082 11.769 13.3601V12.856C11.769 12.7078 11.7975 12.6082 11.8545 12.5569C11.9115 12.4999 12.0168 12.4714 12.1707 12.4714H12.6663C12.8201 12.4714 12.9255 12.4999 12.9824 12.5569C13.0394 12.6082 13.0679 12.7078 13.0679 12.856V13.3601C13.0679 13.5082 13.0394 13.6108 12.9824 13.6677C12.9255 13.719 12.8201 13.7446 12.6663 13.7446H12.1707ZM6.48828 16.5474C6.33447 16.5474 6.22909 16.5189 6.17212 16.4619C6.11515 16.4049 6.08667 16.3024 6.08667 16.1543V15.6501C6.08667 15.502 6.11515 15.4023 6.17212 15.3511C6.22909 15.2941 6.33447 15.2656 6.48828 15.2656H6.99243C7.14054 15.2656 7.24308 15.2941 7.30005 15.3511C7.35701 15.4023 7.3855 15.502 7.3855 15.6501V16.1543C7.3855 16.3024 7.35701 16.4049 7.30005 16.4619C7.24308 16.5189 7.14054 16.5474 6.99243 16.5474H6.48828ZM9.3252 16.5474C9.17708 16.5474 9.0717 16.5189 9.00903 16.4619C8.95207 16.4049 8.92358 16.3024 8.92358 16.1543V15.6501C8.92358 15.502 8.95207 15.4023 9.00903 15.3511C9.0717 15.2941 9.17708 15.2656 9.3252 15.2656H9.82935C9.97746 15.2656 10.08 15.2941 10.137 15.3511C10.1996 15.4023 10.231 15.502 10.231 15.6501V16.1543C10.231 16.3024 10.1996 16.4049 10.137 16.4619C10.08 16.5189 9.97746 16.5474 9.82935 16.5474H9.3252ZM12.1707 16.5474C12.0168 16.5474 11.9115 16.5189 11.8545 16.4619C11.7975 16.4049 11.769 16.3024 11.769 16.1543V15.6501C11.769 15.502 11.7975 15.4023 11.8545 15.3511C11.9115 15.2941 12.0168 15.2656 12.1707 15.2656H12.6663C12.8201 15.2656 12.9255 15.2941 12.9824 15.3511C13.0394 15.4023 13.0679 15.502 13.0679 15.6501V16.1543C13.0679 16.3024 13.0394 16.4049 12.9824 16.4619C12.9255 16.5189 12.8201 16.5474 12.6663 16.5474H12.1707ZM18.8357 21.3154C18.2432 21.3154 17.685 21.2015 17.1609 20.9736C16.6368 20.7515 16.1754 20.441 15.7766 20.0422C15.3778 19.6435 15.0645 19.182 14.8367 18.658C14.6088 18.1339 14.4949 17.5728 14.4949 16.9746C14.4949 16.3765 14.6088 15.8182 14.8367 15.2998C15.0645 14.7757 15.3778 14.3143 15.7766 13.9155C16.1754 13.5111 16.6368 13.1978 17.1609 12.9756C17.685 12.7477 18.2432 12.6338 18.8357 12.6338C19.4338 12.6338 19.995 12.7477 20.519 12.9756C21.0431 13.1978 21.5046 13.5082 21.9033 13.907C22.3021 14.3057 22.6125 14.7672 22.8347 15.2913C23.0626 15.8153 23.1765 16.3765 23.1765 16.9746C23.1765 17.5671 23.0626 18.1253 22.8347 18.6494C22.6069 19.1735 22.2907 19.6349 21.8862 20.0337C21.4875 20.4325 21.026 20.7458 20.502 20.9736C19.9779 21.2015 19.4224 21.3154 18.8357 21.3154ZM18.323 19.3159C18.5224 19.3159 18.6705 19.2476 18.7673 19.1108L21.2539 15.6672C21.2938 15.6103 21.3223 15.5533 21.3394 15.4963C21.3621 15.4394 21.3735 15.3881 21.3735 15.3425C21.3735 15.1887 21.3194 15.0634 21.2112 14.9666C21.1029 14.864 20.9776 14.8127 20.8352 14.8127C20.6472 14.8127 20.4963 14.8925 20.3823 15.052L18.2974 17.9402L17.2463 16.8037C17.2008 16.7524 17.1438 16.7097 17.0754 16.6755C17.0071 16.6414 16.9273 16.6243 16.8362 16.6243C16.6881 16.6243 16.5627 16.6755 16.4602 16.7781C16.3577 16.8806 16.3064 17.0088 16.3064 17.1626C16.3064 17.2196 16.3178 17.2851 16.3406 17.3591C16.3634 17.4275 16.3975 17.4902 16.4431 17.5471L17.8958 19.1279C17.947 19.1906 18.0125 19.2362 18.0923 19.2646C18.172 19.2988 18.2489 19.3159 18.323 19.3159Z" fill="#1CA658"/></svg>'
      };
      var opened = null, g = null;
      /* пилюля с иконкой и подпись под ней */
      function act(key, cap){
        return '<button class="sw-act" data-act="' + key + '" aria-label="' + cap + '">' +
               '<span>' + ICO[key] + '</span><i class="sw-cap">' + cap + '</i></button>';
      }
      /* ход считаем по числу пилюль: у карточек с бронью (data-book) их три,
         у остальных две. Отступ в покое тот же принцип — плюс 4% на всю ширину */
      /* Ход свайпа = ширина группы кнопок ПЛЮС зазор, иначе правый край
         картинки останавливается вплотную к первой пилюле и они склеиваются.
         Зазор равен просвету между пилюлями (16), чтобы ритм был один:
         n * 81 + (n - 1) * 16 + 16 сводится к n * 97 */
      var SW_W = 81, SW_GAP = 16;
      function openFor(n){ return n * (SW_W + SW_GAP); }

      /* Свайпается не только .ev: события внутри стопки — обычные div в
         .deck-rest, и .closest(".ev") у них даёт всю стопку. Её свайпать нельзя
         (она целиком раскрывается тапом), поэтому проверяем стопку первой и
         возвращаем сам внутренний блок.
         «Свернуть» отсекается сама: у неё нет .media */
      function cardOf(node){
        if (!node || !node.closest) return null;
        var inner = node.closest(".pane [data-deck] .deck-rest > *");
        if (inner) return inner.querySelector(".media") ? inner : null;
        var ev = node.closest(".pane .ev");
        if (!ev || ev.hasAttribute("data-deck") || !ev.querySelector(".media")) return null;
        return ev;
      }
      /* готовим карточку в момент касания: план пополняется на ходу, агент
         добавляет события уже после загрузки */
      function prep(ev){
        if (ev.__sw) return ev.__sw;
        var body = document.createElement("div");
        body.className = "sw-body";
        while (ev.firstChild) body.appendChild(ev.firstChild);
        ev.appendChild(body);
        var hasBook = ev.hasAttribute("data-book");
        var acts = document.createElement("div");
        acts.className = "sw-acts";
        acts.innerHTML =
          act("talk", "\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c") +
          act("swap", "\u0417\u0430\u043c\u0435\u043d\u0438\u0442\u044c") +
          (hasBook ? act("book", "\u0411\u0440\u043e\u043d\u044c") : "");
        ev.appendChild(acts);
        var n = hasBook ? 3 : 2;
        var open = openFor(n);
        var st = ev.__sw = { ev: ev, body: body, acts: acts, x: 0, raf: 0,
                              open: open, para: (open + 8) / open };
        acts.querySelector('[data-act="talk"]').onclick = function(e){ e.stopPropagation(); talk(st); };
        acts.querySelector('[data-act="swap"]').onclick = function(e){ e.stopPropagation(); swap(st); };
        if (hasBook) acts.querySelector('[data-act="book"]').onclick = function(e){ e.stopPropagation(); book(st); };
        place(st);
        paint(st, 0);
        return st;
      }
      /* по центру карточки: от верха заголовка до низа картинки.
         Ряд действий под картинкой в счёт не идёт — иначе пилюли уезжают ниже
         и вылезают из-под картинки, за которой прячутся в покое */
      function place(st){
        var m = st.ev.querySelector(".media");
        var h = st.body.querySelector(".ev-t") || st.body.firstElementChild;
        if (!m || !h) return;
        var top = h.offsetTop + parseFloat(getComputedStyle(h).paddingTop || 0);
        var bot = m.offsetTop + m.offsetHeight;
        st.acts.style.top = Math.round(top + (bot - top - 49) / 2) + "px";
      }
      /* проявление: каждая кнопка догоняет своё место справа и всплывает из
         непрозрачности. Правая идёт первой, левая с задержкой 12% хода — вместе
         это читается как «вытянули одну за другой», но на грани заметности:
         свой ход всего 8px и 4% масштаба */
      var LAG = [.12, 0];
      function c01(v){ return v < 0 ? 0 : v > 1 ? 1 : v; }
      function reveal(st, p){
        [].forEach.call(st.acts.children, function(b, i){
          var lag = LAG[i] || 0;
          var t = smoothstep(c01((p - lag) / (.82 - lag)));
          b.style.opacity = t;
          b.style.transform = "translate3d(" + (8 * (1 - t)).toFixed(2) + "px,0,0) scale(" +
                              (.96 + .04 * t).toFixed(3) + ")";
        });
      }
      function paint(st, x){
        st.x = x;
        st.body.style.transform = "translate3d(" + (-x) + "px,0,0)";
        st.acts.style.transform = "translate3d(" + ((st.open - x) * st.para) + "px,0,0)";
        reveal(st, x / st.open);
      }
      /* резинка за пределами хода: чем дальше тянут, тем меньше отдача */
      function rub(d, open){ return (1 - 1 / (d * .55 / open + 1)) * open; }
      function band(st, x){
        if (x < 0) return -rub(-x, st.open);
        if (x <= st.open) return x;
        return st.open + rub(x - st.open, st.open);
      }
      function cancel(st){ if (st.raf){ cancelAnimationFrame(st.raf); st.raf = 0; } }
      function anim(st, to, v0){
        cancel(st);
        if (SLOW){ paint(st, to); return; }
        var k = 340, c = 34, x = st.x, v = -(v0 || 0) * 1000, last = 0;
        st.raf = requestAnimationFrame(function step(ts){
          if (!last) last = ts;
          var dt = Math.min(.032, (ts - last) / 1000); last = ts;
          v += (-k * (x - to) - c * v) * dt;
          x += v * dt;
          if (Math.abs(x - to) < .3 && Math.abs(v) < 14){ st.raf = 0; paint(st, to); return; }
          paint(st, x);
          st.raf = requestAnimationFrame(step);
        });
      }
      function open(st, v){
        if (opened && opened !== st) close(opened);
        opened = st; st.ev.classList.add("sw-on"); anim(st, st.open, v);
      }
      function close(st, v){
        if (!st) return;
        if (opened === st) opened = null;
        st.ev.classList.remove("sw-on");
        anim(st, 0, v);
      }
      function closeAll(){ if (opened) close(opened); }

      function q(t){ return "\u00ab" + t + "\u00bb"; }
      function titleOf(st){ var h = st.ev.querySelector(".ev-t"); return h ? h.textContent.trim() : ""; }
      /* карточка подтягивается под шторку, чтобы разговор шёл на её месте */
      function lift(ev){
        var sc = document.getElementById("scroller");
        if (!sc) return;
        setTimeout(function(){
          var top = sc.scrollTop + ev.getBoundingClientRect().top - sc.getBoundingClientRect().top - 8;
          if (sc.scrollTo) sc.scrollTo({ top: top, behavior: "smooth" });
          else sc.scrollTop = top;
        }, 90);
      }
      function talk(st){
        var t = titleOf(st); close(st);
        openAskSheet("\u0421\u043f\u0440\u043e\u0448\u0443 \u043f\u0440\u043e " + q(t) + ". \u0427\u0442\u043e \u0443\u0442\u043e\u0447\u043d\u0438\u0442\u044c?", PLAN_ASK);
        lift(st.ev);
      }
      /* Замена, а не перенос: вопрос и варианты про другое событие, а не про
         другое время. Раньше кнопка открывала выбор времени — «Утром / После
         обеда / Вечером» — и противоречила своей подписи. Список времён вместе
         с ней стал не нужен и удалён */
      function swap(st){
        var t = titleOf(st); close(st);
        openAskSheet("\u041d\u0430 \u0447\u0442\u043e \u0437\u0430\u043c\u0435\u043d\u0438\u0442\u044c " + q(t) + "?", PLAN_SWAP);
        lift(st.ev);
      }
      /* бронь: под картинкой она больше не висит постоянно, а раскрывается
         по этой кнопке — тот же initBooking() ниже ведёт весь цикл дальше */
      /* Бронь: время выбирают в чате, а не пилюлями под фото. Раньше свайп
         раскрывал строку с кнопками — но время это разговор с агентом, там же
         его можно обсудить и перенести. Времена берём из самой карточки,
         чтобы у разных событий были свои слоты, а не общий список */
      function book(st){
        close(st);
        var ev = st.ev;
        if (!ev.__book) return;
        var times = [].map.call(ev.querySelectorAll("[data-times] .pill"),
                                function(b){ return b.textContent; });
        openNudgeAsk("\u041d\u0430 \u043a\u0430\u043a\u043e\u0435 \u0432\u0440\u0435\u043c\u044f " +
          "\u0437\u0430\u0431\u0440\u043e\u043d\u0438\u0440\u043e\u0432\u0430\u0442\u044c " +
          q(titleOf(st)) + "?",
          function(t){ ev.__book(t); }, times);
        lift(ev);
      }

      frame.addEventListener("pointerdown", function(e){
        if (e.pointerType === "mouse" && e.button !== 0) return;
        if (!e.target || !e.target.closest) return;
        if (e.target.closest(".sw-act")) return;
        var ev = cardOf(e.target);
        if (!ev || e.target.closest("button, .times, .dishes")){ closeAll(); return; }
        var st = prep(ev);
        /* касание другой карточки закрывает открытую, даже если это просто тап */
        if (opened && opened !== st) close(opened);
        place(st);
        g = { st: st, id: e.pointerId, x0: e.clientX, y0: e.clientY,
              base: st.x, lock: 0, lx: e.clientX, lt: e.timeStamp, v: 0 };
      });
      frame.addEventListener("pointermove", function(e){
        if (!g || e.pointerId !== g.id) return;
        var dx = e.clientX - g.x0, dy = e.clientY - g.y0;
        if (!g.lock){
          if (Math.abs(dy) > LOCK && Math.abs(dy) >= Math.abs(dx)){ g = null; return; }
          if (Math.abs(dx) < LOCK) return;
          g.lock = 1;
          cancel(g.st);
          if (opened && opened !== g.st) close(opened);
        }
        var dt = e.timeStamp - g.lt;
        if (dt > 0){ g.v = (e.clientX - g.lx) / dt; g.lx = e.clientX; g.lt = e.timeStamp; }
        paint(g.st, band(g.st, g.base - dx));
      }, { passive: true });
      function release(){
        if (!g) return;
        var st = g.st, lock = g.lock, v = g.v;
        g = null;
        if (!lock){ if (st.x > 1) close(st); return; }
        /* бросок решает направление, спокойное отпускание — половина хода */
        var toOpen = v < -.45 ? true : v > .45 ? false : st.x > st.open * .5;
        if (toOpen) open(st, v); else close(st, v);
      }
      ["pointerup", "pointercancel", "pointerleave"].forEach(function(n){
        frame.addEventListener(n, release);
      });
      /* открытая карточка не должна ловить тап по телу: он её закрывает */
      frame.addEventListener("click", function(e){
        if (!opened) return;
        if (e.target && e.target.closest && e.target.closest(".sw-act")) return;
        if (cardOf(e.target) === opened.ev){ e.stopPropagation(); e.preventDefault(); }
      }, true);
      var sc0 = document.getElementById("scroller");
      if (sc0) sc0.addEventListener("scroll", closeAll, { passive: true });
      document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeAll(); });
    })();

    /* ---- audio guide player ----
       Раскладка как в эталоне: наушники, подпись, заголовок в две строки, крестик,
       дорожка с бегунком, времена, ±15 и большая кнопка. Проигрывание в реальном
       времени; бегунок можно тащить, шаги перематывают на 15 секунд. */
    (function(){
      var box = document.querySelector("[data-player]");
      if (!box) return;
      var title = box.querySelector("[data-playtitle]");
      var now = box.querySelector("[data-playnow]");
      var durEl = box.querySelector("[data-playdur]");
      var fill = box.querySelector("[data-playbar]");
      var thumb = box.querySelector("[data-thumb]");
      var seek = box.querySelector("[data-seek]");
      var total = 0, pos = 0, tick = null, drag = false;
      function fmt(s){
        s = Math.max(0, Math.round(s));
        return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
      }
      function paint(){
        var p = total ? pos / total : 0;
        now.textContent = fmt(pos);
        fill.style.width = (p * 100).toFixed(2) + "%";
        thumb.style.left = (p * 100).toFixed(2) + "%";
      }
      function play(){
        document.body.classList.add("playing");
        clearInterval(tick);
        tick = setInterval(function(){
          if (drag) return;
          pos += 1;
          if (pos >= total){ pos = total; paint(); pause(); return; }
          paint();
        }, 1000);
      }
      function pause(){ document.body.classList.remove("playing"); clearInterval(tick); }
      function close(){
        pause();
        box.classList.add("enter");
        document.body.classList.remove("player-on");
        setTimeout(function(){ box.hidden = true; }, 420);
      }
      function open(name, seconds){
        total = seconds; pos = 0;
        title.textContent = name;
        durEl.textContent = fmt(total);
        paint();
        box.hidden = false;
        box.classList.add("enter");
        document.body.classList.add("player-on");
        requestAnimationFrame(function(){ box.classList.remove("enter"); });
        play();
      }
      function at(clientX){
        var r = seek.getBoundingClientRect();
        var p = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
        pos = Math.round(p * total);
        paint();
      }
      seek.addEventListener("pointerdown", function(e){
        drag = true; seek.setPointerCapture && seek.setPointerCapture(e.pointerId); at(e.clientX);
      });
      seek.addEventListener("pointermove", function(e){ if (drag) at(e.clientX); });
      ["pointerup","pointercancel","pointerleave"].forEach(function(n){
        seek.addEventListener(n, function(){ drag = false; });
      });
      /* свайп вниз по шторке закрывает её */
      var sw = null;
      box.addEventListener("pointerdown", function(e){
        if (e.target.closest("button, [data-seek]")) return;
        sw = { y: e.clientY };
      });
      box.addEventListener("pointerup", function(e){
        if (sw && e.clientY - sw.y > 60) close();
        sw = null;
      });
      document.addEventListener("click", function(e){
        var a = e.target.closest("[data-audio]");
        if (a){
          /* без крестика: та же пилюля закрывает открытый плеер */
          if (!box.hidden) close();
          else open(a.getAttribute("data-audio"), +a.getAttribute("data-dur") || 252);
          return;
        }
        var s = e.target.closest("[data-seekby]");
        if (s){ pos = Math.max(0, Math.min(total, pos + (+s.getAttribute("data-seekby")))); paint(); return; }
        if (e.target.closest("[data-playtoggle]")){
          document.body.classList.contains("playing") ? pause() : play();
        }
      });
    })();

    /* ---- agent nudge ----
       Порт из agent-bubble-animation.html: критически демпфированная пружина,
       рождение из точки спарклы с овершутом, раскрытие ширины пружиной 220/26,
       текст из блюра с задержкой 140мс. Сворачивание: текст утягивается
       и уходит в блюр, через 90мс ширина схлопывается пружиной 200/24. */
    function springFrames(from, to, cfg){
      cfg = cfg || {};
      var k = cfg.stiffness || 220, c = cfg.damping || 26, m = cfg.mass || 1;
      var frames = [], dt = 1 / 60, x = from, v = 0;
      for (var t = 0; t < 2; t += dt){
        var F = -k * (x - to) - c * v;
        v += F / m * dt; x += v * dt; frames.push(x);
        if (Math.abs(x - to) < 0.02 && Math.abs(v) < 0.02) break;
      }
      frames.push(to);
      return frames;
    }
    function springTo(el, prop, from, to, cfg){
      var fr = springFrames(from, to, cfg);
      var kf = fr.map(function(v){ var o = {}; o[prop] = v + "px"; return o; });
      if (!el.animate){ el.style[prop] = to + "px"; return Promise.resolve(); }
      return el.animate(kf, { duration: fr.length / 60 * 1000, fill: "forwards", easing: "linear" }).finished;
    }
    /* Раскрытие полосы: пружиной по height от 0 до своей высоты, поэтому соседние
       карточки разъезжаются, а не получают готовый зазор. По завершении height
       снимается — дальше полоса живёт на auto и переживает перенос текста
       на вторую строку.
       Открываем по появлению в кадре, а не при рендере: смысл в том, чтобы
       сообщение возникало на глазах. Уже открытую полосу наблюдатель не трогает. */
    /* Текст входит по словам: каждое своим спаном с индексом, задержку считает
       CSS. Слова, не буквы: побуквенный вход на фразу из 4-5 слов читается как
       печатная машинка, а не как мягкое появление. Раскладываем только на входе
       и только один раз — дальше текстом управляет morphTx, ему нужен цельный
       textContent, поэтому класс split он снимет первым же вызовом */
    function splitTx(tx){
      var words = tx.textContent.trim().split(/\s+/);
      if (words.length < 2) return;
      tx.classList.add("split");
      tx.innerHTML = words.map(function(w, i){
        return '<i class="w" style="--wi:' + i + '">' + w + "</i>";
      }).join(" ");
    }
    function openNudge(n){
      if (n.__open) return;
      n.__open = true;
      var bub = n.querySelector(".abub");
      if (!bub){ n.classList.add("is-open"); return; }
      var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var tx0 = n.querySelector("[data-nudgetx]");
      if (tx0 && !RM) splitTx(tx0);
      /* высоту снимаем в раскрытом состоянии, иначе overflow:hidden и height:0
         дают ноль; сразу после замера возвращаем свёрнутое, чтобы кадр не мигнул */
      n.classList.add("is-open");
      var h = n.offsetHeight;
      if (RM || !n.animate){ return; }
      n.classList.remove("is-open");
      n.style.height = "0px";
      /* класс ставим на следующем кадре: msgRise должен начаться вместе с ходом */
      requestAnimationFrame(function(){
        n.classList.add("is-open");
        n.style.overflow = "hidden";
        springTo(n, "height", 0, h, { stiffness: 210, damping: 24 }).then(function(){
          n.style.height = "";
          n.style.overflow = "";
        });
      });
    }
    (function(){
      var nudges = document.querySelectorAll("[data-nudge]");
      if (!nudges.length) return;
      /* без IntersectionObserver просто открываем сразу: лучше без анимации,
         чем без сообщения */
      if (!window.IntersectionObserver){
        [].forEach.call(nudges, function(n){ n.classList.add("is-open"); n.__open = true; });
        return;
      }
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (!e.isIntersecting) return;
          openNudge(e.target);
          io.unobserve(e.target);
        });
      }, { root: document.getElementById("scroller"), threshold: .35 });
      [].forEach.call(nudges, function(n){ io.observe(n); });
    })();
    [].forEach.call(document.querySelectorAll("[data-nudge]"), function(n){
      /* bub — внешний контейнер с классами состояний; текст и крестик — свои
         кнопки внутри него, каждая со своим кликом */
      var bub = n.querySelector(".abub");
      var msgBtn = n.querySelector("[data-nudgebtn]");
      var xBtn = n.querySelector("[data-nudgex]");
      var tx = n.querySelector("[data-nudgetx]");
      var sp = n.querySelector(".sp");
      var busy = false, added = false;
      /* тексты и поведение задаются атрибутами: у каждого места свой сценарий,
         конная прогулка остаётся сценарием по умолчанию */
      var DONE = n.getAttribute("data-done") || "Записал конную прогулку на 17:00, добавил в план";
      var FOLLOW = n.getAttribute("data-follow") || "Есть окно в 17:00, перед костром. Подойдёт?";
      /* data-noevent: агент только договаривается, в план ничего не встаёт */
      var makeEvent = !n.hasAttribute("data-noevent");
      /* сколько шагов диалога пройдено: 0 — ждём первый ответ, 1 — уточнение */
      var stage = 0, dismissed = false, fold = null;
      var NEW_EV = { t: "Конная прогулка", d: "Спокойный маршрут по кедровнику с инструктором", chip: "17:00" };
      var RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* --- лотти-звезда: pulse в покое, float в диалоге, rotate в раздумьях.
         Данные клонируем: lottie мутирует переданный объект. Запасная статичная
         звезда в разметке остаётся, если плеер не поднялся */
      var lotBox = null, lot = null, lotName = "";
      function setStar(name){
        if (!window.lottie || !sp || name === lotName) return;
        lotName = name || "";
        if (lot){ lot.destroy(); lot = null; }
        if (!name) return;
        if (!lotBox){
          lotBox = document.createElement("span");
          lotBox.className = "star-lot";
          sp.appendChild(lotBox);
          sp.classList.add("lot");
        }
        lot = lottie.loadAnimation({
          container: lotBox, renderer: "svg", loop: true, autoplay: !RM,
          animationData: JSON.parse(JSON.stringify(STAR_ANIMS[name]))
        });
        if (RM) lot.goToAndStop(0, true);
      }

      /* --- состояния: карточка и звезда включаются классами, между состояниями
         мягкий поп на входящем элементе. Ширина больше не анимируется — карточка
         фиксированная по фигме, поэтому вся старая пружина ширины не нужна */
      /* вход: масштаб еле заметный (0.94), проявление из блюра, долгий выдох
         ease-out-quint — движение читается как «сфокусировался», а не «выпрыгнул» */
      function pop(el, delay){
        if (!el.animate || RM) return;
        el.animate([{ opacity: 0, filter: "blur(6px)", transform: "scale(.94) translateY(6px)" },
                    { opacity: 1, filter: "blur(0)", transform: "scale(1) translateY(0)" }],
                   { duration: 620, delay: delay || 0, fill: "backwards",
                     easing: "cubic-bezier(.22,1,.36,1)" });
      }
      /* уход зеркальный и короче: внимание отпускается быстрее, чем берётся */
      function fadeOut(el){
        if (!el.animate || RM) return Promise.resolve();
        return el.animate([{ opacity: 1, filter: "blur(0)", transform: "scale(1) translateY(0)" },
                           { opacity: 0, filter: "blur(5px)", transform: "scale(.96) translateY(4px)" }],
                          { duration: 300, easing: "cubic-bezier(.4,0,.2,1)" })
                 .finished.catch(function(){});
      }
      var stateTok = 0;
      function setState(st, starName){
        var tok = ++stateTok;
        var had = { tx: bub.classList.contains("st-msg") || bub.classList.contains("st-wait"),
                    sp: bub.classList.contains("st-idle") || bub.classList.contains("st-wait") ||
                        bub.classList.contains("st-think") };
        var hasTx = st === "st-msg" || st === "st-wait";
        var hasSp = st !== "st-msg";
        /* сначала мягко гасим то, что уходит, и только потом переключаем классы:
           элементы не пропадают со щелчком */
        var leaving = [];
        if (had.tx && !hasTx) leaving.push(fadeOut(tx));
        if (had.sp && !hasSp) leaving.push(fadeOut(sp));
        Promise.all(leaving).then(function(){
          if (tok !== stateTok) return;      /* состояние успело смениться ещё раз */
          bub.classList.remove("st-idle", "st-msg", "st-wait", "st-think");
          bub.classList.add(st);
          setStar(starName || null);
          if (hasTx){ fitRadius(); if (!had.tx) pop(tx); }
          if (hasSp && !had.sp) pop(sp, hasTx ? 70 : 0);
        });
      }

      /* одна строка — капсула 100, перенос — 20; меряем по фактической высоте */
      function fitRadius(){
        bub.classList.toggle("wrap", tx.offsetHeight > 60);
      }
      /* смена текста: старый мягко уплывает из фокуса, новый проявляется из
         лёгкого блюра с подъёмом — то же blur-to-focus, что в AI-оверлее */
      function say(str){
        /* say пишет цельный textContent — пословная раскладка входа ему мешает:
           спаны с opacity-каскадом остались бы под новым текстом. Снимаем split
           до любой ветки, включая раннюю */
        tx.classList.remove("split");
        if (!tx.animate || RM || !tx.textContent.trim()){
          tx.textContent = str; fitRadius(); return;
        }
        tx.animate([{ opacity: 1, filter: "blur(0)", transform: "translateY(0)" },
                    { opacity: 0, filter: "blur(4px)", transform: "translateY(-3px)" }],
                   { duration: 220, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" })
          .finished.then(function(){
            tx.textContent = str;
            fitRadius();
            tx.animate([{ opacity: 0, filter: "blur(5px)", transform: "translateY(5px)" },
                        { opacity: 1, filter: "blur(0)", transform: "translateY(0)" }],
                       { duration: 460, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" });
          }).catch(function(){ tx.textContent = str; fitRadius(); });
      }

      function hide(){ setState("st-idle", "pulse"); }

      function think(answer){
        clearTimeout(fold);
        setState("st-think", "rotate");
        setTimeout(function(){
          /* всё уже добавлено — обычный ответ и обычное сворачивание к пульсу */
          if (added){
            var reply = agentReply(answer);
            setState("st-msg");
            say(reply);
            /* больше не сворачивается сама — висит, пока не закроют крестиком */
            return;
          }
          if (stage === 0){ stage = 1; followUp(); }
          else finish();
        }, 1600);
      }
      /* агент подумал и уточняет; ответить можно с клавиатуры, «Пропустить»
         продолжает без ответа — оба пути ведут в think второй раз */
      function followUp(){
        setState("st-wait", "float");
        say(FOLLOW);
        setTimeout(function(){
          openCompose("Ответьте или пропустите", n,
            function(a){ think(a); },
            function(){ think(""); });
        }, 380);
      }
      /* итог: звезда пропадает, событие встаёт в план, и после паузы
         сообщение растворяется целиком — разговор закрыт */
      function finish(){
        setState("st-msg");
        say(DONE);
        added = true;
        if (makeEvent) addEvent();
        /* договорился — значит пора менять то, о чём договорились. Действие
           объявлено в разметке (data-action), поэтому нудж не знает, что именно
           произойдёт, а билет не знает, кто его попросил */
        if (n.dataset.action === "checkin") applyCheckin();
        /* итог остаётся на экране: разговор закрывает гость, крестиком */
      }
      function vanish(){
        dismissed = true;
        fadeOut(bub).then(function(){ n.hidden = true; });
        if (RM){ n.hidden = true; }
      }

      /* новое событие в плане: своя картинка, стандартный блок брони как везде,
         и расходящаяся от фото волна в момент появления */
      function addEvent(){
        var pane = n.closest(".pane");
        if (!pane) return;
        var proto = pane.querySelector("[data-book]");
        var ev = document.createElement("div");
        ev.className = "ev is-new";
        ev.setAttribute("data-book", "");
        ev.innerHTML =
          '<h3 class="ev-t">' + NEW_EV.t + "</h3>" +
          '<p class="ev-d">' + NEW_EV.d + "</p>" +
          '<div class="media"><img src="assets/img/ev-agent-added.webp" alt="">' +
          '<i class="ping"></i><i class="ping b"></i></div>' +
          (proto ? proto.querySelector("[data-bookrow]").outerHTML : "");
        var row = ev.querySelector("[data-bookrow]");
        if (row){
          /* как у остальных: бронь не висит под фото, а раскрывается по свайпу */
          row.hidden = true;
          row.classList.remove("fade");
          row.querySelector("[data-bookask]").hidden = false;
          row.querySelector("[data-bookstate]").hidden = true;
          row.querySelector("[data-bookstate]").classList.remove("is-wait", "is-done");
          row.querySelector("[data-bookmsg]").textContent = "";
          row.querySelector(".book-label").textContent = "Забронировать прогулку";
          [].forEach.call(row.querySelectorAll(".pill"), function(p){ p.classList.remove("on"); });
        }
        ev.style.height = "0px";
        ev.style.opacity = "0";
        n.parentNode.insertBefore(ev, n.nextSibling);
        initBooking(ev);
        var full = ev.scrollHeight;
        requestAnimationFrame(function(){
          ev.style.height = full + "px";
          ev.style.opacity = "1";
        });
        setTimeout(function(){
          ev.style.height = ""; ev.style.overflow = "";
          /* класс держит overflow:hidden — он бы срезал действия свайпа */
          ev.classList.remove("is-new");
        }, 480);
      }

      /* цикл запускается при показе панели: иначе сообщение успевало свернуться,
         пока экран был скрыт */
      n.__run = function(){
        if (dismissed) return;
        clearTimeout(fold);
        setState("st-msg");
        fitRadius();
        /* висит на экране, пока не открыли чат или не закрыли крестиком */
      };
      /* крестик закрывает с тем же мягким выдохом, что и итог раньше уходил сам:
         vanish() гасит карточку и только потом прячет весь блок */
      n.__dismiss = function(){ clearTimeout(fold); vanish(); };
      nudgeFolders.push(function(){
        clearTimeout(fold);
        if (bub.classList.contains("st-msg")) hide();
      });
      /* тап по тексту открывает чат — крестик рядом просто скрывает сообщение,
         не открывая его */
      msgBtn.onclick = function(){
        if (busy) return;
        clearTimeout(fold);
        /* состояние карточки не трогаем здесь: пока открыт чат, её и не видно
           под шторкой, а если закрыть чат не ответив — карточка просто
           останется как была, а не зависнет в «ждёт» навсегда */
        /* тот же чат, что и у свайпа: реплика агента повторяет вопрос карточки,
           ответ уходит в think() и думает уже сама карточка на странице */
        openNudgeAsk(tx.textContent, function(answer){ think(answer); });
        /* та же подтяжка страницы, что у свайпа: после чата карточка сама
           оказывается наверху экрана */
        var sc = document.getElementById("scroller");
        if (sc){
          setTimeout(function(){
            var top = sc.scrollTop + n.getBoundingClientRect().top - sc.getBoundingClientRect().top - 8;
            if (sc.scrollTo) sc.scrollTo({ top: top, behavior: "smooth" });
            else sc.scrollTop = top;
          }, 90);
        }
      };
      xBtn.onclick = function(e){ e.stopPropagation(); n.__dismiss(); };
      setState("st-msg");
    });

    /* ---- checklist ---- */
    [].forEach.call(document.querySelectorAll(".li:not(.add)"), function(b){
      b.onclick = function(){ b.classList.toggle("on"); };
    });

    /* ---- film slider: looped ----
       The markup in .films is the single source of truth; we clone it into three
       copies and start in the middle one. When the viewport drifts a card past
       the middle band we shift scrollLeft by exactly one set width. The shift is
       invisible because the layout repeats, so there is no first or last card. */
    var films = document.getElementById("films");
    var N = films.children.length, COPIES = 3;
    var origin = document.createDocumentFragment();
    [].forEach.call(films.children, function(el){ origin.appendChild(el.cloneNode(true)); });
    films.innerHTML = "";
    for (var c = 0; c < COPIES; c++) films.appendChild(origin.cloneNode(true));

    var kids = [].slice.call(films.children);
    var SCALE_MIN = 0.88;
    var pitch = 0, setW = 0, base = 0, centers = [], viewMid = 0;
    var fReduce = false;
    try { fReduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){}
    if (fReduce) films.classList.add("stepped");

    /* Geometry is fixed (309px cards, constant pitch), so it is measured once and
       cached. Reading offsetLeft inside the scroll loop would force a layout on
       every frame, which is what makes this kind of slider feel gritty. */
    function metrics(){
      if (kids.length < 2 || !films.clientWidth) return false;
      centers = kids.map(function(el){ return el.offsetLeft + el.offsetWidth / 2; });
      pitch = centers[1] - centers[0];
      setW = pitch * N;
      viewMid = films.clientWidth / 2;
      base = centers[N] - viewMid;
      return true;
    }
    function centerOf(el){ return centers[kids.indexOf(el)] - viewMid; }

    /* Wrapping is deferred while a programmatic smooth scroll is running,
       otherwise the jump fights the browser's own animation. */
    var smoothUntil = 0;
    function wrap(){
      if (!setW || performance.now() < smoothUntil) return;
      if (films.scrollLeft < base - pitch / 2) films.scrollLeft += setW;
      else if (films.scrollLeft > base + setW - pitch / 2) films.scrollLeft -= setW;
    }

    function smoothstep(t){ return t * t * (3 - 2 * t); }

    var lastLeft = -1, idle = 0, fraf = null;
    function render(){
      fraf = null;
      if (!setW && !metrics()) return;
      wrap();
      var left = films.scrollLeft, mid = left + viewMid, best = 0, bd = 1e9;
      if (!fReduce){
        for (var i = 0; i < kids.length; i++){
          var d = Math.abs(centers[i] - mid);
          if (d < bd){ bd = d; best = i; }
          var t = d / pitch; if (t > 1) t = 1;
          var s = 1 - (1 - SCALE_MIN) * smoothstep(t);
          kids[i].style.transform = "scale(" + s.toFixed(4) + ")";
        }
      } else {
        for (var j = 0; j < kids.length; j++){
          var dj = Math.abs(centers[j] - mid);
          if (dj < bd){ bd = dj; best = j; }
        }
      }
      for (var k = 0; k < kids.length; k++) kids[k].classList.toggle("is-on", k === best);

      /* keep painting a few frames past the last movement so the tail of the
         momentum scroll is interpolated too, then stop to spare the battery */
      if (Math.abs(left - lastLeft) > 0.05){ idle = 0; } else { idle++; }
      lastLeft = left;
      if (idle < 6) fraf = requestAnimationFrame(render);
    }
    function kick(){ idle = 0; if (!fraf) fraf = requestAnimationFrame(render); }

    films.addEventListener("scroll", kick, { passive: true });
    films.addEventListener("pointerdown", kick, { passive: true });
    var moved = 0;
    films.addEventListener("click", function(e){
      if (moved > 6) return;                       /* that was a drag, not a tap */
      var el = e.target.closest(".film");
      if (!el || !setW) return;
      snapTo(kids.indexOf(el));
    });

    function snapTo(i){
      if (!setW && !metrics()) return;
      i = Math.max(0, Math.min(kids.length - 1, i));
      smoothUntil = performance.now() + 600;
      films.scrollTo({ left: centerOf(kids[i]), behavior: "smooth" });
      kick();
    }

    /* Drag and flick. Touch keeps the browser's own momentum scrolling, so the
       pointer path only takes over for mouse and pen. Velocity is averaged over
       the last few moves so one jittery frame cannot decide the direction. */
    var drag = null;
    films.addEventListener("pointerdown", function(e){
      if (e.pointerType === "touch" || e.button !== 0) return;
      if (!setW) metrics();                        /* lazily, never blocks the drag */
      drag = { x: e.clientX, left: films.scrollLeft, t: performance.now(), px: e.clientX, v: 0 };
      moved = 0;
      smoothUntil = 0;
      films.classList.add("dragging");
      try { films.setPointerCapture(e.pointerId); } catch(err){}
      kick();
    });
    films.addEventListener("pointermove", function(e){
      if (!drag) return;
      e.preventDefault();
      var dx = e.clientX - drag.x;
      if (Math.abs(dx) > moved) moved = Math.abs(dx);
      var now = performance.now(), dt = now - drag.t;
      if (dt > 4){
        drag.v = drag.v * 0.6 + ((e.clientX - drag.px) / dt) * 0.4;
        drag.t = now; drag.px = e.clientX;
      }
      var want = drag.left - dx;
      films.scrollLeft = want;
      wrap();
      /* wrap() may have jumped by one set width; re-anchor so the card stays
         glued to the finger instead of snapping away mid-drag */
      if (films.scrollLeft !== want) drag.left = films.scrollLeft + dx;
      kick();
    });
    function endDrag(){
      if (!drag) return;
      var v = drag.v;
      drag = null;
      films.classList.remove("dragging");
      if (!setW && !metrics()) return;
      var mid = films.scrollLeft + viewMid, best = 0, bd = 1e9;
      if (!centers.length) return;
      for (var i = 0; i < kids.length; i++){
        var d = Math.abs(centers[i] - mid);
        if (d < bd){ bd = d; best = i; }
      }
      if (Math.abs(v) > 0.3) best += (v < 0 ? 1 : -1);   /* a flick carries one card further */
      snapTo(best);
    }
    films.addEventListener("pointerup", endDrag);
    films.addEventListener("pointercancel", endDrag);
    films.addEventListener("lostpointercapture", endDrag);
    films.addEventListener("dragstart", function(e){ e.preventDefault(); });
    addEventListener("resize", function(){ setW = 0; kick(); });

    function centerFilms(){
      if (!metrics()) return;
      if (!films.dataset.ready){ films.scrollLeft = base; films.dataset.ready = "1"; }
      kick();
    }

    /* ---- sunset gradient grows on scroll (rAF + lerp, as in the motion library) ---- */
    var sc = document.getElementById("scroller");
    /* the sunset belongs to the day panes only, so it is resolved inside the
       visible pane instead of by id; on other tabs there is nothing to paint */
    function skyEl(){ return document.querySelector(".pane.is-on .sky-grow"); }
    var START = 0.42, MIN = 28, MAX = 300, cur = 0, tgt = 0, sraf = null, reduce = false;
    try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch(e){}
    function clamp(v){ return v < 0 ? 0 : v > 1 ? 1 : v; }
    function ease(t){ return t*t*(3-2*t); }
    function paint(){
      var sky = skyEl();
      if (!sky) return;
      sky.style.setProperty("--sh", (MIN + (MAX-MIN)*cur).toFixed(1)+"px");
      sky.style.setProperty("--so", cur.toFixed(3));
    }
    function tick(){
      cur += (tgt-cur)*0.14;
      if (Math.abs(tgt-cur) < 0.0015){ cur = tgt; paint(); sraf = null; return; }
      paint(); sraf = requestAnimationFrame(tick);
    }
    function measureSky(){
      var max = sc.scrollHeight - sc.clientHeight;
      var p = max > 0 ? sc.scrollTop / max : 0;
      tgt = ease(clamp((p - START) / (1 - START)));
      if (reduce){ cur = tgt; paint(); return; }
      if (!sraf) sraf = requestAnimationFrame(tick);
    }
    sc.addEventListener("scroll", measureSky, { passive: true });
    document.addEventListener("visibilitychange", function(){
      if (document.hidden && sraf){ cancelAnimationFrame(sraf); sraf = null; }
      else measureSky();
    });

    chiposh.show = show;

    show("home");
    measureSky();
  })();
}
