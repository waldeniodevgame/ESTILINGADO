  function attack(g, source, target, power, tag, direction, damageMultiplier=1, damageOverride=null) {
    if(!target||target.hp<=0)return;
    const first=!g.shot.firstHit;
    const amount=damageOverride===null?(TYPES[source.type].attack*power+(g.shot.bonus||0))*damageMultiplier*formation(g,source.team)+(first&&g.focus?F.focusDamage:0):damageOverride;
    g.shot.firstHit=true;g.shot.bonus=0;
    applyDamage(g,target,amount,source.id,tag);
    const frostRank=Math.min(3,g.shot.glacialRank||0);
    if(source.type===2&&frostRank>0&&'alive' in target&&target.hp>0){
      const frostDamage=F.frostDamage[frostRank],slowPercent=F.frostSlow[frostRank];
      target.slowNextForce=Math.max(target.slowNextForce||0,slowPercent);
      const dealt=applyDamage(g,target,frostDamage,source.id,'freeze');
      event(g,'freeze',{actor:source.id,target:target.id,rank:frostRank,damage:dealt,bonus:frostDamage,slowPercent,x:target.x,y:target.y});
    }
    ability(g,source,target,power,direction);
    if('alive' in target){const profile=PHYSICS_PROFILES[source.type];if(profile?.impactStyle==='two-hit-hammer'){target.vx=0;target.vy=0;}else if(source.type!==0){const drillForceMultiplier=source.type===7&&g.shot?.drillRank===1?F.drillForceMultiplier[1]:1;displace(g,target,direction.x,direction.y,(profile?.pushImpulse??180)*(target.marked?1.25:1)*(g.vector?1.25:1)*drillForceMultiplier,source.id);}}
    target.marked=false;
    if(target.echoMark){target.echoMark=false;applyDamage(g,target,10,source.id,'mark');}
    settleDeaths(g);
  }
