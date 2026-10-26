  function drawTutorialGuide(c){
    if(anchorTutorial())return;
    const a=E.active(game);
    const focused=firstTutorialOnly&&scene==='game'&&!paused&&humanTurn()&&game.phase==='planning'&&!drag&&!!a;
    if(focused){
      const target=E.unit(game,'1-0'),accent=voltageTutorial()?'#ffe168':glacialTutorial()?'#72dfff':echoTutorial()?'#ed9fdf':furnaceTutorial()?'#ff925e':'#9ee8d5';
      c.save();c.globalAlpha=.82;c.strokeStyle=accent;c.lineWidth=2;c.setLineDash([6,7]);c.beginPath();c.moveTo(a.x,a.y);c.lineTo(target.x,target.y);c.stroke();c.setLineDash([]);
       tutorialSupportIds().forEach((id,index)=>{const ally=E.unit(game,id);if(!ally)return;c.beginPath();c.arc(ally.x,ally.y,C.radius+12+Math.sin(visualTime*3)*2,0,Math.PI*2);c.stroke();
        const label=tutorialStage==='marcelo'?'MARCELO PASSA AQUI':echoTutorial()?'ECO · BUMP +50%':`${glacialTutorial()?'ALIADO ':''}${index+1} · ${T[ally.type].name.toUpperCase()}`;
        tutorialTag(c,label,ally.x,ally.y-C.radius-19,accent);
      });
      if(echoTutorial()){
       const echo=E.unit(game,'0-1');if(echo){c.strokeStyle=accent;c.setLineDash([3,6]);c.beginPath();c.moveTo(target.x,target.y);c.lineTo(echo.x,echo.y);c.stroke();c.setLineDash([]);tutorialTag(c,'RETORNO APÓS O IMPACTO',(target.x+echo.x)/2,(target.y+echo.y)/2-18,accent);}
      }
      if(furnaceTutorial()){
        const blastRadius=furnaceProfile.blastRadius*C.radius;
        c.globalAlpha=.28;c.fillStyle='#ff925e';c.beginPath();c.arc(target.x,target.y,blastRadius,0,Math.PI*2);c.fill();
        c.globalAlpha=.9;c.strokeStyle='#ffb46b';c.lineWidth=2;c.setLineDash([8,7]);c.beginPath();c.arc(target.x,target.y,blastRadius,0,Math.PI*2);c.stroke();c.setLineDash([]);
        for(const foe of E.alive(game,1-a.team)){
          const d=Math.hypot(foe.x-target.x,foe.y-target.y);
          if(d<=blastRadius){const amount=Math.max(0,Math.round(furnaceProfile.blastMaxDamage*(1-d/blastRadius)));tutorialTag(c,foe.id==='1-0'?furnaceProfile.blastMaxDamage+' NO CENTRO':'−'+amount,foe.x,foe.y-C.radius-20,'#ffb46b');}
        }
      }
      c.strokeStyle=furnaceTutorial()?'#ffb46b':'#ffd477';c.beginPath();c.arc(target.x,target.y,C.radius+12+Math.sin(visualTime*3)*2,0,Math.PI*2);c.stroke();
      tutorialTag(c,furnaceTutorial()?'BOT · CENTRO DA EXPLOSÃO':echoTutorial()?'BOT · PRIMEIRO IMPACTO':'BOT · ALVO DE EXEMPLO',target.x,target.y-C.radius-19,furnaceTutorial()?'#ffb46b':'#ffd477');c.restore();
    }
    if(!guidedPractice||guidedDone.aim||scene!=='game'||paused||!humanTurn()||game.phase!=='planning'||drag||!a)return;
    const endY=Math.min(C.height-28,a.y+48+Math.max(0,Math.sin(visualTime*3))*10);
    c.save();c.globalAlpha=.6;c.strokeStyle='#fff1d2';c.lineWidth=2;c.setLineDash([7,7]);
    c.beginPath();c.moveTo(a.x,a.y+18);c.lineTo(a.x,endY);c.stroke();c.setLineDash([]);
    c.restore();
  }
