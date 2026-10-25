  function openMonster(type){
    cancelAim(false);const data=T[type];$('monsterTitle').textContent=data.name;$('monsterSkill').textContent=data.skill;
    $('monsterDescription').textContent=data.desc;$('monsterMaxHP').textContent=data.hp;$('monsterAttack').textContent=data.attack;
    drawPortrait($('monsterLarge'),type,240);$('monsterDialog').showModal();updateHUD();
  }
