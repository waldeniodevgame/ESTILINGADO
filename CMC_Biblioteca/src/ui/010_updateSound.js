  function updateSound() {
    $('soundBtn').setAttribute('aria-pressed', String(sound));
    $('soundBtn').setAttribute('aria-label', sound ? 'Desativar som' : 'Ativar som');
    $('soundBtn').title = sound ? 'Som ativado' : 'Som desativado';
    $('soundWaves').setAttribute('d', sound ? 'M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14' : 'm16 9 5 6m0-6-5 6');
  }
  /* Ilustrações vetoriais próprias, desenhadas no arquivo sem imagens externas. */
  const portraitAtlas=new Image();portraitAtlas.src='{{ASSET:assets/c8a3c13d8607ce69.png}}';
