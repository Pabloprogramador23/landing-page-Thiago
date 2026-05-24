export interface NavLink {
  label: string;
  href: string;
}

// 6 links — AMB-001 resolvido: incluir #skills no menu de navegação
export const NAV_LINKS: NavLink[] = [
  { label: "Início",    href: "#inicio" },
  { label: "Sobre",     href: "#sobre" },
  { label: "Skills",    href: "#skills" },
  { label: "Serviços",  href: "#servicos" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contato",   href: "#contato" },
];
