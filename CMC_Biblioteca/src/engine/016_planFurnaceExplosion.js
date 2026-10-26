  function planFurnaceExplosion(g, source, centerTarget) {
    const x=centerTarget.x,y=centerTarget.y;
    const profile=PHYSICS_PROFILES[source.type]||PHYSICS_PROFILES[0];
    const furnace=F.furnace||{},baseDamage=profile.blastMaxDamage??50;
    const allyCount=Math.min(3,g.shot?.furnaceAllyCount||0);
    const bonusPercent=(furnace.allyComboBonusPercent||[0,15,30,50])[allyCount]??0;
    const maxDamage=Math.round(baseDamage*(100+bonusPercent)/100);
    const radius=(profile.blastRadius??5)*(profile.collisionRadius??C.radius);
    const targets=alive(g,1-source.team).map(unit=>{
      const d=Math.hypot(unit.x-x,unit.y-y);
      return {unit,distance:d,damage:Math.max(0,Math.round(maxDamage*(1-d/radius)))};
    }).filter(item=>item.distance<=radius&&item.damage>0);
    if(!targets.some(item=>item.unit.id===centerTarget.id))targets.push({unit:centerTarget,distance:0,damage:maxDamage});
    targets.sort((a,b)=>a.distance-b.distance||a.unit.id.localeCompare(b.unit.id));
    return {x,y,radius,maxDamage,baseDamage,bonusPercent,allyCount,targets,durationSeconds:furnace.explosionDurationSeconds??.42};
  }
