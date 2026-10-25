  function ability(g, source, target, power, direction) {
    if(!g.special || source.id!==g.activeId || g.shot.specialDone)return;
    g.shot.specialDone=true;power=g.boost?F.specialBoost:1;
    const type=source.type;
    event(g,'ability',{actor:source.id,target:target.id,key:TYPES[type].key,x:target.x,y:target.y});
    if(type===0){for(const u of alive(g,1-source.team))if(distance(u,target)<F.specials.furnaceRadius)applyDamage(g,u,F.specials.impactDamage*power,source.id,'area');}
    else if(type===1){const u=alive(g,1-source.team).filter(u=>u.id!==target.id).sort((a,b)=>distance(a,target)-distance(b,target))[0];if(u)applyDamage(g,u,F.specials.chainDamage,source.id,'chain');}
    else if(type===2)target.marked=true;
    else if(type===3){target.vx=0;target.vy=0;applyDamage(g,target,Math.round(F.specials.impactDamage*power),source.id,'ability');}
    else if(type===4){g.shot.vx*=F.specials.turbineMultiplier;g.shot.vy*=F.specials.turbineMultiplier;}
    else if(type===5)applyDamage(g,target,Math.min(F.specials.bounceDamageCap,g.shot.bounces*F.specials.bounceDamage),source.id,'ricochet');
    else if(type===6){for(const u of alive(g,1-source.team))if(u.id!==target.id&&distance(u,target)<F.specials.magnetRadius)displace(g,u,target.x-u.x,target.y-u.y,F.specials.magnetImpulse,source.id);}
    else if(type===7)g.shot.pierce=true;
    else if(type===8){for(const u of alive(g,1-source.team)){const d=distance(u,target),radius=F.portalRadius*C.radius;if(d<=radius)applyDamage(g,u,Math.round(F.portalDamage*(1-d/radius)),source.id,'portal');}event(g,'portal-damage',{actor:source.id,x:target.x,y:target.y,radius:F.portalRadius*C.radius,maxDamage:F.portalDamage});}
    else if(type===9){const u=alive(g,source.team).sort((a,b)=>(b.maxHP-b.hp)-(a.maxHP-a.hp))[0];heal(g,u,F.specials.repairHeal,source.id,'repair');}
    else if(type===10)target.shield=Math.max(0,(target.shield||0)-F.specials.shieldBreak);
    else if(type===11)applyDamage(g,target,Math.round((g.shot.lastAssist||F.specials.echoFallback)*F.specials.echoMultiplier),source.id,'echo');
    else if(type===12)target.slowNext=true;
    else if(type===13)g.shot.reactor=true;
    else if(type===14)displace(g,target,-direction.y,direction.x,F.specials.orbitImpulse,source.id);
    else if(type===15){const mag=Math.hypot(direction.x,direction.y)||1;source.x=clamp(target.x+direction.x/mag*F.specials.phaseDistance,C.left+C.radius,C.right-C.radius);source.y=clamp(target.y+direction.y/mag*F.specials.phaseDistance,C.top+C.radius,C.bottom-C.radius);separate(g,source);event(g,'portal',{x:target.x,y:target.y,toX:source.x,toY:source.y});}

  }
