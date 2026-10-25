  function drawField(c,t){
    const bg=c.createLinearGradient(0,0,C.width,C.height);bg.addColorStop(0,'#1d2929');bg.addColorStop(1,'#102521');c.fillStyle=bg;c.fillRect(0,0,C.width,C.height);
    const midX=C.width/2;
    c.fillStyle='#9ee8d50b';c.fillRect(C.left,C.top,midX-C.left,C.bottom-C.top);
    c.fillStyle='#ed9bbd0b';c.fillRect(midX,C.top,C.right-midX,C.bottom-C.top);
    c.strokeStyle='#bdd7c40d';c.lineWidth=1;c.beginPath();for(let x=40;x<C.width;x+=40){c.moveTo(x,24);c.lineTo(x,C.bottom);}for(let y=40;y<C.height;y+=40){c.moveTo(24,y);c.lineTo(C.right,y);}c.stroke();
    c.strokeStyle='#b7c8991e';c.setLineDash([5,9]);c.beginPath();c.moveTo(midX,C.top+10);c.lineTo(midX,C.bottom-10);c.stroke();c.setLineDash([]);
    c.strokeStyle='#b7c89922';for(const r of [90,118,150]){c.beginPath();c.arc(midX,300,r,0,Math.PI*2);c.stroke();}
    c.save();c.translate(midX,300);c.rotate(Math.PI/4);c.strokeRect(-65,-65,130,130);c.restore();
    c.save();c.shadowColor='#d4efc8';c.shadowBlur=11;c.strokeStyle='#d4efc8cc';c.lineWidth=4;c.strokeRect(C.left,C.top,C.right-C.left,C.bottom-C.top);c.restore();
    c.strokeStyle='#f0f0c777';c.lineWidth=1;c.strokeRect(C.left+5,C.top+5,C.right-C.left-10,C.bottom-C.top-10);
    c.strokeStyle='#ff526e';c.shadowColor='#ff526e';c.shadowBlur=16;c.lineWidth=10;c.beginPath();c.moveTo(C.left,240);c.lineTo(C.left,360);c.moveTo(C.right,240);c.lineTo(C.right,360);c.moveTo(midX-60,24);c.lineTo(midX+60,24);c.moveTo(midX-60,576);c.lineTo(midX+60,576);c.stroke();c.shadowBlur=0;
    c.strokeStyle='#ffd2d9';c.lineWidth=2;c.beginPath();for(const x of [C.left,C.right])for(let y=250;y<355;y+=18){c.moveTo(x-4,y);c.lineTo(x+4,y+8);}for(const y of [24,576])for(let x=midX-50;x<midX+50;x+=18){c.moveTo(x,y-4);c.lineTo(x+8,y+4);}c.stroke();
    c.fillStyle='#a6b49755';c.font='9px system-ui';c.textAlign='center';c.fillText('REATOR DE COMBOS',midX,304);
  }
