  function drawEffects(c){
    for(const f of effects){const p=f.age/f.life;c.save();c.globalAlpha=Math.max(0,1-p);c.strokeStyle=f.color;c.fillStyle=f.color;
      if(f.kind==='text'){c.textAlign='center';c.font='bold 15px system-ui';c.shadowColor='#061510';c.shadowBlur=4;c.fillText(f.text,f.x,f.y-p*30);}
      else if(f.kind==='ring'){c.lineWidth=(1-p)*3+1;c.beginPath();c.arc(f.x,f.y,6+p*f.radius,0,Math.PI*2);c.stroke();}
      else if(f.kind==='hammer'){
        const swing=(1-p)*1.15;c.save();c.globalAlpha*=.64;c.translate(f.x,f.y);c.rotate(f.angle-Math.PI/2+swing);c.lineCap='round';
        c.save();c.globalAlpha*=.34;c.translate(-6,3);c.strokeStyle='#65452f';c.lineWidth=5;c.beginPath();c.moveTo(0,13);c.lineTo(0,-12);c.stroke();c.fillStyle='#d7ad72';c.fillRect(-10,-22,20,11);c.restore();
        c.strokeStyle='#65452f';c.lineWidth=5;c.beginPath();c.moveTo(0,13);c.lineTo(0,-12);c.stroke();c.fillStyle='#d7ad72';c.fillRect(-10,-22,20,11);c.strokeStyle='#fff0b1';c.lineWidth=1.5;c.strokeRect(-10,-22,20,11);c.restore();
        c.lineWidth=2+(1-p)*2;c.beginPath();c.arc(f.x,f.y,16+p*29,Math.PI*1.08,Math.PI*1.88);c.stroke();
      }
      else if(f.kind==='beam'){c.lineWidth=1.5+2*(1-p);c.shadowColor=f.color;c.shadowBlur=9;c.beginPath();c.moveTo(f.x,f.y);c.lineTo(f.toX,f.toY);c.stroke();c.beginPath();c.arc(f.x+(f.toX-f.x)*Math.min(1,p*2),f.y+(f.toY-f.y)*Math.min(1,p*2),4,0,Math.PI*2);c.fill();}
      else if(f.kind==='lightning'){
        const dx=f.toX-f.x,dy=f.toY-f.y,len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len;
        c.shadowColor='#ffe168';c.shadowBlur=13;c.lineCap='round';
        for(const [stroke,width] of [['#fff9c7',4],['#ffe168',2]]){
          c.strokeStyle=stroke;c.lineWidth=width*(.7+.3*(1-p));c.beginPath();
          for(let i=0;i<=7;i++){const t=i/7,jitter=(i===0||i===7)?0:Math.sin(i*13.1+f.seed)*13*(.55+p*.45),x=f.x+dx*t+nx*jitter,y=f.y+dy*t+ny*jitter;i?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();
        }
      }
      else if(f.kind==='spark'){c.beginPath();c.arc(f.x+f.vx*f.age,f.y+f.vy*f.age,3*(1-p)+1,0,Math.PI*2);c.fill();}
      else if(f.kind==='flash'){const g=c.createRadialGradient(f.x,f.y,1,f.x,f.y,f.radius*(.55+p*.45));g.addColorStop(0,'#fffbe0');g.addColorStop(.35,'#ffe39a99');g.addColorStop(1,'#ffd47700');c.fillStyle=g;c.beginPath();c.arc(f.x,f.y,f.radius*(.55+p*.45),0,Math.PI*2);c.fill();}
      else if(f.kind==='furnace-blast'){
        const radius=f.radius*(.05+.95*Math.min(1,p));
        c.globalAlpha*=1-p;c.strokeStyle='#ffb35c';c.lineWidth=4*(1-p)+1;c.shadowColor='#ff713d';c.shadowBlur=16;
        c.beginPath();c.arc(f.x,f.y,radius,0,Math.PI*2);c.stroke();c.shadowBlur=0;
        c.fillStyle='#ffe2a0';c.globalAlpha*=.45;c.beginPath();c.arc(f.x,f.y,Math.max(4,radius*.15),0,Math.PI*2);c.fill();
      }
      c.restore();
    }
    if(comboBanner&&comboBanner.ttl>0){
      c.save();c.globalAlpha=Math.min(1,comboBanner.ttl*2);c.textAlign='center';c.fillStyle='#101710e8';c.beginPath();c.roundRect(comboBanner.x-78,comboBanner.y-24,156,44,10);c.fill();c.strokeStyle='#e9bf83b8';c.lineWidth=1.5;c.stroke();
      c.fillStyle=gold;c.font='bold 17px system-ui';c.fillText(comboBanner.count+' COMBO!',comboBanner.x,comboBanner.y-2);
      c.fillStyle='#f0eee2';c.font='9px system-ui';c.fillText(comboBanner.unit+' → BOT',comboBanner.x,comboBanner.y+12);c.restore();
    }
  }
