import { useState } from 'react'
import { Check, Download, ShieldAlert } from 'lucide-react'
import { smartcalc } from '../data/content'

export function SmartCalc() {
  const [modeId, setModeId] = useState(smartcalc.modes[0].id)
  const mode = smartcalc.modes.find((m) => m.id === modeId) ?? smartcalc.modes[0]

  return (
    <section className="section section-alt" id="smartcalc">
      <div className="container calc">
        <div className="calc-text">
          <p className="eyebrow">Мой продукт</p>
          <h2>{smartcalc.name}</h2>
          <p className="lead">{smartcalc.text}</p>

          <div className="tabs" role="tablist" aria-label="Режимы SmartCalc">
            {smartcalc.modes.map((m) => (
              <button
                key={m.id}
                role="tab"
                aria-selected={m.id === modeId}
                className="tab"
                onClick={() => setModeId(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="mode-text">{mode.text}</p>

          <ul className="checklist">
            {smartcalc.features.map((f) => (
              <li key={f}><Check size={16} aria-hidden="true" />{f}</li>
            ))}
          </ul>

          <div className="actions">
            <a className="btn btn-primary" href={smartcalc.download.url}>
              <Download size={18} aria-hidden="true" />
              {smartcalc.download.label}
            </a>
          </div>
          <p className="muted">
            Версия {smartcalc.version} · {smartcalc.download.size} · {smartcalc.requirements}
          </p>
          <p className="note">
            <ShieldAlert size={16} aria-hidden="true" />
            {smartcalc.note}
          </p>
        </div>

        <div className="calc-shot">
          <img
            src={`/img/smartcalc-${mode.id}.png`}
            alt={`SmartCalc, режим «${mode.label}»`}
            width={360}
            height={620}
          />
        </div>
      </div>
    </section>
  )
}
