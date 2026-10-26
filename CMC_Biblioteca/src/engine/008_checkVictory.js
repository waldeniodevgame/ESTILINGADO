  function checkVictory(g) {
    const lost = [0, 1].map(t => g.leaders[t].hp <= 0 || !alive(g, t).length);
    if (!lost[0] && !lost[1]) return false;
    g.winner = lost[0] && lost[1] ? -1 : lost[1] ? 0 : 1;
    g.resultReason = lost[0] && lost[1] ? 'draw' : g.leaders[1 - g.winner].hp <= 0 ? 'leader' : 'squad';
    g.phase = 'over'; g.activeId = null;
    event(g, 'victory', { winner: g.winner, reason: g.resultReason });
    return true;
  }
