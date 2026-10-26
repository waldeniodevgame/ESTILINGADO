  function buildRosters() {
    for(const team of [0,1]){
      const parent=$(team?'enemyRoster':'playerRoster');parent.replaceChildren();
      for(const u of game.units.filter(u=>u.team===team)){
        const type=T[u.type], button=document.createElement('button');
        button.className='monster-card';button.dataset.unit=u.id;button.style.setProperty('--monster-color',type.color);
        button.setAttribute('aria-label',`Ver ${type.name}: ${type.short}`);
        button.innerHTML=`<canvas class="portrait" aria-hidden="true"></canvas><div class="monster-info"><strong>${type.name}</strong><small>${type.short}</small><div class="tiny-bar"><i></i></div></div><span class="monster-pv"></span>`;
        drawPortrait(button.querySelector('canvas'),u.type);button.addEventListener('click',()=>selectInspector(u.id));parent.append(button);
      }
    }
    updateInspector();
  }
