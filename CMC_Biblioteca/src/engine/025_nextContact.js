  function nextContact(g, actor, dx, dy) {
    const contacts = [], s = g.shot;
    function add(t, type, id, extra = {}) { if (t !== null && t >= -1e-8 && t <= 1 + 1e-8) contacts.push({ t: clamp(t, 0, 1), type, id, ...extra }); }
    if (dx < 0) add((C.left + C.radius - actor.x) / dx, 'wall', 'wall-left', { nx: 1, ny: 0 });
    if (dx > 0) add((C.right - C.radius - actor.x) / dx, 'wall', 'wall-right', { nx: -1, ny: 0 });
    if (dy < 0) add((C.top + C.radius - actor.y) / dy, 'wall', 'wall-top', { nx: 0, ny: 1 });
    if (dy > 0) add((C.bottom - C.radius - actor.y) / dy, 'wall', 'wall-bottom', { nx: 0, ny: -1 });
    for (const u of g.units) {
      if (!u.alive || u.id === actor.id) continue;
      const otherRadius=PHYSICS_PROFILES[u.type]?.collisionRadius??C.radius;
      const contactRadius=(PHYSICS_PROFILES[actor.type]?.collisionRadius??C.radius)+otherRadius;
      if(actor.type===0&&u.team===actor.team){
        if(!s.furnaceAllyIds?.includes(u.id))add(circleEntry(actor.x,actor.y,dx,dy,u.x,u.y,contactRadius,true),'ally',u.id);
        continue;
      }
      if(u.type===11){
        const pair=actor.id+'|'+u.id,launcher=unit(g,s.actorId);
        if(s.echoBumpIds?.includes(pair)||s.echoPassLocks?.[pair])continue;
        const priorMonsterHit=s.hitIds.some(id=>!!unit(g,id)&&id!==actor.id);
        const ready=!!launcher&&launcher.type!==11&&priorMonsterHit;
        const allowInside=u.team===actor.team;
        add(circleEntry(actor.x,actor.y,dx,dy,u.x,u.y,contactRadius,allowInside),ready?'echo':'echo-pass',u.id,{reason:launcher?.type===11?'echo-launcher':'needs-impact'});
        continue;
      }
      if (u.team === actor.team) {
        if (!s.comboIds.includes(u.id)) add(circleEntry(actor.x, actor.y, dx, dy, u.x, u.y, contactRadius, true), 'ally', u.id);
      } else {
        add(circleEntry(actor.x, actor.y, dx, dy, u.x, u.y, contactRadius, false), 'enemy', u.id);
      }
    }
    for(const captain of g.leaders){
      if(captain.hp<=0)continue;
      const friendly=captain.team===actor.team;
      add(circleEntry(actor.x,actor.y,dx,dy,captain.x,captain.y,C.radius+C.leaderRadius,false),'leader',captain.id,{team:captain.team,friendly});
      if(!friendly&&!s.guardUsed[captain.team])add(circleEntry(actor.x,actor.y,dx,dy,captain.x,captain.y,C.guardRadius,true),'guard',captain.id,{team:captain.team});
    }
    contacts.sort((a, b) => a.t - b.t || ({ guard: 0, enemy: 1, echo: 2, 'echo-pass': 3, ally: 4, leader: 5, wall: 6 }[a.type] - { guard: 0, enemy: 1, echo: 2, 'echo-pass': 3, ally: 4, leader: 5, wall: 6 }[b.type]) || a.id.localeCompare(b.id));
    return contacts[0] || null;
  }
