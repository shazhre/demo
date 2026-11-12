/* The Thread Stories – homepage behaviour (no dependencies).
   In production, CATEGORIES / PRODUCTS / MENUS come from the admin panel or API. */
(function () {
  'use strict';

  const IMG = 'images/';
  const HANGER = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 6a2 2 0 1 1 2 2c-1 .4-2 1-2 2v1"/><path d="M12 11L3 17.5c-.6.5-.3 1.5.5 1.5h17c.8 0 1.1-1 .5-1.5L12 11z"/></svg>';
  const HEART = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>';
  const WA = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z"/></svg>';
  const PLUS = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------- Data ---------------- */
  // Featured categories on the homepage (selected in admin; any number, 4 shown at a time on desktop)
  const CATEGORIES = [
    { name: 'Three Pc Suits', img: 'navy-suit.jpg' },
    { name: 'Kurtis', img: 'yellow-kurti.jpg' },
    { name: 'Co-ord Sets', img: 'plum-kurta-set.jpg' },
    { name: 'Sarees & Blouses', img: '' },
    { name: 'Skirts', img: '' },
    { name: 'Kaftans & Frocks', img: 'pink-anarkali.jpg' },
    { name: 'Plus Size', img: '' },
    { name: 'Jewellery', img: 'ruby-chandbali.jpg' },
    { name: 'Footwear', img: '' }
  ];

  const SIZES = (soldOut, low) => ['S', 'M', 'L', 'XL', 'XXL'].map((l) => ({ label: l, soldOut: soldOut.includes(l), low: l === low }));

  // Placeholder prices: replace [PRICE] with real values from your catalogue
  const NEW_ARRIVALS = [
    { id: 'n1', name: 'Plum Bandhani Kurta Set', type: 'Co-ord set', img: 'plum-kurta-set.jpg', badge: 'New', sizes: SIZES(['XXL'], 'M') },
    { id: 'n2', name: 'Blush Printed Anarkali', type: 'Kaftans & frocks', img: 'pink-anarkali.jpg', badge: 'New', sizes: SIZES([], '') },
    { id: 'n3', name: 'Teal Foil-Print Dupatta Set', type: 'Three pc suit', img: 'teal-suit.jpg', sale: true, sizes: SIZES(['S'], 'L') },
    { id: 'n4', name: 'Navy Zari Salwar Suit', type: 'Three pc suit', img: 'navy-suit.jpg', sizes: SIZES(['S', 'XXL'], '') },
    { id: 'n5', name: 'Emerald Zari Kurta Set', type: 'Three pc suit', img: 'green-kurta.jpg', badge: 'New', sizes: SIZES([], 'XL') },
    { id: 'n6', name: 'Mustard Gota Kurta', type: 'Kurti', img: 'yellow-kurti.jpg', sale: true, sizes: SIZES(['M'], '') },
    { id: 'n7', name: 'Plum Embroidered Kurti', type: 'Kurti', img: 'plum-embroidery.jpg', sizes: SIZES([], '') },
    { id: 'n8', name: 'Ruby Chandbali Earrings', type: 'Jewellery', img: 'ruby-chandbali.jpg', badge: 'New', sizes: [] }
  ];
  const BEST_SELLERS = [
    { id: 'b1', name: 'Pearl Chandbali Earrings', type: 'Jewellery', img: 'pearl-chandbali.jpg', sizes: [] },
    { id: 'b2', name: 'Pearl & Kundan Bangles', type: 'Jewellery', img: 'pearl-bangles.jpg', sale: true, sizes: [{ label: '2.4', low: true }, { label: '2.6' }, { label: '2.8', soldOut: true }] },
    { id: 'b3', name: 'Ruby Ear Cuffs', type: 'Jewellery', img: 'ruby-ear-cuffs.jpg', sizes: [] },
    { id: 'b4', name: 'Blush Printed Anarkali', type: 'Kaftans & frocks', img: 'pink-anarkali.jpg', sizes: SIZES(['S'], 'M') }
  ];
  const ALL = [...NEW_ARRIVALS, ...BEST_SELLERS];

  const MENUS = {
    clothing: {
      cols: [
        [{ title: 'Three Pc Suits', links: ['Daily Wear Salwar Suits'] }, { title: 'Kurtis', links: ['Cotton Kurtis', 'Handblock Kurtis', 'Short Tops'] }],
        [{ title: 'Co-ord Sets', links: ['Daily Wear Co-ord Sets'] }, { title: 'Sarees & Blouses', links: ['Cotton Sarees', 'Saree with Blouse', 'Readymade Blouses'] }],
        [{ title: 'Skirts', links: ['Cotton Skirts'] }, { title: 'Kaftans & Frocks', links: ['Kaftans', 'Gowns'] }, { title: 'Plus Size', links: ['Plus Size Daily Wear', 'Plus Size Festive Wear'] }]
      ],
      tiles: [{ img: 'navy-suit.jpg', caption: 'Three Pc Suits' }, { img: 'yellow-kurti.jpg', caption: 'Kurtis' }]
    },
    jewellery: {
      cols: [
        [{ title: 'Anti-tarnish Jewellery', links: ['Bangles', 'Earrings', 'Chains', 'Anklets', 'Rings', 'Kadas', 'Nose Pins', 'Full Sets'] }],
        [{ title: 'Oxidised Jewellery', links: ['Bangles', 'Earrings', 'Chains', 'Rings', 'Kadas', 'Nose Pins', 'Necklace Sets'] }]
      ],
      tiles: [{ img: 'pearl-bangles.jpg', caption: 'Bangles' }, { img: 'ruby-chandbali.jpg', caption: 'Earrings' }]
    }
  };

  const RAIL = [
    { key: 'new', label: 'New In', img: 'teal-suit.jpg', list: ['Just Landed', 'Best Sellers', 'New in Clothing', 'New in Jewellery'] },
    { key: 'suits', label: 'Three Pc Suits', img: 'navy-suit.jpg', list: ['Daily Wear Salwar Suits'] },
    { key: 'kurtis', label: 'Kurtis', img: 'yellow-kurti.jpg', list: ['Cotton Kurtis', 'Handblock Kurtis', 'Short Tops'] },
    { key: 'coord', label: 'Co-ord Sets', img: 'plum-kurta-set.jpg', list: ['Daily Wear Co-ord Sets'] },
    { key: 'sarees', label: 'Sarees & Blouses', img: '', list: ['Cotton Sarees', 'Saree with Blouse', 'Readymade Blouses'] },
    { key: 'skirts', label: 'Skirts', img: '', list: ['Cotton Skirts'] },
    { key: 'kaftans', label: 'Kaftans & Frocks', img: 'pink-anarkali.jpg', list: ['Kaftans', 'Gowns'] },
    { key: 'plus', label: 'Plus Size', img: '', list: ['Plus Size Daily Wear', 'Plus Size Festive Wear'] },
    { key: 'jewel', label: 'Jewellery', img: 'pearl-bangles.jpg', chips: MENUS.jewellery.cols.map((c) => c[0]) },
    { key: 'footwear', label: 'Footwear', img: '', list: [] },
    { key: 'sale', label: 'Sale', sale: true, list: ['All Sale', 'Clothing on Sale', 'Jewellery on Sale'] }
  ];

  /* ---------------- State ---------------- */
  const state = { selected: {}, bag: 0 };
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------------- Mega menu ---------------- */
  const mega = $('#mega');
  function openMenu(key) {
    const m = MENUS[key];
    $('#megaCols').innerHTML = m.cols.map((col) =>
      '<div class="mega-col">' + col.map((sec) =>
        '<div><h4><a href="#categories">' + esc(sec.title) + '</a></h4>' +
        sec.links.map((l) => '<a href="#categories">' + esc(l) + '</a>').join('') + '</div>').join('') + '</div>').join('');
    $('#megaTiles').innerHTML = m.tiles.map((t) =>
      '<a href="#categories" class="mega-tile ph" style="background-image:url(' + IMG + t.img + ');background-position:center 20%"><span>' + esc(t.caption) + '</span></a>').join('');
    mega.hidden = false;
    $$('.nav-drop').forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.menu === key)));
  }
  function closeMenu() {
    mega.hidden = true;
    $$('.nav-drop').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  }
  $$('.nav-drop').forEach((b) => {
    b.addEventListener('mouseenter', () => openMenu(b.dataset.menu));
    b.addEventListener('click', () => (b.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu(b.dataset.menu)));
  });
  $$('[data-close-menu]').forEach((a) => a.addEventListener('mouseenter', closeMenu));
  $('#siteHeader').addEventListener('mouseleave', closeMenu);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMenu(); closeDrawer(); closeSheet(); } });

  /* ---------------- Category carousel ---------------- */
  let catStart = 0;
  const perView = () => (window.innerWidth <= 640 ? 2 : window.innerWidth <= 1023 ? 3 : 4);
  function renderCats() {
    const pv = perView();
    const max = Math.max(0, CATEGORIES.length - pv);
    catStart = Math.min(catStart, max);
    $('#catGrid').innerHTML = CATEGORIES.slice(catStart, catStart + pv).map((c) =>
      '<a href="#new" class="cat-card">' +
      (c.img ? '<span class="ph" role="img" aria-label="' + esc(c.name) + '" style="background-image:url(' + IMG + c.img + ')"></span>'
             : '<span class="soon" role="img" aria-label="' + esc(c.name) + ' – photo coming soon">' + HANGER + '<span>Photo coming soon</span></span>') +
      '<span>' + esc(c.name) + '</span></a>').join('');
    $('#catNav').hidden = CATEGORIES.length <= pv;
    $('#catRange').textContent = (catStart + 1) + '–' + Math.min(catStart + pv, CATEGORIES.length) + ' of ' + CATEGORIES.length;
    $('#catPrev').disabled = catStart === 0;
    $('#catNext').disabled = catStart >= max;
  }
  $('#catPrev').addEventListener('click', () => { catStart = Math.max(0, catStart - perView()); renderCats(); });
  $('#catNext').addEventListener('click', () => { catStart = Math.min(CATEGORIES.length - perView(), catStart + perView()); renderCats(); });
  let resizeT;
  window.addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(renderCats, 120); });

  /* ---------------- Product cards ---------------- */
  function priceHTML(p) {
    return p.sale ? '<b class="is-sale">OMR [SALE PRICE]</b><s>OMR [PRICE]</s>' : '<b>OMR [PRICE]</b>';
  }
  function sizesHTML(p, cls) {
    const sel = state.selected[p.id];
    return '<div class="sizes ' + (cls || '') + '">' + p.sizes.map((s) =>
      '<button type="button" class="size" data-size="' + esc(s.label) + '" aria-pressed="' + (sel === s.label) + '"' +
      (s.soldOut ? ' disabled aria-label="Size ' + esc(s.label) + ', sold out"' : ' aria-label="Size ' + esc(s.label) + '"') + '>' + esc(s.label) + '</button>').join('') + '</div>';
  }
  function lowHTML(p) {
    const low = p.sizes.find((s) => s.low && !s.soldOut);
    return low ? '<span class="low">Only 2 left in ' + esc(low.label) + '</span>' : '';
  }
  function chartHTML() {
    return '<div class="chart"><span class="h">Size</span><span class="h">Bust</span><span class="h">Waist</span><span class="h">Length</span>' +
      ['S', 'M', 'L', 'XL', 'XXL'].map((s) => '<b>' + s + '</b><span>[ ]</span><span>[ ]</span><span>[ ]</span>').join('') + '</div>';
  }
  function addState(p) {
    const need = p.sizes.length > 0 && !state.selected[p.id];
    return { disabled: need, label: need ? 'Select a size' : 'Add to bag' };
  }
  function panelHTML(p) {
    const a = addState(p);
    const sizes = p.sizes.length
      ? '<div class="qa-head"><span>Select size</span><button type="button" class="link-btn" data-chart>Size chart</button></div>' + sizesHTML(p) + lowHTML(p)
      : '<span class="one-size">One size · Ready to ship</span>';
    return sizes +
      '<div class="qa-actions"><button type="button" class="add-btn" data-add' + (a.disabled ? ' disabled' : '') + '>' + a.label + '</button>' +
      '<a href="#community" class="wa-btn" aria-label="Order on WhatsApp">' + WA + '</a></div>' +
      '<a href="#" class="details-link">View full details →</a>';
  }
  function cardHTML(p) {
    const badge = p.sale ? '<span class="badge is-sale">Sale</span>' : p.badge ? '<span class="badge">' + esc(p.badge) + '</span>' : '';
    return '<article class="card" data-id="' + p.id + '">' +
      '<div class="card-media">' +
        '<a href="#" class="ph" aria-label="' + esc(p.name) + '" style="background-image:url(' + IMG + p.img + ');background-position:center 12%"></a>' +
        badge +
        '<button type="button" class="wish" aria-label="Add ' + esc(p.name) + ' to wishlist">' + HEART + '</button>' +
        '<button type="button" class="quick-plus" data-quick aria-label="Quick add ' + esc(p.name) + '">' + PLUS + '</button>' +
        '<div class="qa">' + panelHTML(p) + '</div>' +
      '</div>' +
      '<span class="card-type">' + esc(p.type) + '</span>' +
      '<a href="#" class="card-name">' + esc(p.name) + '</a>' +
      '<span class="card-price">' + priceHTML(p) + '</span>' +
    '</article>';
  }
  function renderGrid(el, list) { el.innerHTML = list.map(cardHTML).join(''); }
  const find = (id) => ALL.find((p) => p.id === id);

  function refreshPanel(card) {
    const p = find(card.dataset.id);
    $('.qa', card).innerHTML = panelHTML(p);
  }

  document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) {
      const p = find(card.dataset.id);
      const sizeBtn = e.target.closest('.qa .size');
      if (sizeBtn && !sizeBtn.disabled) { state.selected[p.id] = sizeBtn.dataset.size; refreshPanel(card); card.classList.add('is-open'); return; }
      if (e.target.closest('[data-chart]')) {
        $('.qa', card).innerHTML = '<div class="qa-head"><span>Size chart (inches)</span><button type="button" class="link-btn" data-chart-close aria-label="Close size chart">Close</button></div>' + chartHTML();
        card.classList.add('is-open'); return;
      }
      if (e.target.closest('[data-chart-close]')) { refreshPanel(card); return; }
      if (e.target.closest('.qa [data-add]')) { addToBag(p, state.selected[p.id], 1); return; }
      if (e.target.closest('[data-quick]')) { openSheet(p); return; }
    }
  });
  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest && e.target.closest('.card');
    if (card && !card.contains(e.relatedTarget)) { card.classList.remove('is-open'); refreshPanel(card); }
  });

  /* ---------------- Bag + toast ---------------- */
  let toastT;
  function addToBag(p, size, qty) {
    if (p.sizes.length && !size) return;
    state.bag += qty;
    $$('.bag-count').forEach((b) => { b.textContent = state.bag; b.hidden = false; });
    $('#toastText').textContent = p.name + (size ? ' · Size ' + size : '') + (qty > 1 ? ' · Qty ' + qty : '');
    const t = $('#toast'); t.hidden = false;
    clearTimeout(toastT); toastT = setTimeout(() => { t.hidden = true; }, 3200);
  }

  /* ---------------- Quick-add sheet (mobile/tablet) ---------------- */
  const sheet = $('#sheet'), backdrop = $('#sheetBackdrop');
  let sheetState = null;
  function renderSheet() {
    const { p, size, qty, chart, done } = sheetState;
    if (done) {
      sheet.innerHTML = '<span class="grab" aria-hidden="true"></span><div class="sheet-done" role="status">' +
        '<span class="toast-tick" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10"/></svg></span>' +
        '<h3>Added to bag</h3><span style="font-size:14px;color:var(--muted)">' + esc(p.name) + (size ? ' · Size ' + esc(size) : '') + ' · Qty ' + qty + '</span>' +
        '<a href="#top" class="btn btn-accent" style="align-self:stretch">View bag (' + state.bag + ')</a>' +
        '<button type="button" class="link-btn" data-sheet-close style="font-size:14px;color:var(--ink);font-weight:600">Continue shopping</button></div>';
      return;
    }
    const need = p.sizes.length > 0 && !size;
    sheet.innerHTML = '<span class="grab" aria-hidden="true"></span>' +
      '<div class="sheet-prod"><span class="ph" role="img" aria-label="' + esc(p.name) + '" style="background-image:url(' + IMG + p.img + ')"></span>' +
      '<div class="info"><span class="card-type">' + esc(p.type) + '</span><span class="card-name" style="font-size:22px">' + esc(p.name) + '</span><span class="card-price">' + priceHTML(p) + '</span></div>' +
      '<button type="button" class="icon-btn" data-sheet-close aria-label="Close"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      (p.sizes.length
        ? '<div><div class="row-between"><span class="label-caps">Size' + (size ? ': ' + esc(size) : '') + '</span><button type="button" class="link-btn" data-sheet-chart style="font-size:14px">' + (chart ? 'Hide size chart' : 'Size chart') + '</button></div>' +
          (chart ? '<div style="margin:10px 0;padding:12px;background:var(--bg)">' + chartHTML() + '</div>' : '') +
          '<div style="margin-top:10px">' + sizesHTML({ id: '__sheet', sizes: p.sizes }).replace('class="sizes ', 'class="sizes sheet-sizes ') + '</div>' + lowHTML(p) + '</div>'
        : '<span class="one-size">One size · Ready to ship</span>') +
      '<div class="row-between"><span class="label-caps">Quantity</span><div class="qty"><button type="button" data-qty="-1" aria-label="Decrease quantity">−</button><span aria-live="polite">' + qty + '</span><button type="button" data-qty="1" aria-label="Increase quantity">+</button></div></div>' +
      '<div class="qa-actions"><button type="button" class="add-btn" data-sheet-add' + (need ? ' disabled' : '') + '>' + (need ? 'Select a size' : 'Add to bag') + '</button><a href="#community" class="wa-btn" aria-label="Order on WhatsApp">' + WA + '</a></div>';
  }
  function openSheet(p) {
    sheetState = { p, size: null, qty: 1, chart: false, done: false };
    state.selected.__sheet = null;
    renderSheet(); sheet.hidden = false; backdrop.hidden = false; document.body.style.overflow = 'hidden';
  }
  function closeSheet() { sheet.hidden = true; backdrop.hidden = true; document.body.style.overflow = ''; sheetState = null; }
  backdrop.addEventListener('click', closeSheet);
  sheet.addEventListener('click', (e) => {
    if (!sheetState) return;
    const s = e.target.closest('.size');
    if (s && !s.disabled) { sheetState.size = s.dataset.size; state.selected.__sheet = sheetState.size; renderSheet(); return; }
    if (e.target.closest('[data-sheet-chart]')) { sheetState.chart = !sheetState.chart; renderSheet(); return; }
    const q = e.target.closest('[data-qty]');
    if (q) { sheetState.qty = Math.max(1, sheetState.qty + Number(q.dataset.qty)); renderSheet(); return; }
    if (e.target.closest('[data-sheet-add]')) { addToBag(sheetState.p, sheetState.size, sheetState.qty); $('#toast').hidden = true; sheetState.done = true; renderSheet(); return; }
    if (e.target.closest('[data-sheet-close]')) closeSheet();
  });

  /* ---------------- Mobile menu drawer ---------------- */
  const drawer = $('#drawer');
  let railKey = 'kurtis';
  function renderRail() {
    $('#rail').innerHTML = RAIL.map((r) =>
      '<button type="button" data-rail="' + r.key + '" aria-current="' + (r.key === railKey) + '">' +
      (r.sale ? '<span class="dot is-sale" aria-hidden="true">%</span>'
              : '<span class="dot" aria-hidden="true"' + (r.img ? ' style="background-image:url(' + IMG + r.img + ')"' : '') + '>' + (r.img ? '' : HANGER) + '</span>') +
      '<span class="lbl' + (r.sale ? ' sale-lbl' : '') + '">' + esc(r.label) + '</span></button>').join('');
    const r = RAIL.find((x) => x.key === railKey);
    let html = r.img
      ? '<a href="#" class="panel-banner" style="background-image:url(' + IMG + r.img + ')"><span><b>' + esc(r.label) + '</b><small>Shop all</small></span></a>'
      : '<a href="#" class="panel-plain' + (r.sale ? ' is-sale' : '') + '"><b>' + esc(r.label) + '</b><small>Shop all</small></a>';
    if (r.list && r.list.length) html += '<div class="panel-list">' + r.list.map((l) => '<a href="#">' + esc(l) + '</a>').join('') + '</div>';
    if (r.chips) html += r.chips.map((g) => '<div class="panel-group"><h5>' + esc(g.title.replace(' Jewellery', '')) + '</h5><div class="panel-chips">' + g.links.map((l) => '<a href="#">' + esc(l) + '</a>').join('') + '</div></div>').join('');
    if (r.list && !r.list.length && !r.chips) html += '<p style="margin:0;font-size:14px;color:var(--muted)">Browse the full ' + esc(r.label) + ' collection.</p>';
    $('#railPanel').innerHTML = html;
  }
  $('#rail').addEventListener('click', (e) => { const b = e.target.closest('[data-rail]'); if (b) { railKey = b.dataset.rail; renderRail(); } });
  function openDrawer() { renderRail(); drawer.hidden = false; document.body.style.overflow = 'hidden'; $('.drawer-close').focus(); }
  function closeDrawer() { drawer.hidden = true; document.body.style.overflow = ''; }
  $$('[data-open-drawer]').forEach((b) => b.addEventListener('click', openDrawer));
  $$('[data-close-drawer]').forEach((b) => b.addEventListener('click', closeDrawer));
  drawer.addEventListener('click', (e) => { if (e.target.closest('.drawer-foot a, .panel-list a, .panel-chips a, .panel-banner, .panel-plain')) closeDrawer(); });

  /* ---------------- New-arrivals category filter ---------------- */
  const FILTERS = [['all', 'View all'], ['suits', 'Three Pc Suits'], ['kurtis', 'Kurtis'], ['coord', 'Co-ord Sets'], ['sarees', 'Sarees & Blouses'], ['plus', 'Plus Size'], ['jewel', 'Jewellery'], ['sale', 'Sale']];
  const TYPE = { suits: 'Three pc suit', kurtis: 'Kurti', coord: 'Co-ord set', jewel: 'Jewellery' };
  let filterKey = 'all';
  const filterBtn = $('#filterBtn'), filterPop = $('#filterPop');
  function applyFilter(key) {
    filterKey = key;
    const list = NEW_ARRIVALS.filter((p) => key === 'all' ? true : key === 'sale' ? !!p.sale : TYPE[key] ? p.type === TYPE[key] : false);
    renderGrid($('#newGrid'), list);
    const label = (FILTERS.find((f) => f[0] === key) || FILTERS[0])[1];
    const empty = $('#newEmpty');
    empty.hidden = list.length > 0;
    if (!list.length) empty.innerHTML = 'New ' + esc(label) + ' pieces are coming soon. <button type="button" data-filter="all">View all</button>';
    $('#filterLabel').textContent = key === 'all' ? 'All' : label;
    $$('.chips .chip').forEach((c) => c.classList.toggle('is-active', c.dataset.filter === key));
    renderFilterPop();
  }
  function renderFilterPop() {
    filterPop.innerHTML = FILTERS.map(([k, l]) => '<button type="button" role="menuitemradio" aria-checked="' + (k === filterKey) + '" data-filter="' + k + '"' + (k === 'sale' ? ' class="is-sale"' : '') + '>' + esc(l) + '</button>').join('');
  }
  function toggleFilterPop(open) {
    filterPop.hidden = !open; filterBtn.setAttribute('aria-expanded', String(open));
  }
  filterBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleFilterPop(filterPop.hidden); });
  document.addEventListener('click', (e) => {
    const f = e.target.closest('[data-filter]');
    if (f && f.closest('#new')) { e.preventDefault(); applyFilter(f.dataset.filter); toggleFilterPop(false); return; }
    if (!e.target.closest('.filter-menu')) toggleFilterPop(false);
  });

  /* ---------------- Init ---------------- */
  renderCats();
  applyFilter('all');
  renderGrid($('#bestGrid'), BEST_SELLERS);
})();
