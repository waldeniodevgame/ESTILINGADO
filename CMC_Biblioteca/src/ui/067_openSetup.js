  function openSetup(showTutorial){tutorialProgress.introSeen=true;writeGuideProgress();$('modeSelectOverlay').hidden=true;$('openingOverlay').hidden=true;$('welcomeOverlay').hidden=false;switchInitialTab(showTutorial);if(showTutorial)$('tutorialTab').focus({preventScroll:true});else $('selectionTab').focus({preventScroll:true});}
  const storySlides={{DATA:ui_storySlides}};
  let storyIndex=0;
