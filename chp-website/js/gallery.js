// ── SERIES DATA MAP ──
const SERIES_MAP = {
  s01: { name: "Round Shoulder Bottle 圆肩瓶", folder: "01-round-shoulder-bottle_圆肩瓶", pages: ["p6","p7","p8","p9","p10"] },
  s02: { name: "Straight Round Bottle 直肩圆柱瓶", folder: "02-straight-round-bottle_直肩圆柱瓶", pages: ["p11","p12","p13","p14","p15","p16","p17","p18","p19","p20","p21","p22","p23","p24","p25","p26"] },
  s03: { name: "Flat Bottle 扁瓶", folder: "03-flat-bottle_扁瓶", pages: ["p23","p24"] },
  s04: { name: "Slant-Shoulder Bottle 斜肩瓶", folder: "04-slant-shoulder-bottle_斜肩瓶", pages: ["p25","p26"] },
  s05: { name: "Triangular Bottle 三角瓶", folder: "05-triangular-bottle_三角瓶", pages: ["p27"] },
  s06: { name: "Full Skincare Range 套系瓶", folder: "06-full-skincare-range_套系瓶", pages: ["p28","p29","p30","p31","p32","p33","p34","p35","p36","p37","p38","p39","p40","p41","p42","p43","p44","p45","p46","p47","p48"] },
  s07: { name: "Foam Bottle 泡沫瓶", folder: "07-foam-bottle_泡沫瓶", pages: ["p50","p51","p52"] },
  s08: { name: "Dropper Bottle 滴管瓶", folder: "08-dropper-bottle_滴管瓶", pages: ["p54"] },
  s09: { name: "Straight Round Jar 直圆罐", folder: "09-straight-round-jar_直圆罐", pages: ["p56","p57","p58","p59","p60"] },
  s10: { name: "Sunscreen Bottle 防晒瓶", folder: "10-sunscreen-bottle_防晒瓶", pages: ["p62"] },
  s11: { name: "Washing Bottle 洗护瓶", folder: "11-washing-bottle_洗护瓶", pages: ["p64","p65"] },
  s13: { name: "Airless Bottle Series 真空瓶系列", pages: [], folder: "13-airless-bottle" },
  s14: { name: "Precision Nozzle Bottle Series 尖嘴瓶系列", pages: [], folder: "14-precision-nozzle-bottle" },
  s12: { name: "Sample 试用装", folder: "12-sample_试用装", pages: ["p67","p68"] },
};

// Filter immediately so rapid clicks cannot leave stale hide timers behind.
document.querySelectorAll('.series-nav-btn').forEach(btn => {
  btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
  btn.addEventListener('click', () => {
    document.querySelectorAll('.series-nav-btn').forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    document.querySelectorAll('.series-card').forEach(card => {
      card.hidden = btn.dataset.series !== 'all' && card.dataset.series !== btn.dataset.series;
    });
  });
});
let galleryRequest = 0;

// ── OPEN SERIES GALLERY ──
function openSeries(seriesKey, legacy = false) {
  const series = SERIES_MAP[seriesKey];
  if (!series) return;

  const overlay = document.getElementById('galleryOverlay');
  const grid = document.getElementById('galleryGrid');
  const titleEl = document.getElementById('galleryTitle');
  const emptyEl = document.getElementById('galleryEmpty');

  titleEl.textContent = series.name;
  emptyEl.querySelector('button').dataset.series = seriesKey;
  grid.innerHTML = '';
  emptyEl.style.display = 'none';
  const request = ++galleryRequest;

  const currentPages = CATALOGUE_2026_PAGES[seriesKey] || [];
  const useCurrent = !legacy && currentPages.length > 0;
  const candidates = useCurrent
    ? currentPages.map(page => ({ src: `images/products/2026/pdf-${String(page).padStart(2, '0')}.jpg`, page: `2026 · PDF ${page}`, idx: '' }))
    : (LEGACY_GALLERY_IMAGES[seriesKey] || []).map(src => ({ src, page: `Archive · ${src.split('/').at(-2)}`, idx: '' }));
  const versionButton = document.getElementById('galleryVersion');
  versionButton.hidden = !(currentPages.length && LEGACY_GALLERY_IMAGES[seriesKey]?.length);
  versionButton.dataset.i18n = useCurrent ? 'gallery_archive' : 'gallery_current';
  versionButton.textContent = catalogueText(versionButton.dataset.i18n);
  versionButton.onclick = () => openSeries(seriesKey, !legacy);
  const galleryInquiry = document.getElementById('galleryInquiry');
  galleryInquiry.onclick = () => {
    closeGallery();
    const select = document.getElementById('modalProduct');
    const value = ['s13', 's14'].includes(seriesKey) ? seriesKey : series.name.split(/[\u4e00-\u9fff]/)[0].trim();
    const matching = Array.from(select.options).find(o => o.value === value || o.textContent === value);
    if (matching) select.value = matching.value;
    document.getElementById('inquiryModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const additions = getPublishedProducts().filter(p => p.series === seriesKey);
  additions.forEach(p => grid.appendChild(createProductCard(p)));
  emptyEl.style.display = candidates.length || additions.length ? 'none' : 'block';

  // Try loading each image — only show those that actually exist
  let loaded = additions.length;
  let attempted = 0;

  candidates.forEach(({ src, page, idx }) => {
    const slot = document.createElement('div');
    grid.appendChild(slot);
    const img = new Image();
    img.onload = () => {
      if (request !== galleryRequest) return;
      loaded++;
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <img src="${src}" alt="${series.name} ${page}-${idx}" loading="lazy">
        <div class="gallery-item-label">${page.toUpperCase()}</div>
      `;
      item.querySelector('img').addEventListener('click', () => openZoom(item.querySelector('img')));
      slot.replaceWith(item);
      emptyEl.style.display = 'none';
      checkDone();
    };
    img.onerror = () => { slot.remove(); checkDone(); };
    img.src = src;
  });

  function checkDone() {
    if (request !== galleryRequest) return;
    attempted++;
    if (attempted === candidates.length) {
      if (loaded === 0) {
        emptyEl.style.display = 'block';
      }
    }
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeGallery() {
  galleryRequest++;
  document.getElementById('galleryOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeGallery();
    closeZoom();
  }
});

// ── IMAGE ZOOM ──
// ── IMAGE ZOOM WITH NAVIGATION ──
let zoomImages = [];   // 当前gallery里所有图片
let zoomIndex = 0;     // 当前看的是第几张

function openZoom(img) {
  // 收集gallery里所有图片
  zoomImages = Array.from(document.querySelectorAll('#galleryGrid .gallery-item img'));
  zoomIndex = zoomImages.indexOf(img);

  const overlay = document.getElementById('imgZoomOverlay');
  const zoomImg = document.getElementById('imgZoomImg');
  zoomImg.src = img.src;
  zoomImg.alt = img.alt;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  updateZoomArrows();
}

function closeZoom() {
  const overlay = document.getElementById('imgZoomOverlay');
  overlay.classList.remove('open');
  if (!document.getElementById('galleryOverlay').classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function zoomPrev() {
  if (zoomIndex > 0) {
    zoomIndex--;
    const zoomImg = document.getElementById('imgZoomImg');
    zoomImg.src = zoomImages[zoomIndex].src;
    zoomImg.alt = zoomImages[zoomIndex].alt;
    updateZoomArrows();
  }
}

function zoomNext() {
  if (zoomIndex < zoomImages.length - 1) {
    zoomIndex++;
    const zoomImg = document.getElementById('imgZoomImg');
    zoomImg.src = zoomImages[zoomIndex].src;
    zoomImg.alt = zoomImages[zoomIndex].alt;
    updateZoomArrows();
  }
}

function updateZoomArrows() {
  const prevBtn = document.getElementById('zoomPrev');
  const nextBtn = document.getElementById('zoomNext');
  if (prevBtn) prevBtn.style.opacity = zoomIndex === 0 ? '0.3' : '1';
  if (nextBtn) nextBtn.style.opacity = zoomIndex === zoomImages.length - 1 ? '0.3' : '1';
}

// 键盘左右箭头也能翻页
document.addEventListener('keydown', e => {
  if (!document.getElementById('imgZoomOverlay').classList.contains('open')) return;
  if (e.key === 'ArrowLeft') zoomPrev();
  if (e.key === 'ArrowRight') zoomNext();
});

document.getElementById('imgZoomImg')?.addEventListener('click', e => e.stopPropagation());
// ── AUTO-LOAD COVER IMAGES FOR SERIES CARDS ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.series-card').forEach(card => {
    const seriesKey = card.dataset.series;
    const series = SERIES_MAP[seriesKey];
    if (!series) return;

    const currentPages = CATALOGUE_2026_PAGES[seriesKey] || [];
    const src = (currentPages.length ? `images/products/2026/pdf-${String(currentPages[0]).padStart(2, '0')}.jpg` : null)
      || (LEGACY_GALLERY_IMAGES[seriesKey] || [])[0]
      || getPublishedProducts().find(p => p.series === seriesKey && p.image)?.image;
    const placeholder = card.querySelector('.series-placeholder');
    const label = card.querySelector('.series-card-pages');
    if (currentPages.length && label) {
      label.removeAttribute('data-i18n');
      label.textContent = `2026 · PDF ${currentPages[0]}${currentPages.length > 1 ? '–' + currentPages.at(-1) : ''}`;
    }
    if (!src || !placeholder) return;
    const img = new Image();
    img.onload = () => {
      img.alt = series.name;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      placeholder.replaceWith(img);
    };
    img.src = src;
  });
});
