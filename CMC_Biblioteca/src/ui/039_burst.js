  function burst(x,y,color,count=10,speed=90){
    for(let i=0;i<count;i++){
      const angle=(i/count)*Math.PI*2+(i%3)*.12,velocity=speed*(.55+((i*7)%5)*.12);
      effects.push({kind:'spark',x,y,vx:Math.cos(angle)*velocity,vy:Math.sin(angle)*velocity,color,age:0,life:.42+((i*3)%4)*.07});
    }
  }
