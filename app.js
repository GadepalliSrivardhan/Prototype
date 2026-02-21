(function () {
  const messagesEl = document.getElementById('messages');
  const quickRepliesEl = document.getElementById('quickReplies');
  const addressInput = document.getElementById('addressInput');

  const state = {
    step: 'welcome',
    school: null,
    class: null,
    gender: null,
    product: null,
    quantity: 1,
    size: null,
    address: null,
    showedUniformChoice: false,
  };

  function now() {
    const d = new Date();
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  function addMessage(who, content, isHTML = false) {
    const msg = document.createElement('div');
    msg.className = `msg ${who}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    if (isHTML) bubble.innerHTML = content;
    else bubble.textContent = content;
    const time = document.createElement('span');
    time.className = 'time';
    time.textContent = now();
    const check = who === 'user' ? '<span class="check">✓✓</span>' : '';
    msg.innerHTML = '';
    msg.appendChild(bubble);
    msg.appendChild(time);
    if (who === 'user') {
      const checkSpan = document.createElement('span');
      checkSpan.className = 'check';
      checkSpan.textContent = '✓✓';
      msg.appendChild(checkSpan);
    }
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function clearQuickReplies() {
    quickRepliesEl.innerHTML = '';
    addressInput.classList.add('hidden');
  }

  function addQuickButton(label, iconSvg, onClick) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-quick';
    btn.innerHTML = (iconSvg ? '<span class="btn-icon">' + iconSvg + '</span>' : '') + '<span>' + label + '</span>';
    btn.addEventListener('click', onClick);
    quickRepliesEl.appendChild(btn);
  }

  function addLargeButton(label, iconSvg, onClick) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-quick btn-large';
    btn.innerHTML = (iconSvg ? '<span class="btn-icon">' + iconSvg + '</span>' : '') + '<span>' + label + '</span>';
    btn.addEventListener('click', onClick);
    quickRepliesEl.appendChild(btn);
  }

  const icons = {
    building: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>',
    cap: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>',
    gender: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-4H7v-2h3V9h2v2h3v2h-3v4h-2z"/></svg>',
    shirt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6H4v6H2v2h20v-2h-2zm-6-8l2-2 2 2v6h-4v-6z"/></svg>',
    shorts: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h1v8l2-2 2 2V4h2v8l2 2 2-2v8H6z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
    pay: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',
  };

  function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
  }

  function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  }

  function initWelcome() {
    addMessage('user', 'Hi');
    addMessage('bot', "Hello! Welcome to Taara's. Please select your details to get started.");
    addMessage('bot', 'Please choose your School, Class, and Gender:');
    clearQuickReplies();
    addQuickButton('Select School', icons.building, () => openModal('modalSchool'));
    addQuickButton('Select Class', icons.cap, () => openModal('modalClass'));
    addQuickButton('Select Gender', icons.gender, () => openModal('modalGender'));
  }

  function showUniformChoice() {
    if (state.showedUniformChoice) return;
    state.showedUniformChoice = true;
    addMessage('bot', 'Great! Please choose a uniform.');
    clearQuickReplies();
    if (state.gender === 'Girl') {
      addQuickButton('Girls Shirt', icons.shirt, () => selectProduct('Girls Shirt'));
      addQuickButton('Girls Skirt', icons.shorts, () => selectProduct('Girls Skirt'));
    } else {
      addQuickButton('Boys Shirt', icons.shirt, () => selectProduct('Boys Shirt'));
      addQuickButton('Boys Shorts', icons.shorts, () => selectProduct('Boys Shorts'));
    }
  }

  function selectProduct(name) {
    state.product = name;
    addMessage('user', name);
    addMessage('bot', 'Great! Please choose a uniform:');
    const imgText = name.replace(/\s/g, '+');
    const productHTML = `
      <div class="product-card">
        <img src="https://placehold.co/260x200/e8e8e8/666?text=${imgText}" alt="Uniform" />
        <div class="details">
          <div class="product-qty">
            <label>Qty:</label>
            <input type="number" id="qtyInput" min="1" max="10" value="1" />
          </div>
        </div>
      </div>
    `;
    const wrap = document.createElement('div');
    wrap.className = 'msg bot';
    wrap.innerHTML = '<div class="bubble">' + productHTML + '</div><span class="time">' + now() + '</span>';
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    const qtyInput = document.getElementById('qtyInput');
    if (qtyInput) qtyInput.addEventListener('change', function () { state.quantity = Math.max(1, parseInt(this.value, 10) || 1); });

    clearQuickReplies();
    addLargeButton('Buy Now', icons.arrow, onBuyNowFromProduct);
  }

  function onBuyNowFromProduct() {
    const qtyInput = document.getElementById('qtyInput');
    if (qtyInput) state.quantity = Math.max(1, parseInt(qtyInput.value, 10) || 1);
    openModal('modalSize');
  }

  function onSizeSelected(size) {
    state.size = size;
    closeModals();
    addMessage('bot', 'Please enter your address.');
    const summaryImgText = state.product.replace(/\s/g, '+');
    const summaryHTML = `
      <div class="product-card">
        <img src="https://placehold.co/260x200/e8e8e8/666?text=${summaryImgText}" alt="Uniform" />
        <div class="details">
          <div class="label">Selected: ${state.product}</div>
          <div class="value">Size: ${state.size}</div>
        </div>
      </div>
    `;
    const wrap = document.createElement('div');
    wrap.className = 'msg bot';
    wrap.innerHTML = '<div class="bubble">' + summaryHTML + '</div><span class="time">' + now() + '</span>';
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    clearQuickReplies();
    addressInput.classList.remove('hidden');
    addressInput.value = '';
    addressInput.placeholder = 'Enter your full address...';
    addLargeButton('Buy Now', icons.arrow, onConfirmAddress);
  }

  function onConfirmAddress() {
    const addr = addressInput.value.trim();
    if (!addr) {
      addressInput.focus();
      return;
    }
    state.address = addr;
    addressInput.classList.add('hidden');
    addressInput.value = '';

    addMessage('bot', 'Got it! Please proceed to:');
    const addrHTML = `
      <div class="info-block">
        <div class="line">${state.address}</div>
        <div class="amount">Pay ₹750.00</div>
      </div>
    `;
    const wrap = document.createElement('div');
    wrap.className = 'msg bot';
    wrap.innerHTML = '<div class="bubble">' + addrHTML + '</div><span class="time">' + now() + '</span>';
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    clearQuickReplies();
    addLargeButton('Pay Now', icons.pay, onPayNow);
  }

  function onPayNow() {
    addMessage('bot', 'Your order has been shipped!');
    const trackHTML = `
      <div class="info-block">
        <div class="line"><span class="icon">${icons.check}</span> Tracking ID: 1234567880</div>
        <div class="line"><span class="icon">${icons.truck}</span> Out for Delivery: On the way</div>
        <div class="line"><span class="icon">${icons.pin}</span> Live Tracking: Arriving Soon!</div>
        <div class="line" style="margin-top:10px;font-weight:600"><span class="icon">${icons.home}</span> Arriving Today!</div>
        <div class="line" style="margin-top:4px;color:var(--text-muted)">Expected by 2 PM</div>
      </div>
    `;
    const wrap = document.createElement('div');
    wrap.className = 'msg bot';
    wrap.innerHTML = '<div class="bubble">' + trackHTML + '</div><span class="time">' + now() + '</span>';
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    clearQuickReplies();
    addLargeButton('Track Your Order', icons.truck, () => {
      addMessage('user', 'Track Your Order');
      addMessage('bot', 'Track your order at: https://track.uniformstore.com/1234567880');
    });
  }

  function onSchoolSelected(school) {
    state.school = school;
    closeModals();
    addMessage('user', school);
    if (!state.class || !state.gender) return;
    showUniformChoice();
  }

  function onClassSelected(cls) {
    state.class = cls;
    closeModals();
    addMessage('user', cls);
    if (!state.school || !state.gender) return;
    showUniformChoice();
  }

  function onGenderSelected(gender) {
    state.gender = gender;
    closeModals();
    addMessage('user', gender);
    if (!state.school || !state.class) return;
    showUniformChoice();
  }

  // Modal listeners
  document.getElementById('modalSchool').querySelectorAll('.modal-option').forEach(btn => {
    btn.addEventListener('click', () => onSchoolSelected(btn.dataset.value));
  });
  document.getElementById('modalClass').querySelectorAll('.modal-option').forEach(btn => {
    btn.addEventListener('click', () => onClassSelected(btn.dataset.value));
  });
  document.getElementById('modalGender').querySelectorAll('.modal-option').forEach(btn => {
    btn.addEventListener('click', () => onGenderSelected(btn.dataset.value));
  });
  document.getElementById('modalSize').querySelectorAll('.modal-option').forEach(btn => {
    btn.addEventListener('click', () => onSizeSelected(btn.dataset.value));
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModals(); });
  });

  // Start
  initWelcome();
})();
