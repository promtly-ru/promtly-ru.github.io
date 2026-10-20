"""Интерфейс бота: тексты разделов и inline-кнопки."""
import json
import os

SITE = "https://promtly-ru.github.io/"
ORDER = "https://t.me/nothing8931"
CHANNEL_LINK = "https://t.me/promptly398"
BANNER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "banner.png")


def kb(rows):
    return json.dumps({"inline_keyboard": rows})


def b(text, data=None, url=None):
    return {"text": text, **({"url": url} if url else {"callback_data": data})}


HOME_TEXT = ("<b>Promptly</b>: сайты, Telegram-боты и автоматизация под ключ.\n\n"
             "🎮 <b>Новая версия игры «Кибер-хакер»</b> уже вышла, жми «Играть» ниже.

"
             "Выбери раздел 👇\n<i>Статус сайта и статистика обновляются в реальном времени.</i>")
HOME_KB = kb([
    [b("🟢 Статус сайта", "status"), b("📊 Статистика", "stats")],
    [b("🛠 Услуги", "services"), b("🎯 Кейсы", "works")],
    [b("❓ Вопросы", "faq"), b("💬 Заказать", url=ORDER)],
    [b("🎮 Играть в Кибер-хакер", url="https://promtly-ru.github.io/cyberhack/")],
    [b("🌐 Сайт", url=SITE), b("📢 Канал", url=CHANNEL_LINK)],
])
BACK_KB = kb([[b("⬅️ В меню", "home"), b("💬 Заказать", url=ORDER)]])

SERVICES = ("🛠 <b>Услуги</b>\n\n"
            "🌐 <b>Сайты и боты</b>\nЛендинги, визитки, интернет-магазины, Telegram-боты. Адаптивная вёрстка, интеграции и оплата, деплой и домен.\n\n"
            "⚙️ <b>Автоматизация и скрипты</b>\nPython-скрипты, парсинг, обработка данных, интеграции сервисов.\n\n"
            "💻 <b>Приложения для Windows</b>\nОт небольших утилит до рабочих инструментов, с установщиком.\n\n"
            "📊 <b>Продающие презентации</b>\nС анимацией и интерактивом, в PDF и PowerPoint.\n\n"
            "💰 Цену и сроки называю до начала работы.")
WORKS = ("🎯 <b>Кейсы</b>\n\n"
         "🎮 <a href=\"https://promtly-ru.github.io/cyberhack/\">CyberHack</a>: карточная игра в браузере, 100+ карт, офлайн и установка.\n\n"
         "📊 <a href=\"https://promtly-ru.github.io/ai-presentation/\">Презентация «AI-автоматизация для бизнеса»</a>: живой фон, калькулятор рутины.\n\n"
         "🐱 <a href=\"https://promtly-ru.github.io/murchat-site/\">Почему мурчат котики?</a>: лонгрид с интерактивами.\n\n"
         "🧮 <a href=\"" + SITE + "\">SmartCalc для Windows</a>: бесплатный калькулятор, 4 режима.")
FAQ = ("❓ <b>Частые вопросы</b>\n\n"
       "<b>Сколько стоит?</b>\nЗависит от задачи. Называю цену и сроки до начала работы.\n\n"
       "<b>Как быстро отвечаете?</b>\nВ течение 24 часов, чаще быстрее. Быстрее всего в Telegram.\n\n"
       "<b>Как начать?</b>\nНапишите задачу в паре предложений: @nothing8931.\n\n"
       "<b>Что подготовить?</b>\nКороткое описание и примеры, которые нравятся. Остальное уточним.")
