// ── AUTH ──
const ADMIN_CREDS_KEY = 'chp_admin_creds';
function getCreds() {
  const c = localStorage.getItem(ADMIN_CREDS_KEY);
  return c ? JSON.parse(c) : { user: 'admin', pass: 'chp2024' };
}
function doLogin() {
  const creds = getCreds();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  if (user === creds.user && pass === creds.pass) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('adminUsername').textContent = user;
    loadAllData();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}
document.getElementById('loginPass')?.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
document.getElementById('loginUser')?.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

function doLogout() {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginError').style.display = 'none';
}

function changePassword() {
  const creds = getCreds();
  const cur = document.getElementById('curPass').value;
  const next = document.getElementById('newPass').value;
  if (cur !== creds.pass) { showToast('Current password incorrect', false); return; }
  if (next.length < 6) { showToast('New password must be at least 6 characters', false); return; }
  localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify({ user: creds.user, pass: next }));
  showToast('Password updated', true);
  document.getElementById('curPass').value = '';
  document.getElementById('newPass').value = '';
}

// ── NAVIGATION ──
function showPanel(name, el) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
  if (el) el.classList.add('active');
  const titles = { overview: 'Dashboard', messages: 'Customer Inquiries', products: 'Product Management', homepage: 'Homepage Content', about: 'About & Factory', process: 'Process Steps', contact: 'Contact Information', settings: 'Settings' };
  document.getElementById('topbarTitle').textContent = titles[name] || name;
  if (name === 'messages') renderMessages();
  if (name === 'overview') renderOverview();
  if (name === 'products') renderProducts();
  if (name === 'process') renderProcessEdit();
  return false;
}

// ── TOAST ──
function showToast(msg, success = true) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (success ? ' success' : '');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── DATA HELPERS ──
function getMessages() { return JSON.parse(localStorage.getItem('chp_messages') || '[]'); }
function setMessages(m) { localStorage.setItem('chp_messages', JSON.stringify(m)); }
function getProducts() { return JSON.parse(localStorage.getItem('chp_products') || '[]'); }
function setProducts(p) { localStorage.setItem('chp_products', JSON.stringify(p)); }
function getSiteData() { return JSON.parse(localStorage.getItem('chp_sitedata') || '{}'); }
function setSiteData(d) { localStorage.setItem('chp_sitedata', JSON.stringify(d)); }

// ── LOAD ALL DATA INTO FORMS ──
function loadAllData() {
  const d = getSiteData();
  // Homepage
  if (d.heroLine1) document.getElementById('heroLine1').value = d.heroLine1;
  if (d.heroLine2) document.getElementById('heroLine2').value = d.heroLine2;
  if (d.heroSub) document.getElementById('heroSub').value = d.heroSub;
  if (d.btn1Text) document.getElementById('btn1Text').value = d.btn1Text;
  if (d.btn2Text) document.getElementById('btn2Text').value = d.btn2Text;
  // About
  if (d.aboutP1) document.getElementById('aboutP1').value = d.aboutP1;
  if (d.aboutP2) document.getElementById('aboutP2').value = d.aboutP2;
  // Contact
  if (d.cPhone1) document.getElementById('cPhone1').value = d.cPhone1;
  if (d.cPhone2) document.getElementById('cPhone2').value = d.cPhone2;
  if (d.cEmail) document.getElementById('cEmail').value = d.cEmail;
  if (d.cWhatsApp) document.getElementById('cWhatsApp').value = d.cWhatsApp;
  if (d.cAddress) document.getElementById('cAddress').value = d.cAddress;
  if (d.cWeChat) document.getElementById('cWeChat').value = d.cWeChat;
  if (d.cPostal) document.getElementById('cPostal').value = d.cPostal;
  if (d.emailjsService) document.getElementById('emailjsService').value = d.emailjsService;
  if (d.emailjsTemplate) document.getElementById('emailjsTemplate').value = d.emailjsTemplate;
  if (d.notifyEmail) document.getElementById('notifyEmail').value = d.notifyEmail;
  // Stats
  if (d.statYears) document.getElementById('statYears').value = d.statYears;
  if (d.statSKUs) document.getElementById('statSKUs').value = d.statSKUs;
  if (d.statClients) document.getElementById('statClients').value = d.statClients;
  if (d.statCerts) document.getElementById('statCerts').value = d.statCerts;
  renderOverview();
  updateBadge();
}

// ── SAVE SECTION ──
function saveSection(section) {
  const d = getSiteData();
  if (section === 'homepage') {
    d.heroLine1 = document.getElementById('heroLine1').value;
    d.heroLine2 = document.getElementById('heroLine2').value;
    d.heroSub = document.getElementById('heroSub').value;
    d.btn1Text = document.getElementById('btn1Text').value;
    d.btn2Text = document.getElementById('btn2Text').value;
  } else if (section === 'stats') {
    d.statYears = document.getElementById('statYears').value;
    d.statSKUs = document.getElementById('statSKUs').value;
    d.statClients = document.getElementById('statClients').value;
    d.statCerts = document.getElementById('statCerts').value;
  } else if (section === 'about') {
    d.aboutP1 = document.getElementById('aboutP1').value;
    d.aboutP2 = document.getElementById('aboutP2').value;
  } else if (section === 'contact') {
    ['cPhone1','cPhone2','cEmail','cWhatsApp','cAddress','cWeChat','cPostal'].forEach(id => { d[id] = document.getElementById(id).value; });
  } else if (section === 'email') {
    d.emailjsService = document.getElementById('emailjsService').value;
    d.emailjsTemplate = document.getElementById('emailjsTemplate').value;
    d.notifyEmail = document.getElementById('notifyEmail').value;
  } else if (section === 'process') {
    d.processSteps = [];
    document.querySelectorAll('.step-edit').forEach((el, i) => {
      d.processSteps.push({
        title: el.querySelector('.step-title-input').value,
        desc: el.querySelector('.step-desc-input').value
      });
    });
  } else if (section === 'factory') {
    // Images stored separately
  }
  setSiteData(d);
  showToast('Saved successfully ✓');
}

// ── MESSAGES ──
function renderMessages() {
  const msgs = getMessages();
  const tbody = document.getElementById('messagesTbody');
  if (!msgs.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#aaa;padding:2rem;">No inquiries yet.</td></tr>';
    return;
  }
  tbody.innerHTML = msgs.map((m, i) => `
    <tr>
      <td>${esc(m.name || '—')}</td>
      <td>${esc(m.company || '—')}</td>
      <td>${esc(m.email || '—')}</td>
      <td>${esc(m.product || '—')}</td>
      <td>${formatDate(m.time)}</td>
      <td><select class="status-sel" onchange="changeStatus(${i}, this.value)" style="border:none;background:transparent;cursor:pointer;font-size:0.78rem;">
        <option value="new" ${m.status==='new'?'selected':''}>🟠 New</option>
        <option value="contacted" ${m.status==='contacted'?'selected':''}>🔵 Contacted</option>
        <option value="done" ${m.status==='done'?'selected':''}>🟢 Done</option>
      </select></td>
      <td style="display:flex;gap:0.4rem;">
        <button class="btn btn-ghost btn-sm" onclick="viewMessage(${i})">View</button>
        <button class="btn btn-danger btn-sm" onclick="deleteMessage(${i})">Delete</button>
      </td>
    </tr>
  `).join('');
  updateBadge();
}

function viewMessage(i) {
  const m = getMessages()[i];
  const detail = document.getElementById('msgDetail');
  const content = document.getElementById('msgDetailContent');
  content.innerHTML = [
    ['Name', m.name], ['Company', m.company], ['Email', m.email],
    ['Phone', m.phone], ['Product', m.product], ['Message', m.message],
    ['Customization', m.customization === 'yes' ? 'Yes' : 'No'],
    ['Submitted', formatDate(m.time)]
  ].map(([k, v]) => v ? `<div class="msg-detail-row"><span class="msg-detail-key">${k}</span><span class="msg-detail-val">${esc(v)}</span></div>` : '').join('');
  detail.classList.add('open');
  // Mark as contacted if new
  const msgs = getMessages();
  if (msgs[i].status === 'new') { msgs[i].status = 'contacted'; setMessages(msgs); renderMessages(); }
}

function changeStatus(i, val) {
  const msgs = getMessages(); msgs[i].status = val; setMessages(msgs); updateBadge(); showToast('Status updated');
}

function deleteMessage(i) {
  if (!confirm('Delete this inquiry?')) return;
  const msgs = getMessages(); msgs.splice(i, 1); setMessages(msgs); renderMessages(); showToast('Deleted');
}

function clearMessages() {
  if (!confirm('Delete ALL inquiries? This cannot be undone.')) return;
  setMessages([]); renderMessages(); renderOverview(); showToast('All cleared');
}

function updateBadge() {
  const n = getMessages().filter(m => m.status === 'new').length;
  document.getElementById('msgBadge').textContent = n;
  document.getElementById('msgBadge').style.display = n ? '' : 'none';
}

// ── OVERVIEW ──
function renderOverview() {
  const msgs = getMessages();
  const newCount = msgs.filter(m => m.status === 'new').length;
  const doneCount = msgs.filter(m => m.status === 'done').length;
  document.getElementById('statNew').textContent = newCount;
  document.getElementById('statTotal').textContent = msgs.length;
  document.getElementById('statProducts').textContent = getProducts().length;
  document.getElementById('statDone').textContent = doneCount;
  // Recent 5
  const tbody = document.getElementById('recentTbody');
  const recent = msgs.slice(0, 5);
  if (!recent.length) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#aaa;padding:1.5rem;">No inquiries yet.</td></tr>';
    return;
  }
  tbody.innerHTML = recent.map((m, i) => `
    <tr>
      <td>${esc(m.name||'—')}</td>
      <td>${esc(m.company||'—')}</td>
      <td>${esc(m.product||'—')}</td>
      <td>${formatDate(m.time)}</td>
      <td><span class="status status-${m.status||'new'}">${m.status||'new'}</span></td>
      <td><button class="btn btn-ghost btn-sm" onclick="showPanel('messages',null);setTimeout(()=>viewMessage(${i}),100)">View</button></td>
    </tr>
  `).join('');
}

// ── PRODUCTS ──
let editingProductIndex = null;
const defaultProducts = [
  { name: 'Straight Round Bottle 09', cat: 'round', material: 'PET / PETG', capacity: '30ml – 500ml', finish: 'Matte / Glossy / Frosted', custom: 'yes', desc: '', imgs: [] },
  { name: 'Round Shoulder Bottle', cat: 'round', material: 'PET / PP', capacity: '50ml – 300ml', finish: 'Silk Screen / Hot Stamp', custom: 'yes', desc: '', imgs: [] },
  { name: 'Slant Shoulder Flat Bottle', cat: 'flat', material: 'PETG / PET', capacity: '100ml – 200ml', finish: 'Labeling / Gold Print', custom: 'yes', desc: '', imgs: [] },
  { name: 'Straight Round Jar', cat: 'jar', material: 'PP / PETG', capacity: '30ml – 250ml', finish: 'Matte / Mirror', custom: 'yes', desc: '', imgs: [] },
  { name: 'Serum Dropper Bottle', cat: 'dropper', material: 'PET / Glass-look', capacity: '10ml – 50ml', finish: 'Frosted / Transparent', custom: 'yes', desc: '', imgs: [] },
  { name: 'Foam Pump Bottle', cat: 'foam', material: 'PET / PP', capacity: '150ml – 400ml', finish: 'Silk Screen', custom: 'yes', desc: '', imgs: [] },
];

function renderProducts() {
  let products = getProducts();
  if (!products.length) { setProducts(defaultProducts); products = defaultProducts; }
  const tbody = document.getElementById('productsTbody');
  tbody.innerHTML = products.map((p, i) => `
    <tr>
      <td><strong>${esc(p.name)}</strong></td>
      <td>${esc(p.cat)}</td>
      <td>${esc(p.material)}</td>
      <td>${esc(p.capacity)}</td>
      <td>${p.custom === 'yes' ? '✓ Yes' : 'No'}</td>
      <td style="display:flex;gap:0.4rem;">
        <button class="btn btn-ghost btn-sm" onclick="editProduct(${i})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function showProductForm() {
  editingProductIndex = null;
  document.getElementById('productFormTitle').textContent = 'New Product';
  ['pName','pMaterial','pCapacity','pFinish','pDesc'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('pCat').value = 'round';
  document.getElementById('pCustom').value = 'yes';
  document.getElementById('productFormWrap').style.display = 'block';
}

function editProduct(i) {
  const p = getProducts()[i];
  editingProductIndex = i;
  document.getElementById('productFormTitle').textContent = 'Edit Product';
  document.getElementById('pName').value = p.name;
  document.getElementById('pCat').value = p.cat;
  document.getElementById('pMaterial').value = p.material;
  document.getElementById('pCapacity').value = p.capacity;
  document.getElementById('pFinish').value = p.finish;
  document.getElementById('pCustom').value = p.custom;
  document.getElementById('pDesc').value = p.desc || '';
  document.getElementById('productFormWrap').style.display = 'block';
  document.getElementById('productFormWrap').scrollIntoView({ behavior: 'smooth' });
}

function saveProduct() {
  const products = getProducts();
  const product = {
    name: document.getElementById('pName').value.trim(),
    cat: document.getElementById('pCat').value,
    material: document.getElementById('pMaterial').value.trim(),
    capacity: document.getElementById('pCapacity').value.trim(),
    finish: document.getElementById('pFinish').value.trim(),
    custom: document.getElementById('pCustom').value,
    desc: document.getElementById('pDesc').value.trim(),
    imgs: []
  };
  if (!product.name) { showToast('Product name is required', false); return; }
  if (editingProductIndex !== null) {
    product.imgs = products[editingProductIndex].imgs || [];
    products[editingProductIndex] = product;
  } else {
    products.push(product);
  }
  setProducts(products);
  cancelProductForm();
  renderProducts();
  showToast('Product saved ✓');
}

function cancelProductForm() {
  document.getElementById('productFormWrap').style.display = 'none';
  editingProductIndex = null;
}

function deleteProduct(i) {
  if (!confirm('Delete this product?')) return;
  const products = getProducts();
  products.splice(i, 1);
  setProducts(products);
  renderProducts();
  showToast('Deleted');
}

// ── PROCESS STEPS EDIT ──
const defaultSteps = [
  { title: 'Consultation', desc: 'Share your requirements, brand vision, target material and capacity needs.' },
  { title: 'Design Confirmation', desc: 'Our designers present 3D renders and structural drawings for your approval.' },
  { title: 'Sampling', desc: 'Physical prototypes are produced and delivered for your review and sign-off.' },
  { title: 'Production', desc: 'Mass production begins using lean processes and dedicated mold tooling.' },
  { title: 'Quality Check', desc: 'Multi-stage inspection ensures every unit meets the agreed specification.' },
  { title: 'Delivery', desc: 'Professionally packed and shipped worldwide, with full tracking provided.' },
];
function renderProcessEdit() {
  const d = getSiteData();
  const steps = d.processSteps || defaultSteps;
  const container = document.getElementById('processStepsEdit');
  container.innerHTML = steps.map((s, i) => `
    <div class="step-edit form-row" style="margin-bottom:0.8rem;">
      <div class="field-group" style="flex-shrink:0;width:40px;justify-content:center;padding-top:1.8rem;">
        <span style="font-size:1.2rem;color:var(--champagne);font-family:'Cormorant Garamond',serif;">${String(i+1).padStart(2,'0')}</span>
      </div>
      <div class="field-group"><label>Step Title</label><input type="text" class="step-title-input" value="${esc(s.title)}"></div>
      <div class="field-group"><label>Description</label><input type="text" class="step-desc-input" value="${esc(s.desc)}"></div>
    </div>
  `).join('');
}

// ── IMAGE UPLOAD (preview only, base64 stored) ──
function triggerImgUpload(slot) {
  slot.querySelector('input[type=file]').click();
}
function handleImgUpload(input) {
  const slot = input.closest('.img-slot');
  const grid = input.closest('.img-upload-grid');
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = document.createElement('img');
    img.src = e.target.result;
    slot.innerHTML = '';
    slot.appendChild(img);
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-img';
    removeBtn.textContent = '×';
    removeBtn.onclick = ev => { ev.stopPropagation(); addNewSlot(grid); slot.remove(); };
    slot.appendChild(removeBtn);
    slot.onclick = null;
    // Add another slot if under 6
    if (grid.querySelectorAll('.img-slot').length < 6) addNewSlot(grid);
  };
  reader.readAsDataURL(file);
}
function addNewSlot(grid) {
  const newSlot = document.createElement('div');
  newSlot.className = 'img-slot';
  newSlot.onclick = function() { triggerImgUpload(this); };
  newSlot.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCC" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    <span class="img-slot-label">Add Photo</span>
    <input type="file" accept="image/*" style="display:none" onchange="handleImgUpload(this)">
  `;
  grid.appendChild(newSlot);
}

// ── EXPORT CSV ──
function exportCSV() {
  const msgs = getMessages();
  if (!msgs.length) { showToast('No data to export', false); return; }
  const cols = ['name','company','email','phone','product','message','customization','status','time'];
  const rows = [cols.join(','), ...msgs.map(m => cols.map(c => `"${(m[c]||'').replace(/"/g,'""')}"`).join(','))];
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'chp-inquiries-' + new Date().toISOString().slice(0,10) + '.csv';
  a.click();
}

// ── HELPERS ──
function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

// ── INIT ──
updateBadge();
