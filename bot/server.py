"""Бот в режиме long polling: команды отвечают за секунды, сайт проверяется раз в 5 минут. Живёт ~5 ч 50 мин, затем перезапуск."""
import json
import os
import time
import urllib.request
from datetime import datetime, timezone

import monitor
from tg import CHANNEL, OWNER, call, send

SITE = monitor.SITE
END = time.time() + 350 * 60
CHECK_EVERY = 300


def check():
    """Возвращает (ок, код, мс); до 3 попыток."""
    code, ms = "000", 0
    for i in range(3):
        t = time.time()
        try:
            with urllib.request.urlopen(SITE, timeout=15) as r:
                code = str(r.status)
        except urllib.error.HTTPError as e:
            code = str(e.code)
        except Exception:
            code = "000"
        ms = int((time.time() - t) * 1000)
        if code == "200":
            return True, code, ms
        if i < 2:
            time.sleep(10)
    return False, code, ms


state = {"ok": True, "code": "200", "ms": 0}


def refresh(notify=True):
    ok, code, ms = check()
    was = state["ok"]
    state.update(ok=ok, code=code, ms=ms)
    if not notify or ok == was:
        return
    if ok:
        txt = f"🟢 <b>Сайт снова работает</b>\n\n🌐 {SITE}\n⚡ Ответ: <code>{ms} мс</code>"
    else:
        txt = (f"🔴 <b>Сайт не отвечает</b>\n\n🌐 {SITE}\n⚠️ Код ответа: <code>{code}</code>\n"
               f"🕒 {datetime.now(timezone.utc):%d.%m.%Y %H:%M UTC}\n🔁 Проверено 3 раза подряд")
    for chat in filter(None, (OWNER, CHANNEL)):
        send(chat, txt)


def status_text():
    monitor.OK, monitor.CODE, monitor.MS = state["ok"], state["code"], str(state["ms"])
    return monitor.status_text()


def handle(u):
    ev = u.get("my_chat_member") or u.get("channel_post")
    if ev:
        c = ev["chat"]
        if str(c["id"]) not in (OWNER, CHANNEL) and OWNER:
            send(OWNER, f"🔗 Чат: <b>{c.get('title', c.get('username', '?'))}</b>\nТип: {c['type']}\nID: <code>{c['id']}</code>")
        return
    m = u.get("message")
    if not m or "text" not in m:
        return
    cmd = m["text"].split()[0].split("@")[0].lower()
    if cmd == "/status":
        refresh(notify=False)
        send(m["chat"]["id"], status_text())
    elif cmd == "/stats":
        send(m["chat"]["id"], monitor.stats_text())
    elif cmd in ("/help", "/start"):
        send(m["chat"]["id"], monitor.HELP)


def main():
    call("deleteWebhook")
    refresh(notify=False)
    last, offset = time.time(), 0
    print("server started, site ok:", state["ok"])
    while time.time() < END:
        r = call("getUpdates", offset=offset, timeout=25,
                 allowed_updates=json.dumps(["message", "channel_post", "my_chat_member"]))
        for u in r.get("result", []):
            offset = u["update_id"] + 1
            try:
                handle(u)
            except Exception as e:
                print("handle error:", type(e).__name__)
        if not r.get("ok"):
            print("getUpdates:", r.get("description"))
            time.sleep(5)
        if time.time() - last >= CHECK_EVERY:
            refresh()
            last = time.time()


if __name__ == "__main__":
    main()
