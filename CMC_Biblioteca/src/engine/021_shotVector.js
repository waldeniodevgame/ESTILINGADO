  function shotVector(dx, dy) {
    const length = Math.hypot(dx, dy);
    if (!Number.isFinite(length) || length < C.minDrag) return null;
    const horizontalShare = (dx * dx) / (length * length);
    const rangeCompensation = 1 + (C.horizontalScale - 1) * horizontalShare;
    const speed = Math.min(length, C.maxDrag) / C.maxDrag * C.maxSpeed * rangeCompensation;
    return { vx: dx / length * speed, vy: dy / length * speed };
  }
