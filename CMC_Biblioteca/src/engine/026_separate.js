  function separate(g, a) {
    for (let pass = 0; pass < 10; pass++) {
      let changed = false;
      const obstacles = [...g.units.filter(u => u.alive && u.id !== a.id), ...g.leaders];
      for (const b of obstacles) {
        const actorRadius=PHYSICS_PROFILES[a.type]?.collisionRadius??C.radius;
        const otherRadius=('alive' in b)?(PHYSICS_PROFILES[b.type]?.collisionRadius??C.radius):C.leaderRadius;
        const r=actorRadius+otherRadius+.2;
        const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < r) {
          const nx = d > .001 ? dx / d : a.id < b.id ? -1 : 1;
          const ny = d > .001 ? dy / d : 0;
          a.x += nx * (r - d); a.y += ny * (r - d); changed = true;
        }
      }
      a.x = clamp(a.x, C.left + C.radius, C.right - C.radius);
      a.y = clamp(a.y, C.top + C.radius, C.bottom - C.radius);
      if (!changed) break;
    }
  }
