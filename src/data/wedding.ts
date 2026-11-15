export type TimelineIcon = 'guests' | 'rings' | 'camera' | 'dinner' | 'cake' | 'sparkles'

export interface TimelineItem {
  time: string
  title: string
  note?: string
  icon: TimelineIcon
}

export const wedding = {
  groom: { short: 'Ваня', full: 'Иван' },
  bride: { short: 'Тося', full: 'Антонина' },
  monogram: { left: 'В', right: 'Т' },

  /** Moscow time — St. Petersburg is UTC+3 all year. */
  dateISO: '2027-08-15T15:20:00+03:00',
  dateShort: '15.08.2027',
  dateParts: { day: '15', month: '08', year: '2027' },
  dateLong: '15 августа 2027',
  weekday: 'воскресенье',
  city: 'Санкт-Петербург',

  rsvpDeadline: '1 июля 2027',
  rsvpEmail: 'marikyan.tosya@mail.ru',

  ceremony: {
    title: 'Торжественная регистрация',
    place: 'Дворец бракосочетания №\u00a01',
    address: 'Английская набережная, 28',
    time: '15:20',
    mapUrl:
      'https://yandex.ru/maps/?text=' +
      encodeURIComponent('Дворец бракосочетания №1, Английская набережная, 28, Санкт-Петербург'),
  },

  banquet: {
    title: 'Праздничный банкет',
    place: '',
    note: 'Место банкета мы ещё выбираем — обязательно сообщим заранее',
  },

  timeline: [
    { time: '14:50', title: 'Сбор гостей', note: 'у Дворца бракосочетания №\u00a01', icon: 'guests' },
    { time: '15:20', title: 'Торжественная регистрация', note: 'самый трогательный момент', icon: 'rings' },
    { time: '16:00', title: 'Прогулка и фотосессия', note: 'по набережным Петербурга', icon: 'camera' },
    { time: '18:00', title: 'Праздничный ужин', note: 'место уточняется', icon: 'dinner' },
    { time: '21:30', title: 'Свадебный торт', icon: 'cake' },
    { time: '23:00', title: 'Завершение вечера', icon: 'sparkles' },
  ] as TimelineItem[],

  greeting: {
    title: 'Дорогие родные и друзья!',
    text: [
      'В нашей жизни скоро состоится важное и радостное событие — наша свадьба!',
      'Мы будем счастливы, если вы проведёте этот особенный день вместе с нами в самом красивом городе — Санкт-Петербурге.',
    ],
  },

  dressCode: {
    text: 'Мы будем очень рады, если вы поддержите цветовую гамму нашего праздника в своих нарядах.',
    note: 'Просим не выбирать белый цвет — он для невесты',
  },

  details: [
    {
      title: 'Подарки',
      text: 'Самый главный подарок для нас — ваше присутствие. Если захотите порадовать нас чем-то ещё, будем благодарны за вклад в бюджет нашей молодой семьи.',
    },
    {
      title: 'Цветы',
      text: 'Мы уезжаем после свадьбы и не успеем насладиться букетами. Вместо цветов можно подарить бутылку любимого вина — откроем её на годовщину!',
    },
  ],

  alcoholOptions: [
    'Шампанское',
    'Белое вино',
    'Красное вино',
    'Виски',
    'Коньяк',
    'Водка',
    'Не пью алкоголь',
  ],
}

export const coupleShort = `${wedding.groom.short} & ${wedding.bride.short}`
export const coupleFull = `${wedding.groom.full} и ${wedding.bride.full}`
