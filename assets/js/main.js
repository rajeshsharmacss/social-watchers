// Auto ↔ Light ↔ Dark toggle (same logic you liked)
(function () {
  const STORAGE_KEY = 'site-theme'; // 'light' | 'dark' | 'auto'
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  const prefersDark = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  const applyTheme = (mode) => {
    root.setAttribute('data-theme', mode === 'auto' ? (prefersDark() ? 'dark' : 'light') : mode);
    updateBtn(mode);
  };

  const getMode = () => localStorage.getItem(STORAGE_KEY) || 'auto';
  const setMode = (m) => { localStorage.setItem(STORAGE_KEY, m); applyTheme(m); };

  const updateBtn = (mode) => {
    if (!btn) return;
    const icon = btn.querySelector('.icon');
    if (mode === 'light') { icon.textContent = '☀️'; btn.title='Switch to dark mode'; }
    else if (mode === 'dark') { icon.textContent = '🌙'; btn.title='Switch to auto mode'; }
    else { icon.textContent = '🖥️'; btn.title='Switch to light mode'; }
  };

  applyTheme(getMode());

  if (btn) btn.addEventListener('click', () => {
    const modes = ['auto','light','dark'];
    const next = modes[(modes.indexOf(getMode()) + 1) % modes.length];
    setMode(next);
  });

  if (window.matchMedia) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => { if (getMode() === 'auto') applyTheme('auto'); };
    mql.addEventListener ? mql.addEventListener('change', onChange) : mql.addListener(onChange);
  }
})();

