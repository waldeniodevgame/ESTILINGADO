  function updateTutorialHand(){
    const hand=$('tutorialHand'),a=E.active(game);
    const visible=guidedPractice&&!firstTutorialOnly&&!guidedDone.aim&&scene==='game'&&!paused&&humanTurn()&&game.phase==='planning'&&!drag&&!!a;
    hand.hidden=!visible;
    if(!visible)return;
    const frame=$('arenaFrame').getBoundingClientRect(),rect=canvas.getBoundingClientRect();
    const x=rect.left-frame.left+a.x*rect.width/C.width;
    const y=rect.top-frame.top+Math.min(C.height-24,a.y+44)*rect.height/C.height;
    hand.style.left=x+'px';hand.style.top=y+'px';
  }
