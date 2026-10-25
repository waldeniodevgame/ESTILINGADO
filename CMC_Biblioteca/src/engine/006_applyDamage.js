  function applyDamage(g, target, amount, source, tag = 'hit') {
    if (!target || target.hp <= 0) return 0;
    let raw=Math.max(0,amount);
    if(g.shot && tag!=='loss' && tag!=='guard'){
      const sh=g.shot;sh.eventsCount=(sh.eventsCount||0)+1;
      const exact = tag === 'lightning' || tag === 'freeze' || tag === 'explosion' || tag === 'anchor-vortex' || tag === 'furnace-contact' || tag === 'furnace-lava';
      if(!exact)raw*=1+Math.min(F.damageGrowthSteps,sh.eventsCount-1)*F.damageGrowthPerEvent;
      const spent=sh.damageByTarget[target.id]||0;
      const sourceUnit=unit(g,source);
      const twoImpact=sourceUnit&&PHYSICS_PROFILES[sourceUnit.type]?.impactStyle==='two-hit-hammer';
      const cap=('alive' in target)?(twoImpact?F.hammerMonsterCap:F.monsterDamageCap):(twoImpact?F.hammerCaptainCap:F.captainDamageCap);
      if(!exact)raw=Math.min(raw,Math.max(0,cap-spent));
      sh.damageByTarget[target.id]=spent+Math.round(raw);
    }
    const absorbed=Math.min(target.shield||0,Math.round(raw));target.shield=(target.shield||0)-absorbed;
    const dealt = Math.min(target.hp, Math.max(0, Math.round(raw)-absorbed));
    target.hp -= dealt;
    event(g, 'damage', { target: target.id, source, amount: dealt, tag, x: target.x, y: target.y });
    return dealt;
  }
