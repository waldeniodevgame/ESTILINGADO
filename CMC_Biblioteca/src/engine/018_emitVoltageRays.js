  function emitVoltageRays(g, ally, launcher, rank) {
    const lastInRotation=!alive(g,launcher.team).some(u=>u.slot>launcher.slot);
    const tier=rank===1?1:rank===2?2:(rank>=3&&lastInRotation?3:2);
    const count=F.lightningCount[tier],damage=F.lightningDamage[tier],hitIds=[];
    for(let i=0;i<count;i++){
      const living=alive(g,1-launcher.team);if(!living.length)break;
      let pool=living.filter(u=>!hitIds.includes(u.id));if(!pool.length)pool=living;
      const target=pool[Math.floor(random(g)*pool.length)];hitIds.push(target.id);
      event(g,'lightning',{actor:ally.id,launcher:launcher.id,target:target.id,x:ally.x,y:ally.y,toX:target.x,toY:target.y,index:i+1,count,damage,tier,rank,seed:(g.turn*17+i*7+rank*13)%97});
      applyDamage(g,target,damage,ally.id,'lightning');settleDeaths(g);
    }
  }
