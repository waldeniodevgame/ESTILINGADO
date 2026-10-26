  function cancelAim(message=true) {
    if(anchorTargeting){anchorTargeting=false;anchorAim=null;if(message)toast('Mira do morteiro cancelada.');updateHUD();}
    if(!drag)return;
    const pointer=drag.pointerId;drag=null;preview=null;
    try{if(canvas.hasPointerCapture(pointer))canvas.releasePointerCapture(pointer);}catch(_){}
    if(message)toast('Mira cancelada. Seu turno continua.');updateHUD();
  }
