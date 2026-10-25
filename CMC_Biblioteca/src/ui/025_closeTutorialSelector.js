  function closeTutorialSelector(){
    $("tutorialSelectOverlay").hidden=true;$("modeSelectOverlay").hidden=false;
    $("tutorialRosterPage").hidden=false;$("tutorialCharacterPage").hidden=true;
    $("tutorialSelectOverlay").setAttribute("aria-labelledby","tutorialSelectTitle");$("modeTrainBtn").focus({preventScroll:true});
  }
