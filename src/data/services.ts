export interface Service {
  id: string;
  title: string;
  description: string; // obrigatório — AMB-002 resolvido: incluir descrição em todos os cards
  icon: string;        // Iconify id
}

export const SERVICES: Service[] = [
  {
    id: "apis-django",
    title: "APIs Django & REST",
    description:
      "Construo APIs robustas com autenticação, paginação, testes automatizados " +
      "e documentação OpenAPI — prontas para escalar.",
    icon: "bi:hdd-network",
  },
  {
    id: "agents-ia",
    title: "Agents & Automações com IA",
    description:
      "Desenvolvimento de agentes autônomos e pipelines de automação que " +
      "substituem tarefas manuais repetitivas por fluxos inteligentes.",
    icon: "bi:robot",
  },
  {
    id: "dashboards",
    title: "Dashboards Streamlit",
    description:
      "Dashboards interativos para análise de dados e KPIs, entregues em dias — " +
      "sem precisar de um time de front-end.",
    icon: "bi:bar-chart-line",
  },
  {
    id: "docker-cicd",
    title: "Docker & CI/CD",
    description:
      "Containerização de aplicações e pipelines de entrega contínua que garantem " +
      "deploys rápidos, seguros e revertíveis.",
    icon: "bi:box",
  },
  {
    id: "postgresql",
    title: "PostgreSQL & Redis",
    description:
      "Modelagem de banco de dados, otimização de queries lentas e estratégias " +
      "de cache para aplicações com alto volume de acessos.",
    icon: "bi:database",
  },
  {
    id: "mentoria-ia",
    title: "Mentoria em IA e prompts",
    description:
      "Sessões práticas para equipes e desenvolvedores que querem integrar " +
      "LLMs e automações com IA nos seus projetos reais.",
    icon: "bi:person-workspace",
  },
];
