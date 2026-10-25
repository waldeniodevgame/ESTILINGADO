  function activateCombo(g, ally) {
    const s=g.shot;
    if(!ally.alive||s.comboIds.includes(ally.id))return;
    s.comboIds.push(ally.id);
    const target=nearestEnemy(g,ally),a=active(g);
    if(!target)return;
    const allyRank=s.comboIds.length,combo=COMBO_PROFILES[ally.type];
    if(!combo)return;
    s.comboCount++;
    if(s.comboCount===4&&g.specialization==='conductor')g.leaders[g.team].energy=Math.min(6,g.leaders[g.team].energy+1);
    g.bestCombo=Math.max(g.bestCombo,s.comboCount);
    event(g,'combo',{actor:ally.id,target:target.id,count:s.comboCount,effect:combo.name,creature:ally.type,x:ally.x,y:ally.y,toX:target.x,toY:target.y});
    let damage=combo.damage;
    switch(combo.key){
      case 'furnace': s.bonus=combo.bonus; break;
      case 'voltage': emitVoltageRays(g,ally,a,allyRank); break;
      case 'glacial': target.marked=true; break;
      case 'marcelo':
      case 'bulwark':
        a.shield=(a.shield||0)+combo.shield+(g.specialization==='engineer'&&!s.shieldBonus?5:0);
        s.shieldBonus=true;
        break;
      case 'turbine': {const rank=Math.min(3,s.turbineRank||1);const mult=F.turbineMultiplier[rank];s.turbineRank=rank+1;s.vx*=mult;s.vy*=mult;break;}
      case 'reactor': a.charge=Math.min(3,(a.charge||0)+1);break;
      case 'rebater': s.bonus=combo.bonus;break;
      case 'magnet': displace(g,target,a.x-target.x,a.y-target.y,combo.impulse,ally.id);break;
      case 'repair': heal(g,a,combo.heal,ally.id,'repair');a.shield=(a.shield||0)+combo.shield;break;
      case 'echo': break;
      case 'anchor': g.vector=true;break;
      case 'reactor': a.charge=Math.min(3,(a.charge||0)+1);break;
      case 'orbit': displace(g,target,a.x-target.x,a.y-target.y,combo.impulse,ally.id);break;
      case 'phase': s.bonus=combo.bonus;break;
      case 'drill':
      case 'prism': break;
    }
    if(damage>0){
      damage*=g.circuit&&!s.circuitUsed?1.5:1;
      s.circuitUsed=true;
      applyDamage(g,target,damage,ally.id,'combo');
      s.lastAssist=damage;
    }
    settleDeaths(g);
  }
