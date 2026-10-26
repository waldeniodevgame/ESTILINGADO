  function finishShot(g) {
    if (g.phase !== 'moving' || !g.shot || !g.shot.done) return false;
    const a = unit(g, g.shot.actorId);
    for(const u of alive(g,0).concat(alive(g,1))){u.vx=0;u.vy=0;}
    if (a && a.alive && !(a.type===0&&g.shot.furnaceStopped)) separate(g, a);
    if(a)a.charge=Math.min(3,(a.charge||0)+Math.floor((g.shot.eventsCount||0)/3));
    syncReactorAttachments(g);
    const summary = { damage: Object.values(g.shot.damageByTarget).reduce((a,b)=>a+b,0), actor: g.shot.actorId, combos: g.shot.comboCount, hits: g.shot.hitIds.length };
    event(g, 'shot-end', summary);
    if(g.shot.reactor && a){for(const u of alive(g,1-a.team))if(distance(a,u)<=100)applyDamage(g,u,Math.min(18,6+g.shot.bounces*3),a.id,'reactor');settleDeaths(g);}
    if (a) g.cursors[a.team] = (a.slot + 1) % 4;
    if (!checkVictory(g)) { g.team = 1 - g.team; beginTurn(g); }
    return true;
  }
