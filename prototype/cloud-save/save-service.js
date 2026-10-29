(function (root) {
  'use strict';
  const S = typeof module !== 'undefined' ? require('./schema.js') : root.CapsuleSchema;
  class SaveService {
    constructor({ storage, cloud = null, online = () => true, now = Date.now } = {}) {
      this.storage = storage; this.cloud = cloud; this.online = online; this.now = now;
      this.uid = null; this.epoch = 0; this.listeners = new Set(); this.status = 'local';
      this.state = S.defaults(); this.persisted = false; this.error = null; this.pending = null;
      this.loadLocal();
    }
    key() { return 'capsulemon:save:v1:' + (this.uid || 'guest'); }
    emit(status, error = null) {
      this.status = status; this.error = error;
      for (const fn of this.listeners) fn(this);
    }
    subscribe(fn) { this.listeners.add(fn); fn(this); return () => this.listeners.delete(fn); }
    getState() { return S.clone(this.state); }
    migrate(data) { return S.migrate(data); }
    backup(data, reason) {
      this.storage.setItem(this.key() + ':backup', JSON.stringify({ reason, savedAt: this.now(), data }));
    }
    loadLocal() {
      this.persisted = false; this.loadedExisting = false;
      try {
        const raw = this.storage.getItem(this.key());
        this.loadedExisting = raw !== null;
        this.state = raw === null ? S.defaults() : this.migrate(JSON.parse(raw));
        this.storage.setItem(this.key(), JSON.stringify(this.state));
        this.persisted = true; this.emit(this.online() ? 'local' : 'offline');
      } catch (error) {
        // Never overwrite unreadable/future saves. Keep raw bytes for recovery.
        this.state = S.defaults();
        this.emit('error', error);
      }
      return this.getState();
    }
    saveLocal(data) {
      const next = this.migrate(data);
      try {
        if (!this.persisted) throw Error('Save local indisponível ou corrompido. Exporte/restaure o registro antes de salvar.');
        this.storage.setItem(this.key(), JSON.stringify(next));
        this.state = next; this.emit(this.online() ? 'local' : 'offline');
        return this.getState();
      } catch (error) { this.emit('error', error); throw error; }
    }
    update(partial) {
      const next = S.merge(this.state, partial);
      next.schemaVersion = 1; next.buildVersion = S.defaults().buildVersion;
      next.updatedAt = Math.max(this.now(), this.state.updatedAt + 1);
      this.saveLocal(next);
      void this.sync();
      return this.getState();
    }
    setUser(uid) {
      if (uid === this.uid) return;
      const guest = this.uid === null && this.persisted ? this.getState() : null;
      this.uid = uid; this.epoch++; this.pending = null;
      // Invalidate the old profile before any storage access can fail.
      this.state = S.defaults(); this.persisted = false;
      this.loadLocal();
      const absent = !this.loadedExisting;
      // Only a first login imports visitor progress; account A never becomes B or guest.
      if (uid && absent && guest && this.persisted) this.saveLocal(guest);
    }
    async loadCloud() {
      if (!this.uid || !this.cloud || !this.online()) return null;
      const data = await this.cloud.read(this.uid);
      return data === null ? null : this.migrate(data);
    }
    async saveCloud(data) {
      // All cloud writes use the same conflict-safe transaction path.
      this.saveLocal(data);
      return this.sync();
    }
    sync() {
      if (!this.persisted) return Promise.resolve(false);
      if (!this.online()) { this.emit('offline'); return Promise.resolve(false); }
      if (!this.uid || !this.cloud) { this.emit('local'); return Promise.resolve(false); }
      if (this.pending) return this.pending;
      const epoch = this.epoch, uid = this.uid;
      const current = () => epoch === this.epoch;
      const run = async () => {
        try {
          this.emit('syncing');
          let sent, winner;
          do {
            sent = this.getState();
            winner = await this.cloud.reconcile(uid, remote => {
              if (!current()) throw Error('Conta alterada durante sincronização.');
              const local = this.getState();
              const other = remote === null ? null : this.migrate(remote);
              // Cloud wins ties; transaction retries protect concurrent devices.
              if (other && other.updatedAt >= local.updatedAt) return { data: other, write: false };
              return { data: local, write: true };
            });
            if (!current()) return false;
            winner = this.migrate(winner);
            if (winner.updatedAt >= this.state.updatedAt && JSON.stringify(winner) !== JSON.stringify(this.state)) {
              this.backup(this.getState(), 'cloud-replaced-local');
              this.saveLocal(winner);
            }
          } while (current() && this.state.updatedAt > Math.max(sent.updatedAt, winner.updatedAt));
          if (current()) this.emit('synced');
          return true;
        } catch (error) { if (current()) this.emit(this.online() ? 'error' : 'offline', error); return false; }
      };
      this.pending = run().finally(() => { if (current()) this.pending = null; });
      return this.pending;
    }
  }
  if (typeof module !== 'undefined') module.exports = { SaveService };
  else root.CapsuleSaveService = SaveService;
})(globalThis);
