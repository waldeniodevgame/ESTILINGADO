  function drawLeader(c,l,t){
    const color=teamColor(l.team),used=game.shot&&game.shot.guardUsed[l.team];
    const attached=game.phase==='moving'&&game.shot?.hammerPending?.targetId===l.id;
    c.save();c.globalAlpha=l.hp<=0?.35:1;
    const glow=c.createRadialGradient(l.x,l.y,13,l.x,l.y,C.guardRadius);glow.addColorStop(0,l.team?'#ed9bbd18':'#9ee8d518');glow.addColorStop(1,'#ffffff00');c.fillStyle=glow;c.beginPath();c.arc(l.x,l.y,C.guardRadius,0,Math.PI*2);c.fill();
    c.strokeStyle=used?'#8b9a8744':l.team?'#c092b74a':'#9ebcab4a';c.lineWidth=1;c.setLineDash([4,6]);c.beginPath();c.arc(l.x,l.y,C.guardRadius,0,Math.PI*2);c.stroke();c.setLineDash([]);
    c.translate(l.x,l.y);
    c.fillStyle='#0a181ae8';c.beginPath();c.arc(0,0,28+(attached?2+Math.sin(t*20)*1.5:0),0,Math.PI*2);c.fill();
    c.strokeStyle=attached?'#fff0b1':color+'bb';c.lineWidth=attached?2.5:1.5;c.beginPath();c.arc(0,0,29+(attached?2:0),0,Math.PI*2);c.stroke();
    c.strokeStyle=color;c.lineWidth=2.4;c.beginPath();c.arc(0,0,32,-Math.PI/2,-Math.PI/2+Math.PI*2*l.hp/l.maxHP);c.stroke();
    c.save();if(l.team===1)c.scale(-1,1);
    c.fillStyle=l.team?'#563f60':'#35564c';c.strokeStyle=color+'dd';c.lineWidth=1.8;c.beginPath();c.moveTo(0,-21);c.lineTo(15,-5);c.lineTo(11,17);c.lineTo(-11,17);c.lineTo(-15,-5);c.closePath();c.fill();c.stroke();
    c.fillStyle=l.team?'#b594ba':'#98cdb5';c.beginPath();c.moveTo(0,-14);c.lineTo(8,-2);c.lineTo(0,11);c.lineTo(-8,-2);c.closePath();c.fill();
    c.strokeStyle='#172f29';c.lineWidth=3;c.beginPath();c.moveTo(-4,0);c.lineTo(4,0);c.stroke();c.strokeStyle=gold;c.lineWidth=1.4;c.beginPath();c.moveTo(19,-12);c.lineTo(19,15);c.moveTo(19,-17);c.lineTo(22,-13);c.lineTo(19,-9);c.lineTo(16,-13);c.closePath();c.stroke();c.restore();
    c.fillStyle='#d1d4c7dd';c.font='bold 8px system-ui';c.textAlign='center';c.fillText('CAPITÃO '+teamName(l.team).toUpperCase(),0,45);
    c.restore();
  }
