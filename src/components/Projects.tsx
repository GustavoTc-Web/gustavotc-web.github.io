import { ArrowUpRight, Check, ChevronDown, Github } from 'lucide-react'
import { portfolio, type Project } from '../data/portfolio'
import { ExternalLink } from './ExternalLink'
import { ProjectVisual } from './ProjectVisual'
import { SectionHeading } from './SectionHeading'

function ProjectFeatures({ project }: { project: Project }) {
  return <ul className="project-features">{project.features.map((feature) => <li key={feature}><Check size={13} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
}

function ProjectLinks({ project }: { project: Project }) {
  return <div className="project-links">
    {project.repository && <ExternalLink className="text-link" href={project.repository} aria-label={`${portfolio.labels.repository} de ${project.name}`}><Github size={16} aria-hidden="true" />{portfolio.labels.repository}<ArrowUpRight size={15} aria-hidden="true" /></ExternalLink>}
    {project.demo && <ExternalLink className="text-link" href={project.demo} aria-label={`${portfolio.labels.demo} de ${project.name}`}>{portfolio.labels.demo}<ArrowUpRight size={16} aria-hidden="true" /></ExternalLink>}
  </div>
}

function ProjectArticle({ project }: { project: Project }) {
  return <article className={`project${project.featured ? ' project-featured' : ' project-small'}`} aria-labelledby={`${project.id}-heading`}>
    <ProjectVisual project={project} />
    <div className="project-content">
      <div className="project-meta"><span className="mono">{project.category}</span><span className="project-number">/{project.number}</span></div>
      <h3 id={`${project.id}-heading`}>{project.name}<span className="blue">.</span></h3>
      <p className="project-subtitle">{project.subtitle}</p>
      <p className="project-description">{project.description}</p>
      {project.featured ? <><p className="project-participation"><span>{portfolio.labels.participation}</span>{project.participation}</p><ProjectFeatures project={project} /></> : <details className="project-details"><summary>Participação e funcionalidades<ChevronDown size={16} aria-hidden="true" /></summary><p className="project-participation">{project.participation}</p><ProjectFeatures project={project} /></details>}
      <ul className="technology-tags" aria-label={`Tecnologias de ${project.name}`}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
      {(project.repository || project.demo) && <ProjectLinks project={project} />}
    </div>
  </article>
}

export function Projects() {
  return <section id="projetos" className="section projects-section" aria-labelledby="projects-heading" tabIndex={-1}><div className="container">
    <SectionHeading number="02" label="PROJETOS SELECIONADOS"><span className="section-count mono">04 PROJETOS</span></SectionHeading>
    <div className="section-intro"><h2 id="projects-heading">{portfolio.labels.projectHeading}</h2><p>{portfolio.labels.projectDescription}</p></div>
    <div className="featured-projects">{portfolio.projects.filter((p) => p.featured).map((project) => <ProjectArticle key={project.id} project={project} />)}</div>
    <div className="more-projects">{portfolio.projects.filter((p) => !p.featured).map((project) => <ProjectArticle key={project.id} project={project} />)}</div>
  </div></section>
}
