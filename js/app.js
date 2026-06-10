/* ============================================================
   SmartBI – App Controller
   Nordeste Vendas | Main application logic
   ============================================================ */

/* ── State ──────────────────────────────────────────────────── */
const State = {
  activePage: 'dashboard',
  periodo: 'mes',
  searchQuery: '',
};

/* ── DOM refs ───────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

/* ============================================================
   NAVIGATION
   ============================================================ */
function navigateTo(page) {
  // Update nav
  $$('.nav-item').forEach(el => el.classList.remove('active'));
  const navBtn = document.querySelector(`[data-page="${page}"]`);
  if (navBtn) navBtn.classList.add('active');

  // Update pages
  $$('.page').forEach(el => el.classList.remove('active'));
  const pageEl = $(`page-${page}`);
  if (pageEl) pageEl.classList.add('active');

  // Update header
  updateHeader(page);

  State.activePage = page;

  // Render charts for page
  requestAnimationFrame(() => renderPage(page));

  // Close mobile sidebar
  document.querySelector('.sidebar').classList.remove('open');
}

function updateHeader(page) {
  const titles = {
    dashboard:  { title: 'Dashboard',          sub: 'Visão geral da operação em tempo real' },
    produtos:   { title: 'Análise de Produtos', sub: 'Ranking, desempenho e controle de estoque' },
    filiais:    { title: 'Filiais',             sub: 'Comparativo de desempenho entre unidades' },
    clientes:   { title: 'Clientes',            sub: 'Segmentação, LTV e comportamento de compra' },
    previsao:   { title: 'Previsão de Vendas',  sub: 'Tendências e projeções inteligentes' },
    metas:      { title: 'Metas e KPIs',        sub: 'Acompanhamento de indicadores e objetivos' },
    relatorios: { title: 'Relatórios',          sub: 'Exportação e histórico de relatórios' },
    configuracoes:{ title: 'Configurações',     sub: 'Preferências e gerenciamento do sistema' },
  };

  const t = titles[page] || titles.dashboard;
  const h1 = document.querySelector('.header-title h1');
  const p  = document.querySelector('.header-title p');
  if (h1) h1.textContent = t.title;
  if (p)  p.textContent  = t.sub;
}

/* ============================================================
   RENDER PAGE
   ============================================================ */
function renderPage(page) {
  switch(page) {
    case 'dashboard':   renderDashboard(); break;
    case 'produtos':    renderProdutos();  break;
    case 'filiais':     renderFiliais();   break;
    case 'clientes':    renderClientes();  break;
    case 'previsao':    renderPrevisao();  break;
    case 'metas':       renderMetas();     break;
    case 'relatorios':  renderRelatorios();break;
  }
}

/* ============================================================
   DASHBOARD PAGE
   ============================================================ */
function renderDashboard() {
  renderKPIs();
  renderVendasChart(State.periodo);
  renderCategoriasChart();
  renderHorasPicoChart();
  renderLegendaCategorias();
  renderAtividades();
  renderAlertasEstoque();
}

function renderKPIs() {
  const d = DATA.kpis[State.periodo];
  const map = [
    { id: 'kpiFaturamento', key: 'faturamento' },
    { id: 'kpiPedidos',     key: 'pedidos'     },
    { id: 'kpiTicket',      key: 'ticketMedio' },
    { id: 'kpiClientes',    key: 'clientes'    },
    { id: 'kpiDevolucoes',  key: 'devolucoes'  },
    { id: 'kpiMargem',      key: 'margem'      },
  ];

  map.forEach(({ id, key }) => {
    const card = $(id);
    if (!card || !d[key]) return;
    const val = card.querySelector('.kpi-value');
    const delta = card.querySelector('.kpi-delta');
    const sub   = card.querySelector('.kpi-vs');
    if (val)   val.textContent   = d[key].valor;
    if (delta) {
      delta.textContent = (d[key].dir === 'up' ? '↑ ' : '↓ ') + d[key].delta;
      delta.className = `kpi-delta ${d[key].dir === 'up' ? 'up' : 'down'}`;
    }
    if (sub) sub.textContent = `vs ${d[key].vs}`;
  });
}

function renderLegendaCategorias() {
  const el = $('legendaCategorias');
  if (!el) return;
  const total = DATA.categorias.valores.reduce((a,b) => a+b, 0);
  el.innerHTML = DATA.categorias.labels.map((label, i) => {
    const val = DATA.categorias.valores[i];
    const pct = ((val/total)*100).toFixed(1);
    return `
      <div class="legend-item">
        <div class="legend-dot" style="background:${DATA.categorias.cores[i]}"></div>
        <span class="legend-label">${label}</span>
        <span class="legend-val">${fmtBRL(val)}</span>
        <span class="legend-pct">${pct}%</span>
      </div>`;
  }).join('');
}

function renderAtividades() {
  const el = $('feedAtividades');
  if (!el) return;

  const icons = { venda: '💰', alerta: '⚠️', meta: '🎯', filial: '🏪', cliente: '👤', relatorio: '📄' };

  el.innerHTML = DATA.atividades.map(a => `
    <div class="feed-item">
      <div class="feed-dot" style="background: ${a.tipo === 'alerta' ? 'var(--warning)' : a.tipo === 'meta' ? 'var(--accent)' : 'var(--accent2)'}"></div>
      <div class="feed-content">
        <div class="feed-title">${icons[a.tipo] || '•'} ${a.titulo}</div>
        <div class="feed-desc">${a.desc}</div>
        <div class="feed-time">${a.tempo}</div>
      </div>
    </div>`).join('');
}

function renderAlertasEstoque() {
  const el = $('alertasEstoque');
  if (!el) return;

  el.innerHTML = DATA.alertasEstoque.map(a => `
    <div class="alert-item ${a.tipo}">
      <div class="alert-icon ${a.tipo}">${a.tipo === 'critico' ? '🔴' : '🟡'}</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600">${a.produto}</div>
        <div style="font-size:11px;color:var(--text-dim)">${a.sku} · ${a.filial}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:13px;font-weight:700;color:${a.tipo==='critico'?'var(--danger)':'var(--warning)'}">${a.atual} un.</div>
        <div style="font-size:11px;color:var(--text-dim)">mín: ${a.minimo}</div>
      </div>
    </div>`).join('');
}

/* ============================================================
   PRODUTOS PAGE
   ============================================================ */
function renderProdutos() {
  renderProdutosChart();
  renderTabelaProdutos(DATA.topProdutos);
}

function renderTabelaProdutos(produtos) {
  const tbody = $('tabelaProdutos');
  if (!tbody) return;

  const statusBadge = s => {
    if (s === 'ok')    return '<span class="badge badge-success">✓ OK</span>';
    if (s === 'baixo') return '<span class="badge badge-warning">⚡ Baixo</span>';
    if (s === 'falta') return '<span class="badge badge-danger">✗ Falta</span>';
    return '';
  };

  tbody.innerHTML = produtos.map(p => `
    <tr>
      <td><span class="rank-num ${p.rank === 1 ? 'top' : ''}">${p.rank}</span></td>
      <td>
        <div style="font-weight:600">${p.nome}</div>
        <div style="font-size:11px;color:var(--text-dim)">${p.categoria}</div>
      </td>
      <td class="text-mono">${fmtNum(p.vendas)}</td>
      <td class="text-mono font-bold">${p.receita}</td>
      <td><span class="text-success font-bold">${p.margem}</span></td>
      <td class="text-mono">${fmtNum(p.estoque)}</td>
      <td>${statusBadge(p.status)}</td>
    </tr>`).join('');
}

/* ============================================================
   FILIAIS PAGE
   ============================================================ */
function renderFiliais() {
  renderFiliaisChart();
  renderMetasRadarChart();
  renderFilialCards();
  renderTabelaFiliais();
}

function renderFilialCards() {
  const el = $('filialCards');
  if (!el) return;

  const statusInfo = {
    destaque: { badge: 'badge-success', label: '🏆 Destaque', cls: 'destaque' },
    acima:    { badge: 'badge-info',    label: '↑ Acima meta', cls: '' },
    abaixo:   { badge: 'badge-warning', label: '↓ Abaixo meta', cls: '' },
    atencao:  { badge: 'badge-danger',  label: '⚠ Atenção', cls: '' },
  };

  el.innerHTML = DATA.filiais.map(f => {
    const s = statusInfo[f.status] || statusInfo.abaixo;
    return `
      <div class="filial-card ${s.cls}">
        <div class="filial-name">${f.nome.replace('Filial ','')}</div>
        <div class="filial-city">${f.cidade}</div>
        <div class="filial-val">${f.faturamento}</div>
        <div class="d-flex align-center gap-8" style="margin-bottom:8px">
          <span class="text-success font-bold" style="font-size:12px">${f.crescimento}</span>
          <span class="text-dim" style="font-size:11px">vs anterior</span>
        </div>
        <div class="progress-bar"><div class="progress-fill ${f.meta >= 100 ? '' : f.meta >= 80 ? 'blue' : 'warning'}" style="width:${Math.min(f.meta,100)}%"></div></div>
        <div class="d-flex align-center gap-8" style="margin-top:6px">
          <span class="filial-meta">Meta: ${f.meta}%</span>
          <span class="badge ${s.badge}" style="margin-left:auto">${s.label}</span>
        </div>
      </div>`;
  }).join('');
}

function renderTabelaFiliais() {
  const tbody = $('tabelaFiliais');
  if (!tbody) return;

  tbody.innerHTML = DATA.filiais.map(f => {
    const metaCls = f.meta >= 100 ? 'over' : f.meta >= 80 ? 'under' : 'low';
    const statusDot = f.status === 'destaque' || f.status === 'acima' ? 'green' :
                      f.status === 'atencao' ? 'yellow' : 'red';
    return `
      <tr>
        <td>
          <div class="d-flex align-center gap-8">
            <span class="status-dot ${statusDot}"></span>
            <span style="font-weight:600">${f.nome}</span>
          </div>
        </td>
        <td class="text-dim">${f.cidade}</td>
        <td class="text-mono font-bold">${f.faturamento}</td>
        <td class="text-success font-bold">${f.crescimento}</td>
        <td class="text-mono">${fmtNum(f.pedidos)}</td>
        <td class="text-mono">${f.ticket}</td>
        <td>
          <span class="meta-row-pct ${metaCls}">${f.meta}%</span>
          <div class="progress-bar" style="width:80px"><div class="progress-fill ${f.meta>=100?'':'f.meta>=80?blue:warning'}" style="width:${Math.min(f.meta,100)}%"></div></div>
        </td>
        <td class="text-dim" style="font-size:12px">${f.gerente}</td>
      </tr>`;
  }).join('');
}

/* ============================================================
   CLIENTES PAGE
   ============================================================ */
function renderClientes() {
  renderRFMChart();
  renderPagamentosChart();
  renderRFMLegenda();
  renderTabelaClientes(DATA.clientes);
}

function renderRFMLegenda() {
  const el = $('legendaRFM');
  if (!el) return;
  const total = DATA.rfm.valores.reduce((a,b)=>a+b,0);
  el.innerHTML = DATA.rfm.labels.map((label,i) => {
    const val = DATA.rfm.valores[i];
    const pct = ((val/total)*100).toFixed(1);
    return `
      <div class="legend-item">
        <div class="legend-dot" style="background:${DATA.rfm.cores[i]}"></div>
        <span class="legend-label">${label}</span>
        <span class="legend-val">${fmtNum(val)}</span>
        <span class="legend-pct">${pct}%</span>
      </div>`;
  }).join('');
}

function renderTabelaClientes(clientes) {
  const tbody = $('tabelaClientes');
  if (!tbody) return;

  const statusBadge = s => {
    if (s === 'ativo')   return '<span class="badge badge-success">Ativo</span>';
    if (s === 'inativo') return '<span class="badge badge-muted">Inativo</span>';
    if (s === 'risco')   return '<span class="badge badge-warning">Em risco</span>';
    return '';
  };

  tbody.innerHTML = clientes.map(c => `
    <tr>
      <td class="text-dim text-mono" style="font-size:11px">${c.id}</td>
      <td>
        <div style="font-weight:600">${c.nome}</div>
        <div style="font-size:11px;color:var(--text-dim)">${c.cidade}</div>
      </td>
      <td><span class="tag">${c.segmento}</span></td>
      <td class="text-mono">${fmtNum(c.pedidos)}</td>
      <td class="text-mono font-bold text-accent">${c.ltv}</td>
      <td class="text-mono">${c.ticket}</td>
      <td class="text-dim" style="font-size:12px">${c.ultima}</td>
      <td>${statusBadge(c.status)}</td>
    </tr>`).join('');
}

/* ============================================================
   PREVISÃO PAGE
   ============================================================ */
function renderPrevisao() {
  renderPrevisaoChart();

  // Populate metadata
  const el = $('previsaoInfo');
  if (el) {
    el.innerHTML = `
      <div class="forecast-band">
        🤖 <span><strong>Algoritmo:</strong> ${DATA.previsao.algoritmo} &nbsp;·&nbsp; <strong>Precisão histórica:</strong> ${DATA.previsao.precisao} &nbsp;·&nbsp; <strong>Atualizado:</strong> ${DATA.previsao.atualizacao}</span>
      </div>`;
  }
}

/* ============================================================
   METAS PAGE
   ============================================================ */
function renderMetas() {
  const el = $('metasList');
  if (!el) return;

  el.innerHTML = DATA.metas.map(m => {
    const cls = m.pct >= 100 ? 'over' : m.pct >= 80 ? 'under' : 'low';
    const fillCls = m.pct >= 100 ? '' : m.pct >= 80 ? 'blue' : m.pct >= 60 ? 'warning' : 'danger';
    const width = Math.min(m.pct, 130);
    const label = m.inverso
      ? `${m.atual}${m.nome.includes('Margem') || m.nome.includes('Taxa') ? '%' : ''} (meta: ≤${m.meta})`
      : `${m.atual}${m.nome.includes('Margem') || m.nome.includes('Satisfação') ? '' : ''} / meta: ${m.meta}`;
    return `
      <div class="meta-row">
        <div class="meta-row-header">
          <span class="meta-row-name">${m.nome}</span>
          <div class="d-flex align-center gap-8">
            <span class="text-dim" style="font-size:11px">${label}</span>
            <span class="meta-row-pct ${cls}">${m.pct.toFixed(1)}%</span>
          </div>
        </div>
        <div class="progress-bar" style="height:8px">
          <div class="progress-fill ${fillCls}" style="width:${Math.min(m.pct,100)}%"></div>
        </div>
      </div>`;
  }).join('');

  // Summary KPIs
  const acima = DATA.metas.filter(m => m.pct >= 100).length;
  const proximas = DATA.metas.filter(m => m.pct >= 80 && m.pct < 100).length;
  const abaixo = DATA.metas.filter(m => m.pct < 80).length;

  const el2 = $('metasSummary');
  if (el2) {
    el2.innerHTML = `
      <div class="stat-chip">
        <div class="stat-chip-label">Metas atingidas</div>
        <div class="stat-chip-val text-success">${acima} / ${DATA.metas.length}</div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip-label">Próximas da meta</div>
        <div class="stat-chip-val text-warning">${proximas}</div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip-label">Abaixo da meta</div>
        <div class="stat-chip-val text-danger">${abaixo}</div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip-label">Performance geral</div>
        <div class="stat-chip-val text-accent">${(DATA.metas.reduce((a,m)=>a+m.pct,0)/DATA.metas.length).toFixed(1)}%</div>
      </div>`;
  }
}

/* ============================================================
   RELATÓRIOS PAGE
   ============================================================ */
function renderRelatorios() {
  renderRelatoriosChart();
  renderTabelaRelatorios();
}

function renderTabelaRelatorios() {
  const tbody = $('tabelaRelatorios');
  if (!tbody) return;

  const statusBadge = s => {
    if (s === 'pronto')       return '<span class="badge badge-success">Pronto</span>';
    if (s === 'processando')  return '<span class="badge badge-warning">Processando…</span>';
    return '';
  };

  const formatoIcon = f => {
    if (f === 'PDF')  return '📄 PDF';
    if (f === 'XLSX') return '📊 Excel';
    return f;
  };

  tbody.innerHTML = DATA.relatorios.map(r => `
    <tr>
      <td class="text-dim text-mono" style="font-size:11px">${r.id}</td>
      <td style="font-weight:600">${r.nome}</td>
      <td><span class="tag">${r.tipo}</span></td>
      <td class="text-dim" style="font-size:12px">${r.data}</td>
      <td class="text-mono" style="font-size:12px">${formatoIcon(r.formato)}</td>
      <td class="text-dim" style="font-size:12px">${r.tamanho}</td>
      <td>${statusBadge(r.status)}</td>
      <td>
        <button class="btn btn-ghost btn-sm" ${r.status !== 'pronto' ? 'disabled style="opacity:0.4"' : `onclick="downloadRelatorio('${r.id}')"`}>
          ⬇ Baixar
        </button>
      </td>
    </tr>`).join('');
}

function downloadRelatorio(id) {
  const r = DATA.relatorios.find(x => x.id === id);
  if (!r) return;
  showToast(`📄 Baixando ${r.nome}…`, 'info');
}

/* ============================================================
   PERIOD SELECTOR
   ============================================================ */
function setPeriodo(p) {
  State.periodo = p;
  $$('.period-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.periodo === p);
  });
  if (State.activePage === 'dashboard') {
    renderKPIs();
    renderVendasChart(p);
  }
}

/* ============================================================
   SEARCH
   ============================================================ */
function handleSearch(query, context) {
  State.searchQuery = query.toLowerCase();
  if (context === 'produtos') {
    const filtered = DATA.topProdutos.filter(p =>
      p.nome.toLowerCase().includes(State.searchQuery) ||
      p.categoria.toLowerCase().includes(State.searchQuery)
    );
    renderTabelaProdutos(filtered.length ? filtered : DATA.topProdutos);
  }
  if (context === 'clientes') {
    const filtered = DATA.clientes.filter(c =>
      c.nome.toLowerCase().includes(State.searchQuery) ||
      c.cidade.toLowerCase().includes(State.searchQuery) ||
      c.id.toLowerCase().includes(State.searchQuery)
    );
    renderTabelaClientes(filtered);
  }
}

/* ============================================================
   TABS
   ============================================================ */
function switchTab(tabId, groupId) {
  const group = $(groupId);
  if (!group) return;

  group.querySelectorAll('.tab-btn').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tabId);
  });
  group.querySelectorAll('.tab-content').forEach(el => {
    el.classList.toggle('active', el.id === tabId);
  });
}

/* ============================================================
   EXPORT MODAL
   ============================================================ */
function openModal(modalId) {
  const m = $(modalId);
  if (m) m.classList.add('open');
}

function closeModal(modalId) {
  const m = $(modalId);
  if (m) m.classList.remove('open');
}

function exportData(format) {
  closeModal('exportModal');
  const msgs = {
    pdf:   '📄 Relatório PDF gerado com sucesso!',
    excel: '📊 Planilha Excel exportada!',
    csv:   '📋 Dados exportados em CSV!',
    print: '🖨️ Enviando para impressão…',
  };
  showToast(msgs[format] || 'Exportando…', 'success');
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(msg, type = 'info') {
  const colors = { success: 'var(--success)', info: 'var(--accent2)', warning: 'var(--warning)', danger: 'var(--danger)' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:var(--surface2); border:1px solid var(--border2);
    border-left:3px solid ${colors[type]};
    border-radius:10px; padding:14px 18px;
    font-size:13px; font-weight:500;
    box-shadow:var(--shadow-lg);
    animation: slideIn 0.3s ease;
    max-width:320px;
  `;
  toast.textContent = msg;

  const style = document.createElement('style');
  style.textContent = `@keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`;
  document.head.appendChild(style);

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================================
   LIVE CLOCK
   ============================================================ */
function startClock() {
  const el = $('liveClock');
  if (!el) return;
  const update = () => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  update();
  setInterval(update, 1000);
}

/* ============================================================
   INIT
   ============================================================ */
function init() {
  // Loading screen
  setTimeout(() => {
    const loading = document.querySelector('.loading');
    if (loading) loading.classList.add('hidden');
  }, 2000);

  // Nav click handlers
  $$('.nav-item[data-page]').forEach(el => {
    el.addEventListener('click', () => navigateTo(el.dataset.page));
  });

  // Period buttons
  $$('.period-btn').forEach(el => {
    el.addEventListener('click', () => setPeriodo(el.dataset.periodo));
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar    = document.querySelector('.sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  // Modal close on overlay click
  $$('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });

  // Start clock
  startClock();

  // Render initial page
  navigateTo('dashboard');
}

document.addEventListener('DOMContentLoaded', init);
