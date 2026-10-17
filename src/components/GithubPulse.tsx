import { useEffect, useState } from 'react'
import { GitBranch } from 'lucide-react'

type Pulse = { repos: number; pushed: string }
const KEY = 'promptly-gh-pulse'

// «Пульс» GitHub-организации: число открытых репозиториев и дата последнего обновления.
// Данные из публичного API, кэш на час; если API недоступен — блок просто не показывается.
function readCache(): Pulse | null {
  try {
    const c = JSON.parse(sessionStorage.getItem(KEY) || 'null')
    return c && Date.now() - c.at < 3_600_000 ? c.data : null
  } catch {
    return null
  }
}

export function GithubPulse() {
  const [pulse, setPulse] = useState<Pulse | null>(readCache)

  useEffect(() => {
    if (pulse) return
    const ctrl = new AbortController()
    ;(async () => {
      try {
        const r = await fetch('https://api.github.com/orgs/promtly-ru/repos?per_page=100&sort=pushed', { signal: ctrl.signal })
        if (!r.ok) return
        const repos: { pushed_at: string; fork: boolean }[] = (await r.json()).filter((x: { fork: boolean }) => !x.fork)
        if (!repos.length) return
        const data = { repos: repos.length, pushed: repos[0].pushed_at }
        setPulse(data)
        try {
          sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), data }))
        } catch {
          // не критично
        }
      } catch {
        // сеть или лимит API — блок остаётся скрытым
      }
    })()
    return () => ctrl.abort()
  }, [pulse])

  if (!pulse) return null
  const date = new Date(pulse.pushed).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  const word = pulse.repos === 1 ? 'репозиторий' : pulse.repos < 5 ? 'репозитория' : 'репозиториев'
  return (
    <a className="gh-pulse" href="https://github.com/promtly-ru" target="_blank" rel="noreferrer" data-reveal>
      <GitBranch size={18} aria-hidden="true" />
      <span>
        Открытый код на GitHub: <b>{pulse.repos}</b> {word} · обновлено {date}
      </span>
    </a>
  )
}
