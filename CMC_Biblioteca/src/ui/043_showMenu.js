  function showMenu() {
    anchorTargeting=false;anchorAim=null;
    guidedPractice=false;firstTutorialOnly=false;tutorialStage='marcelo';impactHold=0;impactSlowRemaining=0;cameraPunch=null;$('tutorialDialog').hidden=true;tutorialDialogPhase=null;scene='menu';paused=false;cancelAim(false);aiAim=null;effects=[];game=E.createGame({mode:$('modeSelect').value,difficulty:$('difficultySelect').value});seenEvents=game.events.length;
    $('modeSelectOverlay').hidden=false;$('openingOverlay').hidden=true;$('welcomeOverlay').hidden=true;$('resultOverlay').hidden=true;$('pauseOverlay').hidden=true;
    $('statusBox').classList.remove('enemy-turn');$('statusMark').textContent='↗';
    $('statusTitle').textContent='Uma trajetória pode mudar tudo.';$('statusSub').textContent='Entre na arena para começar seu primeiro duelo.';
    buildRosters();updateHUD();$('startBtn').focus({preventScroll:true});
  }
