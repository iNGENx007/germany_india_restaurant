(function () {
  const DATA_URL = 'public/data/taj_mahal_menu.json';

  const state = {
    query: '',
    veg: false,
    vegan: false,
    sections: [],
  };

  const els = {
    tabs: document.getElementById('tabs'),
    menu: document.getElementById('menu'),
    search: document.getElementById('search'),
    filterVeg: document.getElementById('filter-veg'),
    filterVegan: document.getElementById('filter-vegan'),
    allergenBtn: document.getElementById('allergen-key-btn'),
    allergenModal: document.getElementById('allergen-modal'),
    allergenList: document.getElementById('allergen-list'),
    modalClose: document.getElementById('modal-close'),
    themeToggle: document.getElementById('theme-toggle'),
    fallbackObj: document.getElementById('json-fallback'),
    jsonld: document.getElementById('jsonld'),
  };

  // Allergen/Additive key (extendable)
  const ALLERGEN_KEY = {
    a: 'Gluten',
    a1: 'Gluten (Weizen)',
    a2: 'Gluten (Roggen)',
    b: 'Krebstiere',
    c: 'Eier',
    d: 'Fisch',
    e: 'Erdnüsse',
    f: 'Soja',
    g: 'Milch/Laktose',
    h: 'Schalenfrüchte (Nüsse)',
    i: 'Sellerie',
    j: 'Senf',
    k: 'Sesam',
    l: 'Sulfite',
    m: 'Lupine',
    n: 'Weichtiere',
    // numeric additives often used in German menus
    1: 'mit Farbstoff',
    2: 'mit Koffein / Süßungsmittel',
    3: 'mit Antioxidationsmittel',
    4: 'mit Geschmacksverstärker',
    5: 'geschwefelt',
    6: 'geschwärzt',
    7: 'gewachst',
    8: 'mit Phosphat',
    9: 'mit Süßungsmittel',
    10: 'Milcheiweiß',
    11: 'chininhaltig/taurinhaltig',
    12: 'Konservierungsstoffe',
    13: 'konserviert',
  };

  // Theme init
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.documentElement.classList.add('dark');
  if (els.themeToggle) els.themeToggle.checked = document.documentElement.classList.contains('dark');

  // Debounce helper
  function debounce(fn, ms) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // Allergen extraction: finds trailing codes like "g, h, e" or tokens like "a1"
  function extractAllergens(name) {
    if (!name) return { cleanName: '', allergens: [] };
    const match = name.match(/^(.*?)(?:\s+([a-z](?:\d+)?(?:\s*,\s*[a-z](?:\d+)?)*)\s*)$/i);
    if (match) {
      const cleanName = match[1].trim();
      const list = match[2]
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => t.toLowerCase());
      return { cleanName, allergens: list };
    }
    return { cleanName: name, allergens: [] };
  }

  // Veg/Vegan heuristics
  const VEG_KEYWORDS = ['paneer', 'vegetable', 'veg ', 'salat', 'dal', 'alu', 'saag', 'chana', 'kofta', 'bhindi', 'baingan'];
  const VEGAN_KEYWORDS = ['vegan'];
  function isVegItem(item) {
    const s = `${item.name || ''} ${item.description || ''}`.toLowerCase();
    return VEG_KEYWORDS.some((k) => s.includes(k));
  }
  function isVeganItem(item) {
    const s = `${item.name || ''} ${item.description || ''}`.toLowerCase();
    if (VEGAN_KEYWORDS.some((k) => s.includes(k))) return true;
    // crude heuristic: veg-like names without paneer/cheese/milk/yogurt/butter
    const looksVeg = isVegItem(item);
    const dairyHints = /(paneer|käse|cheese|butter|joghurt|yogurt|sahne|milch|g\b)/i;
    return looksVeg && !dairyHints.test(s);
  }

  // Build Allergen modal list
  function renderAllergenKey() {
    const entries = Object.entries(ALLERGEN_KEY).sort((a, b) => String(a[0]).localeCompare(String(b[0])));
    els.allergenList.innerHTML = entries
      .map(([code, text]) => `<div class="row"><span class="code">${escapeHtml(code)}</span><span>${escapeHtml(text)}</span></div>`)
      .join('');
  }

  // Escape helper
  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  // Fetch menu with no-server fallback via <object>
  async function loadMenu() {
    try {
      const res = await fetch(DATA_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Fetch failed');
      return await res.json();
    } catch (err) {
      // Fallback: read JSON text from hidden <object>
      return new Promise((resolve, reject) => {
        const obj = els.fallbackObj;
        if (!obj) return reject(err);
        const tryRead = () => {
          try {
            const doc = obj.contentDocument || obj.getSVGDocument && obj.getSVGDocument();
            if (!doc) return reject(err);
            const text = doc.body ? doc.body.innerText : doc.documentElement.textContent;
            const json = JSON.parse(text);
            resolve(json);
          } catch (e) { reject(err); }
        };
        obj.addEventListener('load', tryRead, { once: true });
      });
    }
  }

  function buildTabs(sections) {
    els.tabs.innerHTML = sections
      .map((s, i) => `<a class="tab" href="#sec-${i}" data-index="${i}">${escapeHtml(titleCase(s.title))}</a>`)
      .join('');
  }

  function titleCase(s) {
    if (!s) return '';
    return s
      .toLowerCase()
      .replace(/(^|\s|-|\/)\p{L}/gu, (m) => m.toUpperCase());
  }

  function renderMenu(sections) {
    const query = state.query.trim().toLowerCase();
    const filterActive = state.veg || state.vegan;

    const parts = [];
    sections.forEach((section, si) => {
      const items = (section.items || []).filter((item) => {
        if (!item) return false;
        const hay = `${item.code || ''} ${item.name || ''} ${item.description || ''}`.toLowerCase();
        const matchesQuery = !query || hay.includes(query);
        if (!matchesQuery) return false;
        if (!filterActive) return true;
        const veg = isVegItem(item);
        const vegan = isVeganItem(item);
        if (state.vegan) return vegan;
        if (state.veg) return veg || vegan;
        return true;
      });

      // Always render the section wrapper for anchor; include title block and items grid under it
      parts.push(`<section class="menu-section section-card" id="sec-${si}">
        <h2 class="section-title">${escapeHtml(titleCase(section.title || ''))}</h2>
      </section>`);

      items.forEach((item) => {
        const { cleanName, allergens } = extractAllergens(item.name || '');
        const flags = [isVeganItem(item) ? '<span class="flag vegan">Vegan</span>' : '', isVegItem(item) ? '<span class="flag veg">Veg</span>' : '']
          .filter(Boolean)
          .join('');
        const allergensHtml = allergens
          .map((a) => `<span class="allergen-badge" title="See Allergen key">${escapeHtml(a)}</span>`)
          .join('');
        const sizes = (item.sizes || []).map((s) => s.trim()).filter(Boolean);
        const prices = (item.prices || []).map((p) => p.trim()).filter(Boolean);
        const chips = [];
        const n = Math.max(sizes.length, prices.length);
        for (let i = 0; i < n; i++) {
          const size = sizes[i] || '';
          const price = prices[i] || prices[prices.length - 1] || '';
          const label = [size, price].filter(Boolean).join(' • ');
          if (label) chips.push(`<span class="chip-price">${escapeHtml(label)}</span>`);
        }

        parts.push(`<article class="item-card" data-code="${escapeHtml(item.code || '')}">
          <div class="item-top">
            <div>
              <div class="item-name">${escapeHtml(cleanName)}</div>
              <div class="allergens">${allergensHtml} ${flags}</div>
            </div>
            <div class="code-pill">${escapeHtml(item.code || '')}</div>
          </div>
          ${item.description ? `<div class="item-desc">${escapeHtml(item.description)}</div>` : ''}
          <div class="chips">${chips.join('')}</div>
        </article>`);
      });
    });
    els.menu.innerHTML = parts.join('');

    // Reveal animations
    setupReveals();
  }

  function setupReveals() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.querySelectorAll('.item-card').forEach((el) => el.classList.add('revealed'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
    );
    document.querySelectorAll('.item-card').forEach((el) => io.observe(el));
  }

  function setupEvents() {
    // Search
    const onSearch = debounce(() => {
      state.query = (els.search.value || '').trim();
      renderMenu(state.sections);
      highlightActiveTabOnScroll();
    }, 150);
    els.search.addEventListener('input', onSearch);

    // Filters
    function toggleChip(btn, key) {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      btn.setAttribute('aria-pressed', String(!pressed));
      state[key] = !pressed;
      renderMenu(state.sections);
      highlightActiveTabOnScroll();
    }
    els.filterVeg.addEventListener('click', () => toggleChip(els.filterVeg, 'veg'));
    els.filterVegan.addEventListener('click', () => toggleChip(els.filterVegan, 'vegan'));
    els.filterVeg.addEventListener('keydown', (e) => { if (e.key === 'Enter') els.filterVeg.click(); });
    els.filterVegan.addEventListener('keydown', (e) => { if (e.key === 'Enter') els.filterVegan.click(); });

    // Tabs active on scroll
    window.addEventListener('scroll', highlightActiveTabOnScroll, { passive: true });

    // Allergen modal
    els.allergenBtn.addEventListener('click', () => openModal());
    els.modalClose.addEventListener('click', () => closeModal());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    els.menu.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains('allergen-badge')) openModal();
    });

    // Theme toggle
    els.themeToggle.addEventListener('change', () => {
      document.documentElement.classList.toggle('dark', els.themeToggle.checked);
      localStorage.setItem('theme', els.themeToggle.checked ? 'dark' : 'light');
    });
  }

  function openModal() {
    if (typeof els.allergenModal.showModal === 'function') {
      els.allergenModal.showModal();
    } else {
      // Fallback for very old browsers
      els.allergenModal.setAttribute('open', '');
    }
  }
  function closeModal() {
    if (typeof els.allergenModal.close === 'function') els.allergenModal.close();
    els.allergenModal.removeAttribute('open');
  }

  function highlightActiveTabOnScroll() {
    const secs = Array.from(document.querySelectorAll('section.menu-section'));
    const tabs = Array.from(els.tabs.querySelectorAll('a.tab'));
    let activeIndex = 0;
    const viewportTop = window.scrollY + 140; // account for sticky header
    for (let i = 0; i < secs.length; i++) {
      if (secs[i].offsetTop <= viewportTop) activeIndex = i; else break;
    }
    tabs.forEach((t, i) => t.classList.toggle('active', i === activeIndex));
    const activeTab = tabs[activeIndex];
    if (activeTab) {
      const parent = els.tabs;
      const rect = activeTab.getBoundingClientRect();
      const pRect = parent.getBoundingClientRect();
      if (rect.left < pRect.left || rect.right > pRect.right) activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  function buildJsonLd(sections, restaurantName) {
    const jsonld = {
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: restaurantName || 'TAJ MAHAL – Indisches Restaurant',
      hasMenu: {
        '@type': 'Menu',
        name: 'Restaurant Menu',
        hasMenuSection: sections.map((s) => ({ '@type': 'MenuSection', name: s.title, hasMenuItem: (s.items || []).map((it) => ({ '@type': 'MenuItem', name: (extractAllergens(it.name || '').cleanName), description: it.description || undefined })) }))
      }
    };
    els.jsonld.textContent = JSON.stringify(jsonld);
  }

  // Init
  (async function init() {
    renderAllergenKey();
    setupEvents();
    try {
      const data = await loadMenu();
      const sections = (data && Array.isArray(data.sections)) ? data.sections : [];
      state.sections = sections;
      buildTabs(sections);
      renderMenu(sections);
      buildJsonLd(sections, data && data.restaurant);
      highlightActiveTabOnScroll();
    } catch (e) {
      els.menu.innerHTML = '<p>Failed to load menu data. Please ensure public/data/taj_mahal_menu.json is available.</p>';
      console.error(e);
    }
  })();
})();


