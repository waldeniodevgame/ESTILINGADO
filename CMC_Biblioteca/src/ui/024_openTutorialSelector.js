  function openTutorialSelector(){
    $("modeSelectOverlay").hidden=true;$("openingOverlay").hidden=true;$("welcomeOverlay").hidden=true;
    $("tutorialSelectOverlay").hidden=false;showTutorialRoster();$("tutorialSelectionBack").focus({preventScroll:true});
  }
