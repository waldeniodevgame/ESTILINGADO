  function settleDeaths(g) {
    for (const u of g.units) if (u.alive && u.hp <= 0) {
      u.alive = false;
      event(g, 'death', { target: u.id, team: u.team, x: u.x, y: u.y });
      applyDamage(g, g.leaders[u.team], C.lossPerDeath, u.id, 'loss');
    }
    if(g.furnaceLavas)g.furnaceLavas=g.furnaceLavas.filter(lava=>{const owner=unit(g,lava.ownerId);return !!(owner&&owner.alive);});
  }
