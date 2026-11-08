import { ArrowDown, ArrowDownRight, ArrowUpRight, Code2, Github, Plus } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { ExternalLink } from './ExternalLink'

export function Hero() {
  const { hero, labels } = portfolio
  return (
    <section id="inicio" className="hero container" aria-labelledby="hero-heading" tabIndex={-1}>
      <div className="hero-masthead" aria-hidden="true">
        <div className="masthead-meta"><span className="masthead-label">DESENVOLVEDOR / PORTFÓLIO PESSOAL</span><span className="masthead-label">PYTHON → WEB → SOLUÇÕES</span></div>
        <div className="portfolio-word">PORTFOLIO</div>
        <Plus className="masthead-cross" size={30} strokeWidth={1} />
      </div>
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="small-square" />{hero.eyebrow}</p>
          <h1 id="hero-heading"><span className="nameplate">{hero.firstName}</span><span className="hero-lastname">{hero.lastName}<span className="blue">.</span></span></h1>
          <p className="hero-role">{hero.role} <strong>{hero.focus}<span className="code-underscore">_</span></strong></p>
          <p className="hero-description">{hero.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projetos">{labels.viewProjects}<ArrowDownRight size={19} aria-hidden="true" /></a>
            <ExternalLink className="text-link" href={portfolio.links.github}><Github size={18} aria-hidden="true" />{labels.github}<ArrowUpRight size={15} aria-hidden="true" /></ExternalLink>
          </div>
        </div>
        <figure className={`portrait${hero.photo ? ' has-photo' : ''}`}>
          <div className="portrait-top"><span><span className="small-square" /> GT / DEV</span><Code2 size={16} aria-hidden="true" /></div>
          <div className="portrait-art">
            {hero.photo ? <img src={hero.photo.src} alt={hero.photo.alt} width="941" height="1672" fetchPriority="high" /> : (
              <div className="initials-composition" aria-hidden="true">
                <svg className="portrait-network" viewBox="0 0 220 280" fill="none"><path d="M28 38h40l42 47 42-47h40M28 242h40l42-47 42 47h40M28 38v204m164-204v204M28 140h164M110 38v204M68 85h84v110H68z" stroke="currentColor" strokeWidth=".7" /><path d="M20 57V30h27m126 0h27v27M20 223v27h27m126 0h27v-27" stroke="#4d8cf1" /><circle cx="110" cy="140" r="73" stroke="currentColor" strokeWidth=".7" /><circle cx="110" cy="85" r="3" fill="#598bda" /><circle cx="110" cy="195" r="3" fill="#598bda" /></svg>
                <span className="initials-small">{portfolio.initials}<span>_</span></span>
                <span className="portrait-coordinate">CÓDIGO & CURIOSIDADE</span>
              </div>
            )}
          </div>
          <div className="portrait-bottom"><span>BACK-END DEVELOPER</span><ArrowUpRight size={19} aria-hidden="true" /></div>
          {!hero.photo && <figcaption>{labels.photoPlaceholder}</figcaption>}
        </figure>
        <aside className="hero-index" aria-label="Foco e tecnologias">
          <div className="hero-index-item"><span className="mono">01 / FOCO</span><h2>{hero.focus}</h2><p>{portfolio.technologyGroups[0].items.slice(0, 3).map((item) => item.name).join(' · ')}</p></div>
          <div className="hero-index-item"><span className="mono">02 / INTERFACE</span><h2>Da API à experiência</h2><p>{hero.technologies.slice(2).join(' · ')}</p></div>
          <a className="hero-index-item hero-index-link" href="#projetos"><span className="mono">03 / NA PRÁTICA<ArrowUpRight size={13} aria-hidden="true" /></span><h2>{String(portfolio.projects.length).padStart(2, '0')} projetos selecionados</h2><p>{portfolio.projects.filter((p) => p.featured).map((p) => p.name).join(' / ')}</p></a>
        </aside>
      </div>
      <div className="hero-footer"><span className="mono">{hero.technologies.join(' / ')}</span><a href="#sobre">Conheça minha trajetória<ArrowDown size={16} aria-hidden="true" /></a></div>
    </section>
  )
}
