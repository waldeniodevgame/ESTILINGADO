  function circleEntry(x, y, dx, dy, cx, cy, r, allowInside) {
    const px = x - cx, py = y - cy;
    const a = dx * dx + dy * dy;
    if (a < 1e-12) return null;
    const b = px * dx + py * dy, c = px * px + py * py - r * r;
    if (c <= 1e-7) return allowInside || b < -1e-7 ? 0 : null;
    const disc = b * b - a * c;
    if (disc < 0) return null;
    const t = (-b - Math.sqrt(disc)) / a;
    return t >= -1e-8 && t <= 1 + 1e-8 ? clamp(t, 0, 1) : null;
  }
