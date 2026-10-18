"""Публикация в канал: ручная (workflow tg-post) и по очереди queue.json (workflow tg-schedule)."""
import json
import os
import sys
from tg import CHANNEL, call, send

D = os.path.dirname(os.path.abspath(__file__))
mode = sys.argv[1]  # manual | queue
if not CHANNEL:
    print("TG_CHANNEL_ID не задан, публикация пропущена")
    sys.exit(0)
if mode == "manual":
    item = {"text": os.environ["POST_TEXT"], "video": os.environ.get("POST_VIDEO") == "true", "pin": os.environ.get("POST_PIN") == "true"}
else:
    q = json.load(open(os.path.join(D, "queue.json"), encoding="utf-8"))
    item = next((i for i in q if not i.get("done")), None)
    if not item:
        sys.exit("Очередь пуста")
if item.get("video"):
    r = call("sendVideo", files={"video": os.path.join(D, "assets", "promptly-ad.mp4")}, chat_id=CHANNEL,
             caption=item["text"], parse_mode="HTML", supports_streaming="true", width=1080, height=1920)
else:
    r = send(CHANNEL, item["text"])
print("post", "ok" if r.get("ok") else r.get("description"))
if not r.get("ok"):
    sys.exit(1)
if item.get("pin"):
    print("pin", call("pinChatMessage", chat_id=CHANNEL, message_id=r["result"]["message_id"], disable_notification="true").get("ok"))
if mode == "queue":
    item["done"] = True
    json.dump(q, open(os.path.join(D, "queue.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
