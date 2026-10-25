  function renderTutorialMonsterCards(){
    const grid=$("tutorialMonsterGrid");if(!grid)return;
    grid.innerHTML=TUTORIAL_CARD_ORDER.map(index=>{
      const lesson=TUTORIAL_LESSONS[index],data=T[index];
      const status=lesson?lesson.stages.length+" LIÇ"+(lesson.stages.length===1?"ÃO":"ÕES")+" DISPONÍVEIS":"EM BREVE";
      const detail=lesson?lesson.stages.map(stage=>stage.title).join(" · "):data.skill;
      return '<button class="tutorial-monster-card'+(lesson?" is-ready":"")+'" type="button" data-tutorial-monster="'+index+'" '+(lesson?"":"disabled")+' aria-label="'+data.name+(lesson?", abrir tutoriais":", tutorial em breve")+'"><canvas width="96" height="96" aria-hidden="true"></canvas><span class="tutorial-card-copy"><span class="tutorial-card-status">'+status+'</span><strong>'+data.name+'</strong><small>'+detail+'</small></span></button>';
    }).join("");
    grid.querySelectorAll("[data-tutorial-monster]").forEach(button=>{
      drawPortrait(button.querySelector("canvas"),+button.dataset.tutorialMonster,96);
      button.onclick=()=>showTutorialCharacter(+button.dataset.tutorialMonster);
    });
  }
