import { useEffect, useRef } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { PresentationControl } from './components/PresentationControl'
import { Technologies } from './components/Technologies'

export default function App() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Progressive enhancement: sem JS/observer, todo conteúdo continua visível.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          entry.target.animate([{ opacity: 0.45, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 500, easing: 'ease-out' })
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    mainRef.current?.querySelectorAll('.section-intro, .about-grid, .project, .technology-group, .contact-content').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo" ref={mainRef} tabIndex={-1}><Hero /><About /><Projects /><Technologies /><Contact /></main>
    <PresentationControl />
  </>
}
