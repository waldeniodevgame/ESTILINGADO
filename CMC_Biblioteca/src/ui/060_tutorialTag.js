  function tutorialTag(c,text,x,y,color){
    c.save();c.font='bold 9px system-ui';c.textAlign='center';const w=Math.max(62,c.measureText(text).width+14);
    c.fillStyle='#0a1715e8';c.strokeStyle=color+'aa';c.lineWidth=1;c.beginPath();c.roundRect(x-w/2,y-10,w,20,7);c.fill();c.stroke();
    c.fillStyle=color;c.fillText(text,x,y+3);c.restore();
  }
