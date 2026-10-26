  function simulate(g, dx, dy, passTurn = false) {
    const copy = clone(g);
    if (!startShot(copy, dx, dy)) return copy;
    let safety = 0;
    while (!copy.shot.done && safety++ < 1500) stepShot(copy);
    copy.shot.done = true;
    if (passTurn) finishShot(copy);
    return copy;
  }
