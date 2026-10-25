  function startTutorialStage(stage){
    $("tutorialSelectOverlay").hidden=true;tutorialStage=stage;$("modeSelect").value="ai";$("difficultySelect").value="relaxed";
    window.EloArena.start({mode:"ai",difficulty:"relaxed",firstTutorialOnly:true,tutorialStage:stage,scroll:false});
  }
