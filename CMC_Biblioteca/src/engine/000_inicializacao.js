
/* ESTILINGADO 0.1 — simulação independente da interface, em passo fixo. */
(() => {
  'use strict';
  const ANCHOR = Object.freeze({{DATA:ancora_vortex}});
  const F = {{DATA:efeitos_e_escalas}};
  const C = Object.freeze({...{{DATA:arena}}, ...{{DATA:fisica_global}}, ...{{DATA:capitao}}});
  const TYPES = Object.freeze({{DATA:monstros}});
  const PHYSICS_PROFILES = Object.freeze({{DATA:fisica_monstros}}.map(value => Object.freeze(value)));
  const COMBO_PROFILES = Object.freeze({{DATA:combos}}.map(value => Object.freeze(value)));
  const SQUAD_OFFSETS = Object.freeze({{DATA:formacao}}.map(value => Object.freeze(value)));
  const ECHO_BUMP_MULTIPLIER=COMBO_PROFILES[11].multiplier;
  const clone = value => JSON.parse(JSON.stringify(value));
  const scaleFieldX = x => C.left + (x - 24) * C.horizontalScale;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const alive = (g, team) => g.units.filter(u => u.team === team && u.alive);
  const active = g => g.units.find(u => u.id === g.activeId);
  const unit = (g, id) => g.units.find(u => u.id === id);
  const leaderById = (g, id) => g.leaders.find(l => l.id === id);
  const entity = (g, id) => unit(g, id) || leaderById(g, id);
  const event = (g, type, data = {}) => { g.events.push({ n: g.events.length, turn: g.turn, type, ...data }); };
