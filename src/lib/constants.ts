export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "Home",
  },
  {
    title: "Ações",
    href: "/acoes",
    icon: "Plus",
    children: [
      { title: "Adicionar Empresa", href: "/acoes/adicionar-empresa" },
      { title: "Adicionar Família", href: "/acoes/adicionar-familia" },
      { title: "Adicionar Comissão", href: "/acoes/adicionar-comissao" },
      { title: "Notas Fiscais", href: "/acoes/notas-fiscais" },
      { title: "Orçamentos e Cotações", href: "/acoes/orcamentos-cotacoes" },
      { title: "Relatórios", href: "/acoes/relatorios" },
      { title: "Criar Evento", href: "/acoes/criar-evento" },
      { title: "Registrar Pagamento", href: "/acoes/registrar-pagamento" },
    ],
  },
  {
    title: "Empresas",
    href: "/empresa",
    icon: "Building2",
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: "Settings",
  },
];

export const CSV_COLUMNS = {
  EMPRESA: ["nome", "cnpj", "endereco", "telefone", "email"],
  FAMILIA: ["nome", "cpf", "endereco", "telefone", "email", "renda"],
  COMISSAO: ["nome", "descricao", "valor", "data"],
  NOTA_FISCAL: ["numero", "empresa", "valor", "data", "descricao"],
  ORCAMENTO: ["numero", "cliente", "valor", "data", "status"],
};
