// Cookie consent banner (GDPR). Stores the choice in localStorage.
// Exposes window.litreelConsent = 'accepted' | 'rejected' so tracking pixels
// (TikTok Pixel, analytics) can start ONLY after acceptance.
(function () {
  const KEY = 'litreel_cookie_consent';
  const saved = localStorage.getItem(KEY);
  window.litreelConsent = saved || null;
  function emit() { window.dispatchEvent(new CustomEvent('cookie-consent', { detail: window.litreelConsent })); }
  if (saved) { emit(); return; }

  const bar = document.createElement('div');
  bar.id = 'cookie-bar';
  bar.innerHTML = `
    <style>
      #cookie-bar{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#191622;color:#f4eff6;
        padding:14px 18px;display:flex;gap:14px;align-items:center;justify-content:center;flex-wrap:wrap;
        font:14px/1.5 'Segoe UI',system-ui,sans-serif;box-shadow:0 -4px 20px rgba(0,0,0,.2)}
      #cookie-bar p{margin:0;max-width:620px}
      #cookie-bar a{color:#e0365b}
      #cookie-bar .btns{display:flex;gap:8px}
      #cookie-bar button{border:none;border-radius:9px;padding:10px 16px;font:600 14px 'Segoe UI',sans-serif;cursor:pointer}
      #cookie-bar .acc{background:#e0365b;color:#fff}
      #cookie-bar .rej{background:transparent;color:#f4eff6;border:1px solid rgba(255,255,255,.3)}
    </style>
    <p>We use cookies to run the site and, with your consent, for analytics and marketing.
       See our <a href="/cookies">Cookie Policy</a>.</p>
    <div class="btns">
      <button class="rej" id="ck-rej">Reject</button>
      <button class="acc" id="ck-acc">Accept</button>
    </div>`;
  document.body.appendChild(bar);

  function choose(v) { localStorage.setItem(KEY, v); window.litreelConsent = v; bar.remove(); emit(); }
  document.getElementById('ck-acc').onclick = () => choose('accepted');
  document.getElementById('ck-rej').onclick = () => choose('rejected');
})();
