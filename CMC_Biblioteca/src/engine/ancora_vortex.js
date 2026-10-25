  function castAnchorVortex(g,x,y) {
    const a=active(g);if(g.winner!==null||g.phase!=='planning'||!a||!a.alive||a.type!==12||a.cooldown>0||!Number.isFinite(x)||!Number.isFinite(y))return false;
    x=clamp(x,C.left,C.right);y=clamp(y,C.top,C.bottom);a.cooldown=ANCHOR.cooldownOwnTurns;
    const vortex={id:'vortex-'+g.turn+'-'+g.events.length,owner:a.id,team:a.team,x,y,radius:C.radius*ANCHOR.radiusInCreatureRadii,remaining:ANCHOR.durationSeconds,damageClock:ANCHOR.damageIntervalSeconds,elapsed:0,draggedEnemyIds:{}};
    g.vortices.push(vortex);event(g,'anchor-cast',{actor:a.id,x,y,radius:vortex.radius,duration:ANCHOR.durationSeconds,damage:ANCHOR.damagePerTick,interval:ANCHOR.damageIntervalSeconds});
    g.records.push({turn:g.turn,team:g.team,actor:a.id,action:'anchor-vortex',x,y});
    g.cursors[a.team]=(a.slot+1)%4;g.phase='vortex';return true;
  }
  function stepWorld(g,dt) {
    if(!g||g.winner!==null||g.phase!=='vortex'||!Array.isArray(g.vortices)||!Number.isFinite(dt)||!(dt>0))return;
    const duration=ANCHOR.durationSeconds,epsilon=1e-9;
    // Integral de sin²(pi*t/duração): início e fim com velocidade zero.
    const envelopeIntegral=t=>t/2-duration*Math.sin(2*Math.PI*t/duration)/(4*Math.PI);
    for(const v of [...g.vortices]){
      let available=Math.min(dt,v.remaining);
      while(available>epsilon&&v.remaining>epsilon){
        // Divide no instante de cada pulso: dano em 0,5; 1; 1,5; 2; 2,5; 3 s.
        const step=Math.min(available,v.remaining,v.damageClock);
        const end=Math.min(duration,v.elapsed+step);
        const weightedTime=Math.max(0,envelopeIntegral(end)-envelopeIntegral(v.elapsed));
        for(const u of g.units){
          if(!u.alive||u.id===v.owner)continue;
          const dx=v.x-u.x,dy=v.y-u.y,d=Math.hypot(dx,dy);
          if(d>v.radius||d<=ANCHOR.coreStopDistance)continue;
          const gap=d-ANCHOR.coreStopDistance,cap=ANCHOR.pullSpeed;
          let nextGap=gap,budget=weightedTime;
          // Integra velocidade limitada e aproximação proporcional à distância.
          if(cap>0){
            const threshold=cap*duration;
            if(nextGap>threshold){const linearTime=Math.min(budget,(nextGap-threshold)/cap);nextGap-=cap*linearTime;budget-=linearTime;}
            nextGap*=Math.exp(-budget/duration);
          }
          const travel=Math.max(0,Math.min(gap,gap-nextGap));
          u.x+=dx/d*travel;u.y+=dy/d*travel;
        }
        v.elapsed=end;v.remaining=Math.max(0,duration-end);v.damageClock-=step;available-=step;
        if(v.damageClock<=epsilon){
          // Presença na área, inclusive junto ao núcleo: independe de movimento.
          for(const u of g.units){
            if(u.alive&&u.team!==v.team&&Math.hypot(u.x-v.x,u.y-v.y)<=v.radius+epsilon){
              applyDamage(g,u,ANCHOR.damagePerTick,v.owner,'anchor-vortex');
            }
          }
          v.damageClock+=ANCHOR.damageIntervalSeconds;
          settleDeaths(g);
          if(checkVictory(g)){g.vortices=[];return;}
        }
      }
      if(v.remaining<=epsilon){v.remaining=0;v.elapsed=duration;event(g,'anchor-expire',{id:v.id,x:v.x,y:v.y});g.vortices=g.vortices.filter(item=>item!==v);}
    }
    if(g.phase==='vortex'&&g.vortices.length===0&&g.winner===null){g.team=1-g.team;beginTurn(g);}
  }
