// ---- Данные ----
const RECOMMENDATIONS = [
  { name: 'Андрей Ермолов', role: 'backend/frontend developer', url: 'https://github.com/andrey-ermolov' }
];

// Dev-проекты (карточки-папки).
// `media` — прямая ссылка на картинку (imgur и т.п.), показывается фоном
// только во вкладке «Подробнее». Необязательное поле — без него карточка
// обычная, без фото.
const DEV_PROJECTS = [
  {
    title: 'DeskHub',
    media: 'https://i.imgur.com/9xlO0w0.png',
    mediaPos: 'center 42%',
    shortDesc: 'Расширение в Chrome\nУдобная сортировка закладок на начальной странице Google Chrome',
    longDesc:
      'Папки и сортировка закладок на новой вкладке: кастомизация интерфейса и синхронизация рабочего пространства.\n' +
      'DeskHub — это рабочий стол для ваших закладок.\n' +
      'Папки, кастомизация, drag&drop, синхронизация и многое другое.\n' +
      'Проект активно развивается и обновляется.',
    links: [
      { label: 'Chrome Store', url: 'https://chromewebstore.google.com/detail/deskhub/lejpopklkflgiimjhoeniopgjcgpakcn' },
      { label: 'GitHub',       url: 'https://github.com/bendzhamin1/DeskHub' }
    ]
  },
  {
    title: 'BenVpn',
    media: 'https://i.imgur.com/PPZwCNq.png',
    mediaPos: 'center center',
    shortDesc: 'BenVpn — графическая оболочка над sing-box и xray, многогранный функционал и простота использования',
    longDesc:
      'Универсальный клиент для любого протокола, в коробке сразу: обход российских доменов, ' +
      'раздельное туннелирование по сайтам и приложениям, режим proxy и TUN, ' +
      'группы подписок, логи и многое другое.',
    links: [
      { label: 'GitHub', url: 'https://github.com/bendzhamin1/BenVpn' }
    ]
  },
  {
    title: 'PipDot',
    media: 'https://i.imgur.com/xnyqduy.png',
    mediaPos: 'center center',
    shortDesc: 'Расширение в Chrome\nТочка в углу любого видео: клик открывает окно «картинка в картинке» поверх всех окон, с паузой и перемоткой.',
    longDesc: 'Расширение использует встроенный функционал «картинка в картинке» Chrome.',
    links: [
      { label: 'Chrome Store', url: 'https://chromewebstore.google.com/detail/pipdot/lffcogfhnhkcpghpcejmgpdkhojfnhhg' },
      { label: 'GitHub',       url: 'https://github.com/bendzhamin1/PipDot' }
    ]
  },
  {
    title: 'BEQ',
    media: 'https://i.imgur.com/k8FQG9L.png',
    mediaPos: 'center center',
    shortDesc: 'Per app и per site эквалайзер',
    longDesc: 'Удобный эквалайзер с возможностью назначать аудио профили на приложения и сайты, подробный микшер, минималистичный вывод, качественные пресеты, автопереключение устройств вывода и многое другое.',
    links: [
      { label: 'GitHub', url: 'https://github.com/bendzhamin1/BenEQ' }
    ]
  }
];

// ГАЛЕРЕЯ (вкладка Design).
// Чтобы добавить свою работу: залей картинку на любой хостинг (imgur и т.п.)
// и впиши строку с прямой ссылкой на файл:
//   { src: 'https://i.imgur.com/xxxxxxx.png', alt: 'Название работы' },
// Порядок строк = порядок в галерее. Высота плитки берётся из самой картинки —
// указывать соотношение сторон не нужно.
// Строки без src (только title/ratio) — это серые заглушки-примеры, удали их,
// когда зальёшь свои фото.
const DESIGN_PROJECTS = [
  { src: 'https://cdnb.artstation.com/p/assets/images/images/093/884/289/large/ben-.webp?1763820323', alt: 'Работа 1' },
  { src: 'https://cdna.artstation.com/p/assets/images/images/093/953/190/large/ben-fin3.webp?1764026098', alt: 'Работа 2' },
  { src: 'https://cdna.artstation.com/p/assets/images/images/093/953/052/large/ben-autumn.jpg?1764025658', alt: 'Работа 3' },
  { src: 'https://cdnb.artstation.com/p/assets/images/images/093/951/335/large/ben-2k.webp?1764020401', alt: 'Работа 4' },
  { src: 'https://i.imgur.com/yePNtF6.jpeg', alt: 'Работа 5' },
  { src: 'https://i.imgur.com/kY4FWg8.png', alt: 'Работа 6' },
  { src: 'https://i.imgur.com/Fg1IeLC.png', alt: 'Работа 7' },
  { src: 'https://i.imgur.com/gzPG85h.jpeg', alt: 'Jilin12' },
  { src: 'https://i.imgur.com/buMX3Tz.jpeg', alt: 'aeroplus' },
  { src: 'https://cdnb.artstation.com/p/assets/images/images/101/227/161/large/ben-redsocks.jpg?1785494802', alt: 'rise' }
];

// ---- Helpers ----
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// многострочный текст -> экранированные строки с переносами
const multiline = txt =>
  String(txt).split('\n').map(l => escapeHtml(l.trim())).filter(Boolean).join('<br>');

const ARROW = '<svg class="arw" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"></path><path d="M8 7h9v9"></path></svg>';

// ---- Рендер dev-папок ----
function renderDev() {
  const grid = document.getElementById('dev');
  grid.innerHTML = '';

  DEV_PROJECTS.forEach(p => {
    const state = { active: 'short' };
    const isMedia = !!p.media;

    const folder = el('div', 'folder');

    // вкладки
    const tabs = el('div', 'folder__tabs');
    const tabShort = el('button', 'folder__tab is-active', escapeHtml(p.title));
    const tabLong  = el('button', 'folder__tab', 'Подробнее');
    tabs.append(tabShort, tabLong);

    // тело
    const body = el('div', 'folder__body' + (isMedia ? ' folder__body--media' : ''));
    if (isMedia) {
      const bg = el('div', 'folder__bg');
      bg.style.backgroundImage = `url("${p.media}")`;
      if (p.mediaPos) bg.style.backgroundPosition = p.mediaPos;
      body.append(bg, el('div', 'folder__scrim'));
    }
    const inner = el('div', 'folder__inner');
    const content = el('div');
    const foot = buildFoot(p);
    inner.append(content, foot);
    body.append(inner);

    folder.append(tabs, body);
    grid.append(folder);

    const paint = () => {
      const short = state.active === 'short';
      tabShort.classList.toggle('is-active', short);
      tabLong.classList.toggle('is-active', !short);
      // фото-фон только во вкладке «Подробнее»
      folder.classList.toggle('is-media', isMedia && !short);
      content.innerHTML = '';
      content.append(short ? buildShort(p) : buildLong(p));
    };

    tabShort.addEventListener('click', () => { state.active = 'short'; paint(); });
    tabLong.addEventListener('click',  () => { state.active = 'long';  paint(); });
    paint();
  });
}

function buildShort(p) {
  return el('div', 'folder__short', multiline(p.shortDesc));
}

function buildLong(p) {
  const wrap = el('div', 'folder__long');
  wrap.append(el('div', 'folder__longtext', multiline(p.longDesc)));
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
    if (d.src) {
      // реальная картинка — высота по натуральному соотношению сторон
      const img = document.createElement('img');
      img.className = 'masonry__img';
      img.src = d.src;
      img.alt = d.alt || '';
      img.loading = 'lazy';
      img.addEventListener('click', () => openLightbox(d.src, d.alt || ''));
      item.append(img);
    } else {
      // серая заглушка-пример
      const frame = el('div', 'masonry__frame', escapeHtml(d.title || ''));
      if (d.ratio) frame.style.aspectRatio = d.ratio;
      item.append(frame);
    }
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
    a.append(
      el('span', 'rec__name', escapeHtml(person.name)),
      el('span', 'rec__role', escapeHtml(person.role))
    );
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

// ---- Лайтбокс: открытие картинки галереи в большом окне ----
function openLightbox(src, alt) {
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  img.alt = alt;
  lightbox.hidden = false;
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const close = () => {
    lightbox.hidden = true;
    document.getElementById('lightboxImg').src = '';
  };
  lightbox.addEventListener('click', e => {
    if (e.target !== document.getElementById('lightboxImg')) close();
  });
  lightbox.querySelector('.lightbox__close').addEventListener('click', close);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lightbox.hidden) close();
  });
}

renderDev();
renderDesign();
renderRecs();
initSwitch();
initLightbox();
