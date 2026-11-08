export type SectionId = 'inicio' | 'sobre' | 'projetos' | 'tecnologias' | 'contato'
export type VisualKind = 'pgr' | 'support' | 'vision' | 'island'
export type TechnologyIcon = 'server' | 'code' | 'database' | 'terminal'

export interface PortfolioImage {
  src: string
  alt: string
}

export interface Project {
  id: string
  number: string
  name: string
  category: string
  subtitle: string
  description: string
  participation: string
  features: string[]
  technologies: string[]
  visual: VisualKind
  featured: boolean
  image?: PortfolioImage
  repository?: string
  demo?: string
}

interface PortfolioContent {
  name: string
  fullName: string
  initials: string
  navigation: { id: SectionId; label: string }[]
  links: { github: string; linkedin?: string; email?: string; resume?: string }
  hero: {
    eyebrow: string
    firstName: string
    lastName: string
    role: string
    focus: string
    description: string
    technologies: string[]
    photo?: PortfolioImage
  }
  about: {
    title: string
    accent: string
    paragraphs: string[]
    journey: { period: string; title: string; organization: string; description: string }[]
    interests: string[]
  }
  projects: Project[]
  technologyGroups: { name: string; description: string; icon: TechnologyIcon; items: { name: string; symbol: string }[] }[]
  contact: { title: string; accent: string; description: string }
  labels: {
    viewProjects: string
    github: string
    participation: string
    features: string
    repository: string
    demo: string
    concept: string
    photoPlaceholder: string
    projectHeading: string
    projectDescription: string
    technologyHeading: string
    technologyDescription: string
    backToTop: string
  }
}

// Edite textos, imagens e destinos aqui. Links opcionais só aparecem quando preenchidos.
export const portfolio: PortfolioContent = {
  name: 'Gustavo Tecedora',
  fullName: 'Gustavo Tecedora Cândido',
  initials: 'GT',
  navigation: [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'tecnologias', label: 'Tecnologias' },
    { id: 'contato', label: 'Contato' },
  ],
  links: {
    github: 'https://github.com/GustavoTc-Web',
    linkedin: undefined,
    email: undefined,
    resume: undefined,
  },
  hero: {
    eyebrow: 'Ideias em código. Problemas em soluções.',
    firstName: 'Gustavo',
    lastName: 'Tecedora',
    role: 'Desenvolvedor com foco em',
    focus: 'Back-end',
    description: 'Desenvolvo aplicações web com Python, Django, React e TypeScript. Do que acontece nos bastidores à experiência de quem usa.',
    technologies: ['Python', 'Django', 'React', 'TypeScript'],
    photo: {
      src: '/gustavo.png',
      alt: 'Gustavo Tecedora',
    },
  },
  about: {
    title: 'Antes do código,',
    accent: 'entender o problema.',
    paragraphs: [
      'Sou Gustavo Tecedora Cândido, estudante de Ciência da Computação na UNIP e desenvolvedor com foco em back-end.',
      'No suporte técnico, aprendi a investigar problemas, ouvir as pessoas e transformar situações complexas em caminhos claros. Levo esse olhar para cada aplicação que desenvolvo.',
      'Entre projetos pessoais e a participação em um projeto freelance, construo minha trajetória com Python e Django. Tenho interesse em segurança, arquitetura e qualidade de software — e em continuar aprendendo na prática.',
    ],
    journey: [
      {
        period: 'OUT 2024 — ATUAL',
        title: 'Analista de Suporte Técnico N1',
        organization: 'Stefanini',
        description: 'Atendimento, investigação de problemas, redes, hardware, software e documentação técnica.',
      },
      {
        period: 'FORMAÇÃO PREVISTA EM 2028',
        title: 'Ciência da Computação',
        organization: 'UNIP',
        description: 'Base acadêmica em construção, conectada ao desenvolvimento de projetos e à prática profissional.',
      },
    ],
    interests: ['Segurança', 'Arquitetura', 'Qualidade de software'],
  },
  projects: [
    {
      id: 'pgr-agora',
      number: '01',
      name: 'PGR Agora',
      category: 'PROJETO FREELANCE',
      subtitle: 'Dados e processos conectados.',
      description: 'Sistema voltado ao cadastro de empresas e ao fluxo de avaliação de PGR, conectando informações empresariais ao portal do cliente.',
      participation: 'Participei do desenvolvimento de funcionalidades envolvendo APIs, dados empresariais, CNAEs e portal do cliente.',
      features: ['Cadastro e dados empresariais', 'Integrações com APIs e CNAEs', 'Fluxo de avaliação de PGR'],
      technologies: ['Python', 'Django', 'Django REST Framework', 'React', 'PostgreSQL'],
      visual: 'pgr',
      featured: true,
    },
    {
      id: 'tecesupport',
      number: '02',
      name: 'Tecesupport',
      category: 'PROJETO PESSOAL',
      subtitle: 'Cada chamado, um caminho claro.',
      description: 'Helpdesk para organizar o atendimento de ponta a ponta. Clientes acompanham seus próprios chamados; analistas gerenciam os atendimentos.',
      participation: 'Desenvolvo a aplicação, conectando autenticação, regras de acesso e o fluxo de atendimento.',
      features: ['Autenticação JWT e perfis de acesso', 'Responsável, prioridade e status', 'Comentários e histórico de alterações'],
      technologies: ['Python', 'Django REST Framework', 'React', 'TypeScript'],
      visual: 'support',
      featured: true,
    },
    {
      id: 'tc-vision',
      number: '03',
      name: 'TC Vision',
      category: 'VISÃO COMPUTACIONAL',
      subtitle: 'Um novo olhar para imagens.',
      description: 'Aplicação que utiliza modelos YOLO para detectar objetos em imagens e apresentar os resultados visualmente.',
      participation: 'Projeto pessoal em que exploro a integração de modelos de detecção com uma aplicação web.',
      features: ['Análise de imagens com modelos YOLO', 'Detecção de objetos', 'Apresentação visual dos resultados'],
      technologies: ['Python', 'Flask', 'YOLO'],
      visual: 'vision',
      featured: false,
      repository: 'https://github.com/GustavoTc-Web/image-insight-ai',
    },
    {
      id: 'tece-island',
      number: '04',
      name: 'Tece-Island',
      category: 'GAME DEV · BETA',
      subtitle: 'Explorar. Construir. Sobreviver.',
      description: 'Jogo de sobrevivência 2D em Godot, com versão beta. Um projeto complementar de lógica e construção de sistemas interativos.',
      participation: 'Desenvolvo os sistemas de exploração e sobrevivência deste projeto pessoal.',
      features: ['Coleta de recursos, inventário e criação de itens', 'Ciclo de dia e noite', 'Combate e sobrevivência'],
      technologies: ['Godot'],
      visual: 'island',
      featured: false,
      repository: 'https://github.com/GustavoTc-Web/Tece-Island',
    },
  ],
  technologyGroups: [
    { name: 'Back-end', description: 'Onde concentro meu foco.', icon: 'server', items: [{ name: 'Python', symbol: 'Py' }, { name: 'Django', symbol: 'Dj' }, { name: 'Django REST Framework', symbol: 'DRF' }, { name: 'Flask', symbol: 'Fl' }] },
    { name: 'Front-end', description: 'A conexão com quem usa.', icon: 'code', items: [{ name: 'React', symbol: 'Re' }, { name: 'TypeScript', symbol: 'TS' }, { name: 'JavaScript', symbol: 'JS' }, { name: 'HTML', symbol: '<>' }, { name: 'CSS', symbol: '#' }] },
    { name: 'Bancos de dados', description: 'Informação bem estruturada.', icon: 'database', items: [{ name: 'PostgreSQL', symbol: 'Pg' }, { name: 'MySQL', symbol: 'My' }] },
    { name: 'Ferramentas', description: 'Parte do meu dia a dia.', icon: 'terminal', items: [{ name: 'Git', symbol: 'Gt' }, { name: 'GitHub', symbol: 'Gh' }, { name: 'Docker', symbol: 'Dk' }] },
  ],
  contact: {
    title: 'Boas ideias começam',
    accent: 'com uma conversa.',
    description: 'Vamos conversar sobre oportunidades em desenvolvimento e projetos que precisam sair do papel. Conheça meu trabalho e entre em contato pelo GitHub.',
  },
  labels: {
    viewProjects: 'Ver projetos',
    github: 'GitHub',
    participation: 'Minha participação',
    features: 'O que o projeto faz',
    repository: 'Ver repositório',
    demo: 'Ver demonstração',
    concept: 'Ilustração conceitual · não é uma captura de tela',
    photoPlaceholder: 'Composição com iniciais · espaço para foto',
    projectHeading: 'Do conceito à aplicação.',
    projectDescription: 'Uma seleção do que venho construindo — entre desenvolvimento web, visão computacional e sistemas interativos.',
    technologyHeading: 'As peças de cada solução.',
    technologyDescription: 'Tecnologias que uso para transformar ideias em aplicações, com foco no ecossistema Python.',
    backToTop: 'Voltar ao início',
  },
}
