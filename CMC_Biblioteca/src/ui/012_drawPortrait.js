  function drawPortrait(target, type, size = 80) {
    target.width=size;target.height=size;
    const c=target.getContext('2d');c.clearRect(0,0,size,size);
    monsterArt(c,type,size/2,size/2,size*.33,0);
  }
