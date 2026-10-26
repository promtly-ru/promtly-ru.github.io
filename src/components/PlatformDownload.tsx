import { useState } from 'react'
import { Download, ExternalLink, Info } from 'lucide-react'
import type { Work } from '../data/content'

// iPadOS притворяется Mac, но у него есть сенсорный экран
function detect(): string {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) return 'android'
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 0)) return 'ios'
  if (/macintosh|mac os x/i.test(ua)) return 'mac'
  if (/windows/i.test(ua)) return 'windows'
  if (/linux|x11|cros/i.test(ua)) return 'linux'
  return 'web'
}

export function PlatformDownload({ work }: { work: Work }) {
  const platforms = work.platforms ?? []
  const [id, setId] = useState(detect)
  const platform = platforms.find((p) => p.id === id) ?? platforms[0]
  if (!platform) return null
  return (
    <div className="download">
      <div className="platforms" role="tablist" aria-label={`Платформа: ${work.title}`}>
        {platforms.map((p) => (
          <button key={p.id} role="tab" aria-selected={p.id === platform.id} className="platform" onClick={() => setId(p.id)}>
            {p.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" key={platform.id} className="download-panel">
        <div className="actions">
          {platform.downloads.map((d, i) => (
            <a
              key={d.url}
              className={`btn ${i === 0 ? 'btn-primary btn-shine' : 'btn-ghost'} btn-dl`}
              href={d.url}
              {...(d.web ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {d.web ? <ExternalLink size={18} aria-hidden="true" /> : <Download size={18} aria-hidden="true" />}
              <span>
                {d.label}
                <small>{d.hint}</small>
              </span>
            </a>
          ))}
        </div>
        <p className="muted">
          Версия {work.version} · {platform.requirements}
          {work.releasesUrl ? (
            <>
              {' '}· <a href={work.releasesUrl} target="_blank" rel="noopener noreferrer">все версии</a>
            </>
          ) : null}
        </p>
        <p className="note">
          <Info size={16} aria-hidden="true" />
          {platform.note}
        </p>
      </div>
    </div>
  )
}
