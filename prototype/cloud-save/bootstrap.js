(function () {
  'use strict';
  const panel = document.createElement('section');
  panel.id = 'cloud-save-panel'; panel.setAttribute('aria-label', 'Progresso e conta');
  panel.innerHTML = '<div class="save-actions"><strong>Progresso</strong><span data-user>Visitante</span>' +
    '<button type="button" data-login>Entrar com Google</button><button type="button" data-logout hidden>Sair</button>' +
    '<button type="button" data-sync>Sincronizar agora</button></div>' +
    '<p data-status role="status" aria-live="polite"></p><p>O jogo funciona sem login. O progresso é salvo neste navegador.</p>';
  document.querySelector('canvas').insertAdjacentElement('afterend', panel);
  const $ = selector => panel.querySelector(selector);
  const auth = new window.CapsuleAuthService();
  const save = new window.CapsuleSaveService({
    // Access can throw in private/restricted browsing; surface the error without stopping play.
    storage: { getItem: k => localStorage.getItem(k), setItem: (k, v) => localStorage.setItem(k, v) },
    online: () => navigator.onLine
  });
  let connecting = null, ready = false, connectError = null, cloudAdapter = null;
  const profileHintKey = 'capsulemon:last-local-profile:v1';
  // A local profile hint grants no cloud access. Wait for Firebase's auth observer.
  if (window.CAPSULEMON_FIREBASE_CONFIG?.enabled) {
    try {
      const uid = localStorage.getItem(profileHintKey);
      if (uid && /^[A-Za-z0-9_-]{1,128}$/.test(uid) && localStorage.getItem('capsulemon:save:v1:' + uid) !== null) save.setUser(uid);
    } catch (error) { save.emit('error', error); }
  }
  const labels = { local: 'Local · salvo neste navegador', offline: 'Offline · save local',
    syncing: 'Sincronizando…', synced: 'Sincronizado', error: 'Erro · sincronização pendente' };
  function render() {
    $('[data-user]').textContent = auth.user ? (auth.user.displayName || '') + ' · ' + (auth.user.email || auth.user.uid) : (save.uid && !auth.initialized ? 'Perfil local · aguardando autenticação' : 'Visitante');
    $('[data-login]').hidden = !!auth.user; $('[data-logout]').hidden = !auth.user;
    $('[data-login]').disabled = !!connecting || !navigator.onLine || !window.CAPSULEMON_FIREBASE_CONFIG?.enabled;
    $('[data-sync]').disabled = !auth.user || !ready || save.status === 'syncing';
    $('[data-status]').textContent = connectError || (labels[save.status] || save.status) + (save.error ? ' · ' + save.error.message : '');
    if (!window.CAPSULEMON_FIREBASE_CONFIG?.enabled && !save.error) $('[data-status]').textContent += ' · nuvem não configurada';
  }
  save.subscribe(render);
  auth.subscribe(user => {
    if (!auth.initialized) { render(); return; }
    save.cloud = user ? cloudAdapter : null;
    try {
      save.setUser(user?.uid || null);
      localStorage.setItem(profileHintKey, user?.uid || '');
    } catch (error) { save.emit('error', error); }
    render(); void save.sync();
  });
  async function connect() {
    if (ready || connecting || !navigator.onLine || !window.CAPSULEMON_FIREBASE_CONFIG?.enabled) return;
    connecting = (async () => {
      try {
        const adapter = await window.createCapsuleFirebase(window.CAPSULEMON_FIREBASE_CONFIG);
        cloudAdapter = adapter.cloud; ready = true; connectError = null; auth.attach(adapter.auth);
      } catch (error) { connectError = 'Erro ao conectar à nuvem · ' + error.message; }
    })();
    render(); await connecting; connecting = null; render();
  }
  $('[data-login]').onclick = async () => {
    // signInWithPopup is called directly from the click after the SDK is ready.
    try {
      if (!ready) { await connect(); return; }
      connectError = null; await auth.loginGoogle();
    } catch (error) { connectError = 'Erro de login · ' + error.message; }
    render();
  };
  $('[data-logout]').onclick = async () => {
    try { await auth.logout(); connectError = null; } catch (error) { connectError = 'Erro ao sair · ' + error.message; }
    render();
  };
  $('[data-sync]').onclick = () => { void save.sync(); };
  window.addEventListener('online', async () => { await connect(); void save.sync(); render(); });
  window.addEventListener('storage', event => {
    if (event.key === save.key()) { save.loadLocal(); void save.sync(); }
  });
  window.addEventListener('offline', () => { save.emit('offline'); render(); });
  // Isolated progress bridge: no changes to collision, animation, HP or input code.
  // The demo has no campaign/economy yet; record demo usage, without inventing rewards.
  document.getElementById('demo')?.addEventListener('click', () => {
    try { save.update({ stats: { demoRuns: (save.getState().stats.demoRuns || 0) + 1 } }); }
    catch (error) { save.emit('error', error); }
  });
  window.CapsuleProgress = Object.freeze({
    getState: () => save.getState(), update: partial => save.update(partial), sync: () => save.sync()
  });
  window.setInterval(() => {
    if (ready && auth.user && navigator.onLine && save.status === 'error') void save.sync();
  }, 30000);
  render(); void connect();
})();
