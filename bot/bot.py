"""Простой Telegram-бот на чистой stdlib (long polling). Токен берётся из TG_TOKEN."""
import json
import os
import random
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime

_env = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
if os.path.exists(_env):
    for _line in open(_env, encoding="utf-8"):
        _k, _, _v = _line.strip().partition("=")
        if _k and _v:
            os.environ.setdefault(_k, _v)

TOKEN = os.environ.get("TG_TOKEN")
if not TOKEN:
    sys.exit("Задай токен: $env:TG_TOKEN='123:ABC' (получить у @BotFather)")

API = f"https://api.telegram.org/bot{TOKEN}/"


def call(method, **params):
    data = urllib.parse.urlencode(params).encode()
    with urllib.request.urlopen(API + method, data, timeout=60) as r:
        return json.load(r)["result"]


def reply(text):
    t = text.strip()
    cmd = t.split()[0].split("@")[0].lower() if t else ""
    if cmd in ("/start", "/help"):
        return "Привет! Команды:\n/time — время\n/dice — кубик\n/coin — монетка\nЛюбой другой текст я верну эхом."
    if cmd == "/time":
        return datetime.now().strftime("%d.%m.%Y %H:%M:%S")
    if cmd == "/dice":
        return f"🎲 Выпало: {random.randint(1, 6)}"
    if cmd == "/coin":
        return random.choice(["Орёл", "Решка"])
    return t or "Пустое сообщение"


def main():
    print("Бот запущен: @" + call("getMe")["username"])
    offset = 0
    while True:
        try:
            updates = call("getUpdates", offset=offset, timeout=30)
        except Exception as e:
            print("Ошибка:", e)
            time.sleep(5)
            continue
        for u in updates:
            offset = u["update_id"] + 1
            msg = u.get("message")
            if msg and "text" in msg:
                call("sendMessage", chat_id=msg["chat"]["id"], text=reply(msg["text"]))


if __name__ == "__main__":
    main()
