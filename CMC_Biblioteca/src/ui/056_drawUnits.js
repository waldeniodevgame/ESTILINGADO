  function drawUnits(c,t){
    for(const u of game.units){
      if(!u.alive)continue;const color=teamColor(u.team),selected=u.id===game.activeId&&scene==='game',moving=game.phase==='moving'&&game.shot.actorId===u.id;
      c.save();c.translate(u.x,u.y);c.fillStyle='#0a1c17ab';c.beginPath();c.arc(0,2,C.radius+3,0,Math.PI*2);c.fill();
      c.strokeStyle=color+'b0';c.lineWidth=1.7;c.beginPath();c.arc(0,0,C.radius+3,0,Math.PI*2);c.stroke();
      if(selected){
        c.strokeStyle=color;c.lineWidth=2;c.setLineDash([5,5]);c.lineDashOffset=-t*12;c.beginPath();c.arc(0,0,C.radius+8+(reducedMotion?0:Math.sin(t*3)*1),0,Math.PI*2);c.stroke();c.setLineDash([]);
        c.fillStyle=color;c.beginPath();c.moveTo(-4,-36);c.lineTo(4,-36);c.lineTo(0,-30);c.closePath();c.fill();
      }
      c.restore();if(u.type===3&&Number.isFinite(u.facingAngle)){c.save();c.translate(u.x,u.y);c.rotate(u.facingAngle+Math.PI/2);monsterArt(c,u.type,0,0,17,t,moving);c.restore();}else monsterArt(c,u.type,u.x,u.y,17,t,moving);
       c.fillStyle='#081811e0';c.fillRect(u.x-19,u.y+26,38,4);c.fillStyle=u.hp/u.maxHP<.25?'#ed9c81':color;c.fillRect(u.x-19,u.y+26,38*u.hp/u.maxHP,4);
      if(u.slowNextForce>0){c.save();c.font='bold 8px system-ui';c.textAlign='center';const label=`−${u.slowNextForce}%`;const badgeWidth=36;c.fillStyle='#102d38e8';c.strokeStyle='#72dfff';c.lineWidth=1;c.beginPath();c.roundRect(u.x+17,u.y-31,badgeWidth,15,6);c.fill();c.stroke();c.fillStyle='#b8f2ff';c.fillText(label,u.x+35,u.y-20);c.restore();}
      if(!moving){c.textAlign='center';c.font=selected?'bold 10px system-ui':'9px system-ui';c.fillStyle=selected?'#f1f3e7':'#becaba';c.fillText(T[u.type].name,u.x,u.y+42);}
      if(selected&&game.focus){c.strokeStyle=gold+'99';c.lineWidth=1;c.beginPath();c.arc(u.x,u.y,C.radius+12,0,Math.PI*2);c.stroke();}
    }
  }
