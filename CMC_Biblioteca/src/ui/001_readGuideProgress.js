  function readGuideProgress(){
    try{
      const saved=JSON.parse(localStorage.getItem(guideStorageKey)||'null')||{};
      return {introSeen:!!saved.introSeen,aim:!!saved.aim,combo:!!saved.combo,captain:!!saved.captain,special:!!saved.special};
    }catch(_){return blankGuideProgress();}
  }
  let tutorialProgress=readGuideProgress();
