import { Braces, Code2, Database, Server, Terminal } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

const groupIcons = { server: Server, code: Code2, database: Database, terminal: Terminal }

export function Technologies() {
  return <section id="tecnologias" className="section technologies-section" aria-labelledby="technologies-heading" tabIndex={-1}><div className="container">
    <SectionHeading number="03" label="TECNOLOGIAS" />
    <div className="section-intro"><h2 id="technologies-heading">{portfolio.labels.technologyHeading}</h2><p>{portfolio.labels.technologyDescription}</p></div>
    <div className="technology-groups">{portfolio.technologyGroups.map((group, index) => {
      const Icon = groupIcons[group.icon]
      return <div className="technology-group" key={group.name}><div className="technology-group-label"><span className="technology-group-icon"><Icon size={23} aria-hidden="true" /></span><div><h3>{group.name}</h3><p>{group.description}</p></div><span className="technology-group-number mono">0{index + 1}</span></div><ul>{group.items.map((item) => <li key={item.name}><span className="tech-symbol" aria-hidden="true">{item.symbol}</span><span>{item.name}</span></li>)}</ul></div>
    })}</div>
    <div className="technology-note"><Braces size={19} aria-hidden="true" /><p>A ferramenta muda. A vontade de resolver problemas continua.</p></div>
  </div></section>
}
