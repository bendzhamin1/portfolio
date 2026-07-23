// ---- Данные (рандомные заглушки) ----
const RECOMMENDATIONS = [
  { name: 'Андрей Соколов', role: 'Product Designer',  initials: 'АС', url: 'https://t.me/' },
  { name: 'Артём Волков',   role: 'Product Manager',   initials: 'АВ', url: 'https://t.me/' },
  { name: 'Марина Ким',     role: 'Engineering Lead',  initials: 'МК', url: 'https://t.me/' }
];

const DEV_PROJECTS = [
  { title: 'DeskHub',
    shortDesc: 'Chrome-расширение — замена стартовой страницы в духе Яндекс.Табло с быстрым доступом к сайтам.',
    longDesc: 'Chrome web extension, эмулирующее speed dial: real-time синхронизация через Google-аккаунт, управление вкладками по папкам, кастомные превью и импорт закладок.',
    links: [{ label: 'Chrome Store' }, { label: 'GitHub' }],
    coauthor: { name: 'Андреем С.', initials: 'АС', url: 'https://t.me/' } },
  { title: 'Cargo Tracker',
    shortDesc: 'iOS-приложение для отслеживания доставок в реальном времени.',
    longDesc: 'Отслеживание грузов в реальном времени на SwiftUI: карты, push-уведомления о статусах, оффлайн-кэш и виджеты на экран блокировки.',
    links: [{ label: 'App Store' }, { label: 'GitHub' }] },
  { title: 'Focus Timer',
    shortDesc: 'Минималистичный таймер и виджет для фокус-режима.',
    longDesc: 'Таймер по методу Pomodoro с виджетами для домашнего экрана, статистикой сессий и интеграцией с Календарём.',
    links: [{ label: 'App Store' }, { label: 'Case' }] },
  { title: 'Ledger',
    shortDesc: 'Личный финансовый трекер с аналитикой расходов.',
    longDesc: 'Финансовый трекер: категории, бюджеты, графики трат по месяцам, синхронизация через iCloud и экспорт в CSV.',
    links: [{ label: 'Live' }, { label: 'GitHub' }] },
  { title: 'Pulse',
    shortDesc: 'Обёртка над HealthKit: сон, пульс и активность в дашборде.',
    longDesc: 'Единый дашборд здоровья поверх HealthKit — сон, пульс, активность и тренды с еженедельными сводками.',
    links: [{ label: 'Demo' }, { label: 'GitHub' }],
    coauthor: { name: 'Мариной К.', initials: 'МК', url: 'https://t.me/' } },
  { title: 'Nimbus',
    shortDesc: 'Быстрая синхронизация файлов между устройствами.',
    longDesc: 'End-to-end шифрованная синхронизация файлов между устройствами с дельта-обновлениями и версионированием.',
    links: [{ label: 'Live' }, { label: 'GitHub' }] }
];

const DESIGN_PROJECTS = [
  { title: 'Orbit UI Kit',   ratio: '3 / 4' }, { title: 'Weekend App',   ratio: '4 / 5' },
  { title: 'Menu Redesign',  ratio: '1 / 1' }, { title: 'Archive',       ratio: '3 / 5' },
  { title: 'Signal Flow',    ratio: '4 / 3' }, { title: 'Grove Landing', ratio: '2 / 3' },
  { title: 'Atlas Icons',    ratio: '1 / 1' }, { title: 'Harbor',        ratio: '4 / 5' },
  { title: 'Verse',          ratio: '3 / 4' }, { title: 'North Studio',  ratio: '3 / 2' }
];

// ---- Небольшие helpers ----
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

const ARROW = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9A9AA0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg>';

// ---- Рендер dev-папок ----
function renderDev() {
  const grid = document.getElementById('dev');
  grid.innerHTML = '';

  DEV_PROJECTS.forEach(p => {
    const state = { active: 'short' }; // short | long

    const folder = el('div', 'folder');

    // вкладки
    const tabs = el('div', 'folder__tabs');
    const tabShort = el('button', 'folder__tab is-active', escapeHtml(p.title));
    const tabLong  = el('button', 'folder__tab', 'Подробнее');
    tabs.append(tabShort, tabLong);

    // тело
    const body = el('div', 'folder__body');
    const inner = el('div', 'folder__inner');
    const content = el('div'); // короткое / подробное описание
    const foot = buildFoot(p);
    inner.append(content, foot);
    body.append(inner);

    folder.append(tabs, body);
    grid.append(folder);

    const paint = () => {
      const short = state.active === 'short';
      tabShort.classList.toggle('is-active', short);
      tabLong.classList.toggle('is-active', !short);
      content.innerHTML = '';
      content.append(short ? buildShort(p) : buildLong(p));
    };

    tabShort.addEventListener('click', () => { state.active = 'short'; paint(); });
    tabLong.addEventListener('click',  () => { state.active = 'long';  paint(); });
    paint();
  });
}

function buildShort(p) {
  return el('div', 'folder__short', escapeHtml(p.shortDesc));
}

function buildLong(p) {
  const wrap = el('div', 'folder__long');
  wrap.append(el('div', 'folder__longtext', escapeHtml(p.longDesc)));
  if (p.coauthor) {
    const a = el('a', 'coauthor');
    a.href = p.coauthor.url; a.target = '_blank'; a.rel = 'noopener';
    a.append(
      el('span', 'coauthor__ava', escapeHtml(p.coauthor.initials)),
      el('span', 'coauthor__name', 'в соавторстве с ' + escapeHtml(p.coauthor.name))
    );
    wrap.append(a);
  }
  return wrap;
}

function buildFoot(p) {
  const foot = el('div', 'folder__foot');
  foot.append(el('div', 'folder__rule'));
  const links = el('div', 'folder__links');
  p.links.forEach(l => {
    const a = el('a', 'folder__link', escapeHtml(l.label) + ARROW);
    a.href = l.url || '#'; a.target = '_blank'; a.rel = 'noopener';
    links.append(a);
  });
  foot.append(links);
  return foot;
}

// ---- Рендер design-masonry ----
function renderDesign() {
  const grid = document.getElementById('design');
  grid.innerHTML = '';
  DESIGN_PROJECTS.forEach(d => {
    const item = el('div', 'masonry__item');
    const frame = el('div', 'masonry__frame', escapeHtml(d.title));
    frame.style.aspectRatio = d.ratio;
    item.append(frame);
    grid.append(item);
  });
}

// ---- Рендер рекомендаций ----
function renderRecs() {
  const box = document.getElementById('recs');
  box.innerHTML = '';
  RECOMMENDATIONS.forEach(person => {
    const a = el('a', 'rec');
    a.href = person.url; a.target = '_blank'; a.rel = 'noopener';
    const info = el('span');
    info.append(
      el('span', 'rec__name', escapeHtml(person.name)),
      el('span', 'rec__role', escapeHtml(person.role))
    );
    a.append(el('span', 'rec__ava', escapeHtml(person.initials)), info);
    box.append(a);
  });
}

// ---- Переключатель Dev / Design ----
function initSwitch() {
  const buttons = document.querySelectorAll('.switch__btn');
  const dev = document.getElementById('dev');
  const design = document.getElementById('design');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      buttons.forEach(b => {
        const on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      dev.hidden = cat !== 'dev';
      design.hidden = cat !== 'design';
    });
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

renderDev();
renderDesign();
renderRecs();
initSwitch();
