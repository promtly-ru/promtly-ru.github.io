"""Каждые 5 минут: алерт о падении сайта, ответы на команды любых пользователей, статистика GoatCounter."""
import json
import os
import time
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

from tg import CHANNEL, OWNER, call, send

SITE = os.environ.get("SITE_URL", "https://promtly-ru.github.io/")
OK = os.environ.get("SITE_OK") == "1"
CODE, MS = os.environ.get("SITE_CODE", "000"), os.environ.get("SITE_MS", "0")
GC_TOKEN = os.environ.get("GC_TOKEN", "")
GC = "https://promptly.goatcounter.com/api/v0/"

HELP = ("👋 <b>Promptly Monitor</b>\n\nСлежу за сайтом <b>Promptly</b> и сообщаю, если он упал или обновился.\n\n"
        "/status — работает ли сайт сейчас\n/stats — посещения и клики\n/help — эта справка\n\n"
        "🛠 Заказать сайт, бота или автоматизацию: @nothing8931\n⏱ Ответы приходят с задержкой до 5 минут.")


def status_text():
    if OK:
        return f"🟢 <b>Сайт работает</b>\n\n🌐 {SITE}\n⚡ Ответ: <code>{MS} мс</code>\n📡 Код: <code>200</code>"
    return f"🔴 <b>Сайт недоступен</b>\n\n🌐 {SITE}\n⚠️ Код: <code>{CODE}</code>"


def gc(path):
    req = urllib.request.Request(GC + path, headers={"Authorization": "Bearer " + GC_TOKEN})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)


def stats_text():
    if not GC_TOKEN:
        return "📊 Статистика подключается, загляни позже."
    try:
        now = datetime.now(timezone(timedelta(hours=3)))  # часовой пояс сайта в GoatCounter — Москва
        iso = lambda d, t="00:00:00": d.strftime(f"%Y-%m-%dT{t}+03:00")
        out = ["📊 <b>Статистика сайта</b>"]
        for title, days in (("Сегодня", 0), ("7 дней", 6)):
            t = gc("stats/total?" + urllib.parse.urlencode({"start": iso(now - timedelta(days=days)), "end": iso(now, "%H:%M:%S")}))
            views = t.get("total", 0) - t.get("total_events", 0)  # total включает клики-события
            out.append(f"\n<b>{title}</b>: 👁 {views} просмотров, 🖱 {t.get('total_events', 0)} кликов")
        hits = gc("stats/hits?" + urllib.parse.urlencode({"start": iso(now - timedelta(days=6)), "end": iso(now, "%H:%M:%S"), "limit": 100})).get("hits", [])
        pages = [h for h in hits if not h.get("event")]
        clicks = [h for h in hits if h.get("event")][:5]
        daily = {}
        for h in pages:
            for d in h.get("stats", []):
                daily[d["day"]] = daily.get(d["day"], 0) + d.get("daily", 0)
        d = [daily.get((now - timedelta(days=6 - i)).strftime("%Y-%m-%d"), 0) for i in range(7)]
        if max(d) > 0:
            out.append("\n📈 7 дней: <code>" + "".join("▁▂▃▄▅▆▇█"[min(7, v * 7 // max(d))] for v in d) + f"</code> (макс {max(d)}/день)")
        if pages:
            out.append("\n<b>Страницы за 7 дней</b>")
            out += [f"• {h['path']} — {h['count']}" for h in pages[:3]]
        if clicks:
            out.append("\n<b>Что нажимали за 7 дней</b>")
            out += [f"• {h['path'].removeprefix('click/')} — {h['count']}" for h in clicks]
        else:
            out.append("\nКликов пока нет.")
        return "\n".join(out)
    except Exception as e:
        return f"📊 Статистика временно недоступна ({type(e).__name__})."


def main():
    if not OK and os.environ.get("BOT_ALIVE") != "1":  # когда бот жив, алерты шлёт он
        txt = (f"🔴 <b>Сайт не отвечает</b>\n\n🌐 {SITE}\n⚠️ Код ответа: <code>{CODE}</code>\n"
               f"🕒 {datetime.now(timezone.utc):%d.%m.%Y %H:%M UTC}\n🔁 Проверено 3 раза подряд")
        for chat in filter(None, (OWNER, CHANNEL)):
            send(chat, txt)
    if os.environ.get("NO_UPDATES"):  # команды обрабатывает постоянный бот (server.py)
        return
    r = call("getUpdates", timeout=0, allowed_updates=json.dumps(["message", "channel_post", "my_chat_member"]))
    ups = r.get("result", [])
    if ups:
        call("getUpdates", offset=ups[-1]["update_id"] + 1, timeout=0)
    now = time.time()
    print("updates:", len(ups), "; webhook:", call("getWebhookInfo").get("result", {}).get("url") or "none")
    for u in ups:
        k = next((x for x in ("message", "channel_post", "my_chat_member") if x in u), "other")
        c = (u.get(k) or {}).get("chat", {})
        print("event", k, c.get("type"), c.get("id"), "age", int(now - (u.get(k) or {}).get("date", now)))
        if now - (u.get("message") or u.get("channel_post") or u.get("my_chat_member") or {}).get("date", 0) > 360:
            continue
        # бота добавили в чат или в канале появился пост: сообщаем владельцу id чата для привязки
        ev = u.get("my_chat_member") or u.get("channel_post")
        if ev:
            c = ev["chat"]
            if str(c["id"]) not in (OWNER, CHANNEL) and OWNER:
                send(OWNER, f"🔗 Чат: <b>{c.get('title', c.get('username', '?'))}</b>\nТип: {c['type']}\nID: <code>{c['id']}</code>")
            continue
        m = u.get("message")
        if not m or "text" not in m:
            continue
        cmd = m["text"].split()[0].split("@")[0].lower()
        text = {"/status": status_text, "/stats": stats_text, "/help": lambda: HELP, "/start": lambda: HELP}.get(cmd)
        if text:
            send(m["chat"]["id"], text())


if __name__ == "__main__":
    main()
