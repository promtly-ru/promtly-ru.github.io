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

export const smartcalc = {
  name: 'SmartCalc',
  version: '1.0.1',
  text: 'Калькулятор для Windows с четырьмя режимами в одном окне. Бесплатно, без регистрации.',
  requirements: 'Windows 10/11, 64-bit',
  modes: [
    { id: 'basic', label: 'Базовый', text: 'Обычные вычисления и память MC / MR / M+ / M−.' },
    { id: 'programmer', label: 'Программист', text: 'HEX, DEC, OCT, BIN, AND / OR / XOR / NOT и сдвиги.' },
    { id: 'finance', label: 'Финансы', text: 'Кредит, вклад, НДС и маржа.' },
    { id: 'engineering', label: 'Инженер', text: 'Перевод длины, массы и температуры.' },
  ] as { id: CalcMode; label: string; text: string }[],
  features: ['История вычислений', 'Светлая и тёмная тема', 'Окно поверх остальных'],
  download: {
    label: 'Скачать для Windows',
    size: '118 МБ',
    url: 'https://github.com/workvibecoding398-sys/smartcalc/releases/download/v1.0.1/SmartCalc-Setup-1.0.1.exe',
  },
  releasesUrl: 'https://github.com/workvibecoding398-sys/smartcalc/releases',
  note: 'Приложение не подписано сертификатом, поэтому Windows SmartScreen может показать предупреждение: нажмите «Подробнее» → «Выполнить в любом случае».',
}
