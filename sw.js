// Простой service worker: страницы — сначала сеть, при отсутствии сети — кэш; статика — кэш с обновлением
const CACHE = 'promptly-v1'
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['/', '/favicon.svg'])).then(() => self.skipWaiting()))
})
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  )
})
self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return
  const store = (res) => {
    if (res.ok) {
      const copy = res.clone()
      caches.open(CACHE).then((c) => c.put(req, copy))
    }
    return res
  }
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(store).catch(() => caches.match(req).then((r) => r || caches.match('/'))))
    return
  }
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req).then(store).catch(() => hit)
    return hit || net
  }))
})
