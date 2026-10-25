  function pointerPoint(event){const r=canvas.getBoundingClientRect();return{x:(event.clientX-r.left)*C.width/r.width,y:(event.clientY-r.top)*C.height/r.height,inside:event.clientX>=0&&event.clientX<=window.innerWidth&&event.clientY>=0&&event.clientY<=window.innerHeight};}
  canvas.addEventListener('pointerdown',event=>{
    if(event.button!==0||drag)return;
    const p=pointerPoint(event),scale=canvas.getBoundingClientRect().width/C.width;
    if(anchorTargeting){if(!humanTurn())return;event.preventDefault();anchorTargeting=false;anchorAim=null;if(E.castAnchorVortex(game,p.x,p.y)){consumeEvents();updateHUD();}return;}
    const tapped=[...game.units].reverse().find(u=>u.alive&&Math.hypot(p.x-u.x,p.y-u.y)<=Math.max(C.radius+8,24/scale));
    if(tapped){selectInspector(tapped.id);if(!humanTurn()||tapped.id!==E.active(game)?.id)return;}
    if(!humanTurn())return;event.preventDefault();
    const a=E.active(game);
    if(a.type===12){toast('Use Morteiro para escolher o núcleo do vórtice.');return;}
    if(Math.hypot(p.x-a.x,p.y-a.y)>Math.max(C.radius+9,24/scale)){toast(`Segure ${T[a.type].name}, o monstro destacado.`);return;}
    drag={pointerId:event.pointerId,originX:a.x,originY:a.y,startX:p.x,startY:p.y,dx:0,dy:0,portal:a.type===8};
    try{canvas.setPointerCapture(event.pointerId);}catch(_){}updateHUD();
  },{passive:false});
  canvas.addEventListener('pointermove',event=>{
    if(anchorTargeting){const p=pointerPoint(event);anchorAim={x:E.clamp(p.x,C.left,C.right),y:E.clamp(p.y,C.top,C.bottom)};return;}
    if(!drag||drag.pointerId!==event.pointerId)return;event.preventDefault();
    const p=pointerPoint(event);drag.dx=drag.startX-p.x;drag.dy=drag.startY-p.y;
    preview=drag.portal?{points:[{x:p.x,y:p.y}],impact:{x:p.x,y:p.y},portal:true,radius:5*C.radius}:E.preview(game,drag.dx,drag.dy);updateHUD();
  },{passive:false});
  canvas.addEventListener('pointerup',event=>{
    if(!drag||drag.pointerId!==event.pointerId)return;event.preventDefault();
    const p=pointerPoint(event),dx=drag.startX-p.x,dy=drag.startY-p.y;
    if(!p.inside){cancelAim();return;}
    const portal=drag.portal;cancelAim(false);
    if(portal){if(!launch(p.x,p.y))toast('Escolha um ponto dentro da arena.');}
    else if(!launch(dx,dy))toast('Puxe um pouco mais. Seu turno continua.');
  },{passive:false});
  canvas.addEventListener('pointercancel',event=>{if(drag&&event.pointerId===drag.pointerId)cancelAim(false);});
  canvas.addEventListener('lostpointercapture',event=>{if(drag&&event.pointerId===drag.pointerId)cancelAim(false);});
  canvas.addEventListener('contextmenu',e=>{e.preventDefault();cancelAim();});
  window.addEventListener('blur',()=>cancelAim(false));
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAim(false);if(scene==='game'&&!isModal())togglePause(true);}});
  window.addEventListener('keydown',event=>{
    if(isModal()||['SELECT','INPUT','TEXTAREA'].includes(event.target.tagName))return;
    if(event.key==='Escape'&&(drag||anchorTargeting)){event.preventDefault();cancelAim();}
    else if(event.key.toLowerCase()==='p'&&scene==='game'){event.preventDefault();togglePause();}
    else if(event.key==='1'){if(humanSkill('heal'))event.preventDefault();}
    else if(event.key==='2'){if(humanSkill('focus'))event.preventDefault();}
  });
  $('startBtn').addEventListener('click',()=>startGame());$('againBtn').addEventListener('click',()=>startGame({mode:game.mode,difficulty:game.difficulty}));
  $('menuBtn').addEventListener('click',showMenu);$('restartBtn').addEventListener('click',askRestart);$('pauseRestartBtn').addEventListener('click',askRestart);
  $('pauseBtn').addEventListener('click',()=>togglePause());$('resumeBtn').addEventListener('click',()=>togglePause(false));
  $('helpBtn').addEventListener('click',openHelp);$('guideBtn').addEventListener('click',openHelp);$('pauseHelpBtn').addEventListener('click',openHelp);
  $('healBtn').addEventListener('click',()=>humanSkill('heal'));$('focusBtn').addEventListener('click',()=>humanSkill('focus'));$('cancelBtn').addEventListener('click',()=>cancelAim());
  $('closeHelp').addEventListener('click',()=>$('helpDialog').close());$('closeMonster').addEventListener('click',()=>$('monsterDialog').close());
  $('closeRestart').addEventListener('click',()=>$('restartDialog').close());$('keepPlaying').addEventListener('click',()=>$('restartDialog').close());
  $('confirmRestart').addEventListener('click',()=>{$('restartDialog').close();showMenu();});
  for(const modal of modals)modal.addEventListener('close',()=>{accumulator=0;updateHUD();});
  $('modeSelect').addEventListener('change',()=>{$('difficultySelect').disabled=$('modeSelect').value==='local';game.mode=$('modeSelect').value;updateHUD();});
  $('difficultySelect').addEventListener('change',()=>{game.difficulty=$('difficultySelect').value;updateHUD();});
  $('soundBtn').addEventListener('click',()=>{sound=!sound;unlockAudio();updateSound();try{localStorage.setItem('elo-sound',String(sound));}catch(_){}if(sound)tone('click');});
  $('fullBtn').addEventListener('click',async()=>{
    try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}
    catch(_){toast('Tela cheia indisponível neste navegador. Você pode jogar normalmente.');}
  });
