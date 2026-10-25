  function showTutorialCharacter(index){
    const lesson=TUTORIAL_LESSONS[index];if(!lesson)return;
    const data=T[index];$("tutorialRosterPage").hidden=true;$("tutorialCharacterPage").hidden=false;
    $("tutorialSelectOverlay").setAttribute("aria-labelledby","tutorialSelectedName");
    $("tutorialSelectionBack").textContent="← Todos os monstros";$("tutorialSelectionBack").setAttribute("aria-label","Voltar à lista de monstros");
    $("tutorialSelectedName").textContent=data.name;$("tutorialSelectedSkill").textContent=data.skill;
    $("tutorialSelectedDescription").textContent=lesson.summary;
    $("tutorialStageCount").textContent=lesson.stages.length+" lição"+(lesson.stages.length===1?"":"ões")+" · na ordem do tutorial";
    drawPortrait($("tutorialSelectedPortrait"),index,128);
    $("tutorialStageGrid").innerHTML=lesson.stages.map((stage,position)=>'<button class="tutorial-stage-option" type="button" data-tutorial-stage="'+stage.id+'"><span class="tutorial-stage-index">'+String(position+1).padStart(2,"0")+'</span><span><strong>'+stage.title+'</strong><small>'+stage.detail+'</small></span><b aria-hidden="true">→</b></button>').join("");
    $("tutorialStageGrid").querySelectorAll("[data-tutorial-stage]").forEach(button=>button.onclick=()=>startTutorialStage(button.dataset.tutorialStage));
  }
