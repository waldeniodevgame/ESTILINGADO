  function showResult() {
    scene='result';paused=false;drag=null;preview=null;aiAim=null;$('pauseOverlay').hidden=true;$('resultOverlay').hidden=false;
    const won=game.winner===0, draw=game.winner===-1, local=game.mode==='local';
    $('resultEyebrow').textContent=draw?'EQUILÍBRIO NA ARENA':local?`EQUIPE ${teamName(game.winner).toUpperCase()}`:won?'O ÂNGULO CERTO FAZ A DIFERENÇA':'CADA DUELO ENSINA UM CAMINHO';
    $('resultTitle').textContent=draw?'Empate!':local?`${teamName(game.winner)} venceu!`:won?'Vitória!':'Ametista venceu.';
    $('resultText').textContent=draw?'Os dois lados foram derrotados no mesmo lançamento.':game.resultReason==='squad'?'Todos os monstros da equipe adversária foram derrotados.':'A vida do capitão adversário chegou a zero.';
    if(!local&&!won&&!draw)$('resultText').textContent=game.resultReason==='squad'?'Seu esquadrão foi derrotado. Tente usar aliados para encadear mais ataques.':'Seu capitão foi derrotado. Cuidado com os tiros diretos e com a perda de monstros.';
    $('resultTurns').textContent=game.turn;$('resultCombo').textContent=game.bestCombo;
    $('statusTitle').textContent=draw?'Duelo encerrado em empate.':local?`Vitória da equipe ${teamName(game.winner)}.`:won?'Você venceu o duelo.':'O duelo terminou.';
    $('statusSub').textContent='Jogue novamente para experimentar outras trajetórias.';tone('win');updateHUD();
  }
