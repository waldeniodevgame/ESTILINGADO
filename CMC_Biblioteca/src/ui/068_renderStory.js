  function renderStory(){
    const d=storySlides[storyIndex];
    $("storyKicker").textContent=d.kicker;$("storyTitle").textContent=d.title;$("storyText").textContent=d.text;$("storyNote").textContent=d.note;
    $("storyPage").textContent=String(storyIndex+1).padStart(2,"0")+" / "+String(storySlides.length).padStart(2,"0");
    $("storyProgressBar").style.width=((storyIndex+1)/storySlides.length*100)+"%";
    $("storyGuideArt").hidden=d.art!=="guide";$("storyUnitArt").hidden=d.art!=="unit";$("storyComboArt").hidden=d.art!=="combo";
    if(d.art==="unit"){drawPortrait($("storyUnitPortrait"),d.unit,240);$("storyUnitPortrait").setAttribute("aria-label","Retrato de "+T[d.unit].name);$("storyUnitName").textContent=T[d.unit].name.toUpperCase();$("storyUnitRole").textContent=d.role;}
    if(d.art==="combo"){
      drawPortrait($("storyComboLaunch"),d.launch,100);drawPortrait($("storyComboSupport"),d.support,100);drawPortrait($("storyComboTarget"),d.target,100);
      $("storyComboLaunchName").textContent=T[d.launch].name.toUpperCase();$("storyComboLaunchRole").textContent=d.launchRole||"lançador";
      $("storyComboSupportName").textContent=T[d.support].name.toUpperCase();$("storyComboSupportRole").textContent=d.supportRole||"aliada de combo";
      $("storyComboTargetName").textContent="BOT";$("storyComboTargetRole").textContent=d.targetRole||"alvo de exemplo";
    }
    $("storyPrev").disabled=storyIndex===0;const card=document.querySelector(".story-card");card.classList.remove("story-enter");void card.offsetWidth;card.classList.add("story-enter");$("storyNext").textContent=storyIndex===storySlides.length-1?"INICIAR TREINO · MARCELO →":"CONTINUAR →";
  }
  $('storyPrev').onclick=()=>{storyIndex=Math.max(0,storyIndex-1);renderStory();};$('storyNext').onclick=()=>{if(storyIndex===storySlides.length-1){tutorialProgress.introSeen=true;writeGuideProgress();$('openingOverlay').hidden=true;$('modeSelect').value='ai';$('difficultySelect').value='relaxed';startFocusedTutorial();}else{storyIndex++;renderStory();}};$('storySkip').onclick=()=>openSetup(false);$('modeTrainBtn').onclick=openTutorialSelector;$('modeGameBtn').onclick=()=>openSetup(false);$('tutorialSelectionBack').onclick=onTutorialSelectionBack;$('tutorialSelectionClose').onclick=closeTutorialSelector;
  $("tutorialDialogPrimary").onclick=()=>{
    if(tutorialDialogPhase==="intro"){resetTutorialRun();closeFocusedTutorialDialog();}
    else if(tutorialDialogPhase==="success"||tutorialDialogPhase==="missed")startTutorialStage(tutorialStage);
  };
  $("tutorialDialogSecondary").onclick=()=>{
    if(tutorialDialogPhase==="intro"){resetTutorialRun();closeFocusedTutorialDialog();}
    else if(tutorialDialogPhase==="success"||tutorialDialogPhase==="missed"){if(tutorialStage==="furnace1"||tutorialStage==="drill3"||tutorialStage==="prism1")openTutorialSelector();else startTutorialStage(nextTutorialStage(tutorialStage));}
  };

  $('selectionTab').onclick=()=>switchInitialTab(false);$('tutorialTab').onclick=()=>switchInitialTab(true);
  refreshPicker();$('specialBtn').onclick=()=>{if(!humanTurn())return;const a=E.active(game);if(a?.type===12){if(anchorTargeting){cancelAim();return;}if(a.cooldown>0)return;cancelAim(false);anchorTargeting=true;anchorAim=null;toast('Escolha o núcleo do vórtice no tabuleiro.');updateHUD();return;}E.useSkill(game,'special');updateHUD();};
  document.querySelectorAll('[data-extra]').forEach(b=>b.onclick=()=>{if(humanTurn()){cancelAim(false);if(!E.useSkill(game,b.dataset.extra))toast('Energia insuficiente ou habilidade já usada.');consumeEvents();updateHUD();}});
  portraitAtlas.onload=()=>{buildRosters();refreshPicker();drawPortrait($('storyUnitPortrait'),3,220);renderLesson();renderTutorialMonsterCards();};
  buildRosters();buildHelp();buildPhysicsRoster();updateSound();updateHUD();renderLesson();renderStory();renderTutorialMonsterCards();$('modeSelectOverlay').hidden=false;$('openingOverlay').hidden=true;$('welcomeOverlay').hidden=true;if(portraitAtlas.complete)drawPortrait($('storyUnitPortrait'),3,220);requestAnimationFrame(frame);
})();

