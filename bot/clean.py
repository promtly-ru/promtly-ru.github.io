"""Очистка канала: удаляет все сообщения, кроме закреплённого (если KEEP_PINNED=true)."""
import os
import time
from tg import CHANNEL, call

if not CHANNEL:
    raise SystemExit("TG_CHANNEL_ID не задан")
keep = set()
if os.environ.get("KEEP_PINNED", "true") == "true":
    pm = call("getChat", chat_id=CHANNEL).get("result", {}).get("pinned_message")
    if pm:
        keep.add(pm["message_id"])
# узнаём последний номер сообщения: шлём пробное и сразу удаляем
probe = call("sendMessage", chat_id=CHANNEL, text=".", disable_notification="true")["result"]["message_id"]
call("deleteMessage", chat_id=CHANNEL, message_id=probe)
print("last id:", probe, "keep:", sorted(keep))
done = 0
for mid in range(1, probe):
    if mid in keep:
        continue
    r = call("deleteMessage", chat_id=CHANNEL, message_id=mid)
    if r.get("ok"):
        done += 1
    elif r.get("error_code") == 429:
        time.sleep(r.get("parameters", {}).get("retry_after", 3))
        done += call("deleteMessage", chat_id=CHANNEL, message_id=mid).get("ok", False)
    time.sleep(0.05)
print("deleted:", done)
