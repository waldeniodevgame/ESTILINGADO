  function markGuideStep(key){
    if(guidedDone[key])return false;
    guidedDone[key]=true;tutorialProgress[key]=true;writeGuideProgress();return true;
  }
