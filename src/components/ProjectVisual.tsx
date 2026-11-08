import { ArrowDown, ArrowRight, Box, Building2, Check, Code2, Database, Layers3, LifeBuoy, Scan, ShieldCheck, Workflow } from 'lucide-react'
import { portfolio, type Project } from '../data/portfolio'

function PgrIllustration() {
  return <div className="pgr-illustration" aria-hidden="true">
    <div className="concept-top"><span className="mono">SISTEMAS QUE SE CONECTAM</span><Workflow size={19} /></div>
    <div className="pgr-flow"><div className="flow-node"><Building2 size={28} /><span>Empresa</span><i /></div><span className="flow-connector"><ArrowRight size={16} /></span><div className="flow-node flow-node-main"><Layers3 size={38} /><span>PGR<span className="node-name-light">agora</span></span><small>DADOS + PROCESSOS</small></div><span className="flow-connector"><ArrowRight size={16} /></span><div className="flow-node"><Code2 size={28} /><span>Portal</span><i /></div></div>
    <div className="concept-bottom"><span><Database size={13} /> INFORMAÇÃO ESTRUTURADA</span><span>01 / WEB</span></div>
  </div>
}

function SupportIllustration() {
  return <div className="support-illustration" aria-hidden="true">
    <div className="concept-top"><span className="concept-brand"><LifeBuoy size={20} />tecesupport<span>.</span></span><ShieldCheck size={20} /></div>
    <div className="ticket-flow"><div className="ticket-step"><span className="ticket-dot" /><span>Abertura</span><div className="ticket-lines"><i /><i /></div><span className="ticket-code">01</span></div><ArrowRight className="ticket-arrow" size={17} /><div className="ticket-step step-active"><span className="ticket-dot" /><span>Em atendimento</span><div className="ticket-lines"><i /><i /></div><span className="ticket-code">02</span></div><ArrowRight className="ticket-arrow" size={17} /><div className="ticket-step step-done"><Check size={17} /><span>Resolução</span><div className="ticket-lines"><i /><i /></div><span className="ticket-code">03</span></div></div>
    <div className="access-flow"><span>CLIENTE</span><span className="access-line" /><span><ShieldCheck size={14} />ACESSO POR PERFIL</span><span className="access-line" /><span>ANALISTA</span></div>
    <div className="concept-bottom"><span>DO CHAMADO À SOLUÇÃO</span><span>02 / WEB</span></div>
  </div>
}

function VisionIllustration() {
  return <div className="vision-illustration" aria-hidden="true"><div className="concept-top"><span className="mono">TC VISION / OBJECT DETECTION</span><Scan size={20} /></div><div className="vision-scene"><div className="vision-grid" /><div className="detected-object object-one"><span className="detection-label">OBJETO 01</span><Box strokeWidth={1} /></div><div className="detected-object object-two"><span className="detection-label">OBJETO 02</span><Box strokeWidth={1} /></div><span className="scan-cross scan-one">+</span><span className="scan-cross scan-two">+</span></div><div className="concept-bottom"><span>IMAGEM <ArrowRight size={13} /> MODELO <ArrowRight size={13} /> DETECÇÃO</span><span>03 / AI</span></div></div>
}

function IslandIllustration() {
  return <div className="island-illustration" aria-hidden="true"><div className="concept-top"><span className="mono">TECE-ISLAND / 2D SURVIVAL</span><span className="beta-label">BETA</span></div><div className="island-scene"><div className="island-moon" /><div className="island-land land-back" /><div className="island-land land-main" /><div className="pixel-tree tree-one"><i /><span /></div><div className="pixel-tree tree-two"><i /><span /></div><div className="pixel-tree tree-three"><i /><span /></div><div className="island-player"><i /><span /></div><span className="island-star star-one">+</span><span className="island-star star-two">+</span><span className="island-star star-three">·</span></div><div className="concept-bottom"><span>EXPLORAR <ArrowDown size={13} /> CONSTRUIR <ArrowDown size={13} /> SOBREVIVER</span><span>04 / GAME</span></div></div>
}

export function ProjectVisual({ project }: { project: Project }) {
  const Illustrations = { pgr: PgrIllustration, support: SupportIllustration, vision: VisionIllustration, island: IslandIllustration }
  const Illustration = Illustrations[project.visual]
  return <figure className={`project-visual visual-${project.visual}${project.image ? ' has-image' : ''}`}>
    {project.image ? <img src={project.image.src} alt={project.image.alt} width="1000" height="700" loading="lazy" decoding="async" /> : <Illustration />}
    {!project.image && <figcaption><span className="small-square" />{portfolio.labels.concept}</figcaption>}
  </figure>
}
