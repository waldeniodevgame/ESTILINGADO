  function updateAI(dt){
    if(firstTutorialOnly||scene!=='game'||game.mode!=='ai'||game.team!==1||game.phase!=='planning')return;
    if(aiToken!==game.turn){aiToken=game.turn;aiDelay=.75;aiAim=null;}
    aiDelay-=dt;if(aiDelay>0)return;
    if(!aiAim){
      const activeUnit=E.active(game);if(activeUnit?.type===12&&activeUnit.cooldown===0){const foes=E.alive(game,1-game.team);const point=foes.length?foes.reduce((p,u)=>({x:p.x+u.x/foes.length,y:p.y+u.y/foes.length}),{x:0,y:0}):{x:C.right-C.radius*ANCHOR.radiusInCreatureRadii,y:(C.top+C.bottom)/2};E.castAnchorVortex(game,point.x,point.y);consumeEvents();aiDelay=0;return;}
      const wounded=E.alive(game,game.team).reduce((sum,u)=>sum+u.maxHP-u.hp,0);
      if(E.active(game)?.cooldown===0)E.useSkill(game,'special');
      if(wounded>=35&&game.leaders[1].energy>=C.healCost)E.useSkill(game,'heal');
      else if(game.leaders[1].energy>=C.focusCost)E.useSkill(game,'focus');
      const choice=E.chooseAI(game);
      if(choice){aiAim={...choice,preview:E.preview(game,choice.dx,choice.dy)};aiDelay=.7;consumeEvents();}
    }else{
      const choice=aiAim;aiAim=null;E.startShot(game,choice.dx,choice.dy);accumulator=0;consumeEvents();
    }
  }
