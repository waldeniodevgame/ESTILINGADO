  function nearestEnemy(g, source) {
    return alive(g, 1 - source.team).sort((a, b) => distance(source, a) - distance(source, b) || a.id.localeCompare(b.id))[0] || null;
  }
