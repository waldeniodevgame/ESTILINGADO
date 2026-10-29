(function (root) {
  'use strict';
  class AuthService {
    constructor() { this.user = null; this.initialized = false; this.adapter = null; this.listeners = new Set(); this.busy = false; }
    subscribe(fn) { this.listeners.add(fn); fn(this.user); return () => this.listeners.delete(fn); }
    emit(user) { this.initialized = true; this.user = user; for (const fn of this.listeners) fn(user); }
    attach(adapter) {
      this.adapter = adapter;
      this.unsubscribe = adapter.onAuthStateChanged(user => this.emit(user));
    }
    async loginGoogle() {
      if (!this.adapter) throw Error('Firebase não configurado. Continue como visitante.');
      if (this.busy) return;
      this.busy = true;
      try { return await this.adapter.loginGoogle(); } finally { this.busy = false; }
    }
    async logout() {
      if (this.busy) return;
      this.busy = true;
      try { if (this.adapter) await this.adapter.logout(); this.emit(null); } finally { this.busy = false; }
    }
    getState() { return { user: this.user, guest: !this.user }; }
  }
  if (typeof module !== 'undefined') module.exports = { AuthService };
  else root.CapsuleAuthService = AuthService;
})(globalThis);
