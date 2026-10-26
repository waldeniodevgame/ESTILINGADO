  function tone(kind) {
    if (!sound || !audio || audio.state !== 'running') return;
    try {
      const tones = {{DATA:ui_tones}};
      const [from, to, duration] = tones[kind] || tones.hit;
      const oscillator = audio.createOscillator(), volume = audio.createGain(), now = audio.currentTime;
      oscillator.type = kind === 'hit' || kind === 'death' ? 'triangle' : 'sine';
      oscillator.frequency.setValueAtTime(from, now); oscillator.frequency.exponentialRampToValueAtTime(to, now + duration);
      volume.gain.setValueAtTime(.0001, now); volume.gain.exponentialRampToValueAtTime(kind === 'wall' ? .015 : .055, now + .009); volume.gain.exponentialRampToValueAtTime(.0001, now + duration);
      oscillator.connect(volume); volume.connect(audio.destination); oscillator.start(now); oscillator.stop(now + duration + .02);
    } catch (_) {}
  }
