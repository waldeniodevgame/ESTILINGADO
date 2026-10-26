  function frame(now){
    const dt=lastFrame?Math.min(.06,(now-lastFrame)/1000):0;lastFrame=now;
    const frozen=paused||isModal()||document.hidden;
    if(!frozen){
      const timeScale=impactHold>0?0:impactSlowRemaining>0?impactSlowRate:1;
      visualTime+=dt;shake=Math.max(0,shake-dt*12);
      if(cameraPunch){cameraPunch.age+=dt;if(cameraPunch.age>=cameraPunch.life)cameraPunch=null;}
      if(impactHold>0)impactHold=Math.max(0,impactHold-dt);else if(impactSlowRemaining>0)impactSlowRemaining=Math.max(0,impactSlowRemaining-dt);
      effects=effects.filter(f=>(f.age+=dt)<f.life);if(comboBanner)comboBanner.ttl-=dt;
      if(scene==="game"){
        E.stepWorld(game,dt);if(game.events.length!==seenEvents)consumeEvents();
        if(game.phase==="moving"){
          accumulator+=dt*timeScale;let steps=0;
          while(accumulator>=C.dt&&game.phase==="moving"&&steps++<12){E.stepShot(game);accumulator-=C.dt;if(game.shot.done){E.finishShot(game);accumulator=0;}}
          if(game.events.length!==seenEvents)consumeEvents();
        }else updateAI(dt);
      }
    }else accumulator=0;
    render();requestAnimationFrame(frame);
  }
  window.EloArena=Object.freeze({getState:()=>E.clone(game),start:startGame,fire:launch,useSkill:humanSkill,pause:()=>togglePause(true),resume:()=>togglePause(false)});
  if(location.hash==='#qa')window.EloQA=Object.freeze({setState:state=>{game=E.clone(state);scene=game.phase==='over'?'result':'game';paused=false;drag=null;preview=null;seenEvents=game.events.length;aiToken=0;aiAim=null;effects=[];accumulator=0;$('welcomeOverlay').hidden=true;$('pauseOverlay').hidden=true;$('resultOverlay').hidden=game.phase!=='over';buildRosters();if(game.phase==='over')showResult();updateHUD();},getPreview:()=>preview});
  let selected=[3,2,1,11],enemySelected=[0,6,4,5];
  let progress;try{progress=JSON.parse(localStorage.getItem('estilingadoProgress')||'{}');}catch{progress={};}
  const originalResult=showResult;let savedMatch=null;showResult=function(){if(savedMatch!==game){savedMatch=game;for(const u of game.units.filter(u=>u.team===0)){progress[u.type]=(progress[u.type]||0)+PROGRESS.monsterReward;}progress.commander=(progress.commander||0)+PROGRESS.captainReward;try{localStorage.setItem('estilingadoProgress',JSON.stringify(progress));}catch{}}originalResult();};

  const picker=$('teamPicker');
  let inspected=3;
  const synergies={{DATA:ui_synergies}};
