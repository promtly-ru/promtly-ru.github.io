// Все тексты и ссылки сайта — меняются здесь.

export const profile = {
  name: 'Promptly',
  // Заголовок первого экрана: «Делаю <слово> под ваши задачи», слова сменяются по очереди
  headlineWords: ['сайты', 'Telegram-боты', 'презентации', 'программы', 'автоматизацию'],
  about:
    'Разрабатываю сайты, Telegram-боты, скрипты автоматизации, продающие презентации и десктоп-приложения для Windows. Обсуждаем задачу, договариваемся о цене и сроках — и я делаю под ключ.',
  footer: 'Разработка сайтов, ботов и приложений под ключ.',
}

export const stats = [
  { value: 3, suffix: '', label: 'направления услуг' },
  { value: 4, suffix: '', label: 'режима в SmartCalc' },
  { value: 24, suffix: ' ч', label: 'максимум до ответа' },
]

export const contacts = {
  telegram: { label: 'Telegram', value: '@nothing8931', url: 'https://t.me/nothing8931' },
  email: { label: 'Email', value: 'work.vibecoding.398@gmail.com', url: 'mailto:work.vibecoding.398@gmail.com' },
  whatsapp: { label: 'WhatsApp', value: '+7 967 930-63-31', url: 'https://wa.me/79679306331' },
}

export type ServiceIcon = 'web' | 'automation' | 'desktop'

export const services: { icon: ServiceIcon; title: string; text: string; items: string[] }[] = [
  {
    icon: 'web',
    title: 'Сайты и боты',
    text: 'Лендинги, сайты-визитки, интернет-магазины и Telegram-боты.',
    items: ['Адаптивная вёрстка', 'Интеграции и оплата', 'Деплой и домен'],
  },
  {
    icon: 'automation',
    title: 'Автоматизация и скрипты',
    text: 'Python-скрипты, парсинг, обработка данных, интеграции сервисов.',
    items: ['Разбор вашего процесса', 'Скрипт или сервис', 'Инструкция по запуску'],
  },
  {
    icon: 'desktop',
    title: 'Десктоп-приложения',
    text: 'Приложения для Windows: от небольших утилит до рабочих инструментов.',
    items: ['Установщик под Windows', 'Удобный интерфейс', 'Доработки по запросу'],
  },
]

export const priceNote = 'Стоимость зависит от задачи и обсуждается лично.'

export type Work = {
  title: string
  type: string
  text: string
  features: string[]
  stack: string[]
  url: string
  cta: string
  downloads?: { label: string; hint: string; url: string }[]
  images: string[]
  alt: string
}

const DECK = 'https://promtly-ru.github.io/ai-presentation/'
export const presentationUrl = DECK

// Примеры работ: открываются вживую по ссылке
export const works: Work[] = [
  {
    title: 'AI-автоматизация для бизнеса',
    type: 'Презентация',
    text: 'Продающая презентация для владельцев малого бизнеса о том, как AI снимает рутину. Открывается по ссылке, а для отправки и печати скачивается в PDF и PowerPoint.',
    features: [
      'Живой фон и плавные переходы между слайдами',
      'Калькулятор: клиент сам считает, сколько стоит его рутина',
      'Анимированный чат «клиент пишет в 3 часа ночи»',
      'Диаграмма оживает при наведении',
      'Листается стрелками, свайпом и колесом мыши',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'PDF', 'PowerPoint'],
    url: DECK,
    cta: 'Открыть презентацию',
    downloads: [
      { label: 'PDF', hint: '7 слайдов', url: `${DECK}downloads/promptly-ai-presentation.pdf` },
      { label: 'PowerPoint', hint: '.pptx', url: `${DECK}downloads/promptly-ai-presentation.pptx` },
    ],
    images: ['/img/works/ai-deck-cover.jpg', '/img/works/ai-deck-calc.jpg'],
    alt: 'Обложка презентации: «Ваш бизнес может работать, пока вы спите» на тёмном фоне с пятнами света',
  },
  {
    title: 'Почему мурчат котики?',
    type: 'Лонгрид-лендинг',
    text: 'Сайт-история простым языком: как кошки мурчат и зачем им это. Настоящие фото, проверенные факты с источниками и живые интерактивы.',
    features: [
      'Схема оживает по мере прокрутки',
      '«Погладь кота»: мурчание синтезируется прямо в браузере',
      'Светлая и тёмная тема',
      'Адаптив от 320px до 4K и версия для печати',
      'Пасхалки и аккуратные анимации',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Web Audio API'],
    url: 'https://promtly-ru.github.io/murchat-site/',
    cta: 'Открыть сайт',
    images: ['/img/works/murchat-cover.jpg', '/img/works/murchat-pet.jpg'],
    alt: 'Главный экран сайта «Почему мурчат котики?»: спящий рыжий кот и крупный заголовок',
  },
]

// Бегущая строка под услугами
export const marquee = [
  'Лендинги',
  'Сайты-визитки',
  'Интернет-магазины',
  'Telegram-боты',
  'Продающие презентации',
  'Python-скрипты',
  'Парсинг',
  'Обработка данных',
  'Интеграции сервисов',
  'Приложения для Windows',
  'Деплой и домен',
]

// Конструктор заявки: из выбранного собирается готовое сообщение
export const brief = {
  types: ['Сайт', 'Telegram-бот', 'Презентация', 'Автоматизация', 'Приложение для Windows', 'Другое'],
  extras: ['Дизайн с нуля', 'Приём оплаты', 'Интеграция с сервисами', 'Админ-панель', 'Деплой и домен', 'Поддержка после запуска'],
  deadlines: ['Не горит', 'В течение месяца', 'Срочно'],
}

export const steps = [
  { title: 'Вы пишете', text: 'Коротко опишите задачу в Telegram, WhatsApp или на почту.' },
  { title: 'Обсуждаем', text: 'Уточняем детали, сроки и цену.' },
  { title: 'Делаю', text: 'Показываю промежуточный результат и вношу правки.' },
  { title: 'Сдаю', text: 'Передаю готовый проект и помогаю с запуском.' },
]

export type CalcMode = 'basic' | 'programmer' | 'finance' | 'engineering'

export type Platform = 'windows' | 'mac' | 'android' | 'ios' | 'web'

// latest/download — всегда последняя версия, имена файлов в релизах без номера версии
const REL = 'https://github.com/promtly-ru/smartcalc/releases/latest/download/'
const WEB_APP = 'https://promtly-ru.github.io/smartcalc/'

export const smartcalc = {
  name: 'SmartCalc',
  version: '1.1.0',
  text: 'Калькулятор с четырьмя режимами в одном окне — для Windows, Mac, Android и iPhone. Бесплатно, без регистрации.',
  modes: [
    { id: 'basic', label: 'Базовый', text: 'Обычные вычисления и память MC / MR / M+ / M−.' },
    { id: 'programmer', label: 'Программист', text: 'HEX, DEC, OCT, BIN, AND / OR / XOR / NOT и сдвиги.' },
    { id: 'finance', label: 'Финансы', text: 'Кредит, вклад, НДС и маржа.' },
    { id: 'engineering', label: 'Инженер', text: 'Перевод длины, массы и температуры.' },
  ] as { id: CalcMode; label: string; text: string }[],
  features: ['История вычислений', 'Светлая и тёмная тема', 'Работает без интернета'],
  webAppUrl: WEB_APP,
  releasesUrl: 'https://github.com/promtly-ru/smartcalc/releases',
  platforms: [
    {
      id: 'windows',
      label: 'Windows',
      requirements: 'Windows 10/11, 64-bit',
      downloads: [
        { label: 'Скачать для Windows', hint: 'установщик .exe', url: `${REL}SmartCalc-Setup.exe` },
        { label: 'Portable', hint: 'без установки', url: `${REL}SmartCalc-Portable.exe` },
      ],
      note: 'Приложение не подписано платным сертификатом, поэтому SmartScreen может предупредить: нажмите «Подробнее» → «Выполнить в любом случае».',
    },
    {
      id: 'mac',
      label: 'macOS',
      requirements: 'Mac на Apple Silicon или Intel',
      downloads: [
        { label: 'Скачать для Mac', hint: 'Apple Silicon (M1–M4)', url: `${REL}SmartCalc-mac-arm64.dmg` },
        { label: 'Mac с Intel', hint: '.dmg', url: `${REL}SmartCalc-mac-x64.dmg` },
      ],
      note: 'Перетащите SmartCalc в «Программы». При первом запуске macOS попросит подтверждение: «Системные настройки» → «Конфиденциальность и безопасность» → «Всё равно открыть».',
    },
    {
      id: 'android',
      label: 'Android',
      requirements: 'Android 7.0 и новее',
      downloads: [
        { label: 'Скачать APK', hint: 'для Android', url: `${REL}SmartCalc.apk` },
        { label: 'Веб-версия', hint: 'установить из Chrome', url: WEB_APP },
      ],
      note: 'Откройте скачанный файл и разрешите установку из этого источника — Android спросит об этом один раз.',
    },
    {
      id: 'ios',
      label: 'iPhone и iPad',
      requirements: 'Safari на iPhone или iPad',
      downloads: [{ label: 'Открыть SmartCalc', hint: 'в Safari', url: WEB_APP }],
      note: 'Откройте ссылку в Safari, нажмите «Поделиться» → «На экран Домой». Калькулятор появится как обычное приложение и будет работать без интернета.',
    },
    {
      id: 'web',
      label: 'Браузер',
      requirements: 'Любой современный браузер',
      downloads: [{ label: 'Открыть в браузере', hint: 'без установки', url: WEB_APP }],
      note: 'В Chrome и Edge веб-версию можно установить как приложение: значок «Установить» в адресной строке.',
    },
  ] as {
    id: Platform
    label: string
    requirements: string
    downloads: { label: string; hint: string; url: string }[]
    note: string
  }[],
}
