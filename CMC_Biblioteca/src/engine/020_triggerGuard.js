  function triggerGuard(g, team, target) {
    const s = g.shot;
    if (s.guardUsed[team] || !target.alive) return;
    s.guardUsed[team] = true;
    const leader = g.leaders[team];
    if (leader.hp <= 0) return;
    event(g, 'guard', { team, source: leader.id, target: target.id, x: leader.x, y: leader.y, toX: target.x, toY: target.y });
    applyDamage(g, target, C.guardDamage, leader.id, 'guard');
    settleDeaths(g);
  }
