  function heal(g, target, amount, source, tag) {
    const value = Math.min(target.maxHP - target.hp, amount);
    if (value <= 0 || !target.alive) return;
    target.hp += value;
    event(g, 'heal', { target: target.id, source, amount: value, tag, x: target.x, y: target.y });
  }
