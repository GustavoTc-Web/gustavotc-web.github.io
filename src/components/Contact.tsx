import { ArrowUp, ArrowUpRight, FileDown, Github, Linkedin, Mail } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { ExternalLink } from './ExternalLink'
import { SectionHeading } from './SectionHeading'

export function Contact() {
  const { contact, links, labels } = portfolio
  return <>
    <section id="contato" className="section contact-section" aria-labelledby="contact-heading" tabIndex={-1}><div className="container">
      <SectionHeading number="04" label="VAMOS CONVERSAR" />
      <div className="contact-content"><div><h2 id="contact-heading">{contact.title}<br /><span>{contact.accent}</span></h2><p>{contact.description}</p></div><span className="contact-arrow" aria-hidden="true"><ArrowUpRight strokeWidth={1} /></span></div>
      <div className="contact-links">
        <ExternalLink className="button button-primary" href={links.github}><Github size={19} aria-hidden="true" />Vamos nos conectar<ArrowUpRight size={19} aria-hidden="true" /></ExternalLink>
        {links.linkedin && <ExternalLink className="text-link" href={links.linkedin}><Linkedin size={18} aria-hidden="true" />LinkedIn<ArrowUpRight size={16} aria-hidden="true" /></ExternalLink>}
        {links.email && <a className="text-link" href={`mailto:${links.email}`}><Mail size={18} aria-hidden="true" />{links.email}<ArrowUpRight size={16} aria-hidden="true" /></a>}
        {links.resume && <ExternalLink className="text-link" href={links.resume}><FileDown size={18} aria-hidden="true" />Currículo<ArrowUpRight size={16} aria-hidden="true" /></ExternalLink>}
        <span className="contact-handle mono">GITHUB.COM / GUSTAVOTC-WEB</span>
      </div>
    </div></section>
    <footer className="site-footer"><div className="container footer-inner"><a className="brand-mark" href="#inicio" aria-label={labels.backToTop}>{portfolio.initials}<span>.</span></a><p>© {new Date().getFullYear()} {portfolio.name}<span>Feito com código e curiosidade.</span></p><a className="back-to-top" href="#inicio">{labels.backToTop}<ArrowUp size={16} aria-hidden="true" /></a></div></footer>
  </>
}
