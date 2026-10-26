  function closeFocusedTutorialDialog(){
    $('tutorialDialog').hidden=true;tutorialDialogPhase=null;paused=false;updateHUD();canvas.focus({preventScroll:true});
  }
  const TUTORIAL_LESSONS={{DATA:ui_TUTORIAL_LESSONS}};
  const TUTORIAL_CARD_ORDER={{DATA:ui_TUTORIAL_CARD_ORDER}};
