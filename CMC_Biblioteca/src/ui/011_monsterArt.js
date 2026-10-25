  function monsterArt(c, type, x, y, r, time = 0, moving = false) {
    if(type<4&&portraitAtlas.complete&&portraitAtlas.naturalWidth){const cell=portraitAtlas.naturalWidth/2, row=portraitAtlas.naturalHeight/2;c.save();c.beginPath();c.arc(x,y,r*1.13,0,Math.PI*2);c.clip();c.drawImage(portraitAtlas,(type%2)*cell,Math.floor(type/2)*row,cell,row,x-r*1.13,y-r*1.13,r*2.26,r*2.26);c.restore();return;}
    c.save();c.translate(x,y);c.scale(r/22,r/22);const col=T[type].color;
    c.fillStyle='#101c35';c.fillRect(-16,-9,32,31);c.fillStyle=col;c.fillRect(-13,-22,26,22);c.fillRect(-22,1,9,18);c.fillRect(13,1,11,16);c.fillRect(-13,18,10,10);c.fillRect(3,18,10,10);
    c.fillStyle='#14243d';c.fillRect(-10,-14,20,7);c.fillStyle='#e8faff';c.fillRect(-7,-12,5,3);c.fillRect(3,-12,5,3);
    c.fillStyle=col;c.fillRect(-10,2,20,12);c.fillStyle='#fff';c.font='bold 9px monospace';c.textAlign='center';c.fillText(String(type+1).padStart(2,'0'),0,12);
    c.fillStyle='#63edff';c.fillRect(19,5,6,7);c.restore();
  }

