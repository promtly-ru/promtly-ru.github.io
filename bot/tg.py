"""Общие функции Telegram Bot API (stdlib)."""
import json
import os
import urllib.parse
import urllib.request
import uuid

TOKEN = os.environ.get("TG_TOKEN", "")
OWNER = os.environ.get("TG_CHAT", "")
CHANNEL = os.environ.get("TG_CHANNEL", "")
API = f"https://api.telegram.org/bot{TOKEN}/"


def call(method, files=None, **params):
    params = {k: v for k, v in params.items() if v is not None}
    if files:
        b = uuid.uuid4().hex
        body = b""
        for k, v in params.items():
            body += f'--{b}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode()
        for k, path in files.items():
            body += (f'--{b}\r\nContent-Disposition: form-data; name="{k}"; filename="{os.path.basename(path)}"\r\n'
                     "Content-Type: application/octet-stream\r\n\r\n").encode() + open(path, "rb").read() + b"\r\n"
        body += f"--{b}--\r\n".encode()
        req = urllib.request.Request(API + method, body, {"Content-Type": f"multipart/form-data; boundary={b}"})
    else:
        req = urllib.request.Request(API + method, urllib.parse.urlencode(params).encode())
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        return json.load(e)


def send(chat, text, **kw):
    return call("sendMessage", chat_id=chat, text=text, parse_mode="HTML", disable_web_page_preview="true", **kw)
