  function renderLesson(){
    const d=lessons[lessonIndex];$('lessonCount').textContent=`LIÇÃO ${String(lessonIndex+1).padStart(2,'0')} / ${String(lessons.length).padStart(2,'0')}`;
    $('lessonPercent').textContent=`${Math.round((lessonIndex+1)/lessons.length*100)}%`;$('lessonProgressBar').style.width=`${(lessonIndex+1)/lessons.length*100}%`;
    $('lessonKicker').textContent=d.tag;$('lessonTitle').textContent=d.title;$('lessonText').textContent=d.text;$('lessonCallout').textContent=d.tip;
    $('lessonUnitName').textContent=T[d.unit].name.toUpperCase();drawPortrait($('lessonPortrait'),d.unit,200);
    $('lessonPrev').disabled=lessonIndex===0;$('lessonNext').textContent=lessonIndex===lessons.length-1?'REVER INÍCIO ↺':'PRÓXIMA LIÇÃO →';
  }
