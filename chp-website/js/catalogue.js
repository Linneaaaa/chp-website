// Only reviewed records with a real model and a known series are published.
function getPublishedProducts() {
  return CATALOGUE_2026.products.filter(p => p.published === true &&
    typeof p.model === 'string' && p.model.trim() && SERIES_MAP[p.series]);
}

function catalogueText(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'new-product-card gallery-item';
  if (product.image) {
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.model;
    img.loading = 'lazy';
    img.addEventListener('error', () => {
      img.remove();
      const note = document.createElement('p');
      note.dataset.i18n = 'image_pending';
      note.textContent = catalogueText('image_pending');
      card.prepend(note);
    }, { once: true });
    card.appendChild(img);
  }
  const heading = document.createElement('h4');
  heading.textContent = product.model;
  card.appendChild(heading);
  const series = document.createElement('p');
  series.textContent = SERIES_MAP[product.series].name;
  card.appendChild(series);
  const specs = document.createElement('dl');
  for (const key of ['capacity', 'material', 'dimensions', 'neckFinish']) {
    if (!product[key]) continue;
    const label = document.createElement('dt');
    label.dataset.i18n = 'spec_' + key;
    label.textContent = catalogueText('spec_' + key);
    const value = document.createElement('dd');
    value.textContent = product[key];
    specs.append(label, value);
  }
  card.appendChild(specs);
  const button = document.createElement('button');
  button.className = 'btn-gold';
  button.dataset.i18n = 'product_inquire';
  button.textContent = catalogueText('product_inquire');
  button.addEventListener('click', () => {
    closeGallery();
    const select = document.getElementById('modalProduct');
    let option = Array.from(select.options).find(o => o.value === product.model);
    if (!option) {
      option = new Option(product.model, product.model);
      select.add(option);
    }
    select.value = product.model;
    document.getElementById('inquiryModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  card.appendChild(button);
  return card;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#galleryEmpty button').addEventListener('click', event => {
    const key = event.currentTarget.dataset.series;
    const select = document.getElementById('modalProduct');
    if (Array.from(select.options).some(option => option.value === key)) select.value = key;
  });
  const products = getPublishedProducts();
  const grid = document.getElementById('newProductsGrid');
  CATALOGUE_2026_HIGHLIGHTS.forEach(({ series, page }) => {
    const card = document.createElement('article');
    card.className = 'new-product-card';
    const image = document.createElement('img');
    image.src = `images/products/2026/photo-${String(page).padStart(2, '0')}.jpg`;
    image.alt = SERIES_MAP[series].name;
    image.loading = 'lazy';
    const heading = document.createElement('h4');
    heading.textContent = SERIES_MAP[series].name;
    const source = document.createElement('a');
    source.href = `${CATALOGUE_2026.pdfPath}#page=${page}`;
    source.target = '_blank';
    source.rel = 'noopener';
    source.textContent = `2026 · PDF ${page}`;
    const button = document.createElement('button');
    button.className = 'btn-gold';
    button.dataset.i18n = 'view_collection';
    button.textContent = catalogueText('view_collection');
    button.addEventListener('click', () => openSeries(series));
    card.append(image, heading, source, button);
    grid.appendChild(card);
  });
  products.forEach(p => grid.appendChild(createProductCard(p)));
  document.getElementById('newProductsEmpty').hidden = products.length > 0 || CATALOGUE_2026_HIGHLIGHTS.length > 0;
  for (const key of ['s13', 's14']) {
    const note = document.querySelector(`[data-series="${key}"].series-card .series-coming`);
    if (note) note.hidden = products.some(p => p.series === key) || !!CATALOGUE_2026_PAGES[key]?.length;
  }

  const button = document.querySelector('[data-catalogue-download]');
  const status = document.querySelector('[data-catalogue-status]');
  const setText = (el, key) => {
    el.dataset.i18n = key;
    el.textContent = catalogueText(key);
  };
  // Only same-site PDF files in downloads/ are supported. No speculative URL.
  const path = CATALOGUE_2026.pdfPath;
  if (typeof path !== 'string' || !/^downloads\/[a-zA-Z0-9_-]+\.pdf$/.test(path)) return;
  button.disabled = false;
  setText(button, 'catalogue_download');
  setText(status, 'catalogue_ready');
  button.addEventListener('click', async () => {
    button.disabled = true;
    setText(status, 'catalogue_loading');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(path, { signal: controller.signal, cache: 'no-store' });
      if (!response.ok) throw new Error('PDF unavailable');
      const blob = await response.blob();
      if (await blob.slice(0, 5).text() !== '%PDF-') throw new Error('Invalid PDF');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = CATALOGUE_2026.downloadName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      setText(status, 'catalogue_success');
    } catch {
      setText(status, 'catalogue_error');
    } finally {
      clearTimeout(timer);
      button.disabled = false;
    }
  });
});
