  function createGame(options = {}) {
    const captainInset=(C.right-C.left)*F.captainInset, captainY=(C.top+C.bottom)/2;
    const g = {
      mode: options.mode || 'ai', difficulty: options.difficulty || 'tactical', rng: options.seed || 48271,
      units: [], leaders: [
        { id: 'leader0', team: 0, x: C.left+captainInset, y: captainY, hp: C.leaderHP, maxHP: C.leaderHP, energy: 0 },
        { id: 'leader1', team: 1, x: C.right-captainInset, y: captainY, hp: C.leaderHP, maxHP: C.leaderHP, energy: 0 }
      ], cursors: [0, 0], team: options.startTeam === 1 ? 1 : 0, turn: 0,
      specialization: options.specialization||'strategist', phase: 'planning', activeId: null, focus: false, usedSkills: [], events: [],
      winner: null, resultReason: null, shot: null, records: [], bestCombo: 0, vortices: [], furnaceLavas: []
    };
    for (let team = 0; team < 2; team++) for (let slot = 0; slot < 4; slot++) {
      const ti = (options.teams?.[team] || [2,3,1,11])[slot], t = TYPES[ti], captain=g.leaders[team];
      const [offsetX,offsetY]=SQUAD_OFFSETS[slot], side=team===0?1:-1;
      g.units.push({ id: `${team}-${slot}`, team, slot, type: ti, cooldown: 0, shield: 0, charge: 0, level: 1,
        x: captain.x+side*offsetX, y: captain.y+offsetY, hp: t.hp+(ti===13?F.reactorExtraHP:0), maxHP: t.hp+(ti===13?F.reactorExtraHP:0), alive: true, slowNextForce: 0, reactorTurns: 0, reactorArmed: false });
    }
    beginTurn(g);
    return g;
  }
