"""Оформление бота и канала. Запускается вручную (workflow tg-setup), доступно только владельцу репозитория."""
import json
import os
from tg import CHANNEL, call

A = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "avatar.png")


def show(name, r):
    print(name, "ok" if r.get("ok") else r.get("description"))


show("name", call("setMyName", name="Promptly Monitor"))
show("short", call("setMyShortDescription", short_description="Статус и статистика сайта Promptly. Сайты, боты, автоматизация под ключ: @nothing8931"))
show("desc", call("setMyDescription", description=(
    "🟢 Слежу за сайтом Promptly и пишу, если он упал или обновился.\n\n"
    "/status — работает ли сайт\n/stats — посещения и клики\n\n"
    "🛠 Делаю сайты, Telegram-ботов, автоматизацию, презентации и приложения под ключ. Заказ: @nothing8931")))
cmds = [{"command": "start", "description": "Главное меню"},
        {"command": "status", "description": "Работает ли сайт сейчас"},
        {"command": "stats", "description": "Посещения и клики"},
        {"command": "services", "description": "Услуги"},
        {"command": "works", "description": "Кейсы"},
        {"command": "faq", "description": "Частые вопросы"},
        {"command": "order", "description": "Заказать"}]
show("cmds", call("setMyCommands", commands=json.dumps(cmds)))
show("menu", call("setChatMenuButton", menu_button=json.dumps({"type": "commands"})))
show("bot-photo", call("setMyProfilePhoto", files={"photo": A}, photo=json.dumps({"type": "static", "photo": "attach://photo"})))
if CHANNEL:
    show("ch-title", call("setChatTitle", chat_id=CHANNEL, title="Promptly | Сайты, боты, автоматизация"))
    show("ch-desc", call("setChatDescription", chat_id=CHANNEL, description=(
        "Делаю сайты, Telegram-ботов, автоматизацию, презентации и Windows-приложения под ключ.\n"
        "Кейсы, разборы и полезное про автоматизацию бизнеса.\n\n"
        "🛠 Заказ: @nothing8931\n🌐 https://promtly-ru.github.io/\n🤖 Статус сайта: @Tracking_Promptly_bot")))
    show("ch-photo", call("setChatPhoto", files={"photo": A}, chat_id=CHANNEL))
else:
    print("TG_CHANNEL_ID не задан: оформление канала пропущено")
