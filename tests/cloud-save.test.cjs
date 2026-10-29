const { test } = require('node:test');
const assert = require('node:assert/strict');
const S = require('../prototype/cloud-save/schema.js');
const { SaveService } = require('../prototype/cloud-save/save-service.js');
const { AuthService } = require('../prototype/cloud-save/auth-service.js');
function memory() {
  const map = new Map();
  return { getItem: k => map.has(k) ? map.get(k) : null, setItem: (k,v) => map.set(k,v), map };
}
function fixture() {
  const storage = memory(); let online = true, time = 100;
  const docs = new Map(), writes = [];
  const cloud = {
    read: async uid => docs.get(uid) || null,
    reconcile: async (uid, resolve) => {
      const result = resolve(docs.get(uid) || null);
      if (result.write) { docs.set(uid, S.clone(result.data)); writes.push(uid); }
      return result.data;
    }
  };
  const save = new SaveService({ storage, cloud, online: () => online, now: () => time++ });
  return { save, storage, cloud, docs, writes, offline: () => { online = false; }, online: () => { online = true; } };
}
const record = (updatedAt, coins) => ({ ...S.defaults(), updatedAt, currency: { coins, fragments: 0 } });
test('JSON round-trip, reload and deep partial updates preserve siblings', async () => {
  const f = fixture(); f.save.update({ currency: { coins: 5 }, collection: { monsters: { marcelo: { level: 2 } } } });
  await f.save.sync();
  const restored = new SaveService({ storage: f.storage });
  assert.deepEqual(restored.getState(), f.save.getState());
  assert.equal(restored.getState().currency.fragments, 0);
  const copy = restored.getState(); copy.currency.coins = 99;
  assert.equal(restored.getState().currency.coins, 5);
});
test('migration V0 supplies defaults and preserves supplied progress', () => {
  const out = S.migrate({ schemaVersion: 0, currency: { coins: 12 } });
  assert.equal(out.schemaVersion, 1); assert.equal(out.currency.coins, 12); assert.equal(out.currency.fragments, 0);
  assert.deepEqual(S.migrate(out), out);
  assert.throws(() => S.migrate({ schemaVersion: 2 }));
});
test('malformed JSON, invalid shapes and unknown schemas remain untouched', async () => {
  for (const raw of ['{oops', 'null', JSON.stringify({ schemaVersion: 99 }), JSON.stringify({ ...S.defaults(), currency: { coins: -1, fragments: 0 } })]) {
    const storage = memory(), key = 'capsulemon:save:v1:guest'; storage.setItem(key, raw);
    const save = new SaveService({ storage });
    assert.equal(save.status, 'error'); assert.equal(storage.getItem(key), raw);
    assert.throws(() => save.update({ currency: { coins: 1 } }));
    assert.equal(await save.sync(), false); assert.equal(storage.getItem(key), raw);
  }
});
test('reject invalid numbers, injected keys and nonserializable values', () => {
  for (const value of [NaN, Infinity, -2, 1.2]) assert.throws(() => S.validate(record(1, value)));
  assert.throws(() => S.merge(S.defaults(), JSON.parse('{"__proto__":{"polluted":true}}')));
  assert.throws(() => S.merge(S.defaults(), { stats: { fn: () => 1 } }));
  assert.equal({}.polluted, undefined);
});
test('offline visitor writes synchronously and never touches cloud', async () => {
  const f = fixture(); f.offline();
  f.save.update({ currency: { coins: 7 } });
  assert.equal(JSON.parse(f.storage.getItem(f.save.key())).currency.coins, 7);
  assert.equal(await f.save.sync(), false); assert.equal(f.save.status, 'offline'); assert.equal(f.writes.length, 0);
});
test('Google uid imports guest once; logout and account switching isolate saves', async () => {
  const f = fixture(); f.save.update({ currency: { coins: 7 } });
  f.save.setUser('A'); await f.save.sync(); assert.equal(f.docs.get('A').currency.coins, 7);
  f.save.update({ currency: { coins: 20 } }); await f.save.sync();
  f.save.setUser('B'); assert.equal(f.save.getState().currency.coins, 0);
  f.save.setUser(null); assert.equal(f.save.getState().currency.coins, 7);
  f.save.setUser('A'); assert.equal(f.save.getState().currency.coins, 20);
});
test('newer cloud wins and local backup exists before replacement', async () => {
  const f = fixture(); f.save.setUser('A'); f.save.saveLocal(record(10, 5)); f.docs.set('A', record(20, 8));
  assert.equal(await f.save.sync(), true); assert.equal(f.save.getState().currency.coins, 8);
  const backup = JSON.parse(f.storage.getItem(f.save.key() + ':backup'));
  assert.equal(backup.data.currency.coins, 5); assert.equal(f.writes.length, 0);
});
test('newer local wins and cloud wins equal timestamp deterministically', async () => {
  const f = fixture(); f.save.setUser('A'); f.save.saveLocal(record(30, 9)); f.docs.set('A', record(20, 8));
  await f.save.sync(); assert.equal(f.docs.get('A').currency.coins, 9);
  f.docs.set('A', record(30, 3)); await f.save.sync(); assert.equal(f.save.getState().currency.coins, 3);
});
test('cloud read and save APIs use current uid and conflict resolution', async () => {
  const f = fixture(); f.save.setUser('A'); f.docs.set('A', record(80, 9));
  assert.equal((await f.save.loadCloud()).currency.coins, 9);
  await f.save.saveCloud(record(50, 2)); assert.equal(f.docs.get('A').currency.coins, 9);
});
test('corrupt cloud cannot overwrite local or get silently replaced', async () => {
  const f = fixture(); f.save.setUser('A'); f.save.saveLocal(record(30, 9)); f.docs.set('A', { schemaVersion: 8 });
  assert.equal(await f.save.sync(), false); assert.equal(f.save.status, 'error');
  assert.equal(f.save.getState().currency.coins, 9); assert.equal(f.writes.length, 0);
});
test('storage quota failures preserve state and prevent cloud write', async () => {
  const f = fixture(); f.save.setUser('A'); f.save.saveLocal(record(10, 1));
  f.storage.setItem = () => { throw Error('quota'); };
  assert.throws(() => f.save.update({ currency: { coins: 55 } }));
  assert.equal(f.save.getState().currency.coins, 1); assert.equal(f.writes.length, 0);
  f.docs.set('A', record(20, 2)); assert.equal(await f.save.sync(), false);
  assert.equal(f.save.getState().currency.coins, 1);
});
test('network failure keeps local progress; reconnect can retry', async () => {
  const f = fixture(); f.save.setUser('A'); f.save.saveLocal(record(20, 2));
  const good = f.cloud.reconcile; f.cloud.reconcile = async () => { throw Error('unavailable'); };
  assert.equal(await f.save.sync(), false); assert.equal(f.save.status, 'error');
  assert.equal(f.save.getState().currency.coins, 2); f.cloud.reconcile = good;
  assert.equal(await f.save.sync(), true); assert.equal(f.save.status, 'synced');
});
test('update during server request is re-synced rather than overwritten', async () => {
  const f = fixture(); f.save.setUser('A'); f.save.saveLocal(record(10, 1));
  let release; const gate = new Promise(r => { release = r; }); let calls = 0;
  f.cloud.reconcile = async (uid, resolve) => {
    const decision = resolve(f.docs.get(uid) || null);
    if (++calls === 1) await gate;
    if (decision.write) f.docs.set(uid, decision.data);
    return decision.data;
  };
  const p = f.save.sync(); f.save.update({ currency: { coins: 4 } }); release(); await p;
  assert.equal(f.save.getState().currency.coins, 4); assert.equal(f.docs.get('A').currency.coins, 4); assert.equal(calls, 2);
});
test('switching account during pending request never hydrates new account', async () => {
  const f = fixture(); f.save.setUser('A'); let release;
  f.cloud.reconcile = () => new Promise(r => { release = r; });
  const p = f.save.sync(); f.save.setUser('B'); release(record(500, 100));
  assert.equal(await p, false); assert.equal(f.save.getState().currency.coins, 0);
});
test('transaction retry resolves against latest remote version', async () => {
  const f = fixture(); f.save.setUser('A'); f.save.saveLocal(record(10, 1));
  f.cloud.reconcile = async (uid, resolve) => {
    resolve(null); const final = resolve(record(20, 9));
    assert.equal(final.write, false); return final.data;
  };
  await f.save.sync(); assert.equal(f.save.getState().currency.coins, 9);
});
test('AuthService guest, Google sign in, listener and logout', async () => {
  const auth = new AuthService(); assert.equal(auth.getState().guest, true);
  await assert.rejects(auth.loginGoogle());
  let cb, providerCalls = 0;
  auth.attach({ onAuthStateChanged: fn => { cb = fn; return () => {}; },
    loginGoogle: async () => { providerCalls++; cb({ uid: 'google-uid', email: 'player@example.test' }); },
    logout: async () => cb(null) });
  await auth.loginGoogle(); assert.equal(providerCalls, 1); assert.equal(auth.getState().user.uid, 'google-uid');
  await auth.logout(); assert.equal(auth.getState().guest, true);
});
test('storage read failure on account switch never uploads previous account', async () => {
  const f = fixture(); f.save.setUser('A'); f.save.saveLocal(record(10, 100));
  f.storage.getItem = () => { throw Error('SecurityError'); };
  f.save.setUser('B');
  assert.equal(f.save.getState().currency.coins, 0); assert.equal(f.save.persisted, false);
  assert.equal(await f.save.sync(), false); assert.equal(f.writes.length, 0);
  assert.equal(f.save.status, 'error');
});
