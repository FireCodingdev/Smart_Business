/* ============================================================
   SmartBI – Data Layer (Mock Data)
   Nordeste Vendas | Todos os dados são fictícios para demo
   ============================================================ */

const DATA = {

  /* ── KPIs Gerais ──────────────────────────────────────────── */
  kpis: {
    semana: {
      faturamento: { valor: 'R$ 284.750', delta: '+12,4%', dir: 'up', vs: 'semana anterior' },
      pedidos:     { valor: '1.847',      delta: '+8,1%',  dir: 'up', vs: 'semana anterior' },
      ticketMedio: { valor: 'R$ 154,19',  delta: '+3,9%',  dir: 'up', vs: 'semana anterior' },
      clientes:    { valor: '1.203',      delta: '-2,1%',  dir: 'down', vs: 'semana anterior' },
      devolucoes:  { valor: '2,3%',       delta: '-0,4pp', dir: 'up', vs: 'semana anterior' },
      margem:      { valor: '34,2%',      delta: '+1,1pp', dir: 'up', vs: 'semana anterior' },
    },
    mes: {
      faturamento: { valor: 'R$ 1.248.390', delta: '+18,7%', dir: 'up', vs: 'mês anterior' },
      pedidos:     { valor: '8.241',        delta: '+14,2%', dir: 'up', vs: 'mês anterior' },
      ticketMedio: { valor: 'R$ 151,48',    delta: '+3,9%',  dir: 'up', vs: 'mês anterior' },
      clientes:    { valor: '5.872',        delta: '+6,3%',  dir: 'up', vs: 'mês anterior' },
      devolucoes:  { valor: '2,1%',         delta: '-0,6pp', dir: 'up', vs: 'mês anterior' },
      margem:      { valor: '33,8%',        delta: '+0,9pp', dir: 'up', vs: 'mês anterior' },
    },
    ano: {
      faturamento: { valor: 'R$ 14.927.800', delta: '+22,1%', dir: 'up', vs: 'ano anterior' },
      pedidos:     { valor: '98.543',         delta: '+19,4%', dir: 'up', vs: 'ano anterior' },
      ticketMedio: { valor: 'R$ 151,48',      delta: '+2,3%',  dir: 'up', vs: 'ano anterior' },
      clientes:    { valor: '32.104',         delta: '+11,8%', dir: 'up', vs: 'ano anterior' },
      devolucoes:  { valor: '2,4%',           delta: '+0,1pp', dir: 'down', vs: 'ano anterior' },
      margem:      { valor: '32,9%',          delta: '+1,4pp', dir: 'up', vs: 'ano anterior' },
    }
  },

  /* ── Vendas por período ───────────────────────────────────── */
  vendasMensais: {
    labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    anoAtual:   [920, 1050, 980, 1240, 1380, 1290, 1410, 1520, 1480, 1620, 1890, 2140],
    anoAnterior:[750,  820, 780,  970, 1050,  990, 1100, 1180, 1150, 1280, 1490, 1720],
    previsao:   [null,null,null,null,null,null,null,null,null, null, 1920, 2200],
  },

  vendasSemanais: {
    labels: ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    semanaAtual:   [42, 58, 51, 63, 88, 72, 34],
    semanaAnterior:[38, 52, 47, 59, 80, 68, 29],
  },

  /* ── Categorias de produtos ───────────────────────────────── */
  categorias: {
    labels: ['Eletrônicos','Vestuário','Alimentos','Beleza','Casa & Dec.','Esportes'],
    valores: [387420, 298310, 241850, 187640, 142300, 98750],
    cores: ['#00e5a0','#00b8ff','#ffd93d','#a78bfa','#ff6b6b','#f59e0b'],
  },

  /* ── Top Produtos ─────────────────────────────────────────── */
  topProdutos: [
    { rank: 1, nome: 'Smart TV 55" 4K Ultra HD', categoria: 'Eletrônicos', vendas: 1847, receita: 'R$ 924.150', margem: '28%', estoque: 142, status: 'ok' },
    { rank: 2, nome: 'Notebook Core i5 16GB',    categoria: 'Eletrônicos', vendas: 1204, receita: 'R$ 841.200', margem: '22%', estoque: 87,  status: 'ok' },
    { rank: 3, nome: 'Tênis Running Pro X',       categoria: 'Esportes',    vendas: 2341, receita: 'R$ 561.840', margem: '41%', estoque: 312, status: 'ok' },
    { rank: 4, nome: 'Camiseta Premium Slim',     categoria: 'Vestuário',   vendas: 3892, receita: 'R$ 428.120', margem: '58%', estoque: 890, status: 'ok' },
    { rank: 5, nome: 'Fone Bluetooth ANC 40h',    categoria: 'Eletrônicos', vendas: 987,  receita: 'R$ 394.800', margem: '35%', estoque: 23,  status: 'baixo' },
    { rank: 6, nome: 'Kit Skincare Hidratante',   categoria: 'Beleza',      vendas: 1563, receita: 'R$ 312.600', margem: '62%', estoque: 467, status: 'ok' },
    { rank: 7, nome: 'Cafeteira Espresso Pro',    categoria: 'Casa & Dec.', vendas: 642,  receita: 'R$ 288.900', margem: '31%', estoque: 8,   status: 'falta' },
    { rank: 8, nome: 'Câmera DSLR 24MP',         categoria: 'Eletrônicos', vendas: 218,  receita: 'R$ 261.600', margem: '19%', estoque: 54,  status: 'ok' },
    { rank: 9, nome: 'Mochila Executiva 30L',     categoria: 'Vestuário',   vendas: 1087, receita: 'R$ 217.400', margem: '52%', estoque: 231, status: 'ok' },
    { rank: 10,nome: 'Suplemento Whey Protein',   categoria: 'Alimentos',   vendas: 1924, receita: 'R$ 192.400', margem: '44%', estoque: 388, status: 'ok' },
  ],

  /* ── Filiais ──────────────────────────────────────────────── */
  filiais: [
    { id: 1, nome: 'Filial Recife Centro',   cidade: 'Recife – PE',      faturamento: 'R$ 312.480', crescimento: '+24,1%', pedidos: 2187, ticket: 'R$ 142,85', meta: 92, gerente: 'Ana Cavalcanti',   status: 'acima' },
    { id: 2, nome: 'Filial Fortaleza Norte', cidade: 'Fortaleza – CE',   faturamento: 'R$ 287.910', crescimento: '+18,3%', pedidos: 1943, ticket: 'R$ 148,18', meta: 88, gerente: 'Carlos Mendonça',  status: 'acima' },
    { id: 3, nome: 'Filial Salvador Barra',  cidade: 'Salvador – BA',    faturamento: 'R$ 241.670', crescimento: '+11,7%', pedidos: 1621, ticket: 'R$ 149,09', meta: 79, gerente: 'Mariana Santos',  status: 'abaixo' },
    { id: 4, nome: 'Filial Maceió',          cidade: 'Maceió – AL',      faturamento: 'R$ 198.340', crescimento: '+31,2%', pedidos: 1398, ticket: 'R$ 141,87', meta: 105,gerente: 'José Ferreira',   status: 'destaque' },
    { id: 5, nome: 'Filial Natal',           cidade: 'Natal – RN',       faturamento: 'R$ 187.250', crescimento: '+9,4%',  pedidos: 1287, ticket: 'R$ 145,49', meta: 72, gerente: 'Fernanda Lima',   status: 'atencao' },
    { id: 6, nome: 'Filial João Pessoa',     cidade: 'João Pessoa – PB', faturamento: 'R$ 164.820', crescimento: '+15,8%', pedidos: 1124, ticket: 'R$ 146,64', meta: 83, gerente: 'Ricardo Oliveira',status: 'abaixo' },
    { id: 7, nome: 'Filial Aracaju',         cidade: 'Aracaju – SE',     faturamento: 'R$ 134.510', crescimento: '+7,2%',  pedidos: 941,  ticket: 'R$ 142,94', meta: 68, gerente: 'Patrícia Gomes',  status: 'atencao' },
    { id: 8, nome: 'Filial Teresina',        cidade: 'Teresina – PI',    faturamento: 'R$ 121.740', crescimento: '+22,9%', pedidos: 863,  ticket: 'R$ 141,06', meta: 97, gerente: 'Marcos Alves',    status: 'acima' },
  ],

  /* ── Metas mensais ────────────────────────────────────────── */
  metas: [
    { nome: 'Faturamento Total',    atual: 1248390, meta: 1400000, pct: 89.2 },
    { nome: 'Novos Clientes',       atual: 5872,    meta: 6500,    pct: 90.3 },
    { nome: 'Ticket Médio',         atual: 151.48,  meta: 145,     pct: 104.5 },
    { nome: 'Pedidos',              atual: 8241,    meta: 9000,    pct: 91.6 },
    { nome: 'Taxa de Devolução',    atual: 2.1,     meta: 3.0,     pct: 130,  inverso: true },
    { nome: 'Margem Bruta',         atual: 33.8,    meta: 32,      pct: 105.6 },
    { nome: 'NPS',                  atual: 74,      meta: 70,      pct: 105.7 },
    { nome: 'Satisfação Clientes',  atual: 4.3,     meta: 4.5,     pct: 95.6 },
  ],

  /* ── Clientes ─────────────────────────────────────────────── */
  clientes: [
    { id: 'C001', nome: 'Empresa ABC Ltda',      segmento: 'B2B', cidade: 'Recife',    pedidos: 87, ltv: 'R$ 48.720', ticket: 'R$ 560,00', ultima: '07/06/2025', status: 'ativo' },
    { id: 'C002', nome: 'Maria Gonçalves',        segmento: 'B2C', cidade: 'Fortaleza', pedidos: 34, ltv: 'R$ 12.480', ticket: 'R$ 367,06', ultima: '05/06/2025', status: 'ativo' },
    { id: 'C003', nome: 'Distribuidora Norte',    segmento: 'B2B', cidade: 'Natal',     pedidos: 124,ltv: 'R$ 89.340', ticket: 'R$ 720,48', ultima: '06/06/2025', status: 'ativo' },
    { id: 'C004', nome: 'João Carlos Silva',      segmento: 'B2C', cidade: 'Salvador',  pedidos: 12, ltv: 'R$ 3.840',  ticket: 'R$ 320,00', ultima: '28/05/2025', status: 'inativo' },
    { id: 'C005', nome: 'Atacado Nordestino',     segmento: 'B2B', cidade: 'Maceió',    pedidos: 201,ltv: 'R$ 147.300',ticket: 'R$ 732,84', ultima: '07/06/2025', status: 'ativo' },
    { id: 'C006', nome: 'Fernanda Alves',         segmento: 'B2C', cidade: 'Recife',    pedidos: 28, ltv: 'R$ 8.960',  ticket: 'R$ 320,00', ultima: '03/06/2025', status: 'ativo' },
    { id: 'C007', nome: 'Comércio Sol Nascente',  segmento: 'B2B', cidade: 'Teresina',  pedidos: 76, ltv: 'R$ 54.720', ticket: 'R$ 720,00', ultima: '01/06/2025', status: 'risco' },
    { id: 'C008', nome: 'Pedro Henrique Costa',   segmento: 'B2C', cidade: 'João Pessoa',pedidos:19, ltv: 'R$ 5.700',  ticket: 'R$ 300,00', ultima: '07/06/2025', status: 'ativo' },
    { id: 'C009', nome: 'Grupo Varejo Plus',      segmento: 'B2B', cidade: 'Fortaleza', pedidos: 312,ltv: 'R$ 218.400',ticket: 'R$ 700,00', ultima: '07/06/2025', status: 'ativo' },
    { id: 'C010', nome: 'Luciana Moreira',        segmento: 'B2C', cidade: 'Aracaju',   pedidos: 8,  ltv: 'R$ 2.160',  ticket: 'R$ 270,00', ultima: '15/05/2025', status: 'inativo' },
  ],

  /* ── Estoque / Alertas ────────────────────────────────────── */
  alertasEstoque: [
    { tipo: 'critico', produto: 'Cafeteira Espresso Pro',  sku: 'EL-CAF-001', atual: 8,  minimo: 20, filial: 'Recife Centro' },
    { tipo: 'critico', produto: 'Fone Bluetooth ANC 40h',  sku: 'EL-FON-012', atual: 23, minimo: 50, filial: 'Fortaleza Norte' },
    { tipo: 'atencao', produto: 'Câmera DSLR 24MP',        sku: 'EL-CAM-004', atual: 54, minimo: 80, filial: 'Salvador Barra' },
    { tipo: 'atencao', produto: 'Notebook Core i5 16GB',   sku: 'EL-NOT-007', atual: 87, minimo: 100,filial: 'Maceió' },
    { tipo: 'atencao', produto: 'Tênis Running Pro X (40)', sku: 'ES-TEN-040', atual: 61, minimo: 80, filial: 'Natal' },
  ],

  /* ── Atividade recente ────────────────────────────────────── */
  atividades: [
    { tipo: 'venda',    titulo: 'Novo pedido de alto valor',      desc: 'Grupo Varejo Plus – R$ 28.400 em eletrônicos',  tempo: '5 min atrás' },
    { tipo: 'alerta',   titulo: 'Estoque crítico detectado',      desc: 'Cafeteira Espresso Pro – apenas 8 unidades',    tempo: '18 min atrás' },
    { tipo: 'meta',     titulo: 'Meta de ticket médio superada',  desc: 'Ticket médio atingiu R$ 151,48 (+4,5% acima)',  tempo: '1h atrás' },
    { tipo: 'filial',   titulo: 'Filial Maceió bate recorde',     desc: 'Melhor semana da história: +31,2% vs anterior', tempo: '2h atrás' },
    { tipo: 'cliente',  titulo: 'Cliente premium reativado',      desc: 'Comércio Sol Nascente volta após 45 dias',      tempo: '3h atrás' },
    { tipo: 'relatorio',titulo: 'Relatório mensal gerado',        desc: 'Relatório de Maio 2025 exportado em PDF',       tempo: '5h atrás' },
  ],

  /* ── Previsão de vendas ───────────────────────────────────── */
  previsao: {
    labels: ['Jul','Ago','Set','Out','Nov','Dez','Jan/26','Fev/26','Mar/26'],
    otimista:  [1520, 1640, 1720, 1890, 2080, 2340, 1680, 1520, 1740],
    realista:  [1410, 1520, 1580, 1720, 1890, 2140, 1540, 1380, 1580],
    pessimista:[1280, 1380, 1440, 1560, 1720, 1940, 1400, 1260, 1440],
    algoritmo: 'Regressão Linear + Sazonalidade',
    precisao:  '94,2%',
    atualizacao: '07/06/2025 08:30',
  },

  /* ── Relatórios gerados ───────────────────────────────────── */
  relatorios: [
    { id: 'R001', nome: 'Desempenho Mensal – Maio 2025',     tipo: 'Vendas',   data: '01/06/2025', tamanho: '2.4 MB', formato: 'PDF', status: 'pronto' },
    { id: 'R002', nome: 'Ranking de Produtos – T1 2025',     tipo: 'Produtos', data: '02/04/2025', tamanho: '1.8 MB', formato: 'PDF', status: 'pronto' },
    { id: 'R003', nome: 'Comparativo de Filiais – Abril',    tipo: 'Filiais',  data: '05/05/2025', tamanho: '3.1 MB', formato: 'XLSX',status: 'pronto' },
    { id: 'R004', nome: 'Análise de Clientes Inativos',      tipo: 'Clientes', data: '10/05/2025', tamanho: '980 KB', formato: 'PDF', status: 'pronto' },
    { id: 'R005', nome: 'Previsão Vendas – Q3 2025',         tipo: 'Forecast', data: '07/06/2025', tamanho: '1.2 MB', formato: 'PDF', status: 'processando' },
    { id: 'R006', nome: 'Controle de Estoque – Junho',       tipo: 'Estoque',  data: '07/06/2025', tamanho: '—',      formato: 'XLSX',status: 'processando' },
  ],

  /* ── Segmentação de clientes RFM ─────────────────────────── */
  rfm: {
    labels: ['Campeões','Leais','Potenciais','Em risco','Perdidos','Novos'],
    valores: [1240, 2870, 4120, 1890, 3210, 2680],
    cores: ['#00e5a0','#00b8ff','#a78bfa','#f59e0b','#ef4444','#22c55e'],
  },

  /* ── Forma de pagamento ───────────────────────────────────── */
  pagamentos: {
    labels: ['Cartão Crédito','Pix','Boleto','Cartão Débito','Vale Compra'],
    valores: [48.3, 31.7, 10.4, 7.2, 2.4],
    cores: ['#00e5a0','#00b8ff','#ffd93d','#a78bfa','#ff6b6b'],
  },

  /* ── Horários de pico ─────────────────────────────────────── */
  horasPico: {
    labels: ['00h','02h','04h','06h','08h','10h','12h','14h','16h','18h','20h','22h'],
    valores: [12, 4, 2, 8, 48, 87, 124, 98, 112, 142, 108, 64],
  },

};

/* ── Helpers ───────────────────────────────────────────────── */
const fmtBRL = v => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
const fmtNum = v => new Intl.NumberFormat('pt-BR').format(v);
const fmtPct = v => v.toFixed(1) + '%';
