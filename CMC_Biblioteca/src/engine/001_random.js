  function random(g) {
    let s = g.rng | 0;
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    g.rng = s >>> 0;
    return g.rng / 4294967296;
  }
