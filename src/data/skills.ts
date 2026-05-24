export interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string; // Iconify id
}

// 6 skills — AMB-003 resolvido: inclui tecnologias dos projetos (React/HTMX, FastAPI/CrewAI)
export const SKILLS: Skill[] = [
  {
    id: "python-django",
    title: "Python & Django",
    description: "APIs REST com autenticação JWT, documentação OpenAPI e deploy automatizado. Django REST Framework como base sólida para back-ends escaláveis.",
    icon: "bi:code-slash",
  },
  {
    id: "ia-automacao",
    title: "IA & Automação",
    description: "Agentes autônomos com CrewAI e LangChain, pipelines RAG com ChromaDB e Gemini, e scripts de automação que eliminam trabalho repetitivo.",
    icon: "bi:robot",
  },
  {
    id: "docker",
    title: "Docker & DevOps",
    description: "Containerização de aplicações, pipelines CI/CD e ambientes reproduzíveis. Do desenvolvimento ao deploy sem surpresas.",
    icon: "bi:box-seam",
  },
  {
    id: "postgresql-redis",
    title: "PostgreSQL & Redis",
    description: "Modelagem de banco de dados, otimização de queries e estratégias de cache. Dados rápidos e confiáveis para aplicações que não podem parar.",
    icon: "bi:database",
  },
  {
    id: "react-htmx",
    title: "React & HTMX",
    description: "Interfaces modernas com React 18 e Vite, ou interatividade progressiva com HTMX para quem quer dinamismo sem a complexidade de uma SPA completa.",
    icon: "bi:window-split",
  },
  {
    id: "fastapi-crewai",
    title: "FastAPI & CrewAI",
    description: "APIs de alta performance com FastAPI e agentes inteligentes com CrewAI — para produtos que precisam de IA no coração da aplicação.",
    icon: "bi:lightning-charge",
  },
];
