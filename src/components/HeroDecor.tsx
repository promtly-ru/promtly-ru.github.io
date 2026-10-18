// Плавающие «стеклянные» значки справа от заголовка: просто декор
const items = [
  { t: '</>', cls: 'd1' },
  { t: '{ }', cls: 'd2' },
  { t: 'bot', cls: 'd3' },
  { t: 'py', cls: 'd4' },
  { t: 'AI', cls: 'd5' },
  { t: '#!', cls: 'd6' },
]

export function HeroDecor() {
  return (
    <div className="hero-decor" aria-hidden="true">
      <span className="ring ring-1" />
      <span className="ring ring-2" />
      {items.map((i) => (
        <span key={i.t} className={`glass-chip ${i.cls}`}>{i.t}</span>
      ))}
    </div>
  )
}
