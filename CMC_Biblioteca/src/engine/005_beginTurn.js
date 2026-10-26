  function beginTurn(g) {
    syncReactorAttachments(g);
    if (g.winner !== null) return;
    if (!alive(g, g.team).length) { checkVictory(g); return; }
    for (let i = 0; i < 4; i++) {
      const slot = (g.cursors[g.team] + i) % 4;
      const u = g.units.find(u => u.team === g.team && u.slot === slot && u.alive);
      if (u) { g.activeId = u.id; break; }
    }
    g.boost=false;g.vector=false;g.circuit=false;g.wall=false;g.max=false;
    g.turn++; g.phase = 'planning'; g.focus = false; g.usedSkills = []; g.shot = null;
    g.leaders[g.team].energy = Math.min(C.maxEnergy, g.leaders[g.team].energy + (g.turn <= 2 ? F.initialEnergy : F.turnEnergy));
    const furnaceConfig=F.furnace||{};
    g.furnaceLavas=(g.furnaceLavas||[]).filter(lava=>{
      const owner=unit(g,lava.ownerId);
      if(!owner||!owner.alive)return false;
      if(g.activeId===lava.ownerId)return false;
      return true;
    });
    for(const lava of g.furnaceLavas){
      for(const enemy of alive(g,1-lava.team)){
        if(Math.hypot(enemy.x-lava.x,enemy.y-lava.y)<=lava.radius){
          applyDamage(g,enemy,furnaceConfig.lavaDamage??15,lava.ownerId,'furnace-lava');
          event(g,'furnace-lava-damage',{actor:lava.ownerId,target:enemy.id,x:enemy.x,y:enemy.y,amount:furnaceConfig.lavaDamage??15,radius:lava.radius});
        }
      }
    }
    settleDeaths(g);if(checkVictory(g))return;
    alive(g,g.team).forEach(u=>{u.cooldown=Math.max(0,u.cooldown-1);if(u.type===13&&u.alive){u.reactorTurns=(u.reactorTurns||0)+1;if(u.reactorTurns>=F.reactorTurns)u.reactorArmed=true;}}); g.special=false;
    const activeUnit=active(g);if(activeUnit?.type===13&&activeUnit.reactorAttached&&activeUnit.reactorArmed){detonateReactor(g,activeUnit);if(g.winner!==null)return;}
    event(g, 'turn', { team: g.team, actor: g.activeId });
  }
