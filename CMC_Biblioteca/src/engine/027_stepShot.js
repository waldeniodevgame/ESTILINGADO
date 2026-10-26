  function stepShot(g) {
    if (g.phase !== 'moving' || !g.shot || g.shot.done) return false;
    const s = g.shot, a = unit(g, s.actorId);
    if (!a || !a.alive) { s.done = true; return false; }
    const actorProfile=PHYSICS_PROFILES[a.type];
    if(!s.echoPassLocks)s.echoPassLocks={};
    for(const pair of Object.keys(s.echoPassLocks)){
      const [movingId,echoId]=pair.split('|'),echo=unit(g,echoId),moving=unit(g,movingId);
      const reach=(PHYSICS_PROFILES[moving?.type]?.collisionRadius??C.radius)+(PHYSICS_PROFILES[echo?.type]?.collisionRadius??C.radius);
      if(!echo||!moving||distance(moving,echo)>reach+1)delete s.echoPassLocks[pair];
    }
    /* Um líder também pode atingir um inimigo estacionário dentro de sua área. */
    for (const l of g.leaders) if (l.hp > 0 && !s.guardUsed[l.team]) {
      const target = alive(g, 1 - l.team).filter(u => distance(u, l) <= C.guardRadius).sort((x, y) => distance(x, l) - distance(y, l) || x.id.localeCompare(y.id))[0];
      if (target) triggerGuard(g, l.team, target);
    }
    if (!a.alive) { s.done = true; return false; }
    for(const u of alive(g,0).concat(alive(g,1))){
      if(u.id===a.id)continue;
      if(s.hammerLock?.id===u.id){u.x=s.hammerLock.x;u.y=s.hammerLock.y;u.vx=0;u.vy=0;continue;}
      u.vx=u.vx||0;u.vy=u.vy||0;
      const oldX=u.x,oldY=u.y;u.x+=u.vx*C.dt;u.y+=u.vy*C.dt;
      const stepX=u.x-oldX,stepY=u.y-oldY;
      const priorMonsterHit=s.hitIds.some(id=>!!unit(g,id)&&id!==a.id);
      if(a.type!==11&&priorMonsterHit){
        for(const echo of g.units){
          if(!echo.alive||echo.type!==11||echo.id===u.id)continue;
          const pair=u.id+'|'+echo.id;if(s.echoBumpIds.includes(pair))continue;
          const radius=(PHYSICS_PROFILES[u.type]?.collisionRadius??C.radius)+(PHYSICS_PROFILES[echo.type]?.collisionRadius??C.radius);
          const entry=circleEntry(oldX,oldY,stepX,stepY,echo.x,echo.y,radius,false);
          if(entry===null)continue;
          u.x=oldX+stepX*entry;u.y=oldY+stepY*entry;
          const nx0=u.x-echo.x,ny0=u.y-echo.y,mag=Math.hypot(nx0,ny0)||1,nx=nx0/mag,ny=ny0/mag;
          const speedBefore=Math.hypot(u.vx,u.vy),dot=u.vx*nx+u.vy*ny;
          if(dot<0){u.vx-=2*dot*nx;u.vy-=2*dot*ny;}
          u.vx*=ECHO_BUMP_MULTIPLIER;u.vy*=ECHO_BUMP_MULTIPLIER;s.echoBumpIds.push(pair);u.x+=nx*.2;u.y+=ny*.2;
          event(g,'echo-bump',{actor:a.id,target:u.id,bumper:echo.id,team:u.team,x:echo.x,y:echo.y,toX:u.x,toY:u.y,speedBefore,speedAfter:Math.hypot(u.vx,u.vy),multiplier:ECHO_BUMP_MULTIPLIER,afterMonsterCollision:true,movedUnit:true});
          break;
        }
      }
      let wall=null;
      if(u.x<C.left+C.radius){u.x=C.left+C.radius;u.vx=Math.abs(u.vx)*C.wallBounce;wall='left';}
      if(u.x>C.right-C.radius){u.x=C.right-C.radius;u.vx=-Math.abs(u.vx)*C.wallBounce;wall='right';}
      if(u.y<C.top+C.radius){u.y=C.top+C.radius;u.vy=Math.abs(u.vy)*C.wallBounce;wall='top';}
      if(u.y>C.bottom-C.radius){u.y=C.bottom-C.radius;u.vy=-Math.abs(u.vy)*C.wallBounce;wall='bottom';}
      const danger=wall&&((wall==='left'||wall==='right')?u.y>=240&&u.y<=360:u.x>=420&&u.x<=540);
      if(wall&&(danger||g.wall)){
        const key=u.id+wall;s.wallHits=s.wallHits||{};
        if((s.wallHits[key]||0)<2){s.wallHits[key]=(s.wallHits[key]||0)+1;applyDamage(g,u,12+(g.specialization==='strategist'&&!s.strategistUsed?4:0),a.id,'wall');s.strategistUsed=true;s.comboCount++;event(g,'combo',{actor:a.id,target:u.id,count:s.comboCount,x:u.x,y:u.y,toX:u.x,toY:u.y});}
      }
      const damp=Math.pow(C.damping,C.dt*60);u.vx*=damp;u.vy*=damp;
      if(Math.hypot(u.vx,u.vy)<C.stopSpeed)u.vx=u.vy=0;
      separate(g,u);
    }
    settleDeaths(g);
    if(s.hammerPending){
      const pending=s.hammerPending;
      pending.remaining-=C.dt;
      if(pending.remaining<=1e-9){
        const target=entity(g,pending.targetId),profile=PHYSICS_PROFILES[a.type];
        s.hammerPending=null;
        const angle=target?Math.atan2(target.y-a.y,target.x-a.x):pending.angle;
        const friendlyCaptain=!!(target&&!('alive' in target)&&target.team===a.team);
        const targetAlive=!!(target&&target.hp>0&&(!('alive' in target)||target.alive));
        if(targetAlive&&!friendlyCaptain){
          const hammerDamage=TYPES[a.type].attack*profile.hammerDamageMultiplier*formation(g,a.team);
          applyDamage(g,target,hammerDamage,a.id,'hammer');
          if('alive' in target&&target.alive){target.vx=0;target.vy=0;}
          settleDeaths(g);
        }
        event(g,'hammer',{actor:a.id,target:pending.targetId,targetKind:target&&!('alive' in target)?'captain':'creature',friendly:friendlyCaptain,x:target?target.x:pending.x,y:target?target.y:pending.y,fromX:a.x,fromY:a.y,angle,speed:pending.speed,stage:2});
      }
    }
    let remaining = C.dt, loops = 0;
    while (remaining > 1e-9 && loops++ < 12 && a.alive) {
      const dx = s.vx * remaining, dy = s.vy * remaining;
      const hit = nextContact(g, a, dx, dy);
      if (!hit) { a.x += dx; a.y += dy; break; }
      a.x += dx * hit.t; a.y += dy * hit.t;
      remaining *= 1 - hit.t;
      if(hit.type==='echo-pass'){
        const pair=a.id+'|'+hit.id;s.echoPassLocks[pair]=true;
        event(g,'echo-pass',{actor:a.id,echo:hit.id,reason:hit.reason,x:a.x,y:a.y});
        continue;
      }
      if(hit.type==='echo'){
        const bumper=unit(g,hit.id);if(!bumper)break;
        const ddx=a.x-bumper.x,ddy=a.y-bumper.y,mag=Math.hypot(ddx,ddy)||1;
        const nx=ddx/mag,ny=ddy/mag,dot=s.vx*nx+s.vy*ny,speedBefore=Math.hypot(s.vx,s.vy);
        if(dot<0){s.vx-=2*dot*nx;s.vy-=2*dot*ny;}
        s.vx*=ECHO_BUMP_MULTIPLIER;s.vy*=ECHO_BUMP_MULTIPLIER;
        const pair=a.id+'|'+bumper.id;s.echoBumpIds.push(pair);
        if(bumper.team===a.team)activateCombo(g,bumper);
        a.x+=nx*.2;a.y+=ny*.2;
        event(g,'echo-bump',{actor:a.id,target:a.id,bumper:bumper.id,team:a.team,x:bumper.x,y:bumper.y,toX:a.x,toY:a.y,speedBefore,speedAfter:Math.hypot(s.vx,s.vy),multiplier:ECHO_BUMP_MULTIPLIER,afterMonsterCollision:true,movedUnit:false});
        continue;
      }
      if (hit.type === 'ally') {
        const crossed=unit(g,hit.id);
         if(a.type===0){
          if(!s.furnaceAllyIds.includes(crossed.id)){
            s.furnaceAllyIds.push(crossed.id);
            s.furnaceAllyCount=s.furnaceAllyIds.length;
            event(g,'furnace-ally-pass',{actor:a.id,ally:crossed.id,count:s.furnaceAllyCount,x:crossed.x,y:crossed.y});
          }
          continue;
        }
         if (a.type===2){
          s.glacialRank=Math.min(3,(s.glacialRank||0)+1);
          const frostDamage=F.frostDamage[s.glacialRank],slowPercent=F.frostSlow[s.glacialRank];
          event(g,'frost-charge',{actor:a.id,ally:hit.id,rank:s.glacialRank,damage:frostDamage,slowPercent,x:crossed.x,y:crossed.y});
        } else if(a.type===7){
          s.drillRank=Math.min(3,(s.drillRank||0)+1);
          const forcePercent=F.drillForcePercent[s.drillRank],damagePercent=F.drillDamagePercent[s.drillRank];
          if(forcePercent||damagePercent)event(g,'drill-charge',{actor:a.id,ally:hit.id,rank:s.drillRank,forcePercent,damagePercent,x:crossed.x,y:crossed.y});
        } else if(a.type===4){
          s.turbineRank=Math.min(3,(s.turbineRank||0)+1);const percent=F.turbinePercent[s.turbineRank];
          s.vx*=1+percent/100;s.vy*=1+percent/100;event(g,'turbine-charge',{actor:a.id,ally:hit.id,rank:s.turbineRank,percent,x:crossed.x,y:crossed.y});
        }
        activateCombo(g,crossed); continue;
      }
      if (hit.type === 'guard') { triggerGuard(g, hit.team, a); continue; }
      let nx, ny;
      if (hit.type === 'wall') {
        nx = hit.nx; ny = hit.ny;
        event(g, 'bounce', { actor: a.id, x: a.x, y: a.y });
      } else {
        const target = hit.type === 'enemy' ? unit(g, hit.id) : leaderById(g, hit.id);
        if(!target)break;
        const friendlyCaptain=hit.type==='leader'&&target.team===a.team;
        const ddx = a.x - target.x, ddy = a.y - target.y, mag = Math.hypot(ddx, ddy) || 1;
        nx = ddx / mag; ny = ddy / mag;
        if (!s.solidContact) s.solidContact = { id: target.id, x: a.x, y: a.y };
        const contactSpeed=Math.hypot(s.vx,s.vy),profile=PHYSICS_PROFILES[a.type];
        const heavyContact=profile?.impactStyle==='two-hit-hammer'&&(hit.type==='leader'||(hit.type==='enemy'&&!s.hammerUsed));
        if(hit.type==='leader')event(g,'captain-contact',{team:target.team,attacker:a.id,target:target.id,friendly:friendlyCaptain,x:target.x,y:target.y});
        if(a.type===0&&!friendlyCaptain&&(hit.type==='enemy'||hit.type==='leader')){
          if(!s.hitIds.includes(target.id)){
            s.hitIds.push(target.id);
            const blast=planFurnaceExplosion(g,a,target);
            resolveFurnaceExplosion(g,a,target,blast);
            s.firstHit=true;
            if(g.special&&!s.specialDone)ability(g,a,target,1,{x:s.vx,y:s.vy});
          }
          s.vx=0;s.vy=0;s.furnaceStopped=true;s.done=true;
          event(g,'furnace-stop',{actor:a.id,target:target.id,x:a.x,y:a.y});
          break;
        }
        if(a.type===13&&hit.type!=='wall'&&!a.reactorAttached){a.reactorAttached={id:target.id,ox:a.x-target.x,oy:a.y-target.y};a.x=target.x+a.reactorAttached.ox;a.y=target.y+a.reactorAttached.oy;s.vx=0;s.vy=0;s.done=true;event(g,'reactor-stick',{actor:a.id,target:target.id,x:a.x,y:a.y});continue;}
        if(a.type===4&&hit.type==='enemy'&&!s.turbineImpact){s.turbineImpact=true;s.vx*=2;s.vy*=2;event(g,'turbine-impact',{actor:a.id,target:target.id,multiplier:2,speed:contactSpeed*2,x:target.x,y:target.y});}
        if (!s.hitIds.includes(target.id)) {
          s.hitIds.push(target.id);
          if(!friendlyCaptain){
            const drillRank=a.type===7?Math.min(3,s.drillRank||0):0;
            const drillDamageMultiplier=F.drillDamageMultiplier[drillRank];
            const drillForceMultiplier=F.drillForceMultiplier[drillRank];
            if(a.type===7){s.vx*=drillForceMultiplier;s.vy*=drillForceMultiplier;}
            attack(g,a,target,1,hit.type,{x:s.vx,y:s.vy},(heavyContact?profile.impactDamageMultiplier:1)*drillDamageMultiplier);
          }
        }
        if(heavyContact){
          s.hammerUsed=true;
          const angle=Math.atan2(target.y-a.y,target.x-a.x);
          a.facingAngle=angle;
          if('alive' in target&&target.alive){target.vx=0;target.vy=0;s.hammerLock={id:target.id,x:target.x,y:target.y};}
          s.hammerPending={targetId:target.id,remaining:profile.hammerDelay,angle,x:target.x,y:target.y,speed:contactSpeed,friendly:friendlyCaptain};
          s.vx=0;s.vy=0;
          event(g,'impact',{actor:a.id,target:target.id,targetKind:hit.type==='leader'?'captain':'creature',friendly:friendlyCaptain,x:target.x,y:target.y,fromX:a.x,fromY:a.y,angle,speed:contactSpeed,stage:1});
          break;
        }
      }
      if(s.pierce&&hit.type==='enemy'){s.pierce=false; a.x+=s.vx*C.dt;a.y+=s.vy*C.dt;continue;}
      const dot = s.vx * nx + s.vy * ny;
      if (dot < 0) { s.vx -= 2 * dot * nx; s.vy -= 2 * dot * ny; }
      const restitution = hit.type === 'wall' ? C.wallBounce : C.enemyBounce;
      s.vx *= restitution; s.vy *= restitution;
      a.x += nx * .04; a.y += ny * .04;
      s.bounces++;
    }
    const speed = Math.hypot(s.vx, s.vy);
    const factor = Math.pow(C.damping, C.dt * 60);
    s.vx *= factor; s.vy *= factor;
    s.elapsed += C.dt; s.ticks++;
    if (s.ticks % 3 === 0) { s.trail.push({ x: a.x, y: a.y }); if (s.trail.length > 28) s.trail.shift(); }
    if (!a.alive || (!s.hammerPending && speed < C.stopSpeed && alive(g,1-a.team).every(u=>Math.hypot(u.vx||0,u.vy||0)<C.stopSpeed)) || s.elapsed >= C.maxSeconds || s.bounces >= C.maxBounces) s.done = true;
    return !s.done;
  }
