  function useSkill(g, key) {
    if (g.phase !== 'planning') return false;
    if(key==='charge'){const u=active(g);if(!u.charge||g.boost)return false;u.charge--;g.boost=true;return true;}
    if(key==='special'){const u=active(g); if(u.cooldown||g.special)return false;g.special=true;u.cooldown=4;return true;}
    if(g.usedSkills.length)return false;
    const l = g.leaders[g.team];
    if (key === 'heal') {
      const wounded = alive(g, g.team).filter(u => u.hp < u.maxHP);
      if (l.energy < C.healCost || !wounded.length) return false;
      l.energy -= C.healCost;
      event(g, 'skill', { team: g.team, key });
      heal(g, wounded.sort((a,b)=>(b.maxHP-b.hp)-(a.maxHP-a.hp))[0], F.captainHeal, l.id, 'team');
    } else if (key === 'focus') {
      if (l.energy < C.focusCost || g.focus) return false;
      l.energy -= C.focusCost; g.focus = true;
      event(g, 'skill', { team: g.team, key });
    } else if (key === 'max') {
      const costs=F.captainCosts,damage=F.protocolDamage??50;
      if(l.energy<costs[key])return false;
      l.energy-=costs[key];
      const enemies=alive(g,1-g.team),enemyLeader=g.leaders[1-g.team];
      for(const enemy of enemies)applyDamage(g,enemy,damage,l.id,'protocol');
      applyDamage(g,enemyLeader,damage,l.id,'protocol');
      settleDeaths(g);checkVictory(g);
      event(g,'skill',{team:g.team,key,damage,targetCount:enemies.length,leaderTarget:enemyLeader.id});
    } else {const costs=F.captainCosts;if(!costs[key]||l.energy<costs[key])return false;l.energy-=costs[key];g[key]=true;}
    g.usedSkills.push(key);
    return true;
  }
