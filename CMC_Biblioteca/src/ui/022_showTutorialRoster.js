  function showTutorialRoster(){
    $("tutorialRosterPage").hidden=false;$("tutorialCharacterPage").hidden=true;
    $("tutorialSelectOverlay").setAttribute("aria-labelledby","tutorialSelectTitle");
    $("tutorialSelectionBack").textContent="← Modos";$("tutorialSelectionBack").setAttribute("aria-label","Voltar à escolha de modo");
    renderTutorialMonsterCards();
  }
