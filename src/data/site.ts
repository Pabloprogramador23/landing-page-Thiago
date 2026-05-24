export interface SiteConfig {
  ownerName: string;
  ownerTitle: string;
  ownerBio: string;
  brandName: string;
  email: string;
  whatsappNumber: string;   // somente dígitos
  whatsappDisplay: string;  // formatado para exibição
  githubUrl: string;
  linkedinUrl: string;
  siteUrl: string;          // atualizar após deploy no Vercel (LC-03)
  ogImage?: string;
  lang: string;
}

export const SITE_CONFIG: SiteConfig = {
  ownerName: "Pablo Magalhães",
  ownerTitle: "Back-end Python/Django & IA",
  ownerBio:
    "Desenvolvedor back-end especializado em Python, Django e automações com IA. " +
    "Construo APIs robustas, sistemas de gestão e agentes inteligentes que resolvem " +
    "problemas reais — do banco de dados ao deploy.",
  brandName: "PabloTech",
  email: "pablomagalhes@gmail.com",
  whatsappNumber: "5585986303253",
  whatsappDisplay: "+55 85 9 8630-3253",
  githubUrl: "https://github.com/Pabloprogramador23",
  linkedinUrl: "https://linkedin.com/in/pablo-magalh%C3%A3es-384581219/",
  siteUrl: "https://pablo-portfolio.vercel.app", // TODO LC-03: atualizar após criar projeto no Vercel
  ogImage: "/images/og-image.svg",               // TODO LC-04: substituir por PNG 1200×630px antes do go-live
  lang: "pt-BR",
};
