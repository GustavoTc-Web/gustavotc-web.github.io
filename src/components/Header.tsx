import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { portfolio, type SectionId } from '../data/portfolio'

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<SectionId>('inicio')
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id as SectionId)
      }
    }, { rootMargin: '-15% 0px -60% 0px' })
    portfolio.navigation.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => { if (window.innerWidth > 760) setOpen(false) }
    window.addEventListener('keydown', onEscape)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onEscape)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#inicio" aria-label={`${portfolio.name} — início`} onClick={() => setOpen(false)}>
          <span className="brand-mark">{portfolio.initials}<span>.</span></span>
          <span className="brand-name">gustavo<span>tecedora</span></span>
        </a>
        <button ref={toggleRef} className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav id="main-navigation" className={`navigation${open ? ' is-open' : ''}`} aria-label="Navegação principal">
          {portfolio.navigation.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} className={id === 'contato' ? 'nav-contact' : ''} onClick={() => setOpen(false)}>
              {label}{id === 'contato' && <ArrowUpRight size={15} aria-hidden="true" />}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
