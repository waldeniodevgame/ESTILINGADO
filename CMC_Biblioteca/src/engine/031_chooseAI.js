  function chooseAI(g) {
    const a = active(g);
    if (!a || g.phase !== 'planning') return null;
    const easy = g.difficulty === 'relaxed';
    const candidates = [], targets = [...alive(g, 1 - g.team), g.leaders[1 - g.team], ...alive(g, g.team).filter(u => u.id !== a.id)];
    for (const target of targets) {
      const aimPoints = [{ x: target.x, y: target.y }];
      if (!easy) aimPoints.push(
        { x: 2 * (C.left + C.radius) - target.x, y: target.y },
        { x: 2 * (C.right - C.radius) - target.x, y: target.y },
        { x: target.x, y: 2 * (C.top + C.radius) - target.y },
        { x: target.x, y: 2 * (C.bottom - C.radius) - target.y }
      );
      for (const point of aimPoints) {
        const angle = Math.atan2(point.y - a.y, point.x - a.x);
        for (const power of easy ? [.7, 1] : [.55, .8, 1]) candidates.push({ dx: Math.cos(angle) * C.maxDrag * power, dy: Math.sin(angle) * C.maxDrag * power });
      }
    }
    const divisions = easy ? 12 : 32;
    for (let i = 0; i < divisions; i++) candidates.push({ dx: Math.cos(i / divisions * Math.PI * 2) * C.maxDrag, dy: Math.sin(i / divisions * Math.PI * 2) * C.maxDrag });
    const originalEnemy = alive(g, 1 - g.team).reduce((v, u) => v + u.hp, 0);
    const originalOwn = alive(g, g.team).reduce((v, u) => v + u.hp, 0);
    let best = null, bestScore = -Infinity;
    for (const candidate of candidates) {
      const result = simulate(g, candidate.dx, candidate.dy);
      const enemyDamage = originalEnemy - alive(result, 1 - g.team).reduce((v, u) => v + u.hp, 0);
      const ownLoss = originalOwn - alive(result, g.team).reduce((v, u) => v + u.hp, 0);
      let score = enemyDamage * 1.1 - ownLoss * .8
        + (g.leaders[1 - g.team].hp - result.leaders[1 - g.team].hp) * 2.5
        - (g.leaders[g.team].hp - result.leaders[g.team].hp) * 2.5
        + result.shot.comboCount * 1.4;
      if (!alive(result, 1 - g.team).length || result.leaders[1 - g.team].hp <= 0) score += 1000;
      if (!alive(result, g.team).length || result.leaders[g.team].hp <= 0) score -= 1000;
      if (score > bestScore) { bestScore = score; best = candidate; }
    }
    if (easy && best && random(g) < .2) {
      const angle = Math.atan2(best.dy, best.dx) + (random(g) - .5) * .13;
      const power = Math.hypot(best.dx, best.dy);
      best = { dx: Math.cos(angle) * power, dy: Math.sin(angle) * power };
    }
    return best;
  }
  globalThis.EloEngine = Object.freeze({ C, ANCHOR, TYPES, PHYSICS_PROFILES, COMBO_PROFILES, clone, scaleFieldX, clamp, distance, alive, active, unit, leaderById, entity, createGame, beginTurn, useSkill, castAnchorVortex, stepWorld, shotVector, startShot, startPortal, stepShot, finishShot, simulate, preview, chooseAI, checkVictory, separate });
})();

