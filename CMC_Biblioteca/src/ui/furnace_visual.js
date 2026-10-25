  function drawFurnaceLavas(c,t){
    for(const lava of game.furnaceLavas||[]){
      c.save();
      c.translate(lava.x,lava.y);
      const pulse=1+Math.sin(t*4.5+lava.x*.01)*.035;
      c.globalAlpha=.62;
      const g=c.createRadialGradient(0,0,4,0,0,lava.radius*pulse);
      g.addColorStop(0,'#ffd66a99');g.addColorStop(.38,'#ff7d3d88');g.addColorStop(1,'#8d211500');
      c.fillStyle=g;c.beginPath();c.arc(0,0,lava.radius*pulse,0,Math.PI*2);c.fill();
      c.globalAlpha=.78;c.strokeStyle='#ff9a4d';c.lineWidth=2;c.setLineDash([8,5]);c.beginPath();c.arc(0,0,lava.radius*pulse,0,Math.PI*2);c.stroke();c.setLineDash([]);
      c.globalAlpha=.55;c.strokeStyle='#ffd16a';c.lineWidth=1.5;c.beginPath();c.arc(0,0,lava.radius*.62,0,Math.PI*2);c.stroke();
      c.restore();
    }
  }
