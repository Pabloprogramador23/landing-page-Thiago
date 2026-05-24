export interface ProjectImage {
  src: string;  // relativo a /images/ — ex: "projects/nexus-1.png"
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  impact?: string;
  images: ProjectImage[];
  link?: string;
  linkLabel?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "nexuslearn",
    title: "NexusLearn Academy – LMS Full Stack",
    description:
      "Plataforma de aprendizado online com autenticação JWT, gestão de cursos e matrículas. " +
      "API REST construída com Django REST Framework — frontend React 18 com Vite. " +
      "Deploy containerizado com Docker e Nginx.",
    tech: ["Django REST Framework", "React 18", "Vite", "Tailwind CSS", "Docker", "Nginx", "PostgreSQL"],
    impact: "Arquitetura desacoplada (API + SPA) com múltiplos perfis de usuário: admin, instrutor e aluno",
    images: [
      { src: "projects/nexus-1.png", alt: "NexusLearn — tela de login" },
      { src: "projects/nexus-2.png", alt: "NexusLearn — homepage" },
      { src: "projects/nexus-3.png", alt: "NexusLearn — dashboard" },
      { src: "projects/nexus-4.png", alt: "NexusLearn — detalhe de aula" },
    ],
  },
  {
    id: "rag-noticias",
    title: "RAG de Sites de Notícias",
    description:
      "Pipeline completo de Retrieval-Augmented Generation: web scraping assíncrono com Playwright, " +
      "indexação vetorial com ChromaDB e geração de respostas com Gemini 1.5 Flash. " +
      "Arquitetura containerizada com Docker.",
    tech: ["Python asyncio", "Gemini 1.5 Flash", "ChromaDB", "Playwright", "Docker"],
    impact: "RAG end-to-end — ingestão, indexação e geração — sobre fontes de notícias em tempo real",
    images: [
      { src: "projects/rag-1.png", alt: "RAG — interface de chat" },
      { src: "projects/rag-2.png", alt: "RAG — homepage" },
      { src: "projects/rag-3.png", alt: "RAG — gerador" },
      { src: "projects/rag-4.png", alt: "RAG — terminal" },
    ],
  },
  {
    id: "sindicato",
    title: "Sindicato – Sistema de Gestão",
    description:
      "Sistema de gestão interna para sindicato de trabalhadores: cadastro de filiados, " +
      "controle de contribuições e geração de relatórios. " +
      "Interface administrativa customizada com Django, em produção desde 2024.",
    tech: ["Django", "PostgreSQL"],
    impact: "Sistema em produção (sintracpar.org) com dados reais de filiados sindicalizados",
    images: [
      { src: "projects/sindicato-1.png", alt: "Sindicato — tela principal" },
      { src: "projects/sindicato-2.png", alt: "Sindicato — gestão de membros" },
    ],
    link: "https://www.sintracpar.org",
    linkLabel: "Ver projeto",
  },
  {
    id: "hotel-hms",
    title: "Hotel HMS – Gestão Hoteleira",
    description:
      "Sistema de gestão hoteleira (HMS) com controle de reservas, check-in/check-out, " +
      "gestão de quartos e relatórios financeiros. " +
      "Interface web com HTMX para atualizações dinâmicas sem recarregar a página.",
    tech: ["Django 5.2", "HTMX", "PostgreSQL", "Tailwind CSS", "Docker"],
    impact: "UX fluída com HTMX — operações de reserva em tempo real sem reload de página completa",
    images: [
      { src: "projects/hotel-1.png", alt: "Hotel HMS — dashboard" },
      { src: "projects/hotel-2.png", alt: "Hotel HMS — financeiro" },
    ],
    link: "https://github.com/Pabloprogramador23/Hotel",
    linkLabel: "Ver no GitHub",
  },
];
