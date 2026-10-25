  function launch(dx,dy){
    if(!humanTurn())return false;const a=E.active(game);
    const okay=a?.type===8?E.startPortal(game,dx,dy):E.startShot(game,dx,dy);
    if(okay){preview=null;drag=null;accumulator=0;consumeEvents();}return okay;
  }
