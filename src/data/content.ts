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
  telegram: { label: 'Telegram', value: '@promptly3', url: 'https://t.me/promptly3' },
  email: { label: 'Email', value: 'work.vibecoding.398@gmail.com', url: 'mailto:work.vibecoding.398@gmail.com' },
  whatsapp: { label: 'WhatsApp', value: '+7 967 930-63-31', url: 'https://wa.me/79679306331' },
}

export const channel = {
  title: 'Promptly | Сайты, боты, автоматизация',
  url: 'https://t.me/+XiDWIY2wYiVhN2Rl',
  text: 'Показываю, как делаю сайты, ботов и автоматизацию: кейсы, разборы и полезное для бизнеса. Подпишитесь, чтобы не пропустить новое.',
  points: ['Кейсы и готовые работы', 'Разборы: как автоматизация экономит часы', 'Новости и обновления проектов'],
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

// Частые вопросы (блок «Вопросы» после заявки)
export const faq: { q: string; a: string }[] = [
  {
    q: 'Сколько это стоит?',
    a: 'Стоимость зависит от задачи и обсуждается лично. Опишите задачу в конструкторе заявки или напишите в Telegram — назову цену и сроки до начала работы.',
  },
  {
    q: 'Как быстро вы отвечаете?',
    a: 'В течение дня, максимум за 24 часа. Быстрее всего — в Telegram.',
  },
  {
    q: 'Как начать работу?',
    a: 'Соберите заявку в конструкторе выше или просто напишите мне. Дальше обсуждаем задачу, договариваемся о цене и сроках, и я делаю под ключ.',
  },
  {
    q: 'Можно посмотреть, что вы уже делали?',
    a: 'Да, в разделе «Работы» есть живые примеры, которые открываются по ссылке, и готовое приложение SmartCalc для Windows, которое можно скачать.',
  },
  {
    q: 'Что нужно подготовить заранее?',
    a: 'Достаточно короткого описания задачи и, если есть, примеров того, что нравится. Остальное уточним в переписке.',
  },
]

export type WorkPlatform = {
  id: string
  label: string
  requirements: string
  downloads: { label: string; hint: string; url: string; web?: boolean }[]
  note: string
}

export type WorkCategory = 'game' | 'site' | 'bot' | 'deck'

export const workCategories: { id: WorkCategory; label: string }[] = [
  { id: 'game', label: 'Игры' },
  { id: 'site', label: 'Сайты' },
  { id: 'bot', label: 'Боты' },
  { id: 'deck', label: 'Презентации' },
]

export type Work = {
  category: WorkCategory
  title: string
  type: string
  text: string
  features: string[]
  stack: string[]
  url: string
  cta: string
  downloads?: { label: string; hint: string; url: string }[]
  platforms?: WorkPlatform[]
  /** Доп. материалы под превью: GIF геймплея и ряд миниатюр */
  demo?: { src: string; alt: string }
  gallery?: { src: string; alt: string; caption: string }[]
  version?: string
  releasesUrl?: string
  images: string[]
  alt: string
}

const CYBERHACK_DL = 'https://github.com/promtly-ru/cyberhack/releases/download/v0.2.0/'
const DECK = 'https://promtly-ru.github.io/ai-presentation/'
export const presentationUrl = DECK

// Примеры работ: открываются вживую по ссылке
export const works: Work[] = [
  {
    category: 'game',
    title: 'CyberHack',
    type: 'Браузерная игра',
    text: 'Карточный roguelike в неоновом киберпанке: собираешь колоду программ-взломщиков и проходишь три акта охранных систем. Играется в браузере, на телефоне и ставится как приложение.',
    features: [
      'Три класса, 100+ карт, 63 реликвии, 15 уровней сложности',
      'Ежедневный забег и ачивки, которые открывают новые карты',
      'Баланс выверен ботами на тысячах автоматических забегов',
      'Работает офлайн, есть версии для Windows, macOS, Linux и Android',
      'Удобно играть пальцем: превью карты по долгому тапу',
    ],
    stack: ['TypeScript', 'React', 'Pixi.js', 'PWA', 'Tauri', 'Capacitor', 'Playwright'],
    url: 'https://promtly-ru.github.io/cyberhack/',
    cta: 'Играть',
    demo: { src: '/img/works/cyberhack-demo.gif', alt: 'Геймплей CyberHack: меню, выбор класса, карта акта и бой с картами' },
    gallery: [
      { src: '/img/works/cyberhack-map.jpg', alt: 'Карта первого акта с узлами и легендой', caption: 'Карта' },
      { src: '/img/works/cyberhack-class.jpg', alt: 'Выбор класса и сложности', caption: 'Классы' },
      { src: '/img/works/cyberhack-tutorial.jpg', alt: 'Обучение: подсказка над картой «Пинг»', caption: 'Обучение' },
    ],
    version: '0.2.0',
    releasesUrl: 'https://github.com/promtly-ru/cyberhack/releases/latest',
    platforms: [
      {
        id: 'windows',
        label: 'Windows',
        requirements: 'Windows 10/11, 64-bit',
        downloads: [
          { label: 'Скачать для Windows', hint: 'установщик .exe', url: `${CYBERHACK_DL}CyberHack_0.2.0_x64-setup.exe` },
          { label: 'Установщик .msi', hint: 'для администраторов', url: `${CYBERHACK_DL}CyberHack_0.2.0_x64_en-US.msi` },
        ],
        note: 'Приложение не подписано платным сертификатом, поэтому SmartScreen может предупредить: нажмите «Подробнее» → «Выполнить в любом случае».',
      },
      {
        id: 'mac',
        label: 'macOS',
        requirements: 'Mac на Apple Silicon (M1 и новее)',
        downloads: [{ label: 'Скачать для Mac', hint: 'образ .dmg', url: `${CYBERHACK_DL}CyberHack_0.2.0_aarch64.dmg` }],
        note: 'Правый клик по приложению → «Открыть». Если macOS пишет «повреждено», выполните в Терминале: xattr -cr /Applications/CyberHack.app',
      },
      {
        id: 'linux',
        label: 'Linux',
        requirements: 'Любой 64-bit дистрибутив',
        downloads: [
          { label: 'Скачать AppImage', hint: 'запускается везде', url: `${CYBERHACK_DL}CyberHack_0.2.0_amd64.AppImage` },
          { label: 'Пакет .deb', hint: 'Debian, Ubuntu', url: `${CYBERHACK_DL}CyberHack_0.2.0_amd64.deb` },
          { label: 'Пакет .rpm', hint: 'Fedora, openSUSE', url: `${CYBERHACK_DL}CyberHack-0.2.0-1.x86_64.rpm` },
        ],
        note: 'Для AppImage сделайте файл исполняемым: chmod +x CyberHack_*.AppImage',
      },
      {
        id: 'android',
        label: 'Android',
        requirements: 'Android 7 и новее',
        downloads: [{ label: 'Скачать для Android', hint: 'файл .apk', url: `${CYBERHACK_DL}CyberHack-v0.2.0-android-debug.apk` }],
        note: 'Разрешите установку из неизвестных источников. Файл подписан тестовым ключом, поэтому новую версию иногда придётся ставить поверх удалённой старой.',
      },
      {
        id: 'ios',
        label: 'iPhone / iPad',
        requirements: 'Safari, iOS 15 и новее',
        downloads: [{ label: 'Открыть игру', hint: 'работает в браузере', url: 'https://promtly-ru.github.io/cyberhack/', web: true }],
        note: 'Нативной сборки для iOS нет. Откройте игру в Safari → «Поделиться» → «На экран „Домой“»: она будет работать как приложение и без интернета.',
      },
      {
        id: 'web',
        label: 'Браузер',
        requirements: 'Любой современный браузер',
        downloads: [{ label: 'Играть в браузере', hint: 'ничего ставить не нужно', url: 'https://promtly-ru.github.io/cyberhack/', web: true }],
        note: 'В Chrome и Edge в адресной строке появится значок установки: игра встанет как приложение и будет работать офлайн.',
      },
    ],
    images: ['/img/works/cyberhack-cover.jpg', '/img/works/cyberhack-map.jpg'],
    alt: 'Бой в игре CyberHack: неоновый хакер против бота-файрвола, внизу рука из карт-программ',
  },
  {
    category: 'deck',
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
    category: 'site',
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
  {
    category: 'bot',
    title: 'Telegram-бот мониторинга',
    type: 'Telegram-бот',
    text: 'Бот следит за сайтом и сам пишет, если тот перестал открываться. По команде показывает статус и статистику посещений, а ещё публикует посты в канал по расписанию.',
    features: [
      'Проверка сайта каждые 5 минут и мгновенное оповещение о сбое',
      'Команды /status и /stats работают у любого, кто открыл бота',
      'Автопубликация постов в канал по расписанию из очереди',
      'Работает без сервера, на GitHub Actions',
    ],
    stack: ['Python', 'Telegram Bot API', 'GitHub Actions', 'GoatCounter'],
    url: 'https://t.me/Tracking_Promptly_bot',
    cta: 'Открыть бота',
    images: ['/img/works/bot-cover.jpg'],
    alt: 'Чат с ботом Promptly Monitor: ответы на команды /status и /stats и оповещение о возобновлении работы сайта',
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
