import { ArrowUpRight, GraduationCap, Headset, Sparkles } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function About() {
  const { about } = portfolio
  return (
    <section id="sobre" className="section about-section" aria-labelledby="about-heading" tabIndex={-1}>
      <div className="container">
        <SectionHeading number="01" label="SOBRE MIM" />
        <div className="about-grid">
          <div className="about-story">
            <h2 id="about-heading">{about.title}<br /><span className="muted-heading">{about.accent}</span></h2>
            <div className="about-paragraphs">{about.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
            <div className="interests"><Sparkles size={16} aria-hidden="true" /><span>Interesses</span><span className="interests-divider">/</span><span>{about.interests.join(' · ')}</span></div>
          </div>
          <div className="journey">
            <div className="journey-heading"><span className="mono">EM CONSTANTE CONSTRUÇÃO</span><ArrowUpRight size={20} aria-hidden="true" /></div>
            {about.journey.map((item, index) => (
              <article className="journey-item" key={item.title}>
                <div className="journey-icon">{index === 0 ? <Headset size={21} aria-hidden="true" /> : <GraduationCap size={23} aria-hidden="true" />}</div>
                <div><span className="journey-period mono">{item.period}</span><h3>{item.title}</h3><span className="journey-organization">{item.organization}</span><p>{item.description}</p></div>
              </article>
            ))}
            <div className="journey-footnote"><span className="small-square" /><span>Aprender. Construir. Evoluir.</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
