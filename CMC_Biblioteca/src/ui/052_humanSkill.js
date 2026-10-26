  function humanSkill(key){
    if(!humanTurn()||drag)return false;
    if(anchorTargeting)cancelAim(false);
    const okay=E.useSkill(game,key);
    if(okay){unlockAudio();consumeEvents();toast(key==='heal'?'Cura aplicada ao esquadrão.':'Foco ativado: dano dobrado no próximo tiro.');}
    return okay;
  }
