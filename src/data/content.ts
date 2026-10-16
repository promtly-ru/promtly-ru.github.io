// Все тексты и ссылки сайта — меняются здесь.

export const profile = {
  name: 'Promptly',
  // Заголовок первого экрана: «Делаю <слово> под ваши задачи», слова сменяются по очереди
  headlineWords: ['сайты', 'Telegram-боты', 'программы', 'автоматизацию'],
  about:
    'Разрабатываю сайты, Telegram-боты, скрипты автоматизации и десктоп-приложения для Windows. Обсуждаем задачу, договариваемся о цене и сроках — и я делаю под ключ.',
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

export const steps = [
  { title: 'Вы пишете', text: 'Коротко опишите задачу в Telegram, WhatsApp или на почту.' },
  { title: 'Обсуждаем', text: 'Уточняем детали, сроки и цену.' },
  { title: 'Делаю', text: 'Показываю промежуточный результат и вношу правки.' },
  { title: 'Сдаю', text: 'Передаю готовый проект и помогаю с запуском.' },
]

export type CalcMode = 'basic' | 'programmer' | 'finance' | 'engineering'

export type Platform = 'windows' | 'mac' | 'android' | 'ios' | 'web'

// latest/download — всегда последняя версия, имена файлов в релизах без номера версии
const REL = 'https://github.com/workvibecoding398-sys/smartcalc/releases/latest/download/'
const WEB_APP = 'https://workvibecoding398-sys.github.io/smartcalc/'

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
  releasesUrl: 'https://github.com/workvibecoding398-sys/smartcalc/releases',
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
