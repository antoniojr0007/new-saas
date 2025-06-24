// Tipos de dados
export interface Familia {
  id: number;
  nome: string;
  responsavel: string;
  membros: number;
  comissaoId: number;
  pendencias: {
    faltas: number;
    valorPendente: number;
  };
}

export interface Comissao {
  id: number;
  nome: string;
  lider: string;
  empresaId: number;
}

export interface Empresa {
  id: number;
  nome: string;
  numeroFamilias: number;
  valorCaixa: number;
  status: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  dataFundacao?: string;
  responsavel?: string;
}

// Dados mockados das empresas
export const empresas: Empresa[] = [
  {
    id: 1,
    nome: "Jeronimo Alves",
    numeroFamilias: 45,
    valorCaixa: 125000.5,
    status: "ativa",
    endereco: "Av. Paulista, 1000, São Paulo - SP",
    telefone: "(11) 3456-7890",
    email: "contato@techsolutions.com",
    dataFundacao: "2015-03-15",
    responsavel: "Carlos Mendes",
  },
  {
    id: 2,
    nome: "Dorathy",
    numeroFamilias: 32,
    valorCaixa: 89750.25,
    status: "ativa",
    endereco: "Rua da Inovação, 500, Rio de Janeiro - RJ",
    telefone: "(21) 2345-6789",
    email: "contato@inovacaodigital.com",
    dataFundacao: "2017-07-22",
    responsavel: "Ana Silva",
  },
  {
    id: 3,
    nome: "Martin Luther King",
    numeroFamilias: 28,
    valorCaixa: 67890.75,
    status: "ativa",
    endereco: "Av. Brasil, 300, Belo Horizonte - MG",
    telefone: "(31) 3456-7890",
    email: "contato@consultoria.com",
    dataFundacao: "2016-11-10",
    responsavel: "Roberto Alves",
  },
];

// Dados das comissões
export const comissoes: Comissao[] = [
  { id: 1, nome: "Comissão de Educação", lider: "Maria Silva", empresaId: 1 },
  { id: 2, nome: "Comissão de Saúde", lider: "João Pereira", empresaId: 1 },
  {
    id: 3,
    nome: "Comissão de Infraestrutura",
    lider: "Ana Oliveira",
    empresaId: 1,
  },
  { id: 4, nome: "Comissão de Eventos", lider: "Carlos Santos", empresaId: 1 },
  { id: 5, nome: "Comissão de Finanças", lider: "Juliana Costa", empresaId: 2 },
  {
    id: 6,
    nome: "Comissão de Marketing",
    lider: "Roberto Almeida",
    empresaId: 2,
  },
  {
    id: 7,
    nome: "Comissão de Tecnologia",
    lider: "Fernanda Lima",
    empresaId: 2,
  },
  {
    id: 8,
    nome: "Comissão de Recursos Humanos",
    lider: "Paulo Mendes",
    empresaId: 3,
  },
  { id: 9, nome: "Comissão de Projetos", lider: "Camila Souza", empresaId: 3 },
  {
    id: 10,
    nome: "Comissão de Comunicação",
    lider: "Lucas Ferreira",
    empresaId: 3,
  },
  {
    id: 11,
    nome: "Comissão de Desenvolvimento",
    lider: "Amanda Ribeiro",
    empresaId: 4,
  },
  { id: 12, nome: "Comissão de Design", lider: "Rafael Moreira", empresaId: 4 },
  { id: 13, nome: "Comissão de Conteúdo", lider: "Bianca Alves", empresaId: 5 },
  {
    id: 14,
    nome: "Comissão de Mídias Sociais",
    lider: "Thiago Costa",
    empresaId: 5,
  },
  {
    id: 15,
    nome: "Comissão de Integração",
    lider: "Carla Martins",
    empresaId: 6,
  },
  {
    id: 16,
    nome: "Comissão de Qualidade",
    lider: "Marcelo Dias",
    empresaId: 6,
  },
  {
    id: 17,
    nome: "Comissão de Suporte",
    lider: "Vanessa Oliveira",
    empresaId: 6,
  },
];

// Dados das famílias com pendências
export const familias: Familia[] = [
  // Empresa 1 - Comissão 1
  {
    id: 1,
    nome: "Família Oliveira",
    responsavel: "José Oliveira",
    membros: 4,
    comissaoId: 1,
    pendencias: { faltas: 2, valorPendente: 150.0 },
  },
  {
    id: 2,
    nome: "Família Silva",
    responsavel: "Maria Silva",
    membros: 3,
    comissaoId: 1,
    pendencias: { faltas: 0, valorPendente: 0 },
  },
  {
    id: 3,
    nome: "Família Santos",
    responsavel: "João Santos",
    membros: 5,
    comissaoId: 1,
    pendencias: { faltas: 1, valorPendente: 75.0 },
  },
  {
    id: 4,
    nome: "Família Pereira",
    responsavel: "Ana Pereira",
    membros: 2,
    comissaoId: 1,
    pendencias: { faltas: 3, valorPendente: 225.0 },
  },
  {
    id: 5,
    nome: "Família Costa",
    responsavel: "Carlos Costa",
    membros: 4,
    comissaoId: 1,
    pendencias: { faltas: 0, valorPendente: 50.0 },
  },
  {
    id: 6,
    nome: "Família Lima",
    responsavel: "Fernanda Lima",
    membros: 3,
    comissaoId: 1,
    pendencias: { faltas: 0, valorPendente: 0 },
  },
  {
    id: 7,
    nome: "Família Souza",
    responsavel: "Roberto Souza",
    membros: 6,
    comissaoId: 1,
    pendencias: { faltas: 2, valorPendente: 180.0 },
  },
  {
    id: 8,
    nome: "Família Almeida",
    responsavel: "Juliana Almeida",
    membros: 4,
    comissaoId: 1,
    pendencias: { faltas: 1, valorPendente: 0 },
  },

  // Empresa 1 - Comissão 2
  {
    id: 9,
    nome: "Família Ferreira",
    responsavel: "Paulo Ferreira",
    membros: 5,
    comissaoId: 2,
    pendencias: { faltas: 0, valorPendente: 120.0 },
  },
  {
    id: 10,
    nome: "Família Ribeiro",
    responsavel: "Camila Ribeiro",
    membros: 3,
    comissaoId: 2,
    pendencias: { faltas: 2, valorPendente: 0 },
  },
  {
    id: 11,
    nome: "Família Martins",
    responsavel: "Lucas Martins",
    membros: 4,
    comissaoId: 2,
    pendencias: { faltas: 1, valorPendente: 90.0 },
  },
  {
    id: 12,
    nome: "Família Rodrigues",
    responsavel: "Amanda Rodrigues",
    membros: 2,
    comissaoId: 2,
    pendencias: { faltas: 0, valorPendente: 0 },
  },
  {
    id: 13,
    nome: "Família Alves",
    responsavel: "Rafael Alves",
    membros: 5,
    comissaoId: 2,
    pendencias: { faltas: 3, valorPendente: 210.0 },
  },
  {
    id: 14,
    nome: "Família Gomes",
    responsavel: "Bianca Gomes",
    membros: 4,
    comissaoId: 2,
    pendencias: { faltas: 0, valorPendente: 0 },
  },
  {
    id: 15,
    nome: "Família Dias",
    responsavel: "Thiago Dias",
    membros: 3,
    comissaoId: 2,
    pendencias: { faltas: 1, valorPendente: 60.0 },
  },

  // Empresa 1 - Comissão 3
  {
    id: 16,
    nome: "Família Moreira",
    responsavel: "Carla Moreira",
    membros: 4,
    comissaoId: 3,
    pendencias: { faltas: 0, valorPendente: 0 },
  },
  {
    id: 17,
    nome: "Família Cardoso",
    responsavel: "Marcelo Cardoso",
    membros: 5,
    comissaoId: 3,
    pendencias: { faltas: 2, valorPendente: 150.0 },
  },
  {
    id: 18,
    nome: "Família Barbosa",
    responsavel: "Vanessa Barbosa",
    membros: 3,
    comissaoId: 3,
    pendencias: { faltas: 1, valorPendente: 80.0 },
  },
  {
    id: 19,
    nome: "Família Nascimento",
    responsavel: "Eduardo Nascimento",
    membros: 6,
    comissaoId: 3,
    pendencias: { faltas: 0, valorPendente: 100.0 },
  },
  {
    id: 20,
    nome: "Família Mendes",
    responsavel: "Cristina Mendes",
    membros: 4,
    comissaoId: 3,
    pendencias: { faltas: 3, valorPendente: 0 },
  },

  // Empresa 1 - Comissão 4
  {
    id: 21,
    nome: "Família Vieira",
    responsavel: "Ricardo Vieira",
    membros: 3,
    comissaoId: 4,
    pendencias: { faltas: 1, valorPendente: 70.0 },
  },
  {
    id: 22,
    nome: "Família Teixeira",
    responsavel: "Patrícia Teixeira",
    membros: 5,
    comissaoId: 4,
    pendencias: { faltas: 0, valorPendente: 0 },
  },
  {
    id: 23,
    nome: "Família Lopes",
    responsavel: "Fernando Lopes",
    membros: 4,
    comissaoId: 4,
    pendencias: { faltas: 2, valorPendente: 130.0 },
  },
  {
    id: 24,
    nome: "Família Araújo",
    responsavel: "Daniela Araújo",
    membros: 2,
    comissaoId: 4,
    pendencias: { faltas: 0, valorPendente: 50.0 },
  },
  {
    id: 25,
    nome: "Família Castro",
    responsavel: "Gustavo Castro",
    membros: 6,
    comissaoId: 4,
    pendencias: { faltas: 1, valorPendente: 0 },
  },

  // Empresa 2 - Comissão 5
  {
    id: 26,
    nome: "Família Correia",
    responsavel: "Mariana Correia",
    membros: 4,
    comissaoId: 5,
    pendencias: { faltas: 0, valorPendente: 0 },
  },
  {
    id: 27,
    nome: "Família Cunha",
    responsavel: "Alexandre Cunha",
    membros: 3,
    comissaoId: 5,
    pendencias: { faltas: 2, valorPendente: 140.0 },
  },
  {
    id: 28,
    nome: "Família Pinto",
    responsavel: "Luciana Pinto",
    membros: 5,
    comissaoId: 5,
    pendencias: { faltas: 1, valorPendente: 85.0 },
  },
  {
    id: 29,
    nome: "Família Rocha",
    responsavel: "Rodrigo Rocha",
    membros: 4,
    comissaoId: 5,
    pendencias: { faltas: 0, valorPendente: 60.0 },
  },
  {
    id: 30,
    nome: "Família Cavalcanti",
    responsavel: "Beatriz Cavalcanti",
    membros: 3,
    comissaoId: 5,
    pendencias: { faltas: 3, valorPendente: 0 },
  },
];

// Funções auxiliares
export function getEmpresaById(id: number): Empresa | undefined {
  return empresas.find((empresa) => empresa.id === id);
}

export function getComissoesByEmpresaId(empresaId: number): Comissao[] {
  return comissoes.filter((comissao) => comissao.empresaId === empresaId);
}

export function getFamiliasByComissaoId(comissaoId: number): Familia[] {
  return familias.filter((familia) => familia.comissaoId === comissaoId);
}

export function getFamiliasByEmpresaId(empresaId: number): Familia[] {
  const comissoesIds = comissoes
    .filter((comissao) => comissao.empresaId === empresaId)
    .map((comissao) => comissao.id);
  return familias.filter((familia) =>
    comissoesIds.includes(familia.comissaoId),
  );
}

export function getFamiliasComPendencias(empresaId: number): Familia[] {
  const todasFamilias = getFamiliasByEmpresaId(empresaId);
  return todasFamilias.filter(
    (familia) =>
      familia.pendencias.faltas > 0 || familia.pendencias.valorPendente > 0,
  );
}

// Função para formatar valores monetários
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
