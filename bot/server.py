"""Бот в режиме long polling: команды отвечают за секунды, сайт проверяется в фоновом потоке раз в 5 минут. Живёт ~5 ч 50 мин, затем перезапуск."""
import json
import threading
import time
import urllib.request
from datetime import datetime, timezone

import monitor
import ui
from tg import CHANNEL, OWNER, call, send

SITE = monitor.SITE
END = time.time() + 350 * 60
CHECK_EVERY = 300
QUEUE_URL = "https://raw.githubusercontent.com/promtly-ru/promtly-ru.github.io/main/bot/queue.json"
state = {"ok": True, "code": "200", "ms": 0}
lock = threading.Lock()
pending = {}      # chat -> время начала заявки
last_cmd = {}     # chat -> время последней команды
stats_cache = [0.0, ""]


def check(attempts=3):
    """Возвращает (ок, код, мс); до attempts попыток."""
    code, ms = "000", 0
    for i in range(attempts):
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
        if i < attempts - 1:
            time.sleep(10)
    return False, code, ms


def refresh(notify=True, attempts=3):
    ok, code, ms = check(attempts)
    with lock:
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


def watcher():
    """Фоновая проверка сайта: не блокирует ответы на команды."""
    while time.time() < END:
        try:
            refresh()
        except Exception as e:
            print("watcher error:", type(e).__name__)
        time.sleep(CHECK_EVERY)


def status_text():
    with lock:
        monitor.OK, monitor.CODE, monitor.MS = state["ok"], state["code"], str(state["ms"])
    return monitor.status_text()


def stats_text():
    if time.time() - stats_cache[0] > 60:
        stats_cache[:] = [time.time(), monitor.stats_text()]
    return stats_cache[1]


def queue_text():
    try:
        with urllib.request.urlopen(QUEUE_URL, timeout=15) as r:
            q = json.load(r)
    except Exception:
        return "⚠️ Не удалось прочитать очередь."
    left = [i for i in q if not i.get("done")]
    nxt = left[0]["text"].split("\n")[0][:80] if left else "—"
    return f"📝 В очереди постов: <b>{len(left)}</b> из {len(q)}\nСледующий: {nxt}"


def body(name):
    if name == "status":
        refresh(notify=False, attempts=1)
        return status_text()
    if name == "stats":
        return stats_text()
    return {"services": ui.SERVICES, "works": ui.WORKS, "faq": ui.FAQ}.get(name)


def order_forward(m):
    u = m.get("from", {})
    who = u.get("first_name", "?") + (f" @{u['username']}" if u.get("username") else "")
    link = f"tg://user?id={u['id']}" if u.get("id") else ""
    send(OWNER, f"💼 <b>Новая заявка</b>\nОт: <a href=\"{link}\">{who}</a> (id <code>{u.get('id')}</code>)\n\n{m['text'][:3000]}")
    send(m["chat"]["id"], "✅ Заявка получена, отвечу в течение 24 часов.", reply_markup=ui.BACK_KB)


def handle(u):
    if "callback_query" in u:
        callback(u["callback_query"])
        return
    ev = u.get("my_chat_member") or u.get("channel_post")
    if ev:
        c = ev["chat"]
        if str(c["id"]) not in (OWNER, CHANNEL) and OWNER:
            send(OWNER, f"🔗 Чат: <b>{c.get('title', c.get('username', '?'))}</b>\nТип: {c['type']}\nID: <code>{c['id']}</code>")
        return
    m = u.get("message")
    if not m or "text" not in m:
        return
    chat = m["chat"]["id"]
    private = m["chat"]["type"] == "private"
    first = m["text"].split()[0]
    cmd = first.split("@")[0].lower() if first.startswith("/") else ""
    now = time.time()
    if now - last_cmd.get(chat, 0) < 2:  # защита от спама
        return
    last_cmd[chat] = now
    admin = str(chat) == OWNER
    if cmd in ("/start", "/help", "/menu"):
        pending.pop(chat, None)
        home(chat)
    elif cmd in ("/status", "/stats", "/services", "/works", "/faq"):
        send(chat, body(cmd[1:]), reply_markup=ui.BACK_KB)
    elif cmd == "/order":
        pending[chat] = now
        send(chat, "💬 Опишите задачу в паре предложений одним сообщением, отвечу в течение 24 часов.", reply_markup=ui.BACK_KB)
    elif cmd == "/ping" and admin:
        send(chat, f"🏓 Бот жив, до перезапуска {int((END - now) // 60)} мин.")
    elif cmd == "/queue" and admin:
        send(chat, queue_text())
    elif cmd:
        return
    elif private and now - pending.get(chat, 0) < 1800:
        pending.pop(chat, None)
        order_forward(m)
    elif private:
        send(chat, "Нажми /menu, чтобы открыть меню, или /order, чтобы оставить заявку.")


photo_id = None


def home(chat):
    global photo_id
    args = dict(chat_id=chat, caption=ui.HOME_TEXT, parse_mode="HTML", reply_markup=ui.HOME_KB)
    r = call("sendPhoto", photo=photo_id, **args) if photo_id else call("sendPhoto", files={"photo": ui.BANNER}, **args)
    if r.get("ok") and not photo_id:
        photo_id = r["result"]["photo"][-1]["file_id"]
    elif not r.get("ok"):
        photo_id = None
        send(chat, ui.HOME_TEXT, reply_markup=ui.HOME_KB)


def callback(cb):
    call("answerCallbackQuery", callback_query_id=cb["id"])
    msg, data = cb.get("message"), cb.get("data")
    if not msg or not data:
        return
    chat = msg["chat"]["id"]
    if data == "home":
        home(chat)
        return
    text = body(data)
    if not text:
        return
    args = dict(chat_id=chat, message_id=msg["message_id"], parse_mode="HTML", reply_markup=ui.BACK_KB)
    if "photo" in msg:
        if len(text) <= 1024:
            r = call("editMessageCaption", caption=text, **args)
            if r.get("ok") or "not modified" in str(r.get("description")):
                return
        call("deleteMessage", chat_id=chat, message_id=msg["message_id"])
        send(chat, text, reply_markup=ui.BACK_KB)
    else:
        r = call("editMessageText", text=text, disable_web_page_preview="true", **args)
        if not r.get("ok") and "not modified" not in str(r.get("description")):
            send(chat, text, reply_markup=ui.BACK_KB)


def main():
    call("deleteWebhook")
    threading.Thread(target=watcher, daemon=True).start()
    offset = 0
    print("server started")
    while time.time() < END:
        r = call("getUpdates", offset=offset, timeout=25,
                 allowed_updates=json.dumps(["message", "channel_post", "my_chat_member", "callback_query"]))
        for u in r.get("result", []):
            offset = u["update_id"] + 1
            try:
                handle(u)
            except Exception as e:
                print("handle error:", type(e).__name__, e)
        if not r.get("ok"):
            print("getUpdates:", r.get("description"))
            time.sleep(5)


if __name__ == "__main__":
    main()