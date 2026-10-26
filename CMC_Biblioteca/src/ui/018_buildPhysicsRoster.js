  function buildPhysicsRoster(){
    const body=$('physicsRosterBody');if(!body)return;
    body.replaceChildren();
    E.PHYSICS_PROFILES.forEach((profile,index)=>{
      const row=document.createElement('tr');if(profile.impactStyle==='two-hit-hammer')row.dataset.calibration='first';
      const impact=profile.impactStyle==='two-hit-hammer'?'Para, prende e aplica martelada':profile.impactStyle==='blast-on-contact'?'Explosão até '+profile.blastMaxDamage+'; raio '+profile.blastRadius+'× criatura':'Ricochete base; medir';
      const values=[T[index].name,profile.role,profile.weightClass,`${profile.collisionRadius} px`,`${Math.round(profile.maxSpeed*profile.launchMultiplier)} px/s`,String(profile.pushImpulse),String(T[index].attack),impact];
      for(const value of values){const cell=document.createElement('td');cell.textContent=value;row.append(cell);}
      body.append(row);
    });
  }
