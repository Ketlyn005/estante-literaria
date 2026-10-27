var biblioteca = [];
var metas = { mensal: 2, anual: 24 };
var categoriaFiltro = 'todos';
var capaTemp = '';
var capaModalTemp = '';

window.onload = function() {
  try {
    var dadosSalvos = localStorage.getItem('estante_v_final');
    if (dadosSalvos) biblioteca = JSON.parse(dadosSalvos);
    
    var metasSalvas = localStorage.getItem('metas_v_final');
    if (metasSalvas) metas = JSON.parse(metasSalvas);
  } catch(e) {
    biblioteca = [];
  }
  renderizar();
};

function comprimirFoto(file, callback) {
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      var maxDim = 200;
      var w = img.width, h = img.height;
      if (w > h) { if (w > maxDim) { h *= maxDim / w; w = maxDim; } }
      else { if (h > maxDim) { w *= maxDim / h; h = maxDim; } }
      canvas.width = w; canvas.height = h;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      callback(canvas.toDataURL('image/jpeg', 0.5));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function processarCapaGaleria(input) {
  if (input.files && input.files[0]) {
    comprimirFoto(input.files[0], function(res) {
      capaTemp = res;
    });
  }
}

function processarCapaModal(input) {
  if (input.files && input.files[0]) {
    comprimirFoto(input.files[0], function(res) {
      capaModalTemp = res;
    });
  }
}

function buscarCapaGoogle() {
  var t = document.getElementById('titulo').value.trim();
  if (!t || capaTemp) return;
  
  fetch('https://www.googleapis.com/books/v1/volumes?q=' + encodeURIComponent(t))
    .then(function(res) { return res.json(); })
    .then(function(d) {
      if (d.items && d.items[0]) {
        var info = d.items[0].volumeInfo;
        if (info.imageLinks && info.imageLinks.thumbnail) {
          capaTemp = info.imageLinks.thumbnail.replace('http://', 'https://');
        }
        if (info.authors && !document.getElementById('autor').value) {
          document.getElementById('autor').value = info.authors.join(', ');
        }
        if (info.pageCount && !document.getElementById('totalPaginas').value) {
          document.getElementById('totalPaginas').value = info.pageCount;
        }
      }
    }).catch(function(e){});
}

function adicionarLivro() {
  var campoTitulo = document.getElementById('titulo');
  var titulo = campoTitulo.value.trim();
  
  if (!titulo) {
    alert("Por favor, preencha o título do livro!");
    return;
  }

  var total = parseInt(document.getElementById('totalPaginas').value) || 0;
  var atual = parseInt(document.getElementById('paginaAtual').value) || 0;
  var cat = document.getElementById('categoria').value;

  if (atual >= total && total > 0) cat = 'Concluídos';

  var novo = {
    id: new Date().getTime(),
    titulo: titulo,
    autor: document.getElementById('autor').value.trim() || 'Desconhecido',
    genero: document.getElementById('genero').value.trim() || 'Geral',
    totalPaginas: total,
    paginaAtual: atual,
    categoria: cat,
    capaUrl: capaTemp
  };

  biblioteca.push(novo);
  salvar();

  document.getElementById('titulo').value = '';
  document.getElementById('autor').value = '';
  document.getElementById('genero').value = '';
  document.getElementById('totalPaginas').value = '';
  document.getElementById('paginaAtual').value = '';
  document.getElementById('capaArquivo').value = '';
  capaTemp = '';

  alert("Livro adicionado!");
}

function filtrar(cat, btn) {
  categoriaFiltro = cat;
  var btns = document.querySelectorAll('.filter-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }
  if (btn) btn.classList.add('active');
  renderizar();
}

function definirMetas() {
  var m = prompt("Meta Mensal de livros:", metas.mensal);
  var a = prompt("Meta Anual de livros:", metas.anual);
  if (m) metas.mensal = parseInt(m) || 1;
  if (a) metas.anual = parseInt(a) || 1;
  localStorage.setItem('metas_v_final', JSON.stringify(metas));
  renderizar();
}

function abrirModal(id) {
  var l = null;
  for (var i = 0; i < biblioteca.length; i++) {
    if (biblioteca[i].id === id) { l = biblioteca[i]; break; }
  }
  if (!l) return;

  document.getElementById('mod-id').value = l.id;
  document.getElementById('mod-titulo').value = l.titulo;
  document.getElementById('mod-autor').value = l.autor;
  document.getElementById('mod-genero').value = l.genero;
  document.getElementById('mod-total').value = l.totalPaginas;
  document.getElementById('mod-atual').value = l.paginaAtual;
  document.getElementById('mod-categoria').value = l.categoria;
  capaModalTemp = l.capaUrl;
  document.getElementById('modalLivro').classList.add('active');
}

function fecharModal() {
  document.getElementById('modalLivro').classList.remove('active');
}

function salvarEdicaoModal() {
  var id = Number(document.getElementById('mod-id').value);
  var l = null;
  for (var i = 0; i < biblioteca.length; i++) {
    if (biblioteca[i].id === id) { l = biblioteca[i]; break; }
  }

  if (l) {
    l.titulo = document.getElementById('mod-titulo').value;
    l.autor = document.getElementById('mod-autor').value;
    l.genero = document.getElementById('mod-genero').value;
    l.totalPaginas = parseInt(document.getElementById('mod-total').value) || 0;
    l.paginaAtual = parseInt(document.getElementById('mod-atual').value) || 0;
    l.categoria = document.getElementById('mod-categoria').value;
    l.capaUrl = capaModalTemp;
    if (l.paginaAtual >= l.totalPaginas && l.totalPaginas > 0) l.categoria = 'Concluídos';
    salvar();
    fecharModal();
  }
}

function excluirLivroModal() {
  var id = Number(document.getElementById('mod-id').value);
  var novaBib = [];
  for (var i = 0; i < biblioteca.length; i++) {
    if (biblioteca[i].id !== id) novaBib.push(biblioteca[i]);
  }
  biblioteca = novaBib;
  salvar();
  fecharModal();
}

function avancarPagina(id) {
  for (var i = 0; i < biblioteca.length; i++) {
    if (biblioteca[i].id === id) {
      if (biblioteca[i].paginaAtual < biblioteca[i].totalPaginas) {
        biblioteca[i].paginaAtual++;
        if (biblioteca[i].paginaAtual >= biblioteca[i].totalPaginas) biblioteca[i].categoria = 'Concluídos';
        salvar();
      }
      break;
    }
  }
}

function salvar() {
  try {
    localStorage.setItem('estante_v_final', JSON.stringify(biblioteca));
  } catch(e) {
    alert("Erro ao salvar: Memória cheia!");
  }
  renderizar();
}

function renderizar() {
  var lista = document.getElementById('lista-livros');
  var termo = document.getElementById('busca').value.toLowerCase();
  lista.innerHTML = '';

  var paginasTotais = 0, emAndamento = 0, concluidos = 0;

  for (var i = 0; i < biblioteca.length; i++) {
    var item = biblioteca[i];
    paginasTotais += item.paginaAtual;
    if (item.categoria === 'Lendo') emAndamento++;
    if (item.categoria === 'Concluídos') concluidos++;
  }

  for (var j = 0; j < biblioteca.length; j++) {
    var l = biblioteca[j];
    var cOk = categoriaFiltro === 'todos' || l.categoria === categoriaFiltro;
    var bOk = l.titulo.toLowerCase().indexOf(termo) !== -1 || l.autor.toLowerCase().indexOf(termo) !== -1;

    if (cOk && bOk) {
      var pct = l.totalPaginas > 0 ? Math.min(100, Math.round((l.paginaAtual / l.totalPaginas) * 100)) : 0;
      var capaHtml = l.capaUrl 
        ? '<img src="' + l.capaUrl + '" class="book-cover">'
        : '<div class="book-cover" style="display:flex;align-items:center;justify-content:center;text-align:center;padding:4px;font-size:0.6rem;color:#c89f68;">' + l.titulo + '</div>';

      lista.innerHTML += `
        <div class="book-card">
          ${capaHtml}
          <div class="book-info">
            <div class="book-title-item">${l.titulo}</div>
            <div class="book-author">${l.autor}</div>
            <div class="book-genre">${l.genero} • <b style="color:var(--text-muted);">${l.categoria}</b></div>
            
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${pct}%"></div>
            </div>

            <div style="font-size:0.75rem; color:var(--text-muted);">
              ${l.paginaAtual} / ${l.totalPaginas} pág. (${pct}%)
            </div>

            <div class="book-actions">
              <button type="button" class="btn-action accent" onclick="avancarPagina(${l.id})">+1 Pág</button>
              <button type="button" class="btn-action" onclick="abrirModal(${l.id})">Editar</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  document.getElementById('stat-paginas').innerText = paginasTotais;
  document.getElementById('stat-lendo').innerText = emAndamento;
  document.getElementById('stat-concluidos').innerText = concluidos;
  document.getElementById('stat-total').innerText = biblioteca.length;

  var pctM = Math.min(100, Math.round((concluidos / metas.mensal) * 100));
  var pctA = Math.min(100, Math.round((concluidos / metas.anual) * 100));
  
  document.getElementById('meta-m-texto').innerText = concluidos + '/' + metas.mensal + ' livros (' + pctM + '%)';
  document.getElementById('meta-m-bar').style.width = pctM + '%';
  
  document.getElementById('meta-a-texto').innerText = concluidos + '/' + metas.anual + ' livros (' + pctA + '%)';
  document.getElementById('meta-a-bar').style.width = pctA + '%';
    }
