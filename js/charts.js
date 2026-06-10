/* ============================================================
   SmartBI – Charts Module
   Nordeste Vendas | Chart.js configurations
   ============================================================ */

/* ── Chart defaults ─────────────────────────────────────────── */
Chart.defaults.font.family = "'Sora', sans-serif";
Chart.defaults.color = '#7b8299';
Chart.defaults.borderColor = 'rgba(255,255,255,0.07)';

const C = {
  accent:  '#00e5a0',
  blue:    '#00b8ff',
  danger:  '#ef4444',
  warning: '#f59e0b',
  purple:  '#a78bfa',
  success: '#22c55e',
  yellow:  '#ffd93d',
  textDim: '#7b8299',
  surface: '#111520',
  surface2:'#181e2d',
};

/* ── Shared tooltip config ──────────────────────────────────── */
const tooltipCfg = {
  backgroundColor: '#181e2d',
  borderColor: 'rgba(255,255,255,0.13)',
  borderWidth: 1,
  titleFont: { family: "'Sora', sans-serif", size: 12, weight: '700' },
  bodyFont:  { family: "'Sora', sans-serif", size: 12 },
  padding: 12,
  cornerRadius: 8,
  displayColors: true,
  boxPadding: 4,
};

/* ── Helper: gradient ───────────────────────────────────────── */
function makeGrad(ctx, color, alpha1 = 0.35, alpha2 = 0.02) {
  const grad = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  grad.addColorStop(0, color.replace(')', `, ${alpha1})`).replace('rgb', 'rgba'));
  grad.addColorStop(1, color.replace(')', `, ${alpha2})`).replace('rgb', 'rgba'));
  return grad;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgb(${r},${g},${b})`;
}

function gradFromHex(ctx, hex, a1=0.35, a2=0.02) {
  const [r,g,b] = [hex.slice(1,3),hex.slice(3,5),hex.slice(5,7)].map(x=>parseInt(x,16));
  const grad = ctx.createLinearGradient(0,0,0,ctx.canvas.height);
  grad.addColorStop(0, `rgba(${r},${g},${b},${a1})`);
  grad.addColorStop(1, `rgba(${r},${g},${b},${a2})`);
  return grad;
}

/* ── Shared grid options ────────────────────────────────────── */
const gridOpts = {
  color: 'rgba(255,255,255,0.05)',
  drawBorder: false,
};

const tickOpts = {
  color: '#4a5068',
  font: { size: 11 },
};

/* ── Store chart instances ──────────────────────────────────── */
const charts = {};

function destroyChart(id) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
}

/* ============================================================
   DASHBOARD – Vendas ao longo do tempo
   ============================================================ */
function renderVendasChart(periodo) {
  destroyChart('vendas');
  const canvas = document.getElementById('chartVendas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let labels, atual, anterior, previsao;
  if (periodo === 'semana') {
    labels   = DATA.vendasSemanais.labels;
    atual    = DATA.vendasSemanais.semanaAtual;
    anterior = DATA.vendasSemanais.semanaAnterior;
    previsao = null;
  } else {
    labels   = DATA.vendasMensais.labels;
    atual    = DATA.vendasMensais.anoAtual;
    anterior = DATA.vendasMensais.anoAnterior;
    previsao = DATA.vendasMensais.previsao;
  }

  const gradAtual = gradFromHex(ctx, C.accent, 0.3, 0.02);

  const datasets = [
    {
      label: periodo === 'semana' ? 'Esta semana' : 'Ano atual',
      data: atual,
      borderColor: C.accent,
      backgroundColor: gradAtual,
      borderWidth: 2.5,
      pointBackgroundColor: C.accent,
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.4,
      fill: true,
    },
    {
      label: periodo === 'semana' ? 'Semana anterior' : 'Ano anterior',
      data: anterior,
      borderColor: 'rgba(255,255,255,0.2)',
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      pointRadius: 2,
      pointHoverRadius: 4,
      borderDash: [5, 4],
      tension: 0.4,
      fill: false,
    }
  ];

  if (previsao) {
    datasets.push({
      label: 'Previsão',
      data: previsao,
      borderColor: C.yellow,
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      pointRadius: 3,
      pointHoverRadius: 5,
      borderDash: [6, 3],
      tension: 0.4,
      fill: false,
    });
  }

  charts['vendas'] = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, position: 'top', align: 'end',
          labels: { boxWidth: 12, boxHeight: 12, borderRadius: 6, useBorderRadius: true, padding: 20, font: { size: 11 } }
        },
        tooltip: { ...tooltipCfg,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: R$ ${fmtNum(ctx.parsed.y)}k`
          }
        },
      },
      scales: {
        x: { grid: gridOpts, ticks: tickOpts, border: { display: false } },
        y: {
          grid: gridOpts,
          ticks: { ...tickOpts, callback: v => 'R$' + v + 'k' },
          border: { display: false }
        }
      }
    }
  });
}

/* ============================================================
   DASHBOARD – Categorias (Donut)
   ============================================================ */
function renderCategoriasChart() {
  destroyChart('categorias');
  const canvas = document.getElementById('chartCategorias');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  charts['categorias'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: DATA.categorias.labels,
      datasets: [{
        data: DATA.categorias.valores,
        backgroundColor: DATA.categorias.cores,
        borderColor: '#111520',
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipCfg,
          callbacks: {
            label: ctx => ` ${ctx.label}: R$ ${fmtNum(ctx.raw)}`
          }
        },
      }
    }
  });
}

/* ============================================================
   DASHBOARD – Horas de pico (Bar)
   ============================================================ */
function renderHorasPicoChart() {
  destroyChart('horasPico');
  const canvas = document.getElementById('chartHorasPico');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const maxVal = Math.max(...DATA.horasPico.valores);
  const colors = DATA.horasPico.valores.map(v =>
    v === maxVal ? C.accent : v > maxVal * 0.7 ? C.blue : 'rgba(255,255,255,0.12)'
  );

  charts['horasPico'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: DATA.horasPico.labels,
      datasets: [{
        label: 'Pedidos',
        data: DATA.horasPico.valores,
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipCfg, callbacks: { label: ctx => ` ${ctx.parsed.y} pedidos` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: tickOpts, border: { display: false } },
        y: { grid: gridOpts, ticks: tickOpts, border: { display: false } }
      }
    }
  });
}

/* ============================================================
   PRODUTOS – Top 10 mini sparklines + chart
   ============================================================ */
function renderProdutosChart() {
  destroyChart('produtos');
  const canvas = document.getElementById('chartProdutos');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const top5 = DATA.topProdutos.slice(0, 5);
  charts['produtos'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: top5.map(p => p.nome.length > 22 ? p.nome.slice(0,22)+'…' : p.nome),
      datasets: [{
        label: 'Receita (R$)',
        data: top5.map(p => parseInt(p.receita.replace(/\D/g,''))),
        backgroundColor: [C.accent, C.blue, C.purple, C.yellow, C.warning],
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipCfg, callbacks: { label: ctx => ` ${fmtBRL(ctx.parsed.x)}` } },
      },
      scales: {
        x: { grid: gridOpts, ticks: { ...tickOpts, callback: v => 'R$' + (v/1000).toFixed(0) + 'k' }, border: { display: false } },
        y: { grid: { display: false }, ticks: tickOpts, border: { display: false } }
      }
    }
  });
}

/* ============================================================
   FILIAIS – Comparativo (grouped bar)
   ============================================================ */
function renderFiliaisChart() {
  destroyChart('filiais');
  const canvas = document.getElementById('chartFiliais');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const filiais = DATA.filiais;
  const nomes = filiais.map(f => f.nome.replace('Filial ', '').split(' ')[0]);
  const valores = filiais.map(f => parseInt(f.faturamento.replace(/\D/g,'')));
  const metas = filiais.map(f => (parseInt(f.faturamento.replace(/\D/g,'')) / f.meta) * 100);

  charts['filiais'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nomes,
      datasets: [
        {
          label: 'Faturamento',
          data: valores,
          backgroundColor: filiais.map(f =>
            f.status === 'destaque' ? C.accent :
            f.status === 'acima'   ? C.blue   :
            f.status === 'atencao' ? C.warning : 'rgba(239,68,68,0.6)'
          ),
          borderRadius: 6,
          borderSkipped: false,
          yAxisID: 'y',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipCfg, callbacks: { label: ctx => ` ${fmtBRL(ctx.parsed.y)}` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: tickOpts, border: { display: false } },
        y: {
          id: 'y', grid: gridOpts,
          ticks: { ...tickOpts, callback: v => 'R$' + (v/1000).toFixed(0) + 'k' },
          border: { display: false }
        }
      }
    }
  });
}

/* ============================================================
   FILIAIS – Metas radar
   ============================================================ */
function renderMetasRadarChart() {
  destroyChart('metasRadar');
  const canvas = document.getElementById('chartMetasRadar');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const top5 = DATA.filiais.slice(0,5);
  charts['metasRadar'] = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Faturamento','Pedidos','Ticket Médio','Meta %','Crescimento'],
      datasets: top5.slice(0,3).map((f,i) => ({
        label: f.nome.replace('Filial ',''),
        data: [
          Math.min((parseInt(f.faturamento.replace(/\D/g,''))/350000)*100, 100),
          Math.min((f.pedidos/2200)*100, 100),
          Math.min((parseInt(f.ticket.replace(/\D/g,''))/160)*100, 100),
          Math.min(f.meta, 100),
          Math.min((parseFloat(f.crescimento)/35)*100, 100),
        ],
        borderColor: [C.accent, C.blue, C.purple][i],
        backgroundColor: [
          'rgba(0,229,160,0.08)',
          'rgba(0,184,255,0.08)',
          'rgba(167,139,250,0.08)'
        ][i],
        borderWidth: 2,
        pointRadius: 4,
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'bottom', labels: { boxWidth: 10, font: { size: 11 }, padding: 16 } },
        tooltip: tooltipCfg,
      },
      scales: {
        r: {
          grid: { color: 'rgba(255,255,255,0.06)' },
          angleLines: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: { color: C.textDim, font: { size: 11 } },
          ticks: { display: false, stepSize: 20 },
          min: 0, max: 100,
        }
      }
    }
  });
}

/* ============================================================
   CLIENTES – Segmentação RFM (Doughnut)
   ============================================================ */
function renderRFMChart() {
  destroyChart('rfm');
  const canvas = document.getElementById('chartRFM');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  charts['rfm'] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: DATA.rfm.labels,
      datasets: [{
        data: DATA.rfm.valores,
        backgroundColor: DATA.rfm.cores,
        borderColor: '#111520',
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '62%',
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipCfg, callbacks: { label: ctx => ` ${ctx.label}: ${fmtNum(ctx.raw)} clientes` } },
      }
    }
  });
}

/* ============================================================
   CLIENTES – Forma de pagamento (bar horizontal)
   ============================================================ */
function renderPagamentosChart() {
  destroyChart('pagamentos');
  const canvas = document.getElementById('chartPagamentos');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  charts['pagamentos'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: DATA.pagamentos.labels,
      datasets: [{
        label: '% das vendas',
        data: DATA.pagamentos.valores,
        backgroundColor: DATA.pagamentos.cores,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipCfg, callbacks: { label: ctx => ` ${ctx.parsed.x}%` } },
      },
      scales: {
        x: { grid: gridOpts, ticks: { ...tickOpts, callback: v => v + '%' }, border: { display: false } },
        y: { grid: { display: false }, ticks: tickOpts, border: { display: false } }
      }
    }
  });
}

/* ============================================================
   PREVISÃO – Forecast line chart
   ============================================================ */
function renderPrevisaoChart() {
  destroyChart('previsao');
  const canvas = document.getElementById('chartPrevisao');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const gradOtimista   = gradFromHex(ctx, C.accent,  0.2, 0.02);
  const gradPessimista = gradFromHex(ctx, C.danger,  0.1, 0.0);

  charts['previsao'] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: DATA.previsao.labels,
      datasets: [
        {
          label: 'Cenário Otimista',
          data: DATA.previsao.otimista,
          borderColor: C.accent,
          backgroundColor: gradOtimista,
          borderWidth: 2,
          pointRadius: 4,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Cenário Realista',
          data: DATA.previsao.realista,
          borderColor: C.blue,
          backgroundColor: 'transparent',
          borderWidth: 2.5,
          pointRadius: 5,
          pointBackgroundColor: C.blue,
          tension: 0.4,
          fill: false,
        },
        {
          label: 'Cenário Pessimista',
          data: DATA.previsao.pessimista,
          borderColor: C.danger,
          backgroundColor: gradPessimista,
          borderWidth: 1.5,
          borderDash: [5, 4],
          pointRadius: 3,
          tension: 0.4,
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, position: 'top', align: 'end',
          labels: { boxWidth: 12, boxHeight: 12, borderRadius: 6, useBorderRadius: true, padding: 20, font: { size: 11 } }
        },
        tooltip: { ...tooltipCfg, callbacks: { label: ctx => ` ${ctx.dataset.label}: R$ ${fmtNum(ctx.parsed.y)}k` } },
      },
      scales: {
        x: { grid: gridOpts, ticks: tickOpts, border: { display: false } },
        y: { grid: gridOpts, ticks: { ...tickOpts, callback: v => 'R$' + v + 'k' }, border: { display: false } }
      }
    }
  });
}

/* ============================================================
   RELATÓRIOS – Volume mensal (bar)
   ============================================================ */
function renderRelatoriosChart() {
  destroyChart('relatorios');
  const canvas = document.getElementById('chartRelatorios');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  charts['relatorios'] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: DATA.vendasMensais.labels,
      datasets: [{
        label: 'Faturamento (mil R$)',
        data: DATA.vendasMensais.anoAtual,
        backgroundColor: DATA.vendasMensais.anoAtual.map((v,i) =>
          i < 6 ? gradFromHex(ctx, C.accent, 0.7, 0.3) : C.accent
        ),
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...tooltipCfg, callbacks: { label: ctx => ` R$ ${fmtNum(ctx.parsed.y)}k` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: tickOpts, border: { display: false } },
        y: { grid: gridOpts, ticks: { ...tickOpts, callback: v => 'R$' + v + 'k' }, border: { display: false } }
      }
    }
  });
}
