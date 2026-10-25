  function preview(g, dx, dy) {
    const copy = clone(g), points = [], a = active(copy);
    if (!a || !startShot(copy, dx, dy)) return { points, impact: null, combos: 0 };
    points.push({ x: a.x, y: a.y });
    for (let i = 0; i < 700 && !copy.shot.done; i++) {
      const eventStart = copy.events.length;
      stepShot(copy);
      for (const e of copy.events.slice(eventStart)) if (e.type === 'bounce') points.push({ x: e.x, y: e.y });
      if (copy.shot.solidContact) {
        points.push({ x: copy.shot.solidContact.x, y: copy.shot.solidContact.y });
        return { points, impact: copy.shot.solidContact, combos: copy.shot.comboCount };
      }
      if (i % 3 === 0) points.push({ x: a.x, y: a.y });
    }
    points.push({ x: a.x, y: a.y });
    return { points, impact: null, combos: copy.shot.comboCount };
  }
