  function resolveFurnaceExplosion(g, source, centerTarget, plan) {
    const furnace=F.furnace||{};
    applyDamage(g,centerTarget,furnace.contactDamage??20,source.id,'furnace-contact');
    event(g,'furnace-contact',{actor:source.id,target:centerTarget.id,x:centerTarget.x,y:centerTarget.y,amount:furnace.contactDamage??20});
    event(g,'explosion',{actor:source.id,target:centerTarget.id,x:plan.x,y:plan.y,radius:plan.radius,maxDamage:plan.maxDamage,baseDamage:plan.baseDamage,bonusPercent:plan.bonusPercent,allyCount:plan.allyCount,durationSeconds:plan.durationSeconds,targetCount:plan.targets.length,targets:plan.targets.map(item=>({id:item.unit.id,distance:item.distance,damage:item.damage}))});
    for(const item of plan.targets){
      if(!item.unit.alive||item.unit.hp<=0)continue;
      applyDamage(g,item.unit,item.damage,source.id,'explosion');
    }
    const radius=furnace.lavaRadius??88;
    g.furnaceLavas=(g.furnaceLavas||[]).filter(lava=>lava.ownerId!==source.id);
    g.furnaceLavas.push({ownerId:source.id,team:source.team,x:source.x,y:source.y,radius,createdTurn:g.turn,durationOwnTurns:furnace.lavaDurationOwnTurns??1});
    event(g,'furnace-lava-create',{actor:source.id,x:source.x,y:source.y,radius,damage:furnace.lavaDamage??15,durationOwnTurns:furnace.lavaDurationOwnTurns??1});
    settleDeaths(g);
  }
