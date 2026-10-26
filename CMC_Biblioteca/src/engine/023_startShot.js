  function startShot(g, dx, dy) {
    if (g.phase !== 'planning') return false;
    const a = active(g), v = shotVector(dx, dy);
    if (!v || !a || !a.alive || a.type===12 || (a.type===13&&a.reactorAttached)) return false;
    const profile = PHYSICS_PROFILES[a.type] || PHYSICS_PROFILES[0];
    v.vx *= profile.launchMultiplier; v.vy *= profile.launchMultiplier;
    const slowPercent=clamp(Number(a.slowNextForce)||0,0,80);
    if(slowPercent>0){v.vx*=1-slowPercent/100;v.vy*=1-slowPercent/100;a.slowNextForce=0;event(g,'slow-consumed',{target:a.id,percent:slowPercent,x:a.x,y:a.y});}
    if(a.slowNext){v.vx*=F.anchorSlow;v.vy*=F.anchorSlow;a.slowNext=false;}
    if(g.vector){v.vx*=F.vectorSpeedMultiplier??2;v.vy*=F.vectorSpeedMultiplier??2;g.vector=false;event(g,'vector-consumed',{actor:a.id,multiplier:F.vectorSpeedMultiplier??2,x:a.x,y:a.y});}
    g.phase = 'moving';
    g.shot = { actorId: a.id, vx: v.vx, vy: v.vy, elapsed: 0, ticks: 0, bounces: 0,
      hitIds: [], comboIds: [], furnaceAllyIds: [], furnaceAllyCount: 0, comboCount: 0, glacialRank: 0, drillRank: 0, turbineRank: 0, turbineImpact: false, echoBumpIds: [], echoPassLocks: {}, guardUsed: [false, false],
      damageByTarget: {}, eventsCount: g.max?1:0, focus: g.focus, done: false, solidContact: null, trail: [],
      hammerPending:null, hammerUsed:false };
    g.records.push({ turn: g.turn, team: g.team, actor: a.id, dx, dy, skills: [...g.usedSkills] });
    event(g, 'launch', { actor: a.id, team: a.team, x: a.x, y: a.y });
    return true;
  }
