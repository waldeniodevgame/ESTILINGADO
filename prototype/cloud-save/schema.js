(function (root) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const object = v => v !== null && typeof v === 'object' && !Array.isArray(v);
  function safe(value) {
    if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
    if (typeof value === 'number' && Number.isFinite(value)) return;
    if (!object(value) && !Array.isArray(value)) throw Error('Save contém valor não serializável.');
    for (const key of Object.keys(value)) {
      if (['__proto__', 'constructor', 'prototype'].includes(key)) throw Error('Chave inválida no save.');
      safe(value[key]);
    }
  }
  function defaults() {
    return { schemaVersion: 1, updatedAt: 0, buildVersion: 'v0.5-cloud-save-v1',
      campaign: { unlockedStage: 1, completedStages: [] }, currency: { coins: 0, fragments: 0 },
      collection: { captains: {}, monsters: {}, upgrades: {} },
      settings: { sound: true, music: true }, stats: {} };
  }
  function validate(data) {
    safe(data);
    if (!object(data) || Object.keys(data).some(k => !Object.hasOwn(defaults(), k)) || data.schemaVersion !== 1) throw Error('Versão de save não suportada.');
    const integer = v => Number.isSafeInteger(v) && v >= 0;
    if (!integer(data.updatedAt) || (typeof data.buildVersion !== 'string' || data.buildVersion.length >= 100)) throw Error('Metadados inválidos.');
    if (!object(data.campaign) || !integer(data.campaign.unlockedStage) || !Array.isArray(data.campaign.completedStages)
      || !data.campaign.completedStages.every(v => typeof v === 'string')) throw Error('Campanha inválida.');
    if (!object(data.currency) || !integer(data.currency.coins) || !integer(data.currency.fragments)) throw Error('Moedas inválidas.');
    if (!object(data.collection) || !['captains', 'monsters', 'upgrades'].every(k => object(data.collection[k]))) throw Error('Coleção inválida.');
    if (!object(data.settings) || typeof data.settings.sound !== 'boolean' || typeof data.settings.music !== 'boolean' || !object(data.stats)) throw Error('Preferências inválidas.');
    if (JSON.stringify(data).length > 200000) throw Error('Save excede limite de tamanho.');
    return clone(data);
  }
  function merge(base, partial) {
    safe(partial);
    if (!object(partial)) throw Error('Atualização inválida.');
    const out = clone(base);
    for (const key of Object.keys(partial)) out[key] = object(partial[key]) && object(out[key]) ? merge(out[key], partial[key]) : clone(partial[key]);
    return out;
  }
  function migrate(data) {
    safe(data);
    if (!object(data)) throw Error('Save inválido.');
    // V0: same model without schemaVersion (or with 0); missing fields gain defaults.
    if (data.schemaVersion === undefined || data.schemaVersion === 0) return validate(merge(defaults(), { ...data, schemaVersion: 1 }));
    return validate(data);
  }
  const api = { defaults, validate, migrate, merge, clone };
  if (typeof module !== 'undefined') module.exports = api;
  else root.CapsuleSchema = api;
})(globalThis);
