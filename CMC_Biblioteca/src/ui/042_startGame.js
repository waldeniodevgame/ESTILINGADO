  function startGame(options) {
    anchorTargeting=false;anchorAim=null;
    firstTutorialOnly=!!options?.firstTutorialOnly;tutorialStage=options?.tutorialStage||(firstTutorialOnly?"marcelo":"none");
    guidedPractice=!!options?.training&&!firstTutorialOnly;guidedDone=guidedDoneFromSave();resetTutorialRun();tutorialDialogPhase=null;$("tutorialDialog").hidden=true;
    for(const modal of modals)if(modal.open)modal.close();
    if(firstTutorialOnly){
      const tutorialTeams={{DATA:ui_tutorialTeams}};
      selected=(tutorialTeams[tutorialStage]||tutorialTeams.marcelo).slice();enemySelected=[0,6,4,5];
    } else {enemySelected=Array.from(document.querySelectorAll("[data-rival]:checked"),b=>+b.dataset.rival);if(enemySelected.length!==4)enemySelected=[0,6,4,5];}
    const mode=options?.mode||$("modeSelect").value,difficulty=options?.difficulty||$("difficultySelect").value;
    const seed=firstTutorialOnly?48271+(++tutorialSeedSerial*7919):48271;
    game=E.createGame({mode,difficulty,seed,teams:[selected,enemySelected],specialization:$("specialization").value});
    if(firstTutorialOnly)placeTutorialUnits(game,tutorialStage);
    scene="game";paused=false;drag=null;preview=null;effects=[];logs=[];comboBanner=null;seenEvents=0;accumulator=0;aiToken=0;aiDelay=0;aiAim=null;
    impactHold=0;impactSlowRemaining=0;cameraPunch=null;
    $("welcomeOverlay").hidden=true;$("pauseOverlay").hidden=true;$("resultOverlay").hidden=true;
    unlockAudio();buildRosters();consumeEvents();canvas.focus({preventScroll:true});
    if(firstTutorialOnly)showFocusedTutorialDialog("intro");
    if(window.innerWidth<701&&options?.scroll!==false)$("arenaFrame").scrollIntoView({behavior:reducedMotion?"instant":"smooth",block:"start"});
  }
