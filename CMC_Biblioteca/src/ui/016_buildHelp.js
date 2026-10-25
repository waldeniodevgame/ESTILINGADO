  function buildHelp() {
    for(let i=0;i<T.length;i++){
      const div=document.createElement('div');div.className='help-monster';
      div.innerHTML=`<canvas aria-hidden="true"></canvas><div><strong style="color:${T[i].color}">${T[i].name}</strong><small>${T[i].short}</small></div>`;
      drawPortrait(div.querySelector('canvas'),i);$('helpMonsters').append(div);
    }
  }
