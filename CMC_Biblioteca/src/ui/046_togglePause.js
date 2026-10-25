  function togglePause(force) {
    if(scene!=='game'||isModal())return;
    paused=force===undefined?!paused:force;
    if(paused)cancelAim(false);$('pauseOverlay').hidden=!paused;accumulator=0;updateHUD();
  }
