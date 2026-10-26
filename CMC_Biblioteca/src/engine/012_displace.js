  function displace(g, target, dx, dy, amount, source) {
    if (!target.alive || target.hp <= 0) return;
    if(target.type===13||target.reactorAttached)return;
    const mag = Math.hypot(dx, dy) || 1;
    const oldX = target.x, oldY = target.y;
    target.vx=(target.vx||0)+dx/mag*amount*F.pushScale;
    target.vy=(target.vy||0)+dy/mag*amount*F.pushScale;
    event(g, 'push', { target: target.id, source, x: target.x, y: target.y, oldX, oldY });
  }
