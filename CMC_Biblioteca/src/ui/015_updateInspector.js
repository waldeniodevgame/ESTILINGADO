  function updateInspector(){
    if(!$('creatureInspector'))return;
    let u=E.unit(game,selectedInspectorId);if(!u){u=game.units.find(item=>item.alive)||game.units[0];selectedInspectorId=u?.id;}if(!u)return;
    const data=T[u.type],profile=E.PHYSICS_PROFILES[u.type];$('inspectName').textContent=data.name;$('inspectSkill').textContent=data.skill;$('inspectDescription').textContent=data.desc+' Combo ao atravessar aliado: '+E.COMBO_PROFILES[u.type].summary+(u.slowNextForce?` Penalidade ativa: −${u.slowNextForce}% de força no próximo lançamento.`:'');$('inspectHP').textContent=`${u.hp} / ${u.maxHP}`;$('inspectSpeed').textContent=`${Math.round(profile.maxSpeed*profile.launchMultiplier)} px/s`;$('inspectAttack').textContent=`${data.attack} dano`;$('inspectType').textContent=profile.role;$('inspectTeam').textContent=u.team?'EQUIPE AMETISTA':'EQUIPE JADE';$('creatureInspector').style.setProperty('--inspect-color',data.color);
    drawPortrait($('inspectPortrait'),u.type,100);for(const card of document.querySelectorAll('.monster-card'))card.classList.toggle('inspect-selected',card.dataset.unit===u.id);
  }
