  function addLog(text, kind='') {
    logs.unshift({text,kind});logs=logs.slice(0,5);const parent=$('logList');parent.replaceChildren();
    for(const entry of logs){const div=document.createElement('div');div.className=`log-item ${entry.kind}`;div.innerHTML='<i></i><span></span>';div.querySelector('span').textContent=entry.text;parent.append(div);}
  }
