  function render(){
    ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,C.width,C.height);ctx.save();
    if(shake>0&&!reducedMotion)ctx.translate(Math.sin(visualTime*67)*shake,Math.cos(visualTime*79)*shake);
    if(cameraPunch&&!reducedMotion){const p=Math.max(0,1-cameraPunch.age/cameraPunch.life),eased=p*p*(3-2*p),zoom=1+.07*eased,focusX=C.width/2+(cameraPunch.x-C.width/2)*.08,focusY=C.height/2+(cameraPunch.y-C.height/2)*.08;ctx.translate(C.width/2,C.height/2);ctx.scale(zoom,zoom);ctx.translate(-focusX,-focusY);}
    drawField(ctx,visualTime);drawFurnaceLavas(ctx,visualTime);drawAnchorVortices(ctx,visualTime);
    drawTutorialGuide(ctx);
    for(const l of game.leaders)drawLeader(ctx,l,visualTime);
    if(game.phase==='moving'&&game.shot){const trail=game.shot.trail;for(let i=0;i<trail.length;i++){ctx.fillStyle=teamColor(game.team)+Math.round(15+i/trail.length*50).toString(16).padStart(2,'0');ctx.beginPath();ctx.arc(trail[i].x,trail[i].y,2+i/trail.length*6,0,Math.PI*2);ctx.fill();}}
    if(drag)drawAim(ctx,drag,preview);else if(aiAim&&game.phase==='planning')drawAim(ctx,aiAim,aiAim.preview,true);
    drawHammerLatch(ctx);drawUnits(ctx,visualTime);drawEffects(ctx);ctx.restore();updateTutorialHand();
  }
