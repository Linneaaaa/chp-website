// ── SERIES DATA MAP ──
const SERIES_MAP = {
  s01: { name: "Round Shoulder Bottle 圆肩瓶", folder: "01-round-shoulder-bottle_圆肩瓶", pages: ["p6","p7","p8","p9","p10"] },
  s02: { name: "Straight Round Bottle 直肩圆柱瓶", folder: "02-straight-round-bottle_直肩圆柱瓶", pages: ["p11","p12","p13","p14","p15","p16","p17","p18","p19","p20","p21","p22"] },
  s03: { name: "Flat Bottle 扁瓶", folder: "03-flat-bottle_扁瓶", pages: ["p23","p24"] },
  s04: { name: "Slant-Shoulder Bottle 斜肩瓶", folder: "04-slant-shoulder-bottle_斜肩瓶", pages: ["p25","p26"] },
  s05: { name: "Triangular Bottle 三角瓶", folder: "05-triangular-bottle_三角瓶", pages: ["p27"] },
  s06: { name: "Full Skincare Range 套系瓶", folder: "06-full-skincare-range_套系瓶", pages: ["p28","p29","p30","p31","p32","p33","p34","p35","p36","p37","p38","p39","p40","p41","p42","p43","p44","p45","p46","p47","p48"] },
  s07: { name: "Foam Bottle 泡沫瓶", folder: "07-foam-bottle_泡沫瓶", pages: ["p50","p51","p52"] },
  s08: { name: "Dropper Bottle 滴管瓶", folder: "08-dropper-bottle_滴管瓶", pages: ["p54"] },
  s09: { name: "Straight Round Jar 直圆罐", folder: "09-straight-round-jar_直圆罐", pages: ["p56","p57","p58","p59","p60"] },
  s10: { name: "Sunscreen Bottle 防晒瓶", folder: "10-sunscreen-bottle_防晒瓶", pages: ["p62"] },
  s11: { name: "Washing Bottle 洗护瓶", folder: "11-washing-bottle_洗护瓶", pages: ["p5","p64","p65"] },
  s12: { name: "Sample 试用装", folder: "12-sample_试用装", pages: ["p67","p68"] },
};

// ── SERIES NAVIGATION FILTER ──
document.querySelectorAll('.series-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.series-nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.series;
    document.querySelectorAll('.series-card').forEach(card => {
      if (target === 'all' || card.dataset.series === target) {
        card.style.display = '';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 250);
      }
    });
  });
});

// ── OPEN SERIES GALLERY ──
function openSeries(seriesKey) {
  const series = SERIES_MAP[seriesKey];
  if (!series) return;

  const overlay = document.getElementById('galleryOverlay');
  const grid = document.getElementById('galleryGrid');
  const titleEl = document.getElementById('galleryTitle');
  const emptyEl = document.getElementById('galleryEmpty');

  titleEl.textContent = series.name;
  grid.innerHTML = '';

  // Build list of candidate image paths: p6-1.jpg, p6-2.jpg ... p6-9.jpg
  const basePath = `images/products/${series.folder}`;
  const candidates = [];
  series.pages.forEach(page => {
    for (let i = 1; i <= 6; i++) {
      candidates.push({ src: `${basePath}/${page}/${page}-${i}.png`, page, idx: i });
    }
  });

  // Try loading each image — only show those that actually exist
  let loaded = 0;
  let attempted = 0;

  candidates.forEach(({ src, page, idx }) => {
    const img = new Image();
    img.onload = () => {
      loaded++;
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML = `
        <img src="${src}" alt="${series.name} ${page}-${idx}" loading="lazy">
        <div class="gallery-item-label">${page.toUpperCase()}</div>
      `;
      item.querySelector('img').addEventListener('click', () => openZoom(item.querySelector('img')));
      grid.appendChild(item);
      emptyEl.style.display = 'none';
      checkDone();
    };
    img.onerror = () => { checkDone(); };
    img.src = src;
  });

  function checkDone() {
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
function openZoom(img) {
  const overlay = document.getElementById('imgZoomOverlay');
  const zoomImg = document.getElementById('imgZoomImg');
  zoomImg.src = img.src;
  zoomImg.alt = img.alt;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeZoom() {
  const overlay = document.getElementById('imgZoomOverlay');
  overlay.classList.remove('open');
  // Don't re-enable scroll if gallery is still open
  if (!document.getElementById('galleryOverlay').classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

// Prevent zoom close when clicking the image itself
document.getElementById('imgZoomImg')?.addEventListener('click', e => e.stopPropagation());
// ── AUTO-LOAD COVER IMAGES FOR SERIES CARDS ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.series-card').forEach(card => {
    const seriesKey = card.dataset.series;
    const series = SERIES_MAP[seriesKey];
    if (!series) return;

    const firstPage = series.pages[0];
    const folder = `images/products/${series.folder}`;
    const placeholder = card.querySelector('.series-placeholder');

    // Try p6-1.png, p6-2.png ... until one loads
    let tried = 0;
    function tryNext(i) {
      if (i > 6) return; // give up after 6 attempts
      const img = new Image();
      img.onload = () => {
        // Success! Replace placeholder with the image
        const imgEl = document.createElement('img');
        imgEl.src = img.src;
        imgEl.alt = series.name;
        imgEl.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
        placeholder.replaceWith(imgEl);
      };
      img.onerror = () => tryNext(i + 1);
      img.src = `${folder}/${firstPage}/${firstPage}-${i}.png`;
    }
    tryNext(1);
  });
});
