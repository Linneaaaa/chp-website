// Dependency-free behaviour checks: node check-catalogue.cjs
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
function harness(pdfPath, response) {
  const events = {};
  function element() {
    return { dataset: {}, children: [], disabled: true, style: {}, hidden: false,
      appendChild(e) { this.children.push(e); }, append(...e) { this.children.push(...e); },
      remove() {}, addEventListener(name, fn) { this[name] = fn; },
      click() { events.downloads = (events.downloads || 0) + 1; } };
  }
  const button = element(), status = element(), grid = element(), empty = element();
  const context = vm.createContext({
    CATALOGUE_2026: { pdfPath, downloadName: 'test-only.pdf', products: [] },
    CATALOGUE_2026_HIGHLIGHTS: [], CATALOGUE_2026_PAGES: {},
    SERIES_MAP: { s01: {name:'Existing'}, s13: {name:'Airless'}, s14: {name:'Nozzle'} },
    TRANSLATIONS: { en: {} }, currentLang: 'en', Blob, AbortController,
    URL: { createObjectURL() { return 'blob:test'; }, revokeObjectURL() {} },
    setTimeout() { return 1; }, clearTimeout() {},
    fetch: async () => { events.requests = (events.requests || 0) + 1; return response; },
    document: { createElement: element, body: element(),
      addEventListener(name, fn) { events[name] = fn; },
      querySelector(sel) { return sel === '[data-catalogue-download]' ? button : sel === '[data-catalogue-status]' ? status : sel === '#galleryEmpty button' ? element() : null; },
      getElementById(id) { return id === 'newProductsGrid' ? grid : empty; } }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname,'js/catalogue.js'),'utf8'), context);
  events.DOMContentLoaded();
  return { context, events, button, status };
}
(async () => {
  let h = harness(null);
  assert.equal(h.button.disabled, true);
  assert.equal(h.events.requests, undefined);
  for (const invalid of ['https://example.com/file.pdf','../fake.pdf','downloads/missing.html']) {
    assert.equal(harness(invalid).button.disabled, true);
  }
  for (const response of [{ok:false}, {ok:true, blob:async()=>new Blob(['<html>Error</html>'])}]) {
    h = harness('downloads/catalogue.pdf', response);
    await h.button.click();
    assert.equal(h.status.dataset.i18n, 'catalogue_error');
    assert.equal(h.events.downloads, undefined);
    assert.equal(h.button.disabled, false);
  }
  h = harness('downloads/catalogue.pdf', {ok:true, blob:async()=>new Blob(['%PDF-test-only'])});
  await h.button.click();
  assert.equal(h.events.downloads, 1);
  assert.equal(h.status.dataset.i18n, 'catalogue_success');
  vm.runInContext(`CATALOGUE_2026.products = [
    {model:'draft', series:'s13', published:false},
    {model:'', series:'s14', published:true},
    {model:'wrong', series:'unknown', published:true},
    {model:'reviewed-test', series:'s01', published:true}
  ]`, h.context);
  assert.equal(vm.runInContext('getPublishedProducts().length',h.context),1);
  const content = fs.readFileSync(path.join(__dirname,'js/catalogue-data.js'),'utf8');
  const data = vm.createContext({}); vm.runInContext(content, data);
  const pdfPath = vm.runInContext('CATALOGUE_2026.pdfPath',data);
  assert.equal(fs.readFileSync(path.join(__dirname,pdfPath)).subarray(0,5).toString(), '%PDF-');
  const pages = vm.runInContext('Object.values(CATALOGUE_2026_PAGES).flat()',data);
  for (const page of pages) assert.ok(fs.existsSync(path.join(__dirname,`images/products/2026/pdf-${String(page).padStart(2,'0')}.jpg`)));
  assert.equal(pages.length,60);
  assert.equal(vm.runInContext('CATALOGUE_2026_HIGHLIGHTS.length',data),12);
  assert.equal(vm.runInContext('CATALOGUE_2026.products.length',data),0);
  const images = vm.runInContext('Object.values(LEGACY_GALLERY_IMAGES).flat()',data);
  for (const image of images) assert.ok(fs.existsSync(path.join(__dirname,image)),image);
  const translations=vm.createContext({});
  for (const file of ['translations.js','catalogue-translations.js']) vm.runInContext(fs.readFileSync(path.join(__dirname,'js',file),'utf8'),translations);
  for (const lang of ['en','zh','ko','vi']) assert.equal(vm.runInContext(`Object.keys(TRANSLATIONS.en).filter(k=>k.startsWith('catalogue_')).every(k=>!!TRANSLATIONS.${lang}[k])`,translations),true);
  console.log(`PASS: absent PDF, unsafe path, HTTP failure, non-PDF response, PDF download flow, draft filtering, ${images.length} existing image paths, four languages. Original PDF and 60 current catalogue page images verified. Test bytes are in memory only.`);
})().catch(e=>{ console.error(e);process.exitCode=1; });
