import { useEffect, type PointerEvent } from 'react'

// Анимации появления блоков [data-reveal] и прогресс прокрутки (--scroll, html.is-scrolled)
export function usePageEffects() {
  useEffect(() => {
    const root = document.documentElement
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    let io: IntersectionObserver | undefined

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible')
              io?.unobserve(e.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      )
      els.forEach((el) => io?.observe(el))
    } else {
      els.forEach((el) => el.classList.add('is-visible'))
    }

    // Ссылка вида /#contacts: браузер ищет якорь до рендера React, поэтому прокручиваем сами
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight
        root.style.setProperty('--scroll', String(max > 0 ? window.scrollY / max : 0))
        root.classList.toggle('is-scrolled', window.scrollY > 600)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io?.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}

// Подсветка карточки под курсором: задаёт --x и --y для CSS
export function spotlight(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
