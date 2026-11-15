export type ThemeId =
  | 'garden'
  | 'sage'
  | 'petersburg'
  | 'mono'
  | 'silk'
  | 'nights'
  | 'peony'
  | 'envelope'
  | 'ribbon'
  | 'petals'
  | 'bridge'
  | 'dawn'
  | 'sails'
  | 'meet'
  | 'lineart'
  | 'papercut'
  | 'blueprint'
  | 'garland'
  | 'heart'
  | 'halves'
  | 'lock'
  | 'terminal'
  | 'ide'
  | 'git'
  | 'pixel'
  | 'matrix'

export type IntroType = Exclude<ThemeId, 'garden' | 'sage' | 'petersburg' | 'mono' | 'silk' | 'nights' | 'peony'>

export type HeroLayout = 'scene' | 'arch' | 'classic' | 'polaroid' | 'postcard' | 'code'
export type HeroArt = 'skyline' | 'bouquet' | 'none'
export type Particles = 'petals' | 'leaves' | 'stars' | 'hearts' | 'none'
export type Ornament = 'vine' | 'heart' | 'line' | 'seal' | 'star' | 'flower' | 'stamp' | 'red'
export type TimingLayout = 'table' | 'timeline'
export type IntroGroup = 'envelope' | 'bridge' | 'heart' | 'code'

export interface PaletteColor {
  color: string
  name: string
}

export interface ThemeDef {
  id: ThemeId
  name: string
  hint: string
  swatch: [string, string, string]
  hero: HeroLayout
  heroArt: HeroArt
  particles: Particles
  ornament: Ornament
  timing: TimingLayout
  palette: PaletteColor[]
  /** Interactive opening screen shown before the invitation. */
  intro?: IntroType
  group?: IntroGroup
}

export const themes: ThemeDef[] = [
  {
    id: 'garden',
    name: 'Зимний сад',
    hint: 'Оливковый, рваная бумага, тонкий шрифт',
    swatch: ['#5f6d55', '#f2f2ec', '#c9cfbd'],
    hero: 'scene',
    heroArt: 'bouquet',
    particles: 'leaves',
    ornament: 'vine',
    timing: 'table',
    palette: [
      { color: '#5b4234', name: 'шоколад' },
      { color: '#ddd3c0', name: 'беж' },
      { color: '#f2e6a8', name: 'ваниль' },
      { color: '#93a487', name: 'шалфей' },
      { color: '#c9cbcc', name: 'серебро' },
    ],
  },
  {
    id: 'sage',
    name: 'Нежность',
    hint: 'Светлый, календарь с сердцем, полароиды',
    swatch: ['#46523c', '#f7f6f2', '#a7b39a'],
    hero: 'scene',
    heroArt: 'skyline',
    particles: 'petals',
    ornament: 'heart',
    timing: 'table',
    palette: [
      { color: '#d8b4a6', name: 'пыльная роза' },
      { color: '#d9d0c1', name: 'льняной' },
      { color: '#a7b39a', name: 'оливка' },
      { color: '#4c5844', name: 'хвоя' },
      { color: '#2f2a26', name: 'графит' },
    ],
  },
  {
    id: 'petersburg',
    name: 'Петербург',
    hint: 'Коллаж, скотч, красные акценты',
    swatch: ['#b3261e', '#f3ede3', '#4a3b33'],
    hero: 'polaroid',
    heroArt: 'skyline',
    particles: 'hearts',
    ornament: 'red',
    timing: 'table',
    palette: [
      { color: '#e3cfa8', name: 'шампань' },
      { color: '#c9b08a', name: 'золото' },
      { color: '#8c2f2b', name: 'бордо' },
      { color: '#3f4a5a', name: 'невский синий' },
      { color: '#1f1c1a', name: 'чёрный' },
    ],
  },
  {
    id: 'mono',
    name: 'Монохром',
    hint: 'Чёрно-белый, арки и плавные формы',
    swatch: ['#111111', '#ffffff', '#5a5a5a'],
    hero: 'arch',
    heroArt: 'skyline',
    particles: 'none',
    ornament: 'line',
    timing: 'timeline',
    palette: [
      { color: '#111111', name: 'чёрный' },
      { color: '#4a4a4a', name: 'графит' },
      { color: '#9a9a9a', name: 'серый' },
      { color: '#d0d0d0', name: 'серебро' },
    ],
  },
  {
    id: 'silk',
    name: 'Шёлк и сургуч',
    hint: 'Беж и шоколад, восковые печати',
    swatch: ['#5b4637', '#efe6d8', '#c8b49b'],
    hero: 'classic',
    heroArt: 'bouquet',
    particles: 'petals',
    ornament: 'seal',
    timing: 'timeline',
    palette: [
      { color: '#5b4637', name: 'шоколад' },
      { color: '#8a7262', name: 'мокко' },
      { color: '#e3dccb', name: 'крем' },
      { color: '#ebe4da', name: 'пудра' },
      { color: '#a9cfb4', name: 'мята' },
      { color: '#4f6b3c', name: 'зелень' },
    ],
  },
  {
    id: 'nights',
    name: 'Золото Невы',
    hint: 'Тёмно-синий Петербург, золото и звёзды',
    swatch: ['#16233a', '#d8b46a', '#f4eee2'],
    hero: 'scene',
    heroArt: 'skyline',
    particles: 'stars',
    ornament: 'star',
    timing: 'timeline',
    palette: [
      { color: '#16233a', name: 'тёмно-синий' },
      { color: '#3d5378', name: 'нева' },
      { color: '#d8b46a', name: 'золото' },
      { color: '#e3cc9c', name: 'шампань' },
      { color: '#7b2d3b', name: 'гранат' },
    ],
  },
  {
    id: 'peony',
    name: 'Пионы',
    hint: 'Пудровый, акварель и рукописный шрифт',
    swatch: ['#c27a84', '#fbf1ee', '#e9c3bf'],
    hero: 'classic',
    heroArt: 'bouquet',
    particles: 'petals',
    ornament: 'flower',
    timing: 'table',
    palette: [
      { color: '#f3d3cc', name: 'пудра' },
      { color: '#efc9c3', name: 'пион' },
      { color: '#c27a84', name: 'роза' },
      { color: '#b9c4a7', name: 'эвкалипт' },
      { color: '#e8dccb', name: 'крем' },
    ],
  },
  {
    id: 'envelope',
    name: 'Конверт с сургучом',
    hint: 'Крафт-конверт, письмо выезжает из кармана',
    swatch: ['#7a1f2b', '#c9a57d', '#fbf6ec'],
    hero: 'postcard',
    heroArt: 'skyline',
    particles: 'none',
    ornament: 'stamp',
    intro: 'envelope',
    group: 'envelope',
    timing: 'table',
    palette: [
      { color: '#7a1f2b', name: 'бордо' },
      { color: '#c9a57d', name: 'крафт' },
      { color: '#e2c9a3', name: 'песочный' },
      { color: '#47513d', name: 'олива' },
      { color: '#2b2523', name: 'чернила' },
    ],
  },
  {
    id: 'ribbon',
    name: 'Конверт с лентой',
    hint: 'Развяжите бант — письмо раскроется',
    swatch: ['#8d9c84', '#fbfaf6', '#d9cfbd'],
    hero: 'classic',
    heroArt: 'bouquet',
    particles: 'leaves',
    ornament: 'vine',
    timing: 'table',
    intro: 'ribbon',
    group: 'envelope',
    palette: [
      { color: '#fbf3e4', name: 'молочный' },
      { color: '#d9cfbd', name: 'лён' },
      { color: '#b9c4a7', name: 'эвкалипт' },
      { color: '#8d9c84', name: 'шалфей' },
      { color: '#5c6b55', name: 'олива' },
    ],
  },
  {
    id: 'petals',
    name: 'Конверт-лепестки',
    hint: 'Квадратный конверт раскрывается, как цветок',
    swatch: ['#6f8fb0', '#f7f9fc', '#c9d6e4'],
    hero: 'scene',
    heroArt: 'skyline',
    particles: 'petals',
    ornament: 'flower',
    timing: 'timeline',
    intro: 'petals',
    group: 'envelope',
    palette: [
      { color: '#c9d6e4', name: 'голубой' },
      { color: '#9fb6cf', name: 'пыльный синий' },
      { color: '#6f8fb0', name: 'фарфор' },
      { color: '#2f4a6b', name: 'кобальт' },
      { color: '#d8d8dc', name: 'серебро' },
    ],
  },
  {
    id: 'bridge',
    name: 'Дворцовый мост',
    hint: 'Сведите мост — зажгутся фонари',
    swatch: ['#1e3a52', '#eef2f5', '#f2a65a'],
    hero: 'scene',
    heroArt: 'skyline',
    particles: 'none',
    ornament: 'star',
    timing: 'timeline',
    intro: 'bridge',
    group: 'bridge',
    palette: [
      { color: '#1e3a52', name: 'нева' },
      { color: '#5f7f99', name: 'сталь' },
      { color: '#f2a65a', name: 'фонари' },
      { color: '#c9d3db', name: 'туман' },
      { color: '#2b2f33', name: 'гранит' },
    ],
  },
  {
    id: 'dawn',
    name: 'Пастельный мост',
    hint: 'Сведите мост ползунком — выглянет солнце',
    swatch: ['#e8a58c', '#fdf6f2', '#b9a6cf'],
    hero: 'scene',
    heroArt: 'skyline',
    particles: 'none',
    ornament: 'line',
    timing: 'timeline',
    intro: 'dawn',
    group: 'bridge',
    palette: [
      { color: '#f6c9b4', name: 'персик' },
      { color: '#e8a58c', name: 'коралл' },
      { color: '#b9a6cf', name: 'сирень' },
      { color: '#8aa0c2', name: 'небесный' },
      { color: '#4b4e6d', name: 'графит' },
    ],
  },
  {
    id: 'sails',
    name: 'Алые паруса',
    hint: 'Корабль проплывает под мостом, салют',
    swatch: ['#b3202a', '#f7f1e8', '#13243d'],
    hero: 'scene',
    heroArt: 'skyline',
    particles: 'none',
    ornament: 'star',
    timing: 'table',
    intro: 'sails',
    group: 'bridge',
    palette: [
      { color: '#b3202a', name: 'алый' },
      { color: '#13243d', name: 'морской' },
      { color: '#c9a45c', name: 'золото' },
      { color: '#e9dfcf', name: 'шампань' },
      { color: '#5d2333', name: 'вишня' },
    ],
  },
  {
    id: 'meet',
    name: 'Навстречу друг другу',
    hint: 'Мост сводится — Ваня и Тося идут навстречу',
    swatch: ['#123f3a', '#ffffff', '#6b2737'],
    hero: 'scene',
    heroArt: 'skyline',
    particles: 'hearts',
    ornament: 'heart',
    timing: 'timeline',
    intro: 'meet',
    group: 'bridge',
    palette: [
      { color: '#123f3a', name: 'изумруд' },
      { color: '#2e6b5f', name: 'малахит' },
      { color: '#d9b56a', name: 'золото' },
      { color: '#e8dcc0', name: 'шампань' },
      { color: '#6b2737', name: 'марсала' },
    ],
  },
  {
    id: 'lineart',
    name: 'Золотой контур',
    hint: 'Мост прорисовывается золотой линией',
    swatch: ['#123f3a', '#f5f1e6', '#d9b56a'],
    hero: 'classic',
    heroArt: 'skyline',
    particles: 'stars',
    ornament: 'star',
    timing: 'table',
    intro: 'lineart',
    group: 'bridge',
    palette: [
      { color: '#123f3a', name: 'изумруд' },
      { color: '#2e6b5f', name: 'малахит' },
      { color: '#d9b56a', name: 'золото' },
      { color: '#e8dcc0', name: 'шампань' },
      { color: '#6b2737', name: 'марсала' },
    ],
  },
  {
    id: 'papercut',
    name: 'Бумажный мост',
    hint: 'Объёмная аппликация из бумаги, слои двигаются',
    swatch: ['#2f7f86', '#f6efe3', '#ef8a74'],
    hero: 'scene',
    heroArt: 'skyline',
    particles: 'none',
    ornament: 'flower',
    timing: 'timeline',
    intro: 'papercut',
    group: 'bridge',
    palette: [
      { color: '#2f7f86', name: 'бирюза' },
      { color: '#8cc5c0', name: 'аква' },
      { color: '#ef8a74', name: 'коралл' },
      { color: '#e9b44c', name: 'горчица' },
      { color: '#f2d9c4', name: 'беж' },
    ],
  },
  {
    id: 'blueprint',
    name: 'Чертёж моста',
    hint: 'Потяните рычаг — шестерёнки сведут мост',
    swatch: ['#1d4f91', '#f4f6f9', '#e2483d'],
    hero: 'postcard',
    heroArt: 'skyline',
    particles: 'none',
    ornament: 'line',
    timing: 'table',
    intro: 'blueprint',
    group: 'bridge',
    palette: [
      { color: '#1d4f91', name: 'синька' },
      { color: '#6f94c4', name: 'васильковый' },
      { color: '#c9d6e8', name: 'голубой' },
      { color: '#e2483d', name: 'красный штамп' },
      { color: '#2b2f36', name: 'графит' },
    ],
  },
  {
    id: 'garland',
    name: 'Мост в цветах',
    hint: 'Опустите каждую половину моста, украшенную цветами',
    swatch: ['#c98b8b', '#fffaf6', '#8aa27a'],
    hero: 'arch',
    heroArt: 'bouquet',
    particles: 'petals',
    ornament: 'flower',
    timing: 'timeline',
    intro: 'garland',
    group: 'bridge',
    palette: [
      { color: '#f3cfc6', name: 'пудра' },
      { color: '#c98b8b', name: 'пыльная роза' },
      { color: '#8aa27a', name: 'зелень' },
      { color: '#e9d7a8', name: 'ваниль' },
      { color: '#7c4b5a', name: 'слива' },
    ],
  },
  {
    id: 'heart',
    name: 'Наполни сердце',
    hint: 'Удерживайте, пока сердце не наполнится',
    swatch: ['#8e1f35', '#fbf3ee', '#e8a7a7'],
    hero: 'scene',
    heroArt: 'bouquet',
    particles: 'hearts',
    ornament: 'heart',
    timing: 'table',
    intro: 'heart',
    group: 'heart',
    palette: [
      { color: '#8e1f35', name: 'гранат' },
      { color: '#5a1424', name: 'вино' },
      { color: '#e8a7a7', name: 'роза' },
      { color: '#f3d6cf', name: 'румянец' },
      { color: '#c9a45c', name: 'золото' },
    ],
  },
  {
    id: 'halves',
    name: 'Половинки сердца',
    hint: 'Соедините две половинки — Ваня и Тося',
    swatch: ['#e8656b', '#fff7f4', '#ffd2c2'],
    hero: 'arch',
    heroArt: 'skyline',
    particles: 'hearts',
    ornament: 'heart',
    timing: 'timeline',
    intro: 'halves',
    group: 'heart',
    palette: [
      { color: '#e8656b', name: 'коралл' },
      { color: '#f4a3a0', name: 'роза' },
      { color: '#ffd2c2', name: 'персик' },
      { color: '#f7e7d9', name: 'крем' },
      { color: '#5b3a3f', name: 'какао' },
    ],
  },
  {
    id: 'lock',
    name: 'Замок любви',
    hint: 'Повесьте замок на мост и бросьте ключ в Неву',
    swatch: ['#b98b3e', '#f2efe9', '#3b4650'],
    hero: 'polaroid',
    heroArt: 'skyline',
    particles: 'none',
    ornament: 'line',
    timing: 'table',
    intro: 'lock',
    group: 'heart',
    palette: [
      { color: '#b98b3e', name: 'латунь' },
      { color: '#3b4650', name: 'гранит' },
      { color: '#7d8a96', name: 'невский' },
      { color: '#d9cbb0', name: 'песок' },
      { color: '#6b2b2b', name: 'бордо' },
    ],
  },
  {
    id: 'terminal',
    name: 'Терминал',
    hint: 'Ретро-экран: запустите свадебный скрипт',
    swatch: ['#1a1408', '#ffb000', '#5c3d00'],
    hero: 'code',
    heroArt: 'none',
    particles: 'none',
    ornament: 'line',
    timing: 'table',
    intro: 'terminal',
    group: 'code',
    palette: [
      { color: '#1a1408', name: 'чёрный экран' },
      { color: '#ffb000', name: 'янтарь' },
      { color: '#c77d00', name: 'медь' },
      { color: '#6b4a12', name: 'кофе' },
      { color: '#e8d5a8', name: 'песок' },
    ],
  },
  {
    id: 'ide',
    name: 'Редактор кода',
    hint: 'Код свадьбы с подсветкой — нажмите Run',
    swatch: ['#1e1e2e', '#89b4fa', '#f5c2e7'],
    hero: 'code',
    heroArt: 'none',
    particles: 'none',
    ornament: 'line',
    timing: 'timeline',
    intro: 'ide',
    group: 'code',
    palette: [
      { color: '#1e1e2e', name: 'тёмная тема' },
      { color: '#89b4fa', name: 'голубой' },
      { color: '#cba6f7', name: 'лавандовый' },
      { color: '#f5c2e7', name: 'розовый' },
      { color: '#a6e3a1', name: 'мятный' },
    ],
  },
  {
    id: 'git',
    name: 'Pull request',
    hint: 'Ветки Вани и Тоси сливаются в main',
    swatch: ['#8250df', '#ffffff', '#1f883d'],
    hero: 'code',
    heroArt: 'none',
    particles: 'none',
    ornament: 'line',
    timing: 'timeline',
    intro: 'git',
    group: 'code',
    palette: [
      { color: '#8250df', name: 'merged' },
      { color: '#1f883d', name: 'approved' },
      { color: '#0969da', name: 'link' },
      { color: '#24292f', name: 'графит' },
      { color: '#d0d7de', name: 'серый' },
    ],
  },
  {
    id: 'pixel',
    name: '8-бит',
    hint: 'Пиксельная игра: Player 1 + Player 2',
    swatch: ['#2b1b4d', '#ff5c8a', '#ffd23f'],
    hero: 'scene',
    heroArt: 'skyline',
    particles: 'hearts',
    ornament: 'heart',
    timing: 'table',
    intro: 'pixel',
    group: 'code',
    palette: [
      { color: '#ff5c8a', name: 'розовый' },
      { color: '#ffd23f', name: 'жёлтый' },
      { color: '#3ec1d3', name: 'бирюзовый' },
      { color: '#6a4c93', name: 'фиолетовый' },
      { color: '#2b1b4d', name: 'тёмный' },
    ],
  },
  {
    id: 'matrix',
    name: 'Матрица',
    hint: 'Цифровой дождь складывается в имена',
    swatch: ['#020a04', '#00ff6a', '#0b3d1c'],
    hero: 'code',
    heroArt: 'none',
    particles: 'none',
    ornament: 'line',
    timing: 'table',
    intro: 'matrix',
    group: 'code',
    palette: [
      { color: '#00c853', name: 'зелёный' },
      { color: '#0b3d1c', name: 'тёмно-зелёный' },
      { color: '#1b1f1c', name: 'чёрный' },
      { color: '#5f6b63', name: 'графит' },
      { color: '#b9f6ca', name: 'мятный' },
    ],
  },
]

export const themeById = (id: string): ThemeDef | undefined => themes.find((t) => t.id === id)
